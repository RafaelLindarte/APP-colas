const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;

    }
}


class TicketControl {
    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.recientes = [];
        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.recientes = data.recientes;
        } else {
            this.reiniciarConteo();
        }

    }


    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;

    }
    getRecientesTicket() {
        return this.recientes;

    }
    organizarTickets(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let organizarTicket = new Ticket(numeroTicket, escritorio);
        this.recientes.unshift(organizarTicket);
        if (this.recientes.length > 4) {

            this.recientes.splice(-1, 1); //borra el ultimo-dejando solo 4

        }
        console.log('recientes');
        console.log(this.recientes);
        this.grabarArchivo();
        return organizarTicket
    }
    siguienteTicket() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;

    }
    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.recientes = [];
        console.log('se ha iniciado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            recientes: this.recientes
        }
        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

}

module.exports = {

    TicketControl
}