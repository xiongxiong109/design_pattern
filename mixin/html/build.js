// 创建元素, 采用mixin混入方式

var oBtn = document.querySelector("#build");

var json = {};

var mixin = {
	wheel: HasWheel,
	weapon: HasWeapon,
	dash: HasDash
}

var oForm = document.forms['build'];
var oFactory = document.querySelector("#carFactory");

oBtn.onclick = build;


function Car() {
	var dom = document.createElement('div');
	dom.className = 'item';
	this.dom = dom;
}

// 根据json判断创建哪些元素
Car.prototype.create = function(json) {
	var _this = this;
	var dom = this.dom.cloneNode();
	dom.innerHTML = '<div class="item-body"></div>';
	for (var key in json) {
		if (json[key]) {
			dom.appendChild(_this[key]());
		}
	}

	oFactory.appendChild(dom);
	
}
// 有轮子
function HasWheel() {
	var oDiv = document.createElement('div');
	var oItem = oDiv.cloneNode();
	oItem.className = 'item-wheel';
	oDiv.className = 'item-wheel-wrap';

	oDiv.appendChild(oItem.cloneNode());
	oDiv.appendChild(oItem);
	return oDiv;
}

// 有大炮
function HasWeapon() {
	var oDiv = document.createElement('div');
	oDiv.className = 'item-weapon';
	return oDiv;
}

// 有灰尘
function HasDash() {
	var oDiv = document.createElement('div');
	var oItem = oDiv.cloneNode();
	oItem.className = 'item-dash';
	oDiv.className = 'item-dash-wrap';

	oDiv.appendChild(oItem.cloneNode());
	oDiv.appendChild(oItem);
	return oDiv;

}

function build() {

	// 根据选项配置不同的车辆
	for(var key in mixin) {
		if(oForm[key].checked) { // 如果勾选了配置项, 则将对应的mixin挂载到Car上
			Car.prototype[key] = mixin[key];
			json[key] = true;
		} else { // 否则删除Car对应的属性
			delete Car.prototype[key];
			json[key] = false;
		}
	}

	var car = new Car();

	car.create(json);

}