;(function($){
	//话题列表
	$.topics = [], $.topicId = -1;

	// 发布操作,发布一个话题,执行相关函数
	$.publish = function(topic, args) {

		if (!$.topics[topic]) {
			return false;
		}
		// 实际上publish的topic和args是闭包变量
		$.each($.topics[topic], function(idx, suber) {
			suber.func(topic, args);
		});
	}

	// 订阅操作,以及声明订阅后的回调
	$.subscribe = function(topic, func){
		if (!$.topics[topic]) {
			// 如果该话题为空,则创建一个空数组
			$.topics[topic] = [];
		}
		$.topicId++;
		$.topics[topic].push({
			tId: $.topicId,
			func: func
		});
		return $.topicId; // 返回订阅id,作为取消订阅时的依据
	}
	// 取消订阅
	$.unsubscribe = function(tId){
		for( var m in $.topics ){
			if($.topics[m]){ 
			// 针对某同一个话题可能会有多个不同的订阅者,所以每一个topics[i]都是一个数组
				for(var i = 0; i < $.topics[m].length; i++) {
					if($.topics[m][i].tId === tId){
						$.topics[m].splice(i, 1);
						return tId;
					}
				}
			}
		}
	}

})(jQuery);