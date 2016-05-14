// 这个js提供mixin模块, 实现一系列的扩展功能

// 第一个功能块, 负责实现基本运动功能
var mixinBase = {
	move: function(name) {
		console.log(this.name + ' is moving');
	},
	stop: function() {
		console.log(this.name + ' is stopped');
	}
};

// 第二个功能块, 挂载特殊功能
var mixinSpecial = {
	shoot: function() { // 这里的this, 在混入之后, 指向了特定的实例
		console.log('fire!! ' + this.name + '!!');
	}
};

// 通过exports将mixin的方法暴露给外部去扩展

exports.mixinBase = mixinBase;
exports.mixinSpecial = mixinSpecial;