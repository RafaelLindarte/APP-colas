var socket = io();
let labelNuevoTicket = $('#lblNuevoTicket');
socket.on("connect", function() {
    console.log(`conectado al servidor`);
})
socket.on("disconnect", function() {
    console.log(`perdimos conexión con el servidor`);
})



$('button').on('click', function() {
    console.log('click');
    socket.emit('siguienteTicket', {
        message: 'ticket Nuevo'
    }, function(siguienteTicket) {

        labelNuevoTicket.text(siguienteTicket);

    });
});
// cliente Envia Mensaje

// cliente Escucha Mensaje
socket.on('getUltimoTicket', function(resp) {
    labelNuevoTicket.text(resp.ticketActual)
});