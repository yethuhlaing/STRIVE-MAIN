document.addEventListener("DOMContentLoaded", function () {
    // Check for mobile device FIRST
    if (window.innerWidth <= 768) {
        return;
    }

    /* ------------------------------------- */
    /* LOCOMOTIVE SCROLL SETUP */
    /* ------------------------------------- */
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#smooth-wrapper"),
        smooth: true,
        multiplier: 0.86, // Multiplier for scroll speed
    });

    ScrollTrigger.scrollerProxy("#smooth-wrapper", {
        scrollTop(value) {
            return arguments.length 
                ? locoScroll.scrollTo(value, 0, 0) 
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: document.querySelector("#smooth-wrapper").style.transform ? "transform" : "fixed"
    });


    /* ------------------------------------- */
    /* NAVIGATION ELEMENTS */
    /* ------------------------------------- */
    const elements = {
        'desktop_nav': { threshold: 50 }
    };

    locoScroll.on('scroll', ({ scroll }) => {
        const scrollPosition = scroll.y;
        Object.entries(elements).forEach(([id, config]) => {
            const element = document.getElementById(id);
            if (element) {
                if (scrollPosition > config.threshold) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            }
        });
    });


    /* ------------------------------------- */
    /* GSAP PARALLAX EFFECTS */
    /* ------------------------------------- */
    /* Header Img Container */
    locoScroll.on('scroll', ({ scroll }) => {
        const scrollObject = document.querySelector('.header-content-text');
        if (!scrollObject) return;
        
        const scrollPos = scroll.y;
        const moveAmount = scrollPos * 0.4;
        
        const rect = scrollObject.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Fade offset
        const startOffset = viewportHeight * 0.1; // Fade start % from top
        
        let opacity = 1;
        if (rect.top < startOffset) {
            opacity = 1 - (Math.abs(rect.top - startOffset) / (viewportHeight * 0.16));
            opacity = Math.max(0, Math.min(1, opacity));
        }
    
        scrollObject.style.transform = `translate3d(0, ${moveAmount}px, 0)`;
        scrollObject.style.opacity = opacity;
    });


    /* Header Img Pic */
    locoScroll.on('scroll', ({ scroll }) => {
        const scrollObject = document.querySelector('.header-img-pic');
        const triggerElement = document.querySelector('.services'); // Section where fade should start
        if (!scrollObject || !triggerElement) return;
        
        const scrollPos = scroll.y;
        const moveAmount = scrollPos * 0.19;
        
        // Get the trigger element's position
        const triggerPosition = triggerElement.getBoundingClientRect().top + 300;
        
        let opacity = 1;
        // Start fading when trigger element comes into view
        if (triggerPosition <= window.innerHeight) {
            opacity = 1 - (Math.abs(window.innerHeight - triggerPosition) / (window.innerHeight * 0.4));
            opacity = Math.max(0, Math.min(1, opacity));
        }
     
        scrollObject.style.transform = `translate3d(0, ${moveAmount}px, 0)`;
        scrollObject.style.opacity = opacity;
     });

     /* Header Img Container */
    locoScroll.on('scroll', ({ scroll }) => {
        const scrollObject = document.querySelector('.intro-content');
        if (!scrollObject) return;
        
        const scrollPos = scroll.y;
        const moveAmount = scrollPos * -0.01;
        
        const rect = scrollObject.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Fade offset
        const startOffset = viewportHeight * 0.3; // Fade start % from top
        
        let opacity = 1;
        if (rect.top < startOffset) {
            opacity = 1 - (Math.abs(rect.top - startOffset) / (viewportHeight * 0.4));
            opacity = Math.max(0, Math.min(1, opacity));
        }
    
        scrollObject.style.transform = `translate3d(0, ${moveAmount}px, 0)`;
        scrollObject.style.opacity = opacity;
    });


    /* Services Section */
    locoScroll.on('scroll', ({ scroll }) => {
        const scrollObject = document.querySelector('.services');
        if (!scrollObject) return;
        const scrollPos = scroll.y;
        const moveAmount = scrollPos * -0.2;
        scrollObject.style.transform = `translate3d(0, ${moveAmount}px, 0)`;
    });
    

    /* Services Section Pic */
    locoScroll.on('scroll', ({ scroll }) => {
        const scrollObjects = document.querySelectorAll('.services-container-box-bg-pic');
        if (!scrollObjects.length) return;
        
        const scrollPos = scroll.y;
        
        scrollObjects.forEach(scrollObject => {
            const moveAmount = scrollPos * 0.1;
            const scaleAmount = 1 + (scrollPos * 0.0002);
            scrollObject.style.transform = `translate3d(0, ${moveAmount}px, 0) scale(${scaleAmount})`;
        });
    });


    /* ------------------------------------- */
    /* SCROLL UPDATES */
    /* ------------------------------------- */
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();
});