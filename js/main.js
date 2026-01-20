// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = mobileNav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
            mobileNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Cart toggle
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');

if (cartIcon && cartSidebar) {
    cartIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeCart && cartSidebar) {
    closeCart.addEventListener('click', (e) => {
        e.stopPropagation();
        cartSidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (cartSidebar && cartSidebar.classList.contains('active')) {
        if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
            cartSidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Prevent cart from closing when clicking inside
if (cartSidebar) {
    cartSidebar.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
    
    // Update cart display
    if (typeof updateCartDisplay === 'function') {
        updateCartDisplay();
    }
});

// Flying item animation
document.addEventListener('DOMContentLoaded', function() {
    // This will be handled by shop.js and cart.js
});