const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));
app.use(cors());  // Adicionando o uso do cors

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (data) => {
    const { message, sender } = data;
    io.emit('message', { message, sender });  // Transmitir a mensagem para todos os clientes com informações do remetente
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
