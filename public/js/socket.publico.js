let socket = io()

let lblTicket1 = $('#lblTicket1'),
    lblEscritorio1 = $('#lblEscritorio1')

let lblTicket2 = $('#lblTicket2'),
    lblEscritorio2 = $('#lblEscritorio2')

let lblTicket3 = $('#lblTicket3'),
    lblEscritorio3 = $('#lblEscritorio3')

let lblTicket4 = $('#lblTicket4')
    lblEscritorio4 = $('#lblEscritorio4')

let lblTickets = [
    lblTicket1,
    lblTicket2,
    lblTicket3,
    lblTicket4
]

let lblEscritorios = [
    lblEscritorio1,
    lblEscritorio2,
    lblEscritorio3,
    lblEscritorio4
]

socket.on('ultimosCuatro', function(data) {
    let ticketInfo = data.ultimosCuatro[0]
    let msg = "Ticket número " + ticketInfo.numero + ", por favor dirigirse al escritorio número " + ticketInfo.escritorio
    let synthesis = new SpeechSynthesisUtterance()
    synthesis.text = msg
    speechSynthesis.speak(synthesis)
    actualizaHTML(data)
})

socket.on('ticketActual', function (data) {
    actualizaHTML(data)
})

function actualizaHTML(data) {
    data.ultimosCuatro.forEach(function(ticket, index) {
        lblTickets[index].text('Ticket ' + ticket.numero)
        lblEscritorios[index].text('Escritorio ' + ticket.escritorio)
    });
}