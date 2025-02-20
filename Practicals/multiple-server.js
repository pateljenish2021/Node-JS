const http = require('http');

const servers = [];
const ports = [8000, 8001, 8002, 8003, 8004];

// Creating 5 servers
const createServer = (port, index) => {
    const server = http.createServer((req, res) => {
        res.end(`Server ${index + 1} is running on port ${port}`);
    });

    server.listen(port, () => {
        console.log(`Server ${index + 1} is running on http://localhost:${port}`);
    });

    return server;
};

ports.forEach((port, index) => {
    servers.push(createServer(port, index));
});

// Using process signal event SIGINT to shutdown one server
process.on('SIGINT', () => {
    console.log('\nStopping Server 1 (Port 8000)...');
    servers[0].close(() => {
        console.log('Server 1 stopped.');
    });
});
