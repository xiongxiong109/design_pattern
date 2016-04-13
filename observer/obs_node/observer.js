// 观察者模式

// 一个Subject所可能拥有的一系列依赖Observer

function Observer() {
	this.observerList = [];
}

// 向Observer的list中push新的observer

Observer.prototype.Add = function(obj) {
	return this.observerList.push(obj);
}

// 清空观察者列表

Observer.prototype.Empty = function() {
	this.observerList = [];
}

Observer.prototype.Count = function() {
	return this.observerList.length;
}

// 获取某个具体观察者

Observer.prototype.Get = function(idx) {
	if (idx > -1 && idx <= this.Count()) {
		return this.observerList[idx];
	}
}

Observer.prototype.RemoveIndexAt = function(idx) {
	if (idx === 0) {
		this.observerList.shift();
	} else if (idx === this.Count() - 1) {
		this.observerList.pop();
	} else {
		this.observerList.splice(idx, 1);
	}
}

// 查找列表中某个元素的索引
Observer.prototype.IndexOf = function(obj) {
	var _self = this;
	for (var i = 0, l = _self.Count(); i < l; i++) {
		if (_self.observerList[i] == obj){
			return i;
		}
	}
	return -1;
}

module.exports = Observer;