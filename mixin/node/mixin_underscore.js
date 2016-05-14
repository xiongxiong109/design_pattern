// mixin混入模式, 是一种结构型的模式,使用这种模式, 涉及到的概念有子类和超类。
// B类的所有实例从A类那里继承了方法, 并且B类仍然可以定义自己的方法,包括对A类原有
// 方法的重写, 那么我们说B类是一个子类, A类就是一个超类
// 笼统地说就是综合多个类的功能产生一个类

// 实例: 实现underscore的_.extend方法

var _ = require('underscore');

var mixinBase = require('./mixin').mixinBase;
var mixinSpecial = require('./mixin').mixinSpecial;
// 汽车构造函数
function Car(name) {
	this.name = name;
};

// 坦克构造函数
function Tank(name) {
	this.name = name;
};

// 给普通汽车的prototype挂载最基本的运动方法
_.extend(Car.prototype, mixinBase);

//给坦克挂载基本运动方法与开炮方法
_.extend(Tank.prototype, mixinBase);
_.extend(Tank.prototype, mixinSpecial);

// 生产奔驰轿车
var car = new Car('benchi');

car.move();
// car.shoot(); // 普通汽车无法开炮

// 生产虎式坦克
var tank = new Tank('Tiger');

tank.move();
tank.shoot();