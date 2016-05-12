// command 命令模式
/* 命令模式提供了一种分离职责的手段 
*  让我们可以通过形如commonder.execute('commond'[, arguments]);的形式发出命令,执行方法
*  例如我们可以模拟angularjs的依赖注入, 使用invoker方法, 注入angularjs的自定义服务
*/

// 一个模块模式, 这里的angular就是命令的发出者, invoker就是负责下达命令的注入器, _privateMenthods就是具体实现命令的方法集合
var angular = (function() {
	// 私有方法
	var _privateMenthods = {
		'http': function(url, type, data, cb) {
			console.log(arguments);
			console.log('http service');
		}
	}

	return {
		/*注入器, 通过这个invoker函数去访问私有属性和方法*/
		invoker : function(methodName) {
			// slice() 方法可从已有的数组中返回选定的元素。
			// arrayObject.slice(start,end)
			// 这里这样做, 就返回了数组除了第一个参数以外的所有其他参数(第一个参数为方法名)
			// console.log([].slice.call(arguments, 1));
			_privateMenthods[methodName] &&
			// 这里的arguments可以获取实参的个数, 其中默认第一个实参是方法名,后面的参数则直接传递到具体的方法中去执行
			_privateMenthods[methodName].apply(this, [].slice.call(arguments, 1));
		}	
	}
})();

angular.invoker('http', '/getList', {'name': 'xiong'}, function(data) {
	console.log(data);
});