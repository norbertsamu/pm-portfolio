# PM Portfolio

A personal portfolio website with Vercel serverless API functions.

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (vanilla)
- **Backend**: Vercel Serverless Functions
- **Data**: JSON files
- **Hosting**: Vercel (free tier)

## Getting Started

```bash
# Install Vercel CLI (if not already)
npm i -g vercel

# Run locally
vercel dev
```

Then open http://localhost:3000

## Project Structure

```
pm-portfolio/
├── api/                  # Serverless API functions
│   ├── profile.js        # GET /api/profile
│   ├── health.js         # GET /api/health
│   └── companies/
│       ├── index.js      # GET /api/companies
│       └── [id].js       # GET /api/companies/:id
├── public/               # Frontend files (served statically)
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── data/                 # JSON data files
│   ├── profile.json      # Your profile info
│   └── companies.json    # Company/experience data
├── images/               # Static images
│   ├── profile/          # Your photo
│   └── logos/            # Company logos
└── vercel.json           # Vercel configuration
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/profile` | Your profile data |
| GET | `/api/companies` | All companies |
| GET | `/api/companies/:id` | Single company |

## Adding Your Images

1. Add your profile photo to `images/profile/norbi.jpg`
2. Add company logos to `images/logos/` (e.g., `beamery.png`)
3. Update paths in `data/profile.json` and `data/companies.json`

## Deployment

Push to GitHub - Vercel auto-deploys from main branch.

```bash
git push origin main
```
