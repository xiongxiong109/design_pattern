// ����ʹ�ó��󹤳�, ���ǵĲ�ƷֻҪ������brand�ֶ�, �����Ϳ��԰����Ǵ���ʵ����

// ��ȡ���󹤳�
var AbstractFactory = require('./abstract');

// ���캯��, ���������ֻ�
function CreateXiaomi() {

}
CreateXiaomi.prototype = {
	'brand': 'xiaomi',
	'calling': function(name) {
		name = name || '';
		console.log(this.brand + ' is calling ' + name);
	}
}

AbstractFactory.registerProduct('xiaomi', CreateXiaomi);

var xiaomi = AbstractFactory.getProduct('xiaomi');	
xiaomi.calling('xiong');
