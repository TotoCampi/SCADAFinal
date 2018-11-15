let net = require('net')
let modbus = require('jsmodbus')
let netServer = new net.Server()
let holding = Buffer.alloc(10000)
let server = new modbus.server.TCP(netServer)
var greenColor = '\x1b[32m%s\x1b[0m';

server.on('connection', function (client) {
  console.log(greenColor, 'New Connection')
})
server.on('readHoldingRegisters', function (request, response, send) {
  console.log('READ {register, value}: {', request.address, ',', server.holding.readUInt16BE(request.address), '}')

  send(response)

})

setInterval(() => {
  server.holding.writeUInt16BE('0x' + Math.floor(Math.random() * 20 + 1).toString(16), 0)
})
netServer.listen(3333)
// server.on('readCoils', function (request, response, send) {
//   /* Implement your own */
//   console.log(request);
//   response.body.coils[0] = true
//   response.body.coils[1] = false
//
//   send(response)
// })
