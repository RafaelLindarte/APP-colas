var socket = io();
var searchParams = new URLSearchParams(window.location.search);
let labelticketactual = $('small');
socket.on("connect", function() {
    console.log(`conectado al servidor`);
});
socket.on("disconnect", function() {
    console.log(`perdimos conexión con el servidor`);
});

if (!searchParams.has('escritorio')) {

    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}
var escritorio = searchParams.get('escritorio');
console.log(escritorio);

$('h1').text('Escritorio: ' + escritorio);

$('button').on('click', function() {
    socket.emit('organizarTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay tickets') {
            labelticketactual.text(resp);
            alert(resp);
            return;
        }
        labelticketactual.text(resp.numero);
    })
});