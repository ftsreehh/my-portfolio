const roles = [
    "Python Developer",
    "Web Developer",
    "IoT Enthusiast",
    "Software Developer"
];

const typing = document.getElementById("typing");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typing) return;

    const role = roles[roleIndex];

    if (!deleting) {
        typing.textContent = role.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === role.length) {
            deleting = true;
            setTimeout(typeEffect, 1400);
            return;
        }
    } else {
        typing.textContent = role.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, deleting ? 45 : 95);
}

if (typing) {
    typeEffect();
}

const animatedItems = document.querySelectorAll(
    ".section, .skill-card, .project-card, .education-card, .cert-card, .contact-card"
);

animatedItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.setProperty("--delay", `${(index % 4) * 90}ms`);
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

animatedItems.forEach((item) => {
    observer.observe(item);
});

const educationCards = document.querySelectorAll(".education-card");

educationCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 150}ms`;
});

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveLink() {
    let current = "";

    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 180) {
            current = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle(
            "active-link",
            link.getAttribute("href") === `#${current}`
        );
    });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const open = navMenu.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.textContent = open ? "✕" : "☰";
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

document.querySelectorAll(".skill-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();

        card.style.setProperty(
            "--mx",
            `${event.clientX - rect.left}px`
        );

        card.style.setProperty(
            "--my",
            `${event.clientY - rect.top}px`
        );
    });
});
// PROJECT SLIDER

const projectsTrack = document.querySelector(".projects-track");
const projectCards = document.querySelectorAll(".projects-track .project-card");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const dotsContainer = document.querySelector(".slider-dots");

let currentProject = 0;

function getVisibleProjects() {
    return window.innerWidth <= 800 ? 1 : 2;
}

function getMaxProject() {
    return Math.max(0, projectCards.length - getVisibleProjects());
}

function createProjectDots() {
    dotsContainer.innerHTML = "";

    for (let i = 0; i <= getMaxProject(); i++) {
        const dot = document.createElement("button");
        dot.classList.add("slider-dot");

        if (i === currentProject) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {
            currentProject = i;
            updateProjectSlider();
        });

        dotsContainer.appendChild(dot);
    }
}

function updateProjectSlider() {
    const gap = parseFloat(getComputedStyle(projectsTrack).gap);
    const cardWidth = projectCards[0].getBoundingClientRect().width;

    projectsTrack.style.transform =
        `translateX(-${currentProject * (cardWidth + gap)}px)`;

    document.querySelectorAll(".slider-dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentProject);
    });

    prevBtn.disabled = currentProject === 0;
    nextBtn.disabled = currentProject === getMaxProject();

    prevBtn.style.opacity = prevBtn.disabled ? "0.4" : "1";
    nextBtn.style.opacity = nextBtn.disabled ? "0.4" : "1";
}

nextBtn.addEventListener("click", () => {
    if (currentProject < getMaxProject()) {
        currentProject++;
        updateProjectSlider();
    }
});

prevBtn.addEventListener("click", () => {
    if (currentProject > 0) {
        currentProject--;
        updateProjectSlider();
    }
});

window.addEventListener("resize", () => {
    currentProject = Math.min(currentProject, getMaxProject());
    createProjectDots();
    updateProjectSlider();
});

createProjectDots();
updateProjectSlider();