import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const dataPath = join(process.cwd(), 'data', 'companies.json');
        const data = readFileSync(dataPath, 'utf8');
        res.status(200).json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to load companies data' });
    }
}
