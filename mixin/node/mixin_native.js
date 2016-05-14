// 使用原生的方法实现_.extend的mixin;
// 实现对象的混入
// extend(Constructor, mixin[, arg1, arg2]); 如果有三个以上的参数, 那么后续参数表示只扩展特定的方法,
// 如果只有两个参数, 则表示全部扩展并且只扩展, 不覆盖

"use strict";

var mixinBase = require('./mixin').mixinBase;
var mixinSpecial = require('./mixin').mixinSpecial;

/*
Constructor是一个构造函数,
mixin是一个json对象,
这里将mixin的属性和方法扩展到构造函数的prototype中
*/

function extend(Constructor, mixin) {
	// console.log('extend');
	if (arguments[2]) { // 有三个以上的参数, 至扩展特定的参数
		for (var i = 2, l = arguments.length; i < l; i++) {
			Constructor.prototype[arguments[i]] = mixin[arguments[i]];
		}
	} else { // 扩展所有参数
		for (var methodName in mixin) {
			if (!Constructor.hasOwnProperty(methodName)) { // 如果构造函数本身没有该方法, 则扩展一个该方法
				Constructor.prototype[methodName] = mixin[methodName];
			}
		}
	}
}

function Car(name) {
	// console.log('car');
	this.name = name || '';
}

function Tank(name) {
	this.name = name || '';
}

// 扩展的prototype必须写在实例创建后方法调用之前, 但是不一定要写在实例创建之前,
// 只有实例的方法在调用的时候,才会顺着原型链往父级上去找对应的方法

extend(Car, mixinBase);
extend(Tank, mixinBase);
extend(Tank, mixinSpecial);

var car = new Car('porsche');
car.move();

var tank = new Tank('90 Tank');
tank.move();
tank.shoot();