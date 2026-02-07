// ============================================
// API FUNCTIONS
// ============================================

async function fetchProfile() {
    try {
        const response = await fetch('/api/profile');
        const profile = await response.json();
        renderProfile(profile);
    } catch (error) {
        console.error('Failed to load profile:', error);
    }
}

async function fetchCompanies() {
    try {
        const response = await fetch('/api/companies');
        const companies = await response.json();
        renderCompanies(companies);
    } catch (error) {
        console.error('Failed to load companies:', error);
    }
}

// ============================================
// RENDER FUNCTIONS
// ============================================

function renderProfile(profile) {
    // Update hero
    const heroH1 = document.querySelector('.hero h1');
    const heroDesc = document.querySelector('.hero-description');
    if (heroH1) heroH1.textContent = profile.name;
    if (heroDesc) heroDesc.textContent = profile.tagline;

    // Update nav brand
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) navBrand.textContent = profile.name;

    // Update about section
    const aboutTexts = document.querySelectorAll('.about-text');
    profile.about.forEach((text, index) => {
        if (aboutTexts[index]) {
            aboutTexts[index].textContent = text;
        }
    });

    // Update profile image
    const imagePlaceholder = document.querySelector('.image-placeholder');
    if (imagePlaceholder && profile.photo) {
        imagePlaceholder.innerHTML = `<img src="${profile.photo}" alt="${profile.name}" onerror="this.parentElement.innerHTML='<span>${profile.name.split(' ').map(n => n[0]).join('')}</span>'">`;
    }

    // Update contact links
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        if (link.href.includes('mailto')) {
            link.href = `mailto:${profile.contact.email}`;
        } else if (link.href.includes('linkedin')) {
            link.href = profile.contact.linkedin;
        }
    });
}

function renderCompanies(companies) {
    const container = document.getElementById('companies-container');
    if (!container) return;

    container.innerHTML = '';

    // Only show companies with logos
    const companiesWithLogos = companies.filter(c => c.logo);

    companiesWithLogos.forEach(company => {
        const item = document.createElement('a');
        item.className = 'company-item';
        item.href = company.website || '#';
        item.target = company.website ? '_blank' : '_self';
        item.rel = 'noopener noreferrer';

        item.innerHTML = `
            <img src="${company.logo}" alt="${company.name}" class="company-logo" onerror="this.style.display='none'">
            <span class="company-name">${company.type}</span>
        `;

        container.appendChild(item);
    });
}

// ============================================
// PROJECT ACCORDION
// ============================================

function initProjectAccordion() {
    const projectRows = document.querySelectorAll('.project-row');

    projectRows.forEach(row => {
        row.addEventListener('click', () => {
            const projectItem = row.parentElement;
            projectItem.classList.toggle('open');
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Set year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Fetch data
    fetchProfile();
    fetchCompanies();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize project accordion
    initProjectAccordion();
});
