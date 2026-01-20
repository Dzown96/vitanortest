// Cart functions that need to be accessible across pages
let cartUpdateTimeout;

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

function addToCart(productName, weight = '100g', price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Format product name for display (add spaces)
    const displayName = formatProductName(productName);
    
    // Check if product already exists with same weight
    const existingProductIndex = cart.findIndex(item => 
        item.id === productName && item.weight === weight
    );
    
    if (existingProductIndex !== -1) {
        // Increase quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // Add new product
        const product = {
            id: productName, // For matching
            name: displayName, // For display with spaces
            quantity: 1,
            price: price || getProductPrice(productName, weight),
            weight: weight
        };
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Debounce cart display update
    clearTimeout(cartUpdateTimeout);
    cartUpdateTimeout = setTimeout(() => {
        updateCartDisplay();
    }, 100);
    
    return true;
}

function formatProductName(id) {
    // Convert ID like "banana" to "Sušena banana"
    const names = {
        'banana': 'Sušena banana',
        'jagoda': 'Sušena jagoda',
        'jabuka': 'Sušena jabuka',
        'kajsija': 'Sušena kajsija',
        'kruska': 'Sušena kruška',
        'limun': 'Sušeni limun',
        'limeta': 'Sušena limeta',
        'narandza': 'Sušena narandža',
        'grejp': 'Sušeni grejp',
        'ananas': 'Sušena ananas',
        'mango': 'Sušeni mango',
        'papaja': 'Sušena papaja',
        'kivi': 'Sušeni kivi',
        'paradajz': 'Sušeni paradajz',
        'paprika': 'Sušena paprika',
        'sargarepa': 'Sušena šargarepa',
        'cvekla': 'Sušena cvekla'
    };
    
    return names[id] || id.charAt(0).toUpperCase() + id.slice(1);
}

function getProductPrice(productName, weight) {
    const prices = {
        'banana': { '50g': 300, '100g': 550 },
        'jagoda': { '50g': 350, '100g': 650 },
        'jabuka': { '50g': 250, '100g': 450 },
        'kajsija': { '50g': 320, '100g': 600 },
        'kruska': { '50g': 280, '100g': 520 },
        'limun': { '50g': 270, '100g': 500 },
        'limeta': { '50g': 290, '100g': 540 },
        'narandza': { '50g': 310, '100g': 580 },
        'grejp': { '50g': 330, '100g': 620 },
        'ananas': { '50g': 340, '100g': 640 },
        'mango': { '50g': 380, '100g': 700 },
        'papaja': { '50g': 360, '100g': 670 },
        'kivi': { '50g': 370, '100g': 690 },
        'paradajz': { '50g': 280, '100g': 520 },
        'paprika': { '50g': 290, '100g': 540 },
        'sargarepa': { '50g': 260, '100g': 480 },
        'cvekla': { '50g': 270, '100g': 500 }
    };
    
    return prices[productName]?.[weight] || 300;
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    const deliveryCost = document.getElementById('deliveryCost');
    
    if (!cartItems) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Korpa je prazna</p>';
        if (cartSubtotal) cartSubtotal.textContent = '0 RSD';
        if (cartTotal) cartTotal.textContent = '350 RSD';
        return;
    }
    
    // Calculate subtotal
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    // Calculate delivery
    const delivery = subtotal >= 3000 ? 0 : 350;
    const total = subtotal + delivery;
    
    // Update totals
    if (cartSubtotal) cartSubtotal.textContent = subtotal.toFixed(0) + ' RSD';
    if (deliveryCost) {
        deliveryCost.textContent = delivery === 0 ? 'BESPLATNO' : delivery + ' RSD';
        deliveryCost.style.color = delivery === 0 ? '#2E7D32' : '';
    }
    if (cartTotal) cartTotal.textContent = total.toFixed(0) + ' RSD';
    
    // Generate cart items HTML
    let cartHTML = '';
    cart.forEach((item, index) => {
        cartHTML += `
            <div class="cart-item" data-index="${index}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.weight} • ${item.price} RSD</p>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn minus" onclick="updateQuantity(${index}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="updateQuantity(${index}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="cart-item-total">
                    ${(item.price * item.quantity).toFixed(0)} RSD
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = cartHTML;
}

function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartDisplay();
    }
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart[index]) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartDisplay();
    }
}

// Make functions available globally
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.addToCart = addToCart;
window.updateCartDisplay = updateCartDisplay;

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    updateCartCount();
    updateCartDisplay();
});