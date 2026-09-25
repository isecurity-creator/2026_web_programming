const net = require('net');

const client = net.connect('3000', 'localhost', () => {
    console.log('connected to server');
    client.write('Bon jour.');
});

client.on('data', data => {
    console.log('client-> ' + data);
});