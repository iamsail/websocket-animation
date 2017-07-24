require('./style.css');

//封装$函数取id选择器
function $(id) {
    return document.getElementById(id);
}

var log =console.log.bind(console);

function handleOrientation(event) {
    var z = event.alpha,
        y = event.gamma,
        x = event.beta;

    var console = $("console");
    console.innerHTML = "Z轴："+ z +"</br>X轴："+ x +"</br>Y轴："+ y;
}

window.addEventListener('deviceorientation', handleOrientation);