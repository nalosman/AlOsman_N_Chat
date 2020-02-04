var express = require('express');
var app = express();

//import the socket.io library
const io = require('socket.io')(); //instantiate the library right away with the () method --> make it run

const port = process.env.PORT || 3030;

// tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

//this is all the socket.io messagin functionality

//attach socket.io
io.attach(server);

io.on('connection', function(socket) {
    console.log('user connected');
    socket.emit('connected', {sID: `${socket.id}`, message: 'new connection'});

    //listen for an incoming message from a user(socket referes ot indiv user)
    //msg is the incoming message form that user
    socket.on('chat_message', function(msg) {
        console.log(msg);

        //WHEN WE GET A NEW MESSAGE, SEND IT TO EVERYONE SO THEY CAN SEE IT
        //IO IS THE SWITCHBOARD OPERATOR, MAKING SURE EVERYON WHO;S OCNNECTED
        //GET THE MESSAGE
        io.emit('new_message',  { id: socket.id, message: msg})
    })

    //listen for a disconnect event
    socket.on('disconnect', function(){
        console.log('a user is disconnected');

        message = `${socket.id} has left the chat!`;
        io.emit('user_disconnect', message);
    })
});