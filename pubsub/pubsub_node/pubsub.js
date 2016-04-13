// 发布/订阅模式

var pubsub = {
	topics: [], // 话题数组
	topicId: -1, // 话题id,每一次的订阅都会更新topicId

	// 发布一个话题topic,并携带话题相关的参数,执行订阅了该话题的订阅者的func函数
	publish: function(topic, args) {
		var _topics = this.topics;
		// 如果发布的话题不存在, 返回false
		if (!_topics[topic]) {
			return false;
		}

		var subscribers = _topics[topic];
		var len = subscribers.length || 0;

		while (len--) {
			subscribers[len].func(topic, args);
		}
		return this; // 发布者返回this, 可以链式发布
	},

	// 订阅一个话题,并规定订阅后的函数回调func
	subscribe: function(topic, func) {
		var _topics = this.topics;
		if (!_topics[topic]) {
			_topics[topic] = [];
		}
		var token = ++this.topicId;

		_topics[topic].push({
			token: token,
			func: func
		});
		return token; // 订阅者返回订阅者id
	},

	// 取消订阅某个话题, 这时是根据subscribe的token来删除的
	unsubscribe: function(token) {
		var _topics = this.topics;
		for (var m in _topics) {
			if (_topics[m]) { //如果话题存在
				for (var i = 0; i < _topics[m].length; i++) {
					if (_topics[m][i].token === token){
						_topics[m].splice(i, 1);
						return token;
					}
				}
			}
		}
	}
}

module.exports = pubsub;