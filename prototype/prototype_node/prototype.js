// Prototype(原型模式)
// Prototype模式中,所有的子对象都指向同一个相同的函数

// "use strict";

var Car = {
	name: 'Bear Car',
	drive: function() {
		console.log('running...')
	},
	changeName: function(name) {
		this.name = name || '';
	}
}

// 使用Object.create实例化了一个新的Car, 这个Car的属性和方法完全由上面的Car继承而来
// 但是对SubCar的修改并不会影响到Car本身的变化
// Object.create是ES5中提出的一种新的创建对象的方式
var SubCar = Object.create(Car);

SubCar.changeName('熊仔');

// Prototype模式还可以实现差异继承, 即,在继承的同时还可以添加自定义的属性和方法
var NewCar = Object.create(Car, {
	core: { // 本车拥有高级内核
		value: "X5",
		writable: false // 该属性不可写
	},
	levelUp: {
		configurable: false,
		get: function() { // 当尝试访问该值时, 会执行这个函数
			return this.core;
		}
	}
});

NewCar.core = 'qq'; // qq 想盗版本车, 把内核偷偷改成了qq, 然而该属性并不可写,且严格模式下写入该属性会报错

// console.log( NewCar.levelUp );
// console.log(NewCar.core);
// console.log(Car.name);
// console.log(SubCar.name);

// 如果不想使用Object.create, 同时仍然想用Prototype模式来实现对象的继承与引用,
// 那么也可以使用最经典的Prototype原型链继承

function CarPrototype() {
	// 创建一个空的构造函数
	function F(){}
	// 将这个构造函数的引用指向Car对象
	F.prototype = Car;
	// 返回一个F的实例
	return new F();
}

var Benci = CarPrototype();
Benci.changeName('Benci');
console.log(Benci.name);

console.log(Car.name);