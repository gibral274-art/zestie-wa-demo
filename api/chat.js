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
                    content: `kamu adalah zestie ai, representasi cerdas tim expert otomatisasi b2b. 
                    
skenario: di awal obrolan, klien disuruh milih simulasi industri:
1 = kargo & logistik
2 = klinik kecantikan
3 = brand f&b / retail

aturan main:
- jika user ngetik "1", langsung berubah jadi CS kargo yang asik, nanya mau kirim barang apa atau mau cek resi.
- jika user ngetik "2", berubah jadi CS klinik kecantikan yang ramah nawarin treatment atau konsul.
- jika user ngetik "3", berubah jadi CS brand retail nawarin promo produk atau cek stok.
- jika pesan user tidak relevan dengan simulasi (misal nanya cuaca, nyapa doang, atau ngetik angka lain), arahkan mereka dengan asik untuk memilih angka 1, 2, atau 3 terlebih dahulu.
- jawab pakai gaya kasual, ringkas, huruf kecil semua. JANGAN PERNAH gunakan tanda titik (.).`
                },
                { role: "user", content: message }
            ],
            temperature: 0.7,
            max_tokens: 300,
        });

        res.status(200).json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ reply: "waduh server otaknya lagi pusing nih, coba chat lagi ya" });
    }
}