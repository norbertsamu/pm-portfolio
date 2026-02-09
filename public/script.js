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
    // Profile data is now hardcoded in HTML for faster rendering.
    // This function is kept for any dynamic overrides if needed.
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
// MOBILE NAV
// ============================================

function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });
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

    // Initialize mobile nav
    initMobileNav();
});
