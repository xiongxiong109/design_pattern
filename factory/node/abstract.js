// 抽象工厂模式
// 对比与一个具体的工厂模式而言,
// 一个具体的工厂函数有一系列具体的生产线,
// 使用具体的工厂函数, 可以构造出实现特定的对象实例
// 但是对于一个抽象的工厂而言,
// 抽象工厂就只需要负责实现对某一个满足该工厂生产条件的构造函数进行实例化生产
// 简而言之,抽象工厂不需要知道工厂具体应该拥有哪些生产线, 这些生产线也可以轻易地改变,
// 只要这些生产线满足一定的契约, 该工厂就可以对其投入生产

// 一个抽象工厂模块
var AbstractFactory = (function() {
	var type = []; // 这个工厂中投入生产产品的数组

	return {
		// 返回一个这个工厂中正在投入生产的某一个产品的实例
		'getProduct': function(productName) {
			if (type[productName]) {
				// 返回一个该产品的实例
				return new type[productName]();
			}
			// 如果该产品没有投入生产, 则返回null
			return null;
		},
		// 将某一个具体的构造函数投入到该工厂中生产
		'registerProduct': function(productName, Constructor) {
			var proto = Constructor.prototype;
			// 检测该产品是否满足某一特定的生产条件, 这里的生产条件假设为brand
			if (proto.brand) { // 如果满足该条件, 则在type数组写入该函数, 注册产品
				type[productName] = Constructor;
				return AbstractFactory;
			} else {
				return false;
			}
		}
	}
})();

module.exports = AbstractFactory;