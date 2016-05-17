// 装饰者模式, 装饰者模式类似于mixin模式, 也是一种结构型的模式
// 使用装饰者模式, 对象可以被新的行为包装或者"装饰", 然后可以继续被使用, 而不必担心被修改的基本对象
// 在不必改变原类文件和使用继承的情况下，动态地扩展一个对象的功能。它是通过创建一个包装对象，也就是装饰来包裹真实的对象。

function MacBook() {}

MacBook.prototype.add = function() {
	return 32;
}

function Decorator(item) {
	this.item = item;
}

Decorator.prototype.add = function() {
	return this.item.add() + 10;
}

var mac = new MacBook();

console.log(mac.add());

var dcMac = new Decorator();