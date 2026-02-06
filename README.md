# PM Portfolio

A personal portfolio website with a Node.js/Express backend.

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (vanilla)
- **Backend**: Node.js, Express.js
- **Data**: JSON files

## Getting Started

```bash
# Install dependencies
npm install

# Start the server
npm start
```

Then open http://localhost:3000

## Project Structure

```
pm-portfolio/
├── server.js           # Express server with API routes
├── package.json        # Node.js dependencies
├── public/             # Frontend files (served statically)
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── data/               # JSON data files
│   ├── profile.json    # Your profile info
│   └── companies.json  # Company/experience data
└── images/             # Uploaded images
    ├── profile/        # Your photo
    └── logos/          # Company logos
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

The backend requires a Node.js hosting platform (Vercel, Railway, Render, etc.)
