// 观察者模式实例
/*
理解: 观察者模式中有Observer 与 Subject的概念
1. 一个Observer拥有一个具体观察者列表, 以及一系列针对该列表的增删改查的方法
2. 一个Subject拥有一个属于自己的Observer实例,并拥有一系列操作该实例中具体观察者的方法
3. 这个Subject还拥有一个特殊的方法,主要用于通知所有具体观察者触发某个观察事件
4. 每个具体观察者都有一个统一的响应通知的方法, 而这个方法可以根据具体观察者所需要执行的任务而分别定制
*/

var ObserveredSub = require('./subject');

var subject = new ObserveredSub();

// 拥有许多具体方法的observer, 这里主要是update方法
var observer1 = {
	update: function() {
		console.log('我是第一个观察者');
	}
};

var observer2 = {
	update: function() {
		console.log('我是第二个观察者');
	}
}

console.log('添加观察者1');
subject.AddObserver(observer1);
console.log('通知所有观察者update');
subject.Notify();
console.log('添加观察者2');
subject.AddObserver(observer2);
console.log('通知所有观察者update');
subject.Notify();
console.log('移除第一个观察者');
subject.RemoveObserver(observer1);
console.log('通知所有观察者update');
subject.Notify();