const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketcontrol = new TicketControl();
io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let newticket = ticketcontrol.siguienteTicket();

        callback(newticket);
        console.log(newticket);
    })


    client.emit('estadoTickets', {
        ticketActual: ticketcontrol.getUltimoTicket(),
        recientes: ticketcontrol.getRecientesTicket()
    });


    client.on('organizarTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            })
        }
        let organizarTicket = ticketcontrol.organizarTickets(data.escritorio);

        callback(organizarTicket);
        client.broadcast.emit('actualizarestadoTickets', {
            recientes: ticketcontrol.getRecientesTicket()
        });
    })
});