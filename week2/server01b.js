const net = require('net');

const server = net.createServer( socket => {
  socket.on( 'data', data => {
    console.log( '送られた内容: ' + data );
    socket.write( 'Hello, World!\n' );
    socket.destroy();
  });
}).listen( 4000 );

console.log( '4000番ポートで待ち受け中' );