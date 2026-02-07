# Project Context for Claude

## Owner
Norbi Samu - Product Manager

## Live Site
https://norbisamu.vercel.app

## Tech Stack
- Frontend: Vanilla HTML/CSS/JS (no framework)
- Backend: Vercel serverless functions (`/api` folder)
- Data: JSON files in `/data` folder
- Hosting: Vercel (free tier)
- Repo: https://github.com/norbertsamu/pm-portfolio

## Design Decisions
- **Color scheme**: Warm beige (#f5f0e8) with subtle gradient blobs for visual interest
- **Typography**: DM Sans for headings, Inter for body
- **Style inspiration**: Minimal, clean portfolio like silvanocecilia.design
- **Animations**: Scroll-triggered fade-in animations using Intersection Observer

## Structure
```
/public          - Static files (HTML, CSS, JS, images)
/api             - Vercel serverless functions
/data            - JSON data (profile.json, companies.json)
```

## Key Features Built
1. **Hero section** with name and tagline
2. **About section** with career journey (commercial research → QA → Product)
3. **Experience section** - Company logos (Spotted Zebra, Beamery, Fixflo, Chambers)
4. **Products & Projects** - Expandable accordion with:
   - Interview Guide Builder (0→1) - Spotted Zebra
   - Skills Intelligence Platform (0→1) - Beamery
   - Integrations (4+ years) - All three companies
5. **Outside the office** - Placeholder section for hobbies/interests
6. **Header contact button** - "Get in touch" links to email

## Logos
- Spotted Zebra: SVG (high quality)
- Beamery: PNG (could be upgraded)
- Fixflo: PNG (from official site)
- Chambers: SVG (from chambers.com)

## Contact
- Email: norbert.samu96@gmail.com
- LinkedIn: linkedin.com/in/norbisamu

## Pending/Future Work
- Fill in placeholder content in Products & Projects
- Add content to "Outside the office" section (hobbies, images)
- Potentially upgrade Beamery logo to SVG
- Fill in Impact sections for each project

## Commands
```bash
# Deploy to production
vercel --prod --yes

# The alias norbisamu.vercel.app is configured in vercel.json
```

## Git Workflow Used
- Direct commits to main for quick iterations
- PRs for larger features (used early in project for learning)
