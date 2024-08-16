
window.onload = window.onresize = function() {
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight * 0.8;
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
