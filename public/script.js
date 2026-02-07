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
    // Update hero section
    document.querySelector('.hero h1').textContent = profile.name;
    document.querySelector('.hero-description').textContent = profile.tagline;

    // Update nav brand
    document.querySelector('.nav-brand').textContent = profile.name;

    // Update about section
    const aboutContent = document.querySelector('.about-content');
    const aboutTexts = aboutContent.querySelectorAll('.about-text');
    profile.about.forEach((text, index) => {
        if (aboutTexts[index]) {
            aboutTexts[index].textContent = text;
        }
    });

    // Update profile image
    const imagePlaceholder = document.querySelector('.image-placeholder');
    if (profile.photo) {
        imagePlaceholder.innerHTML = `<img src="${profile.photo}" alt="${profile.name}" onerror="this.parentElement.innerHTML='<span>Your Photo</span>'">`;
    }

    // Update stats
    const stats = document.querySelectorAll('.stat');
    profile.stats.forEach((stat, index) => {
        if (stats[index]) {
            stats[index].querySelector('.stat-number').textContent = stat.value;
            stats[index].querySelector('.stat-label').textContent = stat.label;
        }
    });

    // Update contact links
    const emailLink = document.querySelector('.contact-links a[href^="mailto"]');
    const linkedinLink = document.querySelector('.contact-links a[href*="linkedin"]');
    if (emailLink) emailLink.href = `mailto:${profile.contact.email}`;
    if (linkedinLink) linkedinLink.href = profile.contact.linkedin;

    // Update footer
    document.querySelector('footer p').innerHTML = `&copy; ${new Date().getFullYear()} ${profile.name}`;
}

function renderCompanies(companies) {
    const tabsContainer = document.querySelector('.experience-tabs');
    const contentContainer = document.querySelector('.experience-content');

    // Clear existing content
    tabsContainer.innerHTML = '';
    contentContainer.innerHTML = '';

    companies.forEach((company, index) => {
        // Create tab button
        const tabBtn = document.createElement('button');
        tabBtn.className = `tab-btn${index === 0 ? ' active' : ''}`;
        tabBtn.setAttribute('data-tab', company.id);
        tabBtn.textContent = company.name;
        tabsContainer.appendChild(tabBtn);

        // Create experience card
        const card = document.createElement('div');
        card.className = `experience-card${index === 0 ? ' active' : ''}`;
        card.id = company.id;

        const logoImg = company.logo
            ? `<img src="${company.logo}" alt="${company.name} Logo" class="company-logo" onerror="this.outerHTML='<div class=\\'logo-placeholder\\'>${company.name.charAt(0)}</div>'">`
            : `<div class="logo-placeholder">${company.name.charAt(0)}</div>`;

        const logoHtml = company.website
            ? `<a href="${company.website}" target="_blank" rel="noopener noreferrer" class="company-logo-link">${logoImg}</a>`
            : logoImg;

        card.innerHTML = `
            <div class="company-header">
                ${logoHtml}
                <div class="company-info">
                    <h3>${company.website ? `<a href="${company.website}" target="_blank" rel="noopener noreferrer">${company.name}</a>` : company.name}</h3>
                    <span class="company-type">${company.type}</span>
                </div>
            </div>
            <p class="experience-description">${company.description}</p>
            <ul class="experience-highlights">
                ${company.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
        `;

        contentContainer.appendChild(card);
    });

    // Re-attach tab click handlers
    attachTabHandlers();
}

// ============================================
// UI INTERACTIONS
// ============================================

function attachTabHandlers() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const experienceCards = document.querySelectorAll('.experience-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            experienceCards.forEach(card => card.classList.remove('active'));

            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
    }
});

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    fetchProfile();
    fetchCompanies();
});
