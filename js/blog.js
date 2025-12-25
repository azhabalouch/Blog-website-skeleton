// =============================================
// Blog Page JavaScript
// =============================================

class BlogPage {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.categorySelect = document.getElementById('categorySelect');
        this.postsList = document.getElementById('postsList');
        
        this.posts = this.getInitialPosts();
        this.filteredPosts = [...this.posts];
        
        this.init();
    }
    
    init() {
        // Search functionality
        if (this.searchBtn) {
            this.searchBtn.addEventListener('click', () => this.handleSearch());
        }
        
        if (this.searchInput) {
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch();
                }
            });
        }
        
        // Category filter
        if (this.categorySelect) {
            this.categorySelect.addEventListener('change', () => this.handleCategoryFilter());
        }
        
        // Check URL parameters for filters
        this.checkUrlParameters();
    }
    
    getInitialPosts() {
        // Extract posts from DOM
        const postElements = document.querySelectorAll('.post-card-horizontal');
        const posts = [];
        
        postElements.forEach((element, index) => {
            const categoryElement = element.querySelector('.post-category');
            const titleElement = element.querySelector('h2 a');
            const excerptElement = element.querySelector('p');
            
            posts.push({
                id: index + 1,
                category: categoryElement ? categoryElement.textContent.trim() : '',
                title: titleElement ? titleElement.textContent.trim() : '',
                excerpt: excerptElement ? excerptElement.textContent.trim() : '',
                element: element
            });
        });
        
        return posts;
    }
    
    handleSearch() {
        const query = this.searchInput.value.toLowerCase().trim();
        
        if (query === '') {
            this.filteredPosts = [...this.posts];
        } else {
            this.filteredPosts = this.posts.filter(post => {
                return post.title.toLowerCase().includes(query) ||
                       post.excerpt.toLowerCase().includes(query) ||
                       post.category.toLowerCase().includes(query);
            });
        }
        
        this.renderPosts();
    }
    
    handleCategoryFilter() {
        const selectedCategory = this.categorySelect.value;
        
        if (selectedCategory === 'all') {
            this.filteredPosts = [...this.posts];
        } else {
            this.filteredPosts = this.posts.filter(post => {
                return post.category.toLowerCase() === selectedCategory.toLowerCase();
            });
        }
        
        this.renderPosts();
    }
    
    renderPosts() {
        if (!this.postsList) return;
        
        // Hide all posts first
        this.posts.forEach(post => {
            post.element.style.display = 'none';
        });
        
        // Show filtered posts
        if (this.filteredPosts.length === 0) {
            this.postsList.innerHTML = '<p class="no-results">No articles found matching your criteria. Try a different search term or category.</p>';
        } else {
            // Remove no results message if exists
            const noResults = this.postsList.querySelector('.no-results');
            if (noResults) {
                noResults.remove();
            }
            
            this.filteredPosts.forEach(post => {
                post.element.style.display = 'grid';
            });
        }
    }
    
    checkUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        const tag = urlParams.get('tag');
        const search = urlParams.get('search');
        
        if (category && this.categorySelect) {
            this.categorySelect.value = category;
            this.handleCategoryFilter();
        }
        
        if (search && this.searchInput) {
            this.searchInput.value = search;
            this.handleSearch();
        }
        
        if (tag) {
            // Handle tag filtering (similar to search)
            if (this.searchInput) {
                this.searchInput.value = tag;
                this.handleSearch();
            }
        }
    }
}

// Pagination Handler
class Pagination {
    constructor() {
        this.prevBtn = document.querySelector('.pagination-btn:first-child');
        this.nextBtn = document.querySelector('.pagination-btn:last-child');
        this.pageInfo = document.querySelector('.pagination-info');
        
        this.currentPage = 1;
        this.totalPages = 5; // This would come from the API in a real scenario
        
        this.init();
    }
    
    init() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.goToPreviousPage());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.goToNextPage());
        }
        
        this.updateButtons();
    }
    
    goToPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadPage(this.currentPage);
            this.updateButtons();
        }
    }
    
    goToNextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.loadPage(this.currentPage);
            this.updateButtons();
        }
    }
    
    loadPage(pageNumber) {
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // In a real application, this would fetch new posts from the API
        console.log('Loading page:', pageNumber);
        
        // Update page info
        if (this.pageInfo) {
            this.pageInfo.textContent = `Page ${pageNumber} of ${this.totalPages}`;
        }
    }
    
    updateButtons() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentPage === 1;
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentPage === this.totalPages;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogPage();
    new Pagination();
});
