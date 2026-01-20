// Product data with local images
const products = [
    {
        id: 1,
        name: "Sušena banana",
        category: "classic",
        image: "images/proizvod1.png",
        prices: {
            "50g": 300,
            "100g": 550
        }
    },
    {
        id: 2,
        name: "Sušena jagoda",
        category: "classic",
        image: "images/proizvod2.png",
        prices: {
            "50g": 350,
            "100g": 650
        }
    },
    {
        id: 3,
        name: "Sušena jabuka",
        category: "classic",
        image: "images/proizvod3.png",
        prices: {
            "50g": 250,
            "100g": 450
        }
    },
    {
        id: 4,
        name: "Sušena kajsija",
        category: "classic",
        image: "images/proizvod4.png",
        prices: {
            "50g": 320,
            "100g": 600
        }
    },
    {
        id: 5,
        name: "Sušena kruška",
        category: "classic",
        image: "images/proizvod5.png",
        prices: {
            "50g": 280,
            "100g": 520
        }
    },
    {
        id: 6,
        name: "Sušeni limun",
        category: "citrus",
        image: "images/proizvod6.png",
        prices: {
            "50g": 270,
            "100g": 500
        }
    },
    {
        id: 7,
        name: "Sušena limeta",
        category: "citrus",
        image: "images/proizvod7.png",
        prices: {
            "50g": 290,
            "100g": 540
        }
    },
    {
        id: 8,
        name: "Sušena narandža",
        category: "citrus",
        image: "images/proizvod8.png",
        prices: {
            "50g": 310,
            "100g": 580
        }
    },
    {
        id: 9,
        name: "Sušeni grejp",
        category: "citrus",
        image: "images/proizvod9.png",
        prices: {
            "50g": 330,
            "100g": 620
        }
    },
    {
        id: 10,
        name: "Sušena ananas",
        category: "exotic",
        image: "images/proizvod10.png",
        prices: {
            "50g": 340,
            "100g": 640
        }
    },
    {
        id: 11,
        name: "Sušeni mango",
        category: "exotic",
        image: "images/proizvod11.png",
        prices: {
            "50g": 380,
            "100g": 700
        }
    },
    {
        id: 12,
        name: "Sušena papaja",
        category: "exotic",
        image: "images/proizvod12.png",
        prices: {
            "50g": 360,
            "100g": 670
        }
    },
    {
        id: 13,
        name: "Sušeni kivi",
        category: "exotic",
        image: "images/proizvod13.png",
        prices: {
            "50g": 370,
            "100g": 690
        }
    },
    {
        id: 14,
        name: "Sušeni paradajz",
        category: "vegetable",
        image: "images/proizvod14.png",
        prices: {
            "50g": 280,
            "100g": 520
        }
    },
    {
        id: 15,
        name: "Sušena paprika",
        category: "vegetable",
        image: "images/proizvod15.png",
        prices: {
            "50g": 290,
            "100g": 540
        }
    },
    {
        id: 16,
        name: "Sušena šargarepa",
        category: "vegetable",
        image: "images/proizvod16.png",
        prices: {
            "50g": 260,
            "100g": 480
        }
    },
    {
        id: 17,
        name: "Sušena cvekla",
        category: "vegetable",
        image: "images/proizvod17.png",
        prices: {
            "50g": 270,
            "100g": 500
        }
    }
];

// Display products
function displayProducts(filter = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) return;
    
    // Clear grid
    productsGrid.innerHTML = '';
    
    // Filter products
    let filteredProducts = products;
    if (filter !== 'all') {
        filteredProducts = products.filter(product => product.category === filter);
    }
    
    // Display filtered products
    filteredProducts.forEach(product => {
        const productId = product.name.toLowerCase()
            .replace('sušena', '')
            .replace('sušeni', '')
            .replace('š', 's')
            .replace('ž', 'z')
            .replace('č', 'c')
            .replace('ć', 'c')
            .trim()
            .replace(/ /g, '');
            
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <div class="image-background"></div>
                <img src="${product.image}" alt="${product.name}" loading="lazy" onload="adjustProductImage(this)">
            </div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">
                <span class="price-amount">${product.prices["100g"]}</span> RSD
                <span class="price-weight">/ 100g</span>
            </div>
            <div class="weight-selector">
                <button class="weight-option" data-weight="50g" data-price="${product.prices["50g"]}" data-product="${productId}">
                    50g
                </button>
                <button class="weight-option active" data-weight="100g" data-price="${product.prices["100g"]}" data-product="${productId}">
                    100g
                </button>
            </div>
            <button class="btn btn-add-to-cart" 
                data-product="${productId}" 
                data-weight="100g"
                data-price="${product.prices["100g"]}">
                <i class="fas fa-plus"></i> Dodaj u korpu
            </button>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners
    setTimeout(() => {
        // Weight selector
        document.querySelectorAll('.weight-option').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.querySelectorAll('.weight-option').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Update price display
                const productCard = this.closest('.product-card');
                const priceElement = productCard.querySelector('.product-price .price-amount');
                const weightElement = productCard.querySelector('.product-price .price-weight');
                const addToCartBtn = productCard.querySelector('.btn-add-to-cart');
                
                if (priceElement) {
                    priceElement.textContent = this.dataset.price;
                }
                if (weightElement) {
                    weightElement.textContent = `/ ${this.dataset.weight}`;
                }
                if (addToCartBtn) {
                    addToCartBtn.dataset.weight = this.dataset.weight;
                    addToCartBtn.dataset.price = this.dataset.price;
                }
            });
        });
        
        // Add to cart buttons
        document.querySelectorAll('.btn-add-to-cart').forEach(button => {
            // Remove any existing listeners first
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const productName = this.dataset.product;
                const weight = this.dataset.weight;
                const price = parseInt(this.dataset.price);
                
                if (typeof addToCart === 'function') {
                    addToCart(productName, weight, price);
                    
                    // Animation effect
                    const rect = this.getBoundingClientRect();
                    const cartRect = document.querySelector('.cart-icon')?.getBoundingClientRect();
                    
                    if (cartRect) {
                        const flyingItem = document.createElement('div');
                        flyingItem.className = 'flying-item';
                        flyingItem.innerHTML = '🍎';
                        flyingItem.style.position = 'fixed';
                        flyingItem.style.left = rect.left + 'px';
                        flyingItem.style.top = rect.top + 'px';
                        flyingItem.style.fontSize = '20px';
                        flyingItem.style.zIndex = '10000';
                        flyingItem.style.pointerEvents = 'none';
                        flyingItem.style.transition = 'all 0.5s ease';
                        
                        document.body.appendChild(flyingItem);
                        
                        setTimeout(() => {
                            flyingItem.style.left = cartRect.left + 'px';
                            flyingItem.style.top = cartRect.top + 'px';
                            flyingItem.style.transform = 'scale(0.5)';
                            flyingItem.style.opacity = '0.5';
                        }, 10);
                        
                        setTimeout(() => {
                            document.body.removeChild(flyingItem);
                        }, 500);
                    }
                }
            });
        });
        
        // Adjust image sizes for already loaded images
        setTimeout(() => {
            document.querySelectorAll('.product-image img').forEach(img => {
                if (img.complete) {
                    adjustProductImage(img);
                }
            });
        }, 300);
    }, 100);
}

// Function to adjust product image size
function adjustProductImage(imgElement) {
    const aspectRatio = imgElement.naturalWidth / imgElement.naturalHeight;
    const container = imgElement.parentElement;
    
    // Reset styles
    imgElement.style.maxWidth = '';
    imgElement.style.maxHeight = '';
    imgElement.style.width = '';
    imgElement.style.height = '';
    
    // Ako je slika viša nego šira (visoko pakovanje)
    if (aspectRatio < 0.8) {
        // Za vrlo visoke slike
        imgElement.style.maxWidth = '85%';
        imgElement.style.maxHeight = '90%';
    } 
    // Ako je slika približno kvadratna
    else if (aspectRatio >= 0.8 && aspectRatio <= 1.2) {
        imgElement.style.maxWidth = '90%';
        imgElement.style.maxHeight = '90%';
    }
    // Ako je slika šira nego viša
    else {
        imgElement.style.maxWidth = '95%';
        imgElement.style.maxHeight = '85%';
    }
}

// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    // Display all products initially
    displayProducts();
    
    // Filter button click events
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter category
            const category = this.getAttribute('data-category');
            
            // Display filtered products
            displayProducts(category);
        });
    });
});

// Make function globally available
window.adjustProductImage = adjustProductImage;