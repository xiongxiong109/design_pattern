var pubsub = require('./pubsub');

function log(topic, data){
	console.log('\n您所订阅的' + topic + '发布了一个消息:');
	console.log('携带的数据:' + data);
	console.log('接收时间:' + new Date());
}
// 订阅一个消息
var subscription = pubsub.subscribe('test/pubSub', log);

pubsub.publish('test/pubSub','一条字符串');

// 订阅html5 weekly
var html5 = pubsub.subscribe('html5 weekly', log);
// 订阅js weekly
var js = pubsub.subscribe('javascript weekly', log);

setTimeout(function(){
	pubsub.publish('html5 weekly', '今日要闻html5');
	// 取消订阅html5
	pubsub.unsubscribe(html5);
}, 1e3);

// 取消订阅后下面这个消息即使发布了也不会被接收
setTimeout(function(){
	pubsub.publish('html5 weekly', '今日要闻html6');
}, 2e3);

setTimeout(function(){
	pubsub.publish('javascript weekly', '今日要闻js');
}, 4e3);