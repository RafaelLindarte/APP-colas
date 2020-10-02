var socket = io();
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];
socket.on("connect", function() {
    console.log(`conectado al servidor`);
});
socket.on("disconnect", function() {
    console.log(`perdimos conexión con el servidor`);
});

socket.on('estadoTickets', function(data) {
    //console.log(data);
    actualizaHTML(data.recientes);
});


socket.on('actualizarestadoTickets', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(data.recientes);
});

function actualizaHTML(recientes) {
    for (var i = 0; i < recientes.length; i++) {
        lblTickets[i].text('Ticket ' + recientes[i].numero);
        lblEscritorios[i].text('Escritorio ' + recientes[i].escritorio);
    }
}