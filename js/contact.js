// =============================================
// Contact Form JavaScript
// =============================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.formMessage = document.getElementById('formMessage');
        this.captchaInput = document.getElementById('captcha');
        this.captchaQuestion = document.getElementById('captchaQuestion');
        
        this.captchaAnswer = 0;
        
        this.init();
    }
    
    init() {
        // Generate captcha
        this.generateCaptcha();
        
        // Form submission
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }
    
    generateCaptcha() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        
        this.captchaAnswer = num1 + num2;
        
        if (this.captchaQuestion) {
            this.captchaQuestion.textContent = `${num1} + ${num2}`;
        }
    }
    
    validateForm() {
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        const captcha = this.captchaInput.value.trim();
        const privacy = document.getElementById('privacy').checked;
        
        // Validate required fields
        if (!name) {
            this.showMessage('Please enter your name.', 'error');
            return false;
        }
        
        if (!email || !this.isValidEmail(email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return false;
        }
        
        if (!subject) {
            this.showMessage('Please select a subject.', 'error');
            return false;
        }
        
        if (!message || message.length < 10) {
            this.showMessage('Please enter a message (at least 10 characters).', 'error');
            return false;
        }
        
        if (!captcha || parseInt(captcha) !== this.captchaAnswer) {
            this.showMessage('Incorrect answer to security question. Please try again.', 'error');
            this.generateCaptcha();
            this.captchaInput.value = '';
            return false;
        }
        
        if (!privacy) {
            this.showMessage('Please agree to the Privacy Policy.', 'error');
            return false;
        }
        
        return true;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    handleSubmit() {
        // Validate form
        if (!this.validateForm()) {
            return;
        }
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toISOString()
        };
        
        // Simulate API call
        this.submitForm(formData);
    }
    
    async submitForm(formData) {
        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API delay
        setTimeout(() => {
            // In a real application, you would send the data to your server
            console.log('Form data submitted:', formData);
            
            // Show success message
            this.showMessage('Thank you for your message! We will get back to you within 48 hours.', 'success');
            
            // Reset form
            this.form.reset();
            this.generateCaptcha();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Scroll to message
            this.formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 1500);
    }
    
    showMessage(message, type) {
        if (!this.formMessage) return;
        
        this.formMessage.textContent = message;
        this.formMessage.className = `form-message ${type}`;
        this.formMessage.style.display = 'block';
        
        // Auto-hide after 5 seconds for error messages
        if (type === 'error') {
            setTimeout(() => {
                this.formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});
