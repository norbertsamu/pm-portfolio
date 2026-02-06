const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from 'public' folder (your frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded images from 'images' folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// ============================================
// API ROUTES
// ============================================

// GET /api/companies - Returns all company data
app.get('/api/companies', (req, res) => {
    const dataPath = path.join(__dirname, 'data', 'companies.json');

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to load company data' });
        }
        res.json(JSON.parse(data));
    });
});

// GET /api/companies/:id - Returns a single company
app.get('/api/companies/:id', (req, res) => {
    const dataPath = path.join(__dirname, 'data', 'companies.json');

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to load company data' });
        }

        const companies = JSON.parse(data);
        const company = companies.find(c => c.id === req.params.id);

        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        res.json(company);
    });
});

// GET /api/profile - Returns profile data
app.get('/api/profile', (req, res) => {
    const dataPath = path.join(__dirname, 'data', 'profile.json');

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to load profile data' });
        }
        res.json(JSON.parse(data));
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
    console.log(`
    ====================================
    Server running on http://localhost:${PORT}
    ====================================

    API Endpoints:
    - GET /api/health      - Health check
    - GET /api/profile     - Your profile data
    - GET /api/companies   - All companies
    - GET /api/companies/:id - Single company

    Static files:
    - /images/profile/     - Profile photos
    - /images/logos/       - Company logos
    `);
});
