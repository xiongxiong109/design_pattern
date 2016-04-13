// todo
var oForm = document.todoForm;
var oInput = oForm.todo;

var sub = new Subject();

// 计数器观察者

var countObserver = {
	el : '#count',
	fetch: '.item',
	update: function() { // 计算列表长度
		var oCounter = document.querySelector(this.el);
		var oFetch = document.querySelectorAll(this.fetch);
		oCounter.innerText = oFetch.length;
	}
}

// 添加元素观察者
var createObserver = {
	el:'.list',
	update: function() { // 创建新的列表
		var oList = document.querySelector(this.el);
		if (oInput.value !=''){
			var oFrag = document.createElement('li');
			oFrag.className = 'item';
			oFrag.innerHTML = oInput.value;
			oList.appendChild(oFrag);
			oInput.value = '';
			oInput.focus();
		}
	}
}

sub.AddObserver(createObserver);
sub.AddObserver(countObserver);
sub.Notify();

oForm.onsubmit = function(e) {
	e.preventDefault();
	sub.Notify(); 
	//这里有点小问题,计数器观察者应该在最后触发,因为是使用的
	//for循环来依次执行observer 的update方法,所以有先后顺序的区别,
	//如果先执行了countObserver再执行createObserver,那么计算长度就会少一位
}