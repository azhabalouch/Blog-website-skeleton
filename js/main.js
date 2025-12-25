// =============================================
// AI Global - Main JavaScript
// =============================================

// Cookie Consent Management
class CookieConsent {
    constructor() {
        this.consentKey = 'cookie_consent';
        this.banner = document.getElementById('cookieConsent');
        this.acceptBtn = document.getElementById('acceptCookies');
        this.rejectBtn = document.getElementById('rejectCookies');
        this.manageBtn = document.getElementById('manageCookies');
        this.cookieSettings = document.getElementById('cookieSettings');
        
        this.init();
    }
    
    init() {
        // Check if consent was already given
        const consent = this.getConsent();
        
        if (!consent) {
            this.showBanner();
        } else {
            this.loadScripts(consent);
        }
        
        // Event listeners
        if (this.acceptBtn) {
            this.acceptBtn.addEventListener('click', () => this.acceptAll());
        }
        
        if (this.rejectBtn) {
            this.rejectBtn.addEventListener('click', () => this.rejectNonEssential());
        }
        
        if (this.manageBtn) {
            this.manageBtn.addEventListener('click', () => this.showPreferences());
        }
        
        if (this.cookieSettings) {
            this.cookieSettings.addEventListener('click', (e) => {
                e.preventDefault();
                this.showBanner();
            });
        }
    }
    
    showBanner() {
        if (this.banner) {
            this.banner.classList.remove('hidden');
        }
    }
    
    hideBanner() {
        if (this.banner) {
            this.banner.classList.add('hidden');
        }
    }
    
    acceptAll() {
        const consent = {
            essential: true,
            analytics: true,
            advertising: true,
            timestamp: new Date().toISOString()
        };
        
        this.saveConsent(consent);
        this.loadScripts(consent);
        this.hideBanner();
    }
    
    rejectNonEssential() {
        const consent = {
            essential: true,
            analytics: false,
            advertising: false,
            timestamp: new Date().toISOString()
        };
        
        this.saveConsent(consent);
        this.loadScripts(consent);
        this.hideBanner();
    }
    
    showPreferences() {
        // This would open a modal with detailed preferences
        // For now, we'll just accept all
        alert('Cookie preferences panel would open here. For now, accepting all cookies.');
        this.acceptAll();
    }
    
    saveConsent(consent) {
        localStorage.setItem(this.consentKey, JSON.stringify(consent));
    }
    
    getConsent() {
        const consent = localStorage.getItem(this.consentKey);
        return consent ? JSON.parse(consent) : null;
    }
    
    loadScripts(consent) {
        // Load Google Analytics if analytics consent given
        if (consent.analytics) {
            this.loadGoogleAnalytics();
        }
        
        // Load Google AdSense if advertising consent given
        if (consent.advertising) {
            this.loadGoogleAdSense();
        }
    }
    
    loadGoogleAnalytics() {
        // Placeholder for Google Analytics
        // Replace 'GA_MEASUREMENT_ID' with your actual GA4 Measurement ID
        /*
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
        */
        console.log('Google Analytics would load here');
    }
    
    loadGoogleAdSense() {
        // Placeholder for Google AdSense
        // Replace 'ca-pub-XXXXXXXXXXXXXXXX' with your actual AdSense publisher ID
        /*
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
        */
        console.log('Google AdSense would load here');
    }
}

// Mobile Navigation Toggle
class MobileNav {
    constructor() {
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        
        this.init();
    }
    
    init() {
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                    this.navMenu.classList.remove('active');
                }
            });
        }
    }
}

// Newsletter Form Handler
class NewsletterForm {
    constructor() {
        this.form = document.getElementById('newsletterForm');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }
    
    handleSubmit() {
        const email = this.form.querySelector('input[type="email"]').value;
        
        // Simulate API call
        console.log('Newsletter subscription for:', email);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter! Please check your email to confirm your subscription.');
        
        // Reset form
        this.form.reset();
    }
}

// Smooth Scroll for Anchor Links
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                if (href !== '#' && href !== '') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
}

// Lazy Loading Images
class LazyLoad {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        // Image will load automatically due to loading="lazy" attribute
                        observer.unobserve(img);
                    }
                });
            });
            
            this.images.forEach(img => imageObserver.observe(img));
        }
    }
}

// Blog Data Fetcher (for dynamic content from API)
class BlogDataFetcher {
    constructor() {
        this.apiUrl = 'https://azhabalouch.github.io/blog-global-data/blogs_data.json';
    }
    
    async fetchBlogData() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch blog data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching blog data:', error);
            return null;
        }
    }
    
    async loadFeaturedPosts() {
        const data = await this.fetchBlogData();
        if (data && data.blogs) {
            // Use the first 3 posts as featured
            const featured = data.blogs.slice(0, 3);
            this.renderFeaturedPosts(featured);
        }
    }
    
    renderFeaturedPosts(posts) {
        const container = document.getElementById('featuredPosts');
        if (!container) return;
        
        // This would dynamically render posts from the API
        // For now, we're using static HTML
        console.log('Would render posts:', posts);
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Cookie Consent
    new CookieConsent();
    
    // Initialize Mobile Navigation
    new MobileNav();
    
    // Initialize Newsletter Form
    new NewsletterForm();
    
    // Initialize Smooth Scroll
    new SmoothScroll();
    
    // Initialize Lazy Loading
    new LazyLoad();
    
    // Initialize Blog Data Fetcher (optional - for dynamic content)
    // const blogFetcher = new BlogDataFetcher();
    // blogFetcher.loadFeaturedPosts();
});

// Utility Functions
const utils = {
    // Format date
    formatDate: (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    },
    
    // Calculate reading time
    calculateReadingTime: (text) => {
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    },
    
    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Export utilities for use in other scripts
window.aiGlobalUtils = utils;
