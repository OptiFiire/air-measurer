import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt } = req.body;

    try {
        const openaiResponse = await axios.post('https://api.openai.com/v1/completions', {
            model: 'gpt-3.5-turbo',
            prompt: prompt,
            max_tokens: 300,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const result = openaiResponse.data.choices[0].text.trim();

        return res.status(200).json({ result: result });
    } catch (error) {
        console.error('OpenAI API error:', error.response?.data || error.message);
        return res.status(500).json({ error: 'Error with OpenAI request' });
    }
}
