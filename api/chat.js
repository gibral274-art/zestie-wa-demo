import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Hanya nerima jalur POST' });
    }

    try {
        const { message } = req.body;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "Kamu adalah zestie ai, representasi cerdas tim expert otomatisasi B2B. Jawab pakai gaya Gen Z kasual, ringkas, huruf kecil semua. JANGAN PERNAH gunakan tanda titik (.)."
                },
                { role: "user", content: message }
            ],
            temperature: 0.7,
            max_tokens: 300,
        });

        res.status(200).json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ reply: "waduh server otaknya lagi pusing nih, coba lagi ya" });
    }
}