require('./style.css');
var ws = new WebSocket("ws://123.207.83.243:8083/");
// var ws = new WebSocket("ws://127.0.0.1:8083/");
var log = console.log.bind(console);
var info ={
    x:null,
    y:null,
    z:null
};

var width = screen.width; //设备屏幕宽度

//封装$函数取id选择器
function $(id) {
    return document.getElementById(id);
}


ws.onopen = function() {  //在成功建立连接时触发
    log("连接建立成功");
};

ws.onmessage = function (evt) { //服务端向客户端发送消息时触发
    var json = JSON.parse(evt.data); //解析json字符串
    if(width > 650){
        setRotateValue(cube,json.x,json.y,json.z);
    }
};



ws.onclose = function() { //在关闭连接时触发
    alert("Closed");
};

ws.onerror = function(err) { //在发生错误时触发
    alert("Error: " + err);
};

var cube = $('cube');

//设置旋转的角度
function setRotateValue(elem,x,y,z) {
    elem.style.transform =  "rotateX("+ x +"deg)" + "rotateY("+ y +"deg)" + "rotateZ("+ z +"deg)";
}

function handleOrientation(event) {
        info.z = event.alpha,
        info.y = event.gamma,
        info.x = event.beta;
        $('console').innerHTML = "Z轴："+event.alpha+"</br>X轴："+event.beta+"</br>Y轴："+event.gamma;
        log("Z轴："+event.alpha+"</br>X轴："+event.beta+"</br>Y轴："+event.gamma);
        log("执行了==== ");

        if(width < 650){ //手机发送自身的位置信息给服务端进行广播
            ws.send(Json.stringify(info));
        }
}
window.addEventListener('deviceorientation', handleOrientation);
// $('console').innerHTML = "Z轴："+event.alpha+"</br>X轴："+event.beta+"</br>Y轴："+event.gamma;
