// 观察者模式
var ObserverList = require('./observer');

// 具体目标 subject

function Subject() {
	// 给具体的目标创建一个观察者列表实例
	this.observers = new ObserverList();
}

Subject.prototype.AddObserver = function(observer) {
	this.observers.Add(observer);
}

Subject.prototype.RemoveObserver = function(observer) {
	this.observers.RemoveIndexAt(this.observers.IndexOf(observer));
}

// 观察到目标发生变化时推送消息事件
// 具体做法是,循环observerlist列表,调用列表中所有observer的update方法
Subject.prototype.Notify = function(args) {
	for(var i = 0, l = this.observers.Count(); i < l; i++){
		this.observers.observerList[i].update();
	}
}

module.exports = Subject;