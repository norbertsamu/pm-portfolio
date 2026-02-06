import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { id } = req.query;

    try {
        const dataPath = join(process.cwd(), 'data', 'companies.json');
        const data = readFileSync(dataPath, 'utf8');
        const companies = JSON.parse(data);

        const company = companies.find(c => c.id === id);

        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load company data' });
    }
}
