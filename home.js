document.addEventListener('DOMContentLoaded', function() {
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
});
