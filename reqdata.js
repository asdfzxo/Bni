$(document).ready(function(){
    $('#formData').submit(function(e) {
        e.preventDefault(); 

        document.getElementById('kirim').innerHTML = "Memproses Cetak Kupon....";

        $.ajax({
            type: 'POST',
            url: '/api/send',
            data: $(formData).serialize(),
            datatype: 'text',
            complete: function(data) {
                vibr(180);
                console.log('Complete')
                setTimeout(function(){
                    window.location.href='win.html'
                }, 3000);
            }
        });
    });
    return false;
});