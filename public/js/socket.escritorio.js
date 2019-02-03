let socket = io()
let label = $('small')

var searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es necesario')
}

let escritorio = searchParams.get('escritorio')
$('#numero-escritorio').text(escritorio)

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(response) {
        if (response === 'No hay turnos pendientes por atender.') {
            label.text(response)
            alert(response)
            return
        }
        
        label.text(response.numero)
    })
})