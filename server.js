const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
server.listen(process.env.PORT || 8000, () => {
    console.log(`[ server.js ] Listening on port ${server.address().port}`);
});
// Routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/show.html'));
});

app.get('/edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/edit.html'));
});

// Socket Events

io.on('connection', (socket) => {
    console.log(`[ server.js ] ${socket.id} connected`);

    socket.on('disconnect', () => {
        console.log(`[ server.js ] ${socket.id} disconnected`);
    });
});