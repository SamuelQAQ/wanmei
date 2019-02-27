;(function(){
		//1.获取sid
		var $picid = parseInt(location.search.substring(1).split('=')[1]);
		
		console.log($picid);
		//2.将当前的id传给后端获取对应的数据
		$.ajax({
			url: 'http://10.31.162.48/html5-1810/Part%202/wanmei/wanmei/php/detail.php',
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
			$('.title_h').attr('sid', data.sid);
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

//购物车按钮
;(function(){
	var arrsid = []; //商品的sid
	var arrnum = []; //商品的数量
	function cookietoarray(){
		if($.cookie('cookiesid') && $.cookie('cookienum')) {//判断商品是第一次存还是多次存储
			arrsid = $.cookie('cookiesid').split(','); //cookie商品的sid  
			arrnum = $.cookie('cookienum').split(','); //cookie商品的num
		}
	};
	$('.btn a').on('click', function() { //点击加入购物车按钮。
		//location.reload(true);
		//判断当前的商品sid是否存在购物车(cookie)
		//判断当前的按钮对应的商品的sid和取出的cookie里面的sid进行比较
		
		//获取当前的按钮对应的商品的sid
		var $sid = $(this).parents('#details').find('.title_h').attr('sid');
		cookietoarray();//获取已经存在的cookie值。
		
		if($.inArray($sid, arrsid) != -1) { //商品存在，数量叠加 
			//先取出cookie中的对应的数量值+当前添加的数量值，添加到对应的cookie中。
			var num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('.number').val());
			arrnum[$.inArray($sid, arrsid)] = num;
			$.cookie('cookienum', arrnum.toString(), 10); //数组存入cookie

		} else { //不存在，第一次添加。将商品的id和数量存入数组，再存入cookie.
			arrsid.push($sid); //将当前的id存入数组
			$.cookie('cookiesid', arrsid.toString(), 10); //数组存入cookie
			arrnum.push($('.number').val());
			$.cookie('cookienum', arrnum.toString(), 10); //数组存入cookie
		}
	});

})();