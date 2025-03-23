// Typing Animation with more roles
const typedTextSpan = document.querySelector(".typed-text");
const textArray = [
    "Frontend Developer",
    "Data Science Enthusiast",
    "Problem Solver",
    "DSA Expert",
    "UI/UX Designer"
];
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, 1000);
    }
}

// Particle Effect
function createParticles() {
    const particles = document.createElement('div');
    particles.className = 'particles';
    document.querySelector('.hero').appendChild(particles);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 5 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particles.appendChild(particle);
    }
}

// Scroll Animation
const sections = document.querySelectorAll('section');
const options = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            if (entry.target.classList.contains('skills')) {
                animateSkills();
            }
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Animate skill bars
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateY(0)';
            item.style.opacity = '1';
        }, index * 100);
    });
}

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-item h3');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        function updateCount() {
            if (count < target) {
                count += increment;
                stat.textContent = Math.ceil(count) + '+';
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target + '+';
            }
        }
        updateCount();
    });
}

// Counter animation for stats
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const steps = 100;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            // Check if the target is a whole number
            if (Number.isInteger(target)) {
                element.textContent = target;
            } else {
                element.textContent = target.toFixed(1);
            }
            clearInterval(timer);
        } else {
            // Check if the target is a whole number
            if (Number.isInteger(target)) {
                element.textContent = Math.floor(current);
            } else {
                element.textContent = current.toFixed(1);
            }
        }
    }, duration / steps);
}

// Start counter animation when element is in view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            animateCounter(counter);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

// Observe all counter elements
document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000);
    createParticles();

    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Project Cards Data
    const projects = [
        {
            title: "Project 1",
            description: "A brief description of project 1",
            image: "assets/project1.jpg",
            technologies: ["HTML", "CSS", "JavaScript"],
            link: "#"
        },
        {
            title: "Project 2",
            description: "A brief description of project 2",
            image: "assets/project2.jpg",
            technologies: ["React", "Node.js", "MongoDB"],
            link: "#"
        },
        {
            title: "Project 3",
            description: "A brief description of project 3",
            image: "assets/project3.jpg",
            technologies: ["Vue.js", "Express", "PostgreSQL"],
            link: "#"
        }
    ];

    // Populate Projects
    const projectsGrid = document.querySelector('.projects-grid');

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="technologies">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
            <a href="${project.link}" class="btn">View Project</a>
        `;
        
        projectsGrid.appendChild(projectCard);
    });

    // Form Submission
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add your form submission logic here
        // For now, we'll just show an alert
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}); 
