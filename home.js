document.addEventListener('DOMContentLoaded', function() {
    // Grid About Us fade-in animation
    const gridAboutUs = document.querySelector('.grid-about-us');
    
    if (gridAboutUs) {
        const children = Array.from(gridAboutUs.children);
        
        children.forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            child.style.transitionDelay = `${index * 0.1}s`;
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const children = Array.from(target.children);
                    
                    children.forEach(child => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    });
                    
                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        observer.observe(gridAboutUs);
    } else {
        console.log('Element .grid-about-us not found on page');
    }

    // Red spinning star on scroll
    let starOverlay = null;
    let isStarVisible = false;

    function createStarOverlay() {
        if (starOverlay) return;

        starOverlay = document.createElement('div');
        starOverlay.id = 'red-spinning-star';
        starOverlay.innerHTML = `
            <div class="star-container">
                <svg class="spinning-star" viewBox="0 0 24 24" fill="red">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            </div>
        `;
        
        const styles = document.createElement('style');
        styles.textContent = `
            #red-spinning-star {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
            }
            
            #red-spinning-star.visible {
                opacity: 1;
                visibility: visible;
            }
            
            .star-container {
                width: 200px;
                height: 200px;
            }
            
            .spinning-star {
                width: 100%;
                height: 100%;
                animation: spin 2s linear infinite;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        
        document.head.appendChild(styles);
        document.body.appendChild(starOverlay);
    }

    function showStar() {
        if (!isStarVisible) {
            createStarOverlay();
            setTimeout(() => {
                starOverlay.classList.add('visible');
            }, 100);
            isStarVisible = true;
        }
    }

    function hideStar() {
        if (isStarVisible && starOverlay) {
            starOverlay.classList.remove('visible');
            isStarVisible = false;
        }
    }

    // Scroll detection
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        
        if (scrollTop > lastScrollTop && scrollPercentage > 80) {
            showStar();
        } else if (scrollTop < lastScrollTop || scrollPercentage < 70) {
            hideStar();
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});
