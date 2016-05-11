// 创建随机生成的小泡泡
var canvas = document.querySelector('#canvas');
var cnt = canvas.getContext("2d");
var pop = { // 这是一个基类, 负责定义一个泡泡的最基本的属性
	size: 5, // 泡泡的尺寸 5px
	color: '#c00', // 泡泡的颜色
	x: 0, // 泡泡的初始位置
	y: 0,
	init: function(opt) { // 创建泡泡
		var _this = this;
		for(var key in opt) {
			_this[key] = opt[key];
		}
	}
};

function PopPrototype(opt) {
	var F = function() {};
	F.prototype = pop;
	var f = new F();
	f.init(opt);
	return f;
}

// var p = PopPrototype({
// 	size: 6,
// 	width: 8
// });

var colorArr = ['#cd0000', '#00cd00', '#0000cd', '#cdcd00', '#00cdcd'];

createPop();

// 创建一个泡泡
function createPop(num){
	cnt.clearRect(0, 0, canvas.width, canvas.height);
	num = num || 10;
	var arr = [];
	for(var i = 0; i< num; i++) {
		var obj = {
			size: Math.floor(Math.random() * 5 + 5),
			color: colorArr[Math.floor(Math.random() * colorArr.length)],
			opacity: Math.random(),
			x: canvas.width / 2, // 从圆心出来
			y: canvas.height / 2,
			direcX: Math.round(Math.random()),
			direcY: Math.round(Math.random()),
			speed: Math.floor(Math.random() * 2 + 1) // 泡泡冒出的速度
		}

		var p = PopPrototype(obj);
		arr.push(p);
	}

	// drawPop(p);
	return arr;
}

var popArr = createPop(18);
drawPop();
// 绘制泡泡
function drawPop(){

	cnt.clearRect(0, 0, canvas.width, canvas.height);

	for (var i =0; i< popArr.length; i++) {

		run(popArr[i]);

	}

	requestAnimationFrame(drawPop);
}

function run(p) {

	cnt.save();
	var rgbaColor = HexToRgba(p.color, p.opacity);
	cnt.fillStyle = rgbaColor;
	if(p.x <= 0 || p.x >= canvas.width) {
		p.x = canvas.width / 2;
		p.y = canvas.height /2;
		p.speed = Math.floor(Math.random() * 2 + 1);
		p.direcX = Math.round(Math.random());
		p.direcY = Math.round(Math.random());
	}

	if (p.direcX) { // 左右乱跑
		p.x += p.speed * Math.floor(Math.random() * 5);
	} else {
		p.x -= p.speed * Math.floor(Math.random() * 8);
	}

	if (p.direcY) { // 上下乱跑
		p.y += p.speed * Math.floor(Math.random() * 8);
	} else {
		p.y -= p.speed * Math.floor(Math.random() * 5);
	}
	var size = p.size * (Math.random() * 0.4 + 0.8);
	cnt.beginPath();
	cnt.arc(p.x, p.y, size, 0, Math.PI * 2, false);
	cnt.closePath();
	cnt.fill();
	cnt.restore();
}

/*
将一个#cd0000 与0.5 透明度的颜色转换为一个
rgba(r,g,b,a)的字符串返回

*/
function HexToRgba(hex, alpha) {
	var strArr = hex.split('#')[1];
	var r = parseInt([strArr[0], strArr[1]].join(''), 16);
	var g = parseInt([strArr[2], strArr[3]].join(''), 16);
	var b = parseInt([strArr[4], strArr[5]].join(''), 16);
	var a = alpha;

	return 'rgba(' + [r,g,b,a].join(',') + ')';
}