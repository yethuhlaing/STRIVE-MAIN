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
    /* Header Img */
    locoScroll.on('scroll', ({ scroll }) => {
        const scrollObject = document.querySelector('.header-content-bg');
        if (!scrollObject) return;
        const scrollPos = scroll.y;
        const moveAmount = scrollPos * 0.2;
        scrollObject.style.transform = `translate3d(0, ${moveAmount}px, 0)`;
    });


    /* Header Text */
    locoScroll.on('scroll', ({ scroll }) => {
        const scrollObject = document.querySelector('.header-content-text');
        if (!scrollObject) return;
        const scrollPos = scroll.y;
        const moveAmount = scrollPos * 0.15;
        scrollObject.style.transform = `translate3d(0, ${moveAmount}px, 0)`;
    });


    /* Intro */
    locoScroll.on('scroll', ({ scroll }) => {
        const scrollObject = document.querySelector('.intro');
        if (!scrollObject) return;
        const scrollPos = scroll.y;
        const moveAmount = scrollPos * 0.1;
        scrollObject.style.transform = `translate3d(0, ${moveAmount}px, 0)`;
    });

    /* Companies */
    locoScroll.on('scroll', ({ scroll }) => {
        const scrollObject = document.querySelector('.companies');
        if (!scrollObject) return;
        const scrollPos = scroll.y;
        const moveAmount = scrollPos * 0.1;
        scrollObject.style.transform = `translate3d(0, ${moveAmount}px, 0)`;
    });


    /* Functions */
    locoScroll.on('scroll', ({ scroll }) => {
        const scrollObject = document.querySelector('.functions');
        if (!scrollObject) return;
        const scrollPos = scroll.y;
        const moveAmount = scrollPos * -0.2;
        scrollObject.style.transform = `translate3d(0, ${moveAmount}px, 0)`;
    });


    /* Functions */
    locoScroll.on('scroll', ({ scroll }) => {
        const scrollObjects = document.querySelectorAll('.functions-box-img-pic');
        if (!scrollObjects.length) return;  // Check if any elements exist
        
        const scrollPos = scroll.y;
        const moveAmount = scrollPos * 0.24;  // Fixed typo in scrollPos
    
        // Apply transform to each element
        scrollObjects.forEach(obj => {
            obj.style.transform = `translate3d(0, ${moveAmount}px, 0)`;
        });
    });


    /* ------------------------------------- */
    /* SCROLL UPDATES */
    /* ------------------------------------- */
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();
});