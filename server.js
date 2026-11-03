
const http = require('http');

const server = http.createServer((req, res) => {

    // Get the URL requested by the user
    const url = req.url;

    // Set HTML response header
    res.setHeader('Content-Type', 'text/html');

    // Check the requested URL
    if (url === '/') {
        res.end('<h1>Hello World</h1>');
    }

    else if (url === '/pizza') {
        res.end('<h1>This is your pizza</h1>');
    }

    else if (url === '/home') {
        res.end('<h1>Welcome home</h1>');
    }

    else if (url === '/about') {
        res.end('<h1>Welcome to About Us</h1>');
    }

    else if (url === '/node') {
        res.end('<h1>Welcome to my Node Js project</h1>');
    }

    else {
        res.statusCode = 404;
        res.end('<h1>Page Not Found</h1>');
    }

});

// Start the server
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
