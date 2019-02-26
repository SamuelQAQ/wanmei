;(function(){
		//1.获取sid
		var $picid = parseInt(location.search.substring(1).split('=')[1]);
		
		console.log($picid);
		//2.将当前的id传给后端获取对应的数据
		$.ajax({
			url: 'http://localhost/html5-1810/Part%202/wanmei/wanmei/php/detail.php',
			data: {
				sid: $picid
			},
			dataType: 'json'
		}).done(function(data) {//data:后端返回的和id对应的数据
			var bg=data.burl.split(',');
			console.log(bg);
			$('.little').attr('src', data.url);
			$('.big img').attr('src', data.burl.split(',')[0]);
			$('.little img').eq(0).attr('src', data.burl.split(',')[0]);
			$('.little img').eq(1).attr('src', data.burl.split(',')[1]);
			$('.title_h').html(data.title);
			$('.price').html(data.price);
			var arr = data.urls.split(',');
			console.log(arr);
			var str = '';
			$.each(arr, function(index, value) {
				str += '<li><img src="' + value + '"/></li>';
			});
			$('#list ul').html(str);
			
		});
})();

//小图大图切换（透明度）
;(function(){
	$('.little img').each(function(index){
		$(this).on("click",function(){
			$(this).parent().css('opacity',1)
			$(this).parent().siblings().css('opacity',.4)
			$('.big img').attr('src',this.src)
		});
	});
})();

//购物数量加减
;(function(){
	$(function(){
		var $val=parseInt($('.number').val());
		$('.reduce').on('click',function(){
			if($val>=2){
				$val-=1;
			}
			$('.number').val($val);
		});
		$('.add').on('click',function(){
			$val+=1;
			$('.number').val($val);
		});
	});
})();