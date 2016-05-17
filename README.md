# Javascript设计模式学习 #

> 任何能用JavaScript重写的程序，最终都会用JavaScript来实现

设计模式（Design pattern）是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。使用设计模式是为了可重用代码、让代码更容易被他人理解、保证代码可靠性。

### JavaScript中,常用的设计模式有: ###

- [观察者(**observer**)模式](#observer "观察者模式")
- [[发布/订阅(**pub/sub**)模式](#pubsub "发布/订阅模式")
- [原型(**prototype**)模式](#prototype "原型模式")
- [单例(**singleton**)模式](#singleton "单例模式")
- [外观(**facade**)模式](#facade "外观模式")
- [命令(**command**)模式](#command "命令模式")
- [工厂(**factory**)模式](#factory "工厂模式")
- [抽象(**abstract**)工厂模式](#abstract "抽象工厂")
- [混入(**mixin**)模式](#mixin "混入模式")
- [装饰者(**decorator**)模式](#decorator "装饰者模式")


### <h2 id="observer">观察者模式的理解</h2> ###

**理解**: 观察者模式中有Observer 与 Subject的概念

1. 一个`Observer`拥有一个具体观察者列表, 以及一系列针对该列表的增删改查的方法
2. 一个`Subject`拥有一个属于自己的`Observer`实例,并拥有一系列操作该实例中具体观察者的方法
3. 这个`Subject`还拥有一个特殊的方法,主要用于通知所有具体观察者触发某个观察事件
4. 每个具体观察者都有一个统一的响应通知的方法, 而这个方法可以根据具体观察者所需要执行的任务而分别定制

### <h2 id="pubsub">发布/订阅模式理解</h2> ###

**理解**: 

&nbsp;&nbsp;&nbsp;&nbsp;订阅发布模式定义了一种一对多的依赖关系，让多个订阅者对象同时监听某一个主题对象。这个主题对象在自身状态变化时，会通知所有订阅者对象，使它们能够自动更新自己的状态。
将一个系统分割成一系列相互协作的类有一个很不好的副作用，那就是需要维护相应对象间的一致性，这样会给维护、扩展和重用都带来不便。当一个对象的改变需要同时改变其他对象，而且它不知道具体有多少对象需要改变时，就可以使用订阅发布模式了。
一个抽象模型有两个方面，其中一方面依赖于另一方面，这时订阅发布模式可以将这两者封装在独立的对象中，使它们各自独立地改变和复用。订阅发布模式所做的工作其实就是在解耦合。让耦合的双方都依赖于抽象，而不是依赖于具体，从而使得各自的变化都不会影响另一边的变化。

### <h2 id="prototype">prototype原型模式理解</h2> ###
我们可以认为Prototype是基于原型继承的模式
这里可以引出经典的使用prototype原型在js中实现继承

```js
    function CarPrototype() {
    	// 创建一个空的构造函数
    	function F(){}
    	// 将这个构造函数的引用指向Car对象
    	F.prototype = Car;
    	// 返回一个F的实例
    	return new F();
    } 
```

### <h2 id="singleton">单例模式理解</h2> ###
&nbsp;&nbsp;&nbsp;&nbsp;单例模式可以最简单地理解为: 这个实例只会被创建一次, 当初始化该实例时, 如果全局中已有该实例， 则返回该实例的引用， 否则创建该实例后再返回该实例的引用。

```js
	// 采用单例模式创建一个对象
	var Command = (function() {

		var instance;
		// 创建一个初始化Commander的方法
		function initCommander() {
			return {
				'show': function() {
					console.log('x');
				}
			}
		}

		return {
    	// 获取Commander, 如果不存在该实例, 
		// 则创建该实例再引用, 如果存在, 则直接返回该实例
			getCommander: function() { 
				if (!instance) {
					instance = initCommander();
				}
				return instance;
			}
		}
	})();
```

### <h2 id="facade">外观模式理解</h2> ###
&nbsp;&nbsp;&nbsp;&nbsp;外观模式为更大的代码体提供了一个方便的高层次接口, 隐藏了底层实现的真实复杂性，可以把它想象成是简化了API来提供给开发人员。
&nbsp;&nbsp;&nbsp;&nbsp;比如在jQuery中, 我们使用`$()`去获取元素，使用`$().css()`去改变元素的样式，使用`$.fn.animate`调用方法时，jQuery内部已经做了大量的复杂操作，包括浏览器的兼容性、属性的正确性等，而我们只需要关注最终的结果即可。
&nbsp;&nbsp;&nbsp;&nbsp;外观模式既能简化类的接口，又能把类从使用它的代码中解耦，使得我们能够间接地与子系统进行交互。

### <h2 id="command">命令模式理解</h2> ###
&nbsp;&nbsp;&nbsp;&nbsp;实现命令模式，需要一个命令的发出者, 一个命令的接受者以及实现该命令的具体方法。
使用命令模式，我们可以通过命令的方式来实现对私有方法的调用。命令模式成功地将执行者与命令者进行了解耦，分离了职责。
我们使用命令模式时，会写出形如下面所示的代码

```js
    Commander.execute('command', [arg1, arg2...]);
```

这样的话，其实每一个具体的命令对应的函数的参数都是可以随意更改的，因为私有方法中并不会定死某一个参数，而是会根据命令发出时的arg1、arg2去动态配置实参。

&nbsp;&nbsp;&nbsp;&nbsp;Commaner需要有一个执行对象的方法，这个方法巧妙地利用了函数中的`arguments`这个**类**数组。

方法如下:

```js
	Commander.execute = function(methodName) {
		_privateMethods[methodName] &&
		_privateMethods[methodName].apply(Commander, [].slice.call(arguments, 1));
	}
```
解读:

`arguments`是一个类数组,所以要使用数组的slice方法将arguments中除了方法名以外的其他参数都切出来，并交给私有方法去执行，所以使用了`[].slice.call()`,并且call中的对象是arguments。
然后私有方法在执行时，又改变了`this`指向，所以使用了`apply(Commander, ...)`。

执行：

```js
	Commander.execute('update', 'xxx', 'ooo');
```

### <h2 id="factory">工厂模式理解</h2> ###

&nbsp;&nbsp;&nbsp;&nbsp;工厂模式也是一种创建型模式, 当所需要创建的对象十分复杂的时候, 可以使用工厂模式生成。工厂模式中的工厂, 负责完成各种生产线, 并且一个工厂会有多个生产线。工厂函数把具体的生产线函数挂载到了自己的prototype上, 并通过自身的创建方法来new 一个生产线函数的实例, 并传递参数到实例中去, 如下所示:

```js
    // 1号生产线
    function Shengchanxian1(opt){}
    
    // 2号生产线
    function Shengchanxian2(opt){}
    
    // 工厂
    function Factory(){}
    
    // 工厂默认走1号产品生产线
    Factory.prototype.lineType = Shengchanxian1;
    
    // 工厂有一个创建产品的方法，这个方法可以指定工厂生产哪个生产线
    Factory.prototype.createProduct = function(opt) {
    	if (opt.type == '1') { // 走1号生产线
    		this.lineType = Shengchanxian1;
    	} else { // 走2号生产线
    		this.lineType = Shengchanxian2;
    	}
    	// 返回一个特定生产线的生产函数的实例, 开始生产
    	// 这里的opt通过用户操作工厂Factory获取， 然后在这里传递给了特定的生产线构造函数
    	return new this.lineType(opt);
    }
```

### <h2 id="abstract">抽象工厂模式理解</h2> ###
抽象工厂模式

&nbsp;&nbsp;&nbsp;&nbsp;对比与一个具体的工厂模式而言,一个具体的工厂函数有一系列具体的生产线,使用具体的工厂函数, 可以构造出实现特定的对象实例。

&nbsp;&nbsp;&nbsp;&nbsp;但是对于一个抽象的工厂而言,抽象工厂就只需要负责实现对某一个满足该工厂生产条件的构造函数进行实例化生产简而言之,抽象工厂不需要知道工厂具体应该拥有哪些生产线, 这些生产线也可以轻易地改变,只要这些生产线满足一定的契约, 该工厂就可以对其投入生产。

```js
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
```

### <h2 id="mixin">混入(mixin)模式</h2> ###

&nbsp;&nbsp;&nbsp;&nbsp;mixin混入模式, 是一种结构型的模式,使用这种模式, 涉及到的概念有**子类**和[超类](http://baike.baidu.com/link?url=553RoY0O0LrnZ-ak2y2tXzBJLn9ASFXdAEBuG1BYOPeInheWhbeWcck_nDphdgypaKQoPwaFE78H3C-yb3Hz1_ "超类")。

> B类的所有实例从A类那里继承了方法, 并且B类仍然可以定义自己的方法,包括对A类原有
> 方法的重写, 那么我们说B类是一个子类, A类就是一个超类笼统地说就是综合多个类的功能产生一个类。

实现mixin最重要的一个方法就是实现对对象的扩展:

```js
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
```

### <h2 id="decorator">装饰者模式</h2> ###

&nbsp;&nbsp;&nbsp;&nbsp;装饰者模式, 装饰者模式类似于mixin模式, 也是一种结构型的模式。
使用装饰者模式, 对象可以被新的行为包装或者"装饰", 然后可以继续被使用, 而不必担心被修改的基本对象。
在不必改变原类文件和使用继承的情况下，动态地扩展一个对象的功能。它是通过创建一个包装对象，也就是装饰来包裹真实的对象。最常见的就是jquery中的`$.extend`方法

```js
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
```
