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