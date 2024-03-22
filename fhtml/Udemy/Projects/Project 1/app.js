// // Require the Node modules
// const http = require("http");
// // Require custom respond
// const respond = require("./lib/respond.js");
// // Connection settings
// const port = process.env.PORT || 3000;

// // Create server
// const server = http.createServer(respond);

// // Listen to client requests on the specific port
// server.listen(port, () => {
//   console.log("Listening on port " + port);
// });
 

const http = require("http");
const respond = require("./lib/respond.js");
const port = process.env.PORT || 3000;

const server = http.createServer(respond);

server.listen(port, () => {
  console.log("Listening on port " + port);
});

