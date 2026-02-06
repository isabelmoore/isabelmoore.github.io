/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.querySelector("#nav-menu");
const navToggle = document.querySelector("#nav-toggle");
const navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener("click", showMenu);
}

function showMenu() {
    navMenu.classList.add("show-menu");
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
    const navMenu = document.getElementById("nav-menu");
    // when we click on each nav__link, we remove the show menu class
    navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName("skills__content"),
    skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
    let itemClass = this.parentNode.className;

    for (let i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = "skills__content skills__close";
    }

    if (itemClass === "skills__content skills__close") {
        this.parentNode.className = "skills__content skills__open";
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener("click", toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
    tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach((tabContent) => {
            tabContent.classList.remove("qualification__active");
        });
        target.classList.add("qualification__active");

        tabs.forEach((tab) => {
            tab.classList.remove("qualification__active");
        });
        tab.classList.add("qualification__active");
    });
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll(".services__modal"),
    modalBtns = document.querySelectorAll(".services__content"),
    modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
    modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener("click", () => {
        modal(i);
    });
});

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener("click", () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove("active-modal");
        });
    });
});

/*==================== PORTFOLIO SWIPER  ====================*/
// let swiperPortfolio = new Swiper(".portfolio__container", {
//     cssMode: true,
//     loop: true,
//     navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//     },
//     pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//     },
// });

/*==================== TESTIMONIAL ====================*/
// let swiperTestimonial = new Swiper(".testimonial_container", {
//     loop: true,
//     grabCursor: true,
//     spaceBetween: 48,

//     pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//         dynamicBullets: true,
//     },
//     breakpoints: {
//         568: {
//             slidePerView: 2,
//         },
//     },
// });

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
    const verticalScrollPosition = window.verticalScrollPosition || window.pageYOffset;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute("id");

        if (verticalScrollPosition > sectionTop && verticalScrollPosition <= sectionTop + sectionHeight) {
            document
                .querySelector(".nav__menu a[href*=" + sectionId + "]")
                .classList.add("active-link");
        } else {
            document
                .querySelector(".nav__menu a[href*=" + sectionId + "]")
                .classList.remove("active-link");
        }
    });
}

window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const nav = document.getElementById("header");
    if (window.scrollY >= 80) nav.classList.add("scroll-header");
    else nav.classList.remove("scroll-header");
}

window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById("scroll-up");
    if (window.scrollY >= 560) scrollUp.classList.add("show-scroll");
    else scrollUp.classList.remove("show-scroll");
}

window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
    document.body.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

if (selectedTheme) {
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
        darkTheme
    );
    themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
        iconTheme
    );
}

//activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
    //add or remove dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    //we save the theme and the current icon so that the user choose
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== PARALLAX BACKGROUND LOGIC ====================*/
const parallaxLayers = document.querySelectorAll('.parallax-layer');

if (parallaxLayers.length > 0) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY; // Use window.scrollY for reliability
        window.requestAnimationFrame(() => {
            parallaxLayers.forEach(layer => {
                const speed = parseFloat(layer.getAttribute('data-speed'));
                // Create a noticeable parallax effect
                // speed 0 = fixed (distant)
                // speed 1 = moves with content (static relative to DOM)
                // we move the layer UP as we scroll DOWN. 
                const yPos = -(scrollY * speed);
                layer.style.transform = `translateY(${yPos}px)`;
            });
        });
    });
}



/*==================== PORTFOLIO MODAL ====================*/
const portfolioModal = document.querySelector('.portfolio__modal');
const portfolioModalContent = document.querySelector('.portfolio__modal-content');
const portfolioModalBody = document.querySelector('.portfolio__modal-body');
const portfolioModalImg = document.querySelector('.portfolio__modal-img');
const portfolioModalTitle = document.querySelector('.portfolio__modal-title');
const portfolioModalClose = document.querySelector('.portfolio__modal-close');
const portfolioItems = document.querySelectorAll('.portfolio__content');

if (portfolioModal) {
    portfolioItems.forEach((item) => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.portfolio__img');
            const title = item.querySelector('.portfolio__title');
            const details = item.querySelector('.portfolio__details');

            if (img) portfolioModalImg.src = img.src;
            if (title) portfolioModalTitle.innerText = title.innerText;
            if (details) portfolioModalBody.innerHTML = details.innerHTML;

            portfolioModal.classList.add('active-portfolio-modal');
        });
    });

    if (portfolioModalClose) {
        portfolioModalClose.addEventListener('click', () => {
            portfolioModal.classList.remove('active-portfolio-modal');
        });
    }

    // Close on click outside
    portfolioModal.addEventListener('click', (e) => {
        if (e.target === portfolioModal) {
            portfolioModal.classList.remove('active-portfolio-modal');
        }
    })
}

/*==================== PORTFOLIO SHOW MORE ====================*/
const portfolioShowMoreContainer = document.querySelector('.portfolio__show-more');
const showMoreBtn = document.getElementById('show-more-btn');
const portfolioItemsList = document.querySelectorAll('.portfolio__content');
const INITIAL_VISIBLE_COUNT = 4;

if (portfolioItemsList.length > INITIAL_VISIBLE_COUNT) {
    // Hide items beyond the initial count
    for (let i = INITIAL_VISIBLE_COUNT; i < portfolioItemsList.length; i++) {
        portfolioItemsList[i].style.display = 'none';
        portfolioItemsList[i].style.opacity = '0';
        portfolioItemsList[i].style.transform = 'translateY(20px)';
    }

    // Show the button
    if (portfolioShowMoreContainer) {
        portfolioShowMoreContainer.style.display = 'block';
    }

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            const isExpanded = showMoreBtn.getAttribute('data-expanded') === 'true';

            if (isExpanded) {
                // Show Less
                // 1. Fade out
                for (let i = INITIAL_VISIBLE_COUNT; i < portfolioItemsList.length; i++) {
                    portfolioItemsList[i].style.opacity = '0';
                    portfolioItemsList[i].style.transform = 'translateY(20px)';
                }

                showMoreBtn.innerHTML = 'Show More <i class="uil uil-arrow-down button__icon"></i>';
                showMoreBtn.setAttribute('data-expanded', 'false');

                // 2. Wait for transition then hide
                setTimeout(() => {
                    for (let i = INITIAL_VISIBLE_COUNT; i < portfolioItemsList.length; i++) {
                        portfolioItemsList[i].style.display = 'none';
                    }
                    // Scroll back to portfolio section top
                    document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
                }, 400); // 400ms matches CSS transition time

            } else {
                // Show More
                showMoreBtn.innerHTML = 'Show Less <i class="uil uil-arrow-up button__icon"></i>';
                showMoreBtn.setAttribute('data-expanded', 'true');

                for (let i = INITIAL_VISIBLE_COUNT; i < portfolioItemsList.length; i++) {
                    portfolioItemsList[i].style.display = 'flex'; // Make visible in layout
                }

                // Slight delay to allow display:flex to apply before animating opacity
                setTimeout(() => {
                    for (let i = INITIAL_VISIBLE_COUNT; i < portfolioItemsList.length; i++) {
                        portfolioItemsList[i].style.opacity = '1';
                        portfolioItemsList[i].style.transform = 'translateY(0)';
                    }
                    // Clear inline styles after transition so CSS :hover works
                    setTimeout(() => {
                        for (let i = INITIAL_VISIBLE_COUNT; i < portfolioItemsList.length; i++) {
                            portfolioItemsList[i].style.transform = '';
                            portfolioItemsList[i].style.opacity = '';
                        }
                    }, 400);
                }, 50);
            }
        });
    }
}

/*==================== EXPERTISE ACCORDION ====================*/
const expertiseItems = document.querySelectorAll('.expertise__item');

expertiseItems.forEach((item) => {
    const header = item.querySelector('.expertise__header');
    header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close all other items
        expertiseItems.forEach((otherItem) => {
            otherItem.classList.remove('active');
        });

        // Toggle current item
        if (!isOpen) {
            item.classList.add('active');
        }
    });
});
