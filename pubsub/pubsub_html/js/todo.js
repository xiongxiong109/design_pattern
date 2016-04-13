$(function() {

	$ipt = $(document.todoForm.todo);
	$bind = $(".bind");
	$wrap = $(".todo-list-wrap");
	$ipt.on('change', function(){
		var v = $(this).val();
		// 当数值发生变化时,发布valueChange消息
		$.publish('valueChanged', {value: v});
	});

	// 订阅valueChange事件
	var updateBind = $.subscribe('valueChanged', function(topic, obj) {
		console.log(topic);
		$bind.text(obj.value);
	});

	// 创建一个单例绑定,创建完毕后即取消订阅
	var onceBind = $.subscribe('valueChanged', function(topic, obj){
		var html = '<a href="javascript:void(0);" data-unbind="'+updateBind+'" class="cancel-btn">取消双向绑定</a>';

		$(document.todoForm).append(html);
		$.unsubscribe(onceBind);

		$(".cancel-btn").one('click', function(){
			$.unsubscribe(updateBind);
			$(this).remove();
		});
	});

	$(document.todoForm).on('submit', function(){
		var str = $ipt.val(); 
		if(str !== '') {
			$.publish('createDom', { content: str });
		}
	});

	var htmlStr = 
		'<div class="item">'
		+'<p>创建值<%= content %><a href="javascript:void(0);">删除</a></p>'
		+'</div>';
	var tpl = _.template(htmlStr);

	// 创建订阅器
	var submitSubscriber = $.subscribe('createDom', function(topic, content){
		$ipt.val('');
		$wrap.append(tpl(content));
	});

	$wrap.delegate('.item a', 'click', function(){
		$(this).parents('.item').remove();
	});
});