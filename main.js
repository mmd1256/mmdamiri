// تعریف کلاس محصول
class Product {
    constructor(id, name, price, image, description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
    }
}

// تعریف کلاس سبد خرید
class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
    }

    // افزودن محصول به سبد خرید
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ product, quantity });
        }
        
        this.calculateTotal();
        this.updateCartUI();
    }

    // حذف محصول از سبد خرید
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.calculateTotal();
        this.updateCartUI();
    }

    // محاسبه مجموع قیمت
    calculateTotal() {
        this.total = this.items.reduce((sum, item) => {
            return sum + (item.product.price * item.quantity);
        }, 0);
    }

    // بروزرسانی نمایش سبد خرید
    updateCartUI() {
        const cartElement = document.getElementById('shopping-cart');
        const totalElement = document.getElementById('cart-total');
        
        cartElement.innerHTML = '';
        
        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.product.image}" alt="${item.product.name}">
                <div class="item-details">
                    <h3>${item.product.name}</h3>
                    <p>قیمت: ${item.product.price} تومان</p>
                    <p>تعداد: ${item.quantity}</p>
                </div>
                <button onclick="cart.removeItem(${item.product.id})">حذف</button>
            `;
            cartElement.appendChild(itemElement);
        });
        
        totalElement.textContent = `مجموع: ${this.total} تومان`;
    }
}

// تعریف کلاس مدیریت محصولات
class ProductManager {
    constructor() {
        this.products = [];
    }

    // افزودن محصول جدید
    addProduct(product) {
        this.products.push(product);
    }

    // نمایش محصولات در صفحه
    displayProducts() {
        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = '';

        this.products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-card';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p class="price">${product.price} تومان</p>
                <button onclick="cart.addItem(productManager.products.find(p => p.id === ${product.id}))">
                    افزودن به سبد خرید
                </button>
            `;
            productsContainer.appendChild(productElement);
        });
    }
}

// ایجاد نمونه‌های کلاس‌ها
const cart = new ShoppingCart();
const productManager = new ProductManager();

// اضافه کردن چند محصول نمونه
productManager.addProduct(new Product(
    1,
    "لپ تاپ ایسوس",
    25000000,
    "laptop.jpg",
    "لپ تاپ گیمینگ ایسوس با پردازنده قدرتمند"
));

productManager.addProduct(new Product(
    2,
    "گوشی سامسونگ",
    12000000,
    "phone.jpg",
    "گوشی هوشمند سامسونگ با دوربین حرفه‌ای"
));

// نمایش محصولات در صفحه
productManager.displayProducts();

// جستجوی محصولات
function searchProducts(query) {
    const filteredProducts = productManager.products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    
    filteredProducts.forEach(product => {
        // نمایش محصولات فیلتر شده
        const productElement = document.createElement('div');
        // ... (مشابه کد نمایش محصولات)
    });
}

// مدیریت فرم پرداخت
function handleCheckout(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const orderData = {
        customerName: formData.get('name'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        items: cart.items,
        total: cart.total
    };

    // ارسال اطلاعات سفارش به سرور
    submitOrder(orderData);
}

// ارسال سفارش به سرور
async function submitOrder(orderData) {
    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            alert('سفارش شما با موفقیت ثبت شد');
            cart.items = [];
            cart.updateCartUI();
        } else {
            throw new Error('خطا در ثبت سفارش');
        }
    } catch (error) {
        alert('خطا در ثبت سفارش: ' + error.message);
    }
}

// مدیریت لایک و نظرات
class ProductInteraction {
    static async likeProduct(productId) {
        try {
            const response = await fetch(`/api/products/${productId}/like`, {
                method: 'POST'
            });
            if (response.ok) {
                // بروزرسانی UI
            }
        } catch (error) {
            console.error('خطا در ثبت لایک:', error);
        }
    }

    static async addComment(productId, comment) {
        try {
            const response = await fetch(`/api/products/${productId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment })
            });
            if (response.ok) {
                // بروزرسانی UI
            }
        } catch (error) {
            console.error('خطا در ثبت نظر:', error);
        }
    }
}
// تعریف کلاس محصول
class Product {
    constructor(id, name, price, image, description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
    }
}

// تعریف کلاس سبد خرید
class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
    }

    // افزودن محصول به سبد خرید
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ product, quantity });
        }
        
        this.calculateTotal();
        this.updateCartUI();
    }

    // حذف محصول از سبد خرید
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.calculateTotal();
        this.updateCartUI();
    }

    // محاسبه مجموع قیمت
    calculateTotal() {
        this.total = this.items.reduce((sum, item) => {
            return sum + (item.product.price * item.quantity);
        }, 0);
    }

    // بروزرسانی نمایش سبد خرید
    updateCartUI() {
        const cartElement = document.getElementById('shopping-cart');
        const totalElement = document.getElementById('cart-total');
        
        cartElement.innerHTML = '';
        
        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.product.image}" alt="${item.product.name}">
                <div class="item-details">
                    <h3>${item.product.name}</h3>
                    <p>قیمت: ${item.product.price} تومان</p>
                    <p>تعداد: ${item.quantity}</p>
                </div>
                <button onclick="cart.removeItem(${item.product.id})">حذف</button>
            `;
            cartElement.appendChild(itemElement);
        });
        
        totalElement.textContent = `مجموع: ${this.total} تومان`;
    }
}

// تعریف کلاس مدیریت محصولات
class ProductManager {
    constructor() {
        this.products = [];
    }

    // افزودن محصول جدید
    addProduct(product) {
        this.products.push(product);
    }

    // نمایش محصولات در صفحه
    displayProducts() {
        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = '';

        this.products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-card';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p class="price">${product.price} تومان</p>
                <button onclick="cart.addItem(productManager.products.find(p => p.id === ${product.id}))">
                    افزودن به سبد خرید
                </button>
            `;
            productsContainer.appendChild(productElement);
        });
    }
}

// ایجاد نمونه‌های کلاس‌ها
const cart = new ShoppingCart();
const productManager = new ProductManager();

// اضافه کردن چند محصول نمونه
productManager.addProduct(new Product(
    1,
    "لپ تاپ ایسوس",
    25000000,
    "laptop.jpg",
    "لپ تاپ گیمینگ ایسوس با پردازنده قدرتمند"
));

productManager.addProduct(new Product(
    2,
    "گوشی سامسونگ",
    12000000,
    "phone.jpg",
    "گوشی هوشمند سامسونگ با دوربین حرفه‌ای"
));

// نمایش محصولات در صفحه
productManager.displayProducts();

// جستجوی محصولات
function searchProducts(query) {
    const filteredProducts = productManager.products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    
    filteredProducts.forEach(product => {
        // نمایش محصولات فیلتر شده
        const productElement = document.createElement('div');
        // ... (مشابه کد نمایش محصولات)
    });
}

// مدیریت فرم پرداخت
function handleCheckout(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const orderData = {
        customerName: formData.get('name'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        items: cart.items,
        total: cart.total
    };

    // ارسال اطلاعات سفارش به سرور
    submitOrder(orderData);
}

// ارسال سفارش به سرور
async function submitOrder(orderData) {
    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            alert('سفارش شما با موفقیت ثبت شد');
            cart.items = [];
            cart.updateCartUI();
        } else {
            throw new Error('خطا در ثبت سفارش');
        }
    } catch (error) {
        alert('خطا در ثبت سفارش: ' + error.message);
    }
}

// مدیریت لایک و نظرات
class ProductInteraction {
    static async likeProduct(productId) {
        try {
            const response = await fetch(`/api/products/${productId}/like`, {
                method: 'POST'
            });
            if (response.ok) {
                // بروزرسانی UI
            }
        } catch (error) {
            console.error('خطا در ثبت لایک:', error);
        }
    }

    static async addComment(productId, comment) {
        try {
            const response = await fetch(`/api/products/${productId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment })
            });
            if (response.ok) {
                // بروزرسانی UI
            }
        } catch (error) {
            console.error('خطا در ثبت نظر:', error);
        }
    }
}
