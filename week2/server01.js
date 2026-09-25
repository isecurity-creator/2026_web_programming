const net = require('net');

const server = net.createServer( socket => {
  socket.on( 'data', data => {
    console.log( '送られた内容: ' + data );
    socket.write( 'Hello, World!\n' );
    socket.destroy();
  });
}).listen( 3000 );

console.log( '3000番ポートで待ち受け中' );