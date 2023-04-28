const socket = io();		

socket.on('neworder', (dados) => {
    console.log('dados');
})
