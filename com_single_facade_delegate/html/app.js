// 外观模式, 在内部对绑定事件的兼容性做了处理, 对外部就只有一个简化的api
var Facade = (function(){

	var bind = function(dom, ev, fn) { // 实现事件绑定的兼容性写法
			if (dom.addEventListener) {
				dom.addEventListener(ev, fn);
			} else {
				dom.attachEvent('on' + ev, fn);
			}
		}

	return {
		bind: bind
	}

})();

// 采用单例模式创建一个Command对象
var Command = (function() {

		var instance;
		// 创建一个初始化Commander的方法,
		// 这是一个模块内的私有方法, 采用命令模式编写, 
		// 外部只能通过暴露出去的execute方法来通过执行命令的方式来调用私有方法
		function initCommander() {

			var _privateMethods = {
				// 更新视图数据
				'update': function(value, responseDom) {
					responseDom.innerHTML = value;
				},
				// 清除文本数据
				'clear': function(input) {
					input.value = '';
				},
				// 输入框聚焦
				'focus': function(input) {
					input.focus();
				},
				// 创建dom
				'create': function(value, parentDom) {
					var oDiv = document.createElement('div');
					oDiv.innerHTML = value + '<a href="javascript:void(0);">删除</a>';
					parentDom.appendChild(oDiv);
				},
				// 事件代理, 事件代理的原理是把事件绑定到父级,利用事件的冒泡机制与srcElement找到事件源,并对动态生成的或者大量的元素进行事件操作
				'delegate': function(oParent, oItem, ev, fn) {
					Facade.bind(oParent, ev, function(e) {
						// 使用不区分大小写的正则来匹配事件代理的元素
						var regNodeName = new RegExp(oItem, 'i');
						if (regNodeName.test(e.srcElement.nodeName)) { // 事件源是匹配的,执行事件函数
							fn && fn.call(e.srcElement);
						}
					});
				},
				// 删除某个dom元素
				'remove': function(targetDom) {
					targetDom.parentNode.removeChild(targetDom);
				}
			}
			return {
				execute: function(methodName) {
					_privateMethods[methodName] &&
					_privateMethods[methodName].apply(instance, [].slice.call(arguments, 1));
				}
			}
		}

		return {
			getCommander: function() { // 获取Commander, 如果不存在该实例, 则创建该实例再引用, 如果存在, 则直接返回该实例
				if (!instance) {
					instance = initCommander();
				}
				return instance;
			}
		}
})();