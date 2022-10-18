
require('dotenv').config({ path: '../.env' });

// used to don't have to specify the exact path
const http = require('http');

// app import
const app = require('./app');

// Define the port form env Variable
developmentPort = process.env.PORT

// set the port
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(developmentPort);
app.set('port', port);

// search of errors and return approriate error 
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// server creation
const server = http.createServer(app);

// event handler
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('The server is up and running on ' + bind + ' 🚀');
});

// server port
server.listen(port);

