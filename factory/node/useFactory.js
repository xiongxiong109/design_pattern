// 引入房品汇研发中心,并生成一个工厂函数实例
var FangpinhuiDev = require('./factory');
var Dev = new FangpinhuiDev();

// 开发C端app产品
var cApp = Dev.create({
	type: 'C', // 该产品属于C端
	menthod: {
		'find': function() {
			console.log('C端app看房服务');
		}
	}
});

// 开发C端微信端产品
var cWeixin = Dev.create({
	type: 'C',
	method: {
		'show': function() {
			console.log('C端微信端H5产品');
		}
	}
});

// 开发B端商户touch端产品
var bTouch = Dev.create({
	type: 'B',
	author: '熊熊109',
	method: {
		'touch': function() {
			console.log('B端touch端产品');
		}
	}
});

// 开发B端商户PC端产品
var bPC = Dev.create({
	type: 'B',
	author: '小小酱油熊',
	duration: 8, // 8天开发完成
	method: {
		'go': function() {
			console.log('gogogo');
		}
	}
});

console.log(cWeixin); // 同样一个来自C的实例
console.log(cApp); // 来自C的实例
console.log(bTouch);
console.log(bPC);
// 输出bPC的创建者与bTouch的创建者, 发现两者是来自同一构造函数的不同实例
console.log(bPC.constructor === bTouch.constructor);