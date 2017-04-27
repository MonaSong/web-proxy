var express = require('express');
var app = express();

app.use(express.static('public'));

var server = app.listen(8089,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为 http://%s:%s',host,port);
})

/**
 * 路由   
 */
app.get('/',function(req,res){
    res.send('hello word');
})

app.get('/index.htm',function(req,res){
    res.sendFile(__dirname+"/src/"+"test-vue-route.html");
})

app.get('/user/:id/:page', function (req, res, next) {
  console.log("req===>");
  console.log(req.params);
  res.send(req.params)
  next();
});

