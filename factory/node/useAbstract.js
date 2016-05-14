// 尝试使用抽象工厂, 我们的产品只要满足有brand字段, 工厂就可以帮我们创建实例了

// 获取抽象工厂
var AbstractFactory = require('./abstract');

// 构造函数, 负责生产手机
function CreateXiaomi() {

}
CreateXiaomi.prototype = {
	'brand': 'xiaomi',
	'calling': function(name) {
		name = name || '';
		console.log(this.brand + ' is calling ' + name);
	}
}

AbstractFactory.registerProduct('xiaomi', CreateXiaomi);

var xiaomi = AbstractFactory.getProduct('xiaomi');	
xiaomi.calling('xiong');
