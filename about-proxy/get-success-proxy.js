// 使用 node.js 做代理服务实现前后台分离

var express = require("express");
var proxy = require("express-http-proxy");
var bodyParser = require("body-parser");

var url = "http://130.10.7.23:8080/hrldjgpt/telapi/login/LoginAction.do?method=login";

// 声明 服务器实例
var app = express();
var port = 8088;

var apiProxy = proxy("http://130.10.7.23:8080",{
    forwardPath:function(req,res) {
        console.log(req);
        return req._parsedUrl.path;
    }
    },
    decorateRequest : function(proxyReq,originalReq){
        console.log(originalReq);
        proxyReq.body = originalReq.body;
        return proxyReq;
    }
});

app.use(bodyParser.json());  //body-parser 解析json格式数据

app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));

app.use("/proxy/*",apiProxy);


app.use("/hrldjgpt/*",apiProxy);

app.post("/api/",function(req,res){

    res.json(req.body);
    
});
app.use(express.static("src"));

app.listen(port);

console.log("Now serving is proxy");
