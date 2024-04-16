
const express = require('express')
const path = require('path');
const app = express()
const PORT  = process.env.PORT || 3000
const server = app.listen(PORT,()=>{
    console.log(`Server is running ${PORT}`);
});

const io = require('socket.io')(server);



app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static(__dirname));

let socketsConnected = new Set();

io.on('connection', onConnected);


function onConnected(socket){
    console.log('CONNECTED');
    console.log(socket.id);

    socketsConnected.add(socket.id);

    io.emit('client-total', socketsConnected.size)

    socket.on('disconnect', ()=> {
        console.log('disconnected', socket.id)
        socketsConnected.delete(socket.id);
        io.emit('client-total', socketsConnected.size)
    })

   

}

// app.get('/', (req, res) => {

//     res.render(path.join(__dirname, 'public/index.html'));
// });