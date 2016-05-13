// Bear UI 组件库
var BUI = (function(){

	function _bindEvents(evs, dom) {

		if (evs) { // 如果有事件绑定
			for (var ev in evs) { // 遍历所有ev, 绑定事件

				dom.addEventListener(ev, function() {
					// 将外部的this指向到创建的dom上
					evs[ev].call(dom);
					// console.log();
				}, false);

			}
		}

	}

	var _uis = {
		// 按钮
		'button': function(opt) {
			var oBtn = document.createElement('button');
			oBtn.innerHTML = opt.text;

			// 给元素绑定事件
			_bindEvents(opt.events, oBtn);
			return oBtn; // 返回创建好了的btn dom

		},
		// 弹出框
		'messageBox': function(opt) {},
		// 输入框
		'input': function(opt) {
			var oIpt = document.createElement('input');
			oIpt.type = opt.inputType || 'text';
			oIpt.value = opt.value || '';
			_bindEvents(opt.events, oIpt);
			return oIpt;
		}
	}

	return {
		create: function(options) {
			return _uis[options.type || 'button'](options);
		}
	}

})();