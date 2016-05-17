// 默认配置项
var defaults = {
	'title': 'tips',
	'content': 'content'
}

// 实际配置项
var options = {
	'title': 'Hello',
	'cb': function() {
		console.log('x');
	}
}

// 使用options对defaults进行装饰, 而不是对defaults进行覆盖, 这样产出一个新的对象, 而不会影响到原有的defaults

var settings = $.extend({}, defaults, options);

console.log(settings);
console.log(defaults); // 这里的defaults并没有变, 这是一种装饰器的写法

var rewrite = $.extend(defaults, options);
console.log(rewrite);
console.log(defaults); // 这里的defaults已经被重写了

