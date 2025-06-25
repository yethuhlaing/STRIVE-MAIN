/*-------------------------------------------------*/
/* ANIMATE ANIMATION SET-UP */
/*-------------------------------------------------*/
const pictures = document.querySelectorAll(".animate");

observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.boundingClientRect.top > 0) {
            // Apply the animation when scrolling down into the element
            entry.target.style.animation = `${entry.target.dataset.type || "fade-up"} ${entry.target.dataset.duration || "1s"} ${entry.target.dataset.delay || "0.5s"} forwards ${entry.target.dataset.curve || "ease-out"}`;
        } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
            // Reset the animation when scrolling up past the element (i.e., when it exits from the top)
            entry.target.style.animation = 'none';
            // Trigger reflow to restart the animation when it comes back into view
            entry.target.offsetHeight; // This forces a reflow, allowing the animation to restart
        }
    });
});

pictures.forEach(picture => {
    observer.observe(picture);
});



/*-------------------------------------------------*/
/* LOAD IN ANIMATION */
/*-------------------------------------------------*/
window.addEventListener("load", function() {
    const loader1 = document.querySelector(".loading");
    loader1.className += " hidden"; //class "loader hidden"
  });



/*-------------------------------------------------*/
/* Navigation Open Animation */
/*-------------------------------------------------*/
function openNav() {
    document.getElementById("mySidenav").style.opacity = "1";
    document.getElementById("mySidenav").style.visibility = "visible";
    document.getElementById("opener").style.display = "none";
}
  
function closeNav() {
    document.getElementById("mySidenav").style.opacity = "0";
    document.getElementById("mySidenav").style.visibility = "hidden";
    document.getElementById("opener").style.display = "block";
}



/*-------------------------------------------------*/
/* COOKIES FUNCTION */
/*-------------------------------------------------*/
// Function to load analytics scripts
function loadAnalytics() {
    // Load Google Analytics
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-LTXX93KCXS';
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-LTXX93KCXS');

    // Load Hotjar
    (function(c, s, q, u, a, r, e) {
        c.hj = c.hj || function() {
            (c.hj.q = c.hj.q || []).push(arguments);
        };
        c._hjSettings = { hjid: 5293260 };
        r = s.getElementsByTagName('head')[0];
        e = s.createElement('script');
        e.async = true;
        e.src = q + c._hjSettings.hjid + u;
        r.appendChild(e);
    })(window, document, 'https://static.hj.contentsquare.net/c/csq-', '.js');
}

// Function to check cookie consent status
function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    console.log('Current cookie consent status:', consent); // Debug line
    
    if (!consent) {
        const popup = document.getElementById('cookieConsent');
        console.log('Popup element:', popup); // Debug line
        if (popup) {
            popup.style.display = 'block';
        } else {
            console.log('Cookie consent popup element not found!'); // Debug line
        }
    } else if (consent === 'accepted') {
        loadAnalytics();
    }
}

// Function to handle accepting cookies
function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookieConsent').style.display = 'none';
    loadAnalytics();
}

// Function to handle denying cookies
function denyCookies() {
    localStorage.setItem('cookieConsent', 'denied');
    document.getElementById('cookieConsent').style.display = 'none';
}

// Check cookie consent when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, checking cookie consent...'); // Debug line
    checkCookieConsent();
});