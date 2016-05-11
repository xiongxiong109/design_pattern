// ����������ɵ�С����
var canvas = document.querySelector('#canvas');
var cnt = canvas.getContext("2d");
var pop = { // ����һ������, ������һ�����ݵ������������
	size: 5, // ���ݵĳߴ� 5px
	color: '#c00', // ���ݵ���ɫ
	x: 0, // ���ݵĳ�ʼλ��
	y: 0,
	init: function(opt) { // ��������
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

// ����һ������
function createPop(num){
	cnt.clearRect(0, 0, canvas.width, canvas.height);
	num = num || 10;
	var arr = [];
	for(var i = 0; i< num; i++) {
		var obj = {
			size: Math.floor(Math.random() * 5 + 5),
			color: colorArr[Math.floor(Math.random() * colorArr.length)],
			opacity: Math.random(),
			x: canvas.width / 2, // ��Բ�ĳ���
			y: canvas.height / 2,
			direcX: Math.round(Math.random()),
			direcY: Math.round(Math.random()),
			speed: Math.floor(Math.random() * 2 + 1) // ����ð�����ٶ�
		}

		var p = PopPrototype(obj);
		arr.push(p);
	}

	// drawPop(p);
	return arr;
}

var popArr = createPop(18);
drawPop();
// ��������
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

	if (p.direcX) { // ��������
		p.x += p.speed * Math.floor(Math.random() * 5);
	} else {
		p.x -= p.speed * Math.floor(Math.random() * 8);
	}

	if (p.direcY) { // ��������
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
��һ��#cd0000 ��0.5 ͸���ȵ���ɫת��Ϊһ��
rgba(r,g,b,a)���ַ�������

*/
function HexToRgba(hex, alpha) {
	var strArr = hex.split('#')[1];
	var r = parseInt([strArr[0], strArr[1]].join(''), 16);
	var g = parseInt([strArr[2], strArr[3]].join(''), 16);
	var b = parseInt([strArr[4], strArr[5]].join(''), 16);
	var a = alpha;

	return 'rgba(' + [r,g,b,a].join(',') + ')';
}