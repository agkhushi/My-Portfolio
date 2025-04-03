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
            title: "Task Management App",
            description: "A dynamic task management application with real-time updates and progress tracking.Features include task prioritization, deadline management.",
            image: "task-management.png",
            technologies: ["React", "Node.js", "Socket.io"],
            githubLink: "https://github.com/yourusername/task-manager",
            liveLink: "https://yourusername.github.io/task-manager"
        },
        {
            title: "Expense Tracker",
            description: "A streamlined expense management app with budget planning, expense categorization, and interactive charts for financial insights.",
            image: "expense.png",
            technologies: ["HTML", "CSS", "JavaScript", "Chart.js"],
            githubLink: "https://github.com/yourusername/expense-tracker",
            liveLink: "https://yourusername.github.io/expense-tracker"
        },
        {
            title: "DSA Problem Solver",
            description: "A collection of solved Data Structures and Algorithms problems with detailed explanations and optimizations.",
            image: "dsa.jpg",
            technologies: ["C++", "Java", "Data Structures", "Algorithms"],
            githubLink: "#",
            liveLink: "#"
        }
    ];

    // Populate Projects with Carousel Effect
    const projectsGrid = document.querySelector('.projects-grid');
    let currentProjectIndex = 0;
    
    // Create project cards
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.dataset.index = index;
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="technologies">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.githubLink}" class="btn github-btn" target="_blank">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="${project.liveLink}" class="btn live-btn" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
    
    // Add navigation buttons
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-btn prev-btn';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-btn next-btn';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    
    projectsGrid.parentElement.appendChild(prevBtn);
    projectsGrid.parentElement.appendChild(nextBtn);
    
    // Add navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'carousel-dots';
    
    projects.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'carousel-dot';
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });
    
    projectsGrid.parentElement.appendChild(dotsContainer);
    
    // Initialize carousel
    function initCarousel() {
        const projectCards = document.querySelectorAll('.project-card');
        const dots = document.querySelectorAll('.carousel-dot');
        
        // Set initial state
        updateCarousel();
        
        // Add event listeners
        prevBtn.addEventListener('click', () => {
            currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
            updateCarousel();
        });
        
        nextBtn.addEventListener('click', () => {
            currentProjectIndex = (currentProjectIndex + 1) % projects.length;
            updateCarousel();
        });
        
        // Add dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentProjectIndex = index;
                updateCarousel();
            });
        });
        
        // Auto-rotate every 5 seconds
        setInterval(() => {
            currentProjectIndex = (currentProjectIndex + 1) % projects.length;
            updateCarousel();
        }, 5000);
    }
    
    function updateCarousel() {
        const projectCards = document.querySelectorAll('.project-card');
        const dots = document.querySelectorAll('.carousel-dot');
        
        // Update active card and prev/next cards
        projectCards.forEach((card, index) => {
            // Remove all classes first
            card.classList.remove('active', 'prev', 'next');
            
            if (index === currentProjectIndex) {
                card.classList.add('active');
            } else if (index === (currentProjectIndex - 1 + projects.length) % projects.length) {
                card.classList.add('prev');
            } else if (index === (currentProjectIndex + 1) % projects.length) {
                card.classList.add('next');
            }
        });
        
        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentProjectIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Initialize carousel after DOM is loaded
    initCarousel();

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
