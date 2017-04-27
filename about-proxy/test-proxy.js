const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
app.use(express.static('public'));
//app.use(express.static('client'));

// Add middleware for http proxying 
const apiProxy = proxy('/api', { target: 'http://localhost:8080',changeOrigin: true });
app.use('/api/*', apiProxy);

// Render your site
app.get('/index.htm', function(req,res){
     res.sendFile(__dirname+'/src/index.html');
});

app.listen(3000, () => {
  console.log('Listening on: http://localhost:3000');
});