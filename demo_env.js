require('dotenv').load();

console.log(process.argv[2]);

console.log(typeof process.env['PORTS']);

JSON.parse(process.env['PORTS']).forEach(function(port) {
  console.log(port);
});
