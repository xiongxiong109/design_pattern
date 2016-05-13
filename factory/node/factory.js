// 工厂模式也是一种创建型模式, 当所需要创建的对象十分复杂的时候, 可以使用工厂模式生成

// 工厂模式中的工厂, 负责完成各种生产线, 并且一个工厂会有多个生产线,
// 工厂函数把具体的生产线函数挂载到了自己的prototype上, 并通过自身的创建方法来new 一个生产线函数的实例, 并传递参数到实例中去
var _ = require('underscore');

// 假设我司研发部是一个工厂
function FangpinhuiDev() {}

// 研发中心创建新产品: C端、B端、经纪人

// C端产品
function C(options) {
	this.app = ['ios', 'android'];
	this.web = ['php', 'h5'];
	this.options = _.extend({}, options);
}

// B端产品
function B(options) {
	this.web = ['h5', 'weixin'];
	this.options = _.extend({}, options);
}

// 经纪人端
function Finatial() {
	this.web = 'hold'; // 维护
}

// 生产的产品类型默认为C端产品
FangpinhuiDev.prototype.productType = C; 

// 创建某一个产品
FangpinhuiDev.prototype.create = function(options) {
	if (options.type == 'C') { // 这里的'C'是配置的字符串
		this.productType = C; // 而这里的C则是一个构造函数
	} else {
		this.productType = B;
	}

	// 返回对应的一个带有options的构造函数的实例
	return new this.productType(options);

}

// 对外接口为房品汇研发中心
module.exports = FangpinhuiDev;

