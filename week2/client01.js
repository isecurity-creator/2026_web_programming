const net = require('net');

const client = net.connect('3000', 'localhost', () => {
    console.log('connected to server');
    client.write('Hello.');
});

client.on('data', data => {
    console.log('client-> ' + data);
});