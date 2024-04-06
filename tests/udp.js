import { createSocket, } from 'dgram'
import dnsPacket from 'dns-packet';
import { encode, decode } from '../dist/index.mjs';

const dnsQuery = {
  id: 153,
  type: 'query',
  flags: dnsPacket.RECURSION_DESIRED,
  questions: [{ name: 'google.com', type: 'NS', class: 'IN' }]
};

const server = createSocket('udp4');

server.send(dnsPacket.encode(dnsQuery), 53, '1.1.1.1', (err) => {
  console.log(err);


  server.on('message', (msg, rinfo) => {
    console.log(dnsPacket.decode(msg));
    console.log(decode(msg.buffer).answers);

    server.close();
  });


});

// server.bind(8000)