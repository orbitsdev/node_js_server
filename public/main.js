// const socket = io("http://localhost:3000",{});
const socket = io();

const clientTotal = document.getElementById('client-total');

socket.on('client-total', (data)=> {
    console.log(data);

    clientTotal.innerHTML = `Total clients ${data}`;

})