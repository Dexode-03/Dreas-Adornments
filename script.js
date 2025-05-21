const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());

// Ensure proper initial scroll position
window.addEventListener('load', () => {
    // If there's no hash in the URL, we're at the root
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
});

// Handle smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            document.body.classList.remove("show-mobile-menu");
            
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Product Carousels
document.querySelectorAll(".wrapper").forEach(wrapper => {
    const carousel = wrapper.querySelector(".carousel");
    const arrowIcons = wrapper.querySelectorAll("i");
    const firstImg = carousel.querySelectorAll("img")[0];

    const updateArrows = () => {
        arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
        arrowIcons[1].style.display = 
            carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 1 
            ? "none" 
            : "block";
    };

    // Handle arrow clicks
    arrowIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            const itemWidth = firstImg.clientWidth + 14;
            carousel.scrollLeft += icon.id === "left" ? -itemWidth : itemWidth;
            setTimeout(updateArrows, 60);
        });
    });

    // Initial arrow update
    updateArrows();

    // Add drag scrolling functionality
    let isDragging = false, startX, startScrollLeft;

    carousel.addEventListener("mousedown", (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener("mousemove", (e) => {
        if(!isDragging) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - startX);
        carousel.scrollLeft = startScrollLeft - walk;
        updateArrows();
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    });
});