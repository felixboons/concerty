const express = require('express');
const path = require('path');
const http = require('http');
const compression = require('compression');

const app = express();

// Compress static assets to enhance performance.
// Decrease the download size of your app through gzip compression:
app.use(compression());

// appName corresponds with "defaultProject" in angular.json.
const appName = 'concerty-client';

// Set express options
const options = {
  setHeaders: (res, path, stat) => {
    res.set(
      'Content-Security-Policy',
      "default-src 'self' https://concerty-client.herokuapp.com/; script-src 'self' https://concerty-client.herokuapp.com/; connect-src https://concerty-client.herokuapp.com/ 'self'; img-src 'self' www.google.com; style-src 'self' 'unsafe-inline';"
    )
  }
};

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist', appName), options));

// Catch all routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', appName, 'index.html'))
});

// Get port from environment and store in Express.
const port = process.env.PORT || '4200';
app.set('port', port);
// Create HTTP server.
const server = http.createServer(app);
// Listen on provided port, on all network interfaces.
server.listen(port, () => {
  console.log(`Angular app \'${appName}\' running in ${process.env.NODE_ENV} mode on port ${port}`)
})
