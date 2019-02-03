let socket = io()
let label = $('#lblNuevoTicket')

socket.on('connect', function () {
    console.log('Conectado al servidor')
})

socket.on('ticketActual', function({ ticketActual }) {
    label.text(ticketActual)
})

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket)
    })
})

socket.on('disconnect', function() {
    console.log('Desconectado del servidor')
})
