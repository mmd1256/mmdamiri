document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const fullname = document.getElementById('fullname').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!fullname || !phone || !email || !message) {
        alert('لطفا تمام فیلدها را پر کنید');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('لطفا یک ایمیل معتبر وارد کنید');
        return;
    }
    
    // Phone validation (Iranian phone number format)
    const phoneRegex = /^(\+98|0)?9\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert('لطفا یک شماره موبایل معتبر وارد کنید');
        return;
    }
    
    // If validation passes, you can send the data to your server here
    console.log('Form data:', {
        fullname,
        phone,
        email,
        message
    });
    
    // Clear form
    this.reset();
    alert('پیام شما با موفقیت ارسال شد');
});
