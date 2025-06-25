

document.addEventListener("DOMContentLoaded", function () {
    // Check for mobile device FIRST
    if (window.innerWidth <= 768) {
        return;
    }

    /* ------------------------------------- */
    /* IMAGE MOVEMENT SETUP */
    /* ------------------------------------- */
    const topImg = document.getElementById('bg_dyno_container_top_img');
    const botImg = document.getElementById('bg_dyno_container_bot_img');
    
    const config = {
        top: {
            speed: 40,
            delay: 0.1,
            currentX: 0,
            currentY: 0,
            mouseX: 0,
            mouseY: 0
        },
        bot: {
            speed: 30,
            delay: 0.03,
            currentX: 0,
            currentY: 0,
            mouseX: 0,
            mouseY: 0
        }
    };

    document.addEventListener('mousemove', (e) => {
        config.top.mouseX = (e.clientX / window.innerWidth - 0.5) * config.top.speed;
        config.top.mouseY = (e.clientY / window.innerHeight - 0.5) * config.top.speed;
        
        config.bot.mouseX = (e.clientX / window.innerWidth - 0.5) * config.bot.speed;
        config.bot.mouseY = (e.clientY / window.innerHeight - 0.5) * config.bot.speed;
    });

    function animate() {
        config.top.currentX += (config.top.mouseX - config.top.currentX) * config.top.delay;
        config.top.currentY += (config.top.mouseY - config.top.currentY) * config.top.delay;
        topImg.style.transform = `translate(${config.top.currentX}px, ${config.top.currentY}px)`;

        config.bot.currentX += (config.bot.mouseX - config.bot.currentX) * config.bot.delay;
        config.bot.currentY += (config.bot.mouseY - config.bot.currentY) * config.bot.delay;
        botImg.style.transform = `translate(${config.bot.currentX}px, ${config.bot.currentY}px)`;

        requestAnimationFrame(animate);
    }

    animate();


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
    /* TEXT REVEAL ANIMATION */
    /* ------------------------------------- */
    /*const masterTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".header",
            scroller: "#smooth-wrapper",
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true
        }
    });


    gsap.set('.scroll-reveal .line', {
        backgroundSize: '0% 100%'
    });

    // Create the timeline but don't link it to scroll
    const textRevealTl = gsap.timeline({ paused: true });
    textRevealTl.to('.scroll-reveal .line', {
        backgroundSize: '100% 100%',
        stagger: 10,
        ease: "none",
        duration: 20
    });

    // Use Locomotive's scroll callback to control the animation
    locoScroll.on('scroll', (args) => {
        // Get the element
        const revealElement = document.querySelector('.scroll-reveal');
        if (!revealElement) return;

        // Get element's position data
        const rect = revealElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate progress (0 to 1) based on element position
        const progress = (0.7 - (rect.bottom / (windowHeight + rect.height))) * 2.5;
        
        // Ensure progress stays within bounds and handle initial state
        if (rect.top > windowHeight) {
            textRevealTl.progress(0);
        } else if (progress >= 0 && progress <= 1) {
            textRevealTl.progress(progress);
        }

        // Force exact 0 progress when element is below viewport
        if (rect.top > windowHeight || progress <= 0) {
            textRevealTl.progress(0);
            gsap.set('.scroll-reveal .line', { backgroundSize: '0% 100%' });
        } else if (progress <= 1) {
            textRevealTl.progress(clampedProgress);
        }
    });*/


    /* ------------------------------------- */
    /* GSAP PARALLAX EFFECTS */
    /* ------------------------------------- */
    /* Header */
    locoScroll.on('scroll', ({ scroll }) => {
        const headerBg = document.querySelector('.header-bg-dyno');
        if (!headerBg) return;
        const scrollPos = scroll.y;
        const moveAmount = scrollPos * 0.3;
        headerBg.style.transform = `translate3d(0, ${moveAmount}px, 0)`;
    });


    /* Intro Text */
    locoScroll.on('scroll', ({ scroll }) => {
        const scrollReveal = document.querySelector('.scroll-reveal');
        if (!scrollReveal) return;
        
        const scrollPos = scroll.y;
        const moveAmount = scrollPos * 0.4;
        
        const rect = scrollReveal.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Fade offset
        const startOffset = viewportHeight * 0.3; // Fade start % from top
        
        let opacity = 1;
        if (rect.top < startOffset) {
            opacity = 1 - (Math.abs(rect.top - startOffset) / (viewportHeight * 0.4));
            opacity = Math.max(0, Math.min(1, opacity));
        }
    
        scrollReveal.style.transform = `translate3d(0, ${moveAmount}px, 0)`;
        scrollReveal.style.opacity = opacity;
    });


    /* Leap Text */
    locoScroll.on('scroll', ({ scroll }) => {
        const leapContainer = document.querySelector('.leap-container');
        if (!leapContainer) return;
        const scrollPos = scroll.y;
        const moveAmount = scrollPos * 0.2;
        leapContainer.style.transform = `translate3d(0, ${moveAmount}px, 0)`;
    });


    /* Leap IMG */
    locoScroll.on('scroll', ({ scroll }) => {
        const leapImage = document.querySelector('.leap-image');
        if (!leapImage) return;
        const scrollPos = scroll.y;
        const moveAmount = scrollPos * 0.1;
        leapImage.style.transform = `translate3d(0, ${moveAmount}px, 0)`;
    });


    /* Companies section */
    locoScroll.on('scroll', ({ scroll }) => {
        const companyLogos = document.querySelector('.companies');
        if (!companyLogos) return;
        const scrollPos = scroll.y;
        const moveAmount = scrollPos * 0.1;
        companyLogos.style.transform = `translate3d(0, ${moveAmount}px, 0)`;
    });


    /* Startups section */
    locoScroll.on('scroll', ({ scroll }) => {
        const forStartups1 = document.querySelector('.for-startups');
        if (!forStartups1) return;
        const scrollPos = scroll.y;
        const moveAmount = scrollPos * 0.25;
        forStartups1.style.transform = `translate3d(0, ${moveAmount}px, 0)`;
    });

    
    /* Startups section 2 */
    locoScroll.on('scroll', ({ scroll }) => {
        const forStartups2 = document.querySelector('.startups-content-text');
        if (!forStartups2) return;
        const scrollPos = scroll.y;
        const moveAmount = scrollPos * -0.05;
        forStartups2.style.transform = `translate3d(0, ${moveAmount}px, 0)`;
    });


    /* Startups section 2 */
    locoScroll.on('scroll', ({ scroll }) => {
        const forStartups2 = document.querySelector('.crawl-content-img-pic');
        if (!forStartups2) return;
        const scrollPos = scroll.y;
        const moveAmount = scrollPos * 0.1;
        forStartups2.style.transform = `translate3d(0, ${moveAmount}px, 0)`;
    });


    /* ------------------------------------- */
    /* SCROLL UPDATES */
    /* ------------------------------------- */
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();
});


/* ------------------------------------- */
/* COUNTDOWN TIMER */
/* ------------------------------------- */
// Set your event date and time here
// Format: 'YYYY-MM-DD HH:MM:SS'
const eventDate = new Date('2025-09-18 00:00:00').getTime();

// Update the display with the event date
const eventDateElement = document.getElementById('eventDate');
eventDateElement.textContent = new Date(eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        // Event has passed
        document.getElementById('countdown').style.display = 'none';
        document.getElementById('expiredMessage').style.display = 'block';
        return;
    }

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the display
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Update countdown immediately and then every second
updateCountdown();
setInterval(updateCountdown, 1000);