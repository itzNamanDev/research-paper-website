document.addEventListener('DOMContentLoaded', function() {
    // Animate stats numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window && statNumbers.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(entry.target);
                    // Unobserve after animation starts
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        statNumbers.forEach(stat => {
            animateValue(stat);
        });
    }
    
    function animateValue(element) {
        const finalValue = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        function updateValue(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function for smoother animation
            const easedProgress = easeOutQuad(progress);
            
            const currentValue = Math.floor(easedProgress * finalValue);
            element.textContent = formatNumber(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(updateValue);
            } else {
                element.textContent = formatNumber(finalValue);
            }
        }
        
        requestAnimationFrame(updateValue);
    }
    
    // Easing function for smoother animation
    function easeOutQuad(t) {
        return t * (2 - t);
    }
    
    // Format number with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
});

