// 抽象装饰者

var Base = function() {}

Base.prototype = {
	'add': function() {
		return 10;
	}
}

var CaseDecorator = function(item) {
	this.item = item;
}

CaseDecorator.prototype.add = function() {
	var v = this.item.add();
	return v + 10;
}

var b = new Base();
console.log(b.add());

// 装饰了外表
var cd = new CaseDecorator(b);

// 不会影响原来的实例

console.log(cd.add());
console.log(b.add());