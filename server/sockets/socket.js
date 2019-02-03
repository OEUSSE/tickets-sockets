const { io } = require('../index.js')
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl()

io.on('connection', client => {
    console.log('Cliente conectado')

    client.on('siguienteTicket', function(data, callback) {
        let siguiente = ticketControl.siguienteTicket()
        console.log(siguiente)
        callback(siguiente)
    })

    client.emit('ticketActual', {
        ticketActual: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatro()
    })

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return {
                err: true,
                msg: 'El escritorio es necesario'
            }
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio)

        callback(atenderTicket)

        client.broadcast.emit('ultimosCuatro', { ultimosCuatro: ticketControl.getUltimosCuatro() })
    })

    client.on('disconnect', () => {
        console.log('Cliente desconectado')
    })
})
