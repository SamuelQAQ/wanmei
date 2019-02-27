// ;(function(){
//     //1.渲染商品列表, 传入两个参数，一个id和数量，根据id和数量渲染整个可见的列表.
// 	function goodslist(id,count){
// 		$.ajax({
// 			url:'http://10.31.162.48/html5-1810/Part%202/wanmei/wanmei/php/wanmeidata.php',//获取所有的接口数据
// 			dataType:'json'
// 		}).done(function(data){
// 			$.each(data,function(index,value){
// 				if(id==value.sid){//遍历判断sid和传入的sid是否相同，方便将那条数据设置到渲染的商品列表中。
// 					var $clonebox=$('tr').clone(true,true);
// 					$clonebox.find('tr').find('img').attr('src',value.url);
// 					$clonebox.find('tr').find('img').attr('sid',value.sid);
// 					$clonebox.find('tr h1').find('a').html(value.titile);
// 					$clonebox.find('.price').find('font').html(value.price);
// 					$clonebox.find('.number-input').find('input').val(count);
// 					//计算每个商品的价格。
// 					$clonebox.css('display','block');
// 					$('tr').append($clonebox);
// 					priceall();//计算总价的
// 				}
// 			});
// 		})
// 	}
// 	//2.获取cookie，执行渲染列表的函数
// 	if($.cookie('cookiesid') && $.cookie('cookienum')){
// 		var s=$.cookie('cookiesid').split(',');//数组sid
// 		var n=$.cookie('cookienum').split(',');//数组num
// 		$.each(s,function(i,value){
// 			goodslist(s[i],n[i]);
// 		});
// 	}
	
// 	//3.如果购物车为空，显示cart_null盒子(购物车空空的)
// 	kong();
// 	function kong(){
// 		if($.cookie('cookiesid') && $.cookie('cookienum')){
// 			$('.cart_null').hide();//cookie存在，购物车有商品，隐藏盒子。
// 		}else{
// 			$('.cart_null').show();
// 		}
// 	}
	
// 	//4.计算总价和总的商品件数，必须是选中的商品。
// 	function priceall(){
// 		var $sum=0;
// 		var $count=0;
// 		$('tr:visible').each(function(index,element){
// 		  if($(element).find('.state input').prop('checked')){
// 		  	$sum+=parseInt($(element).find('.number-input').find('input').val());
// 			$count+=(parseFloat($(element).find('.price').find('font').html()))*(parseInt($(element).find('.number-input').find('input').val(count)));
// 		  }
// 		});
		
// 		$('#num').find('font').html($sum);
// 		$('#checkoutPrice').html('￥'+$count.toFixed(2));
// 	}
	
// 	//5.全选操作
// 	$('.all_checkbox').on('change',function(){
// 		$('tr:visible').find(':checkbox').prop('checked',$(this).prop('checked'));
// 		$('.all_checkbox').prop('checked',$(this).prop('checked'));
// 		priceall();//取消选项，重算总和。
// 	});
	
// 	var $inputs=$('tr:visible').find(':checkbox');
// 	$('tr').on('change',$inputs,function(){//事件的委托的this指向被委托的元素
// 		if($('tr:visible').find('input:checkbox').length==$('tr:visible').find('input:checked').size()){
// 			$('.all_checkbox').prop('checked',true);
// 		}else{
// 			$('.all_checkbox').prop('checked',false);
// 		}
// 		priceall();//取消选项，重算总和。
// 	});
	
// 	//6.数量的改变
// 	//改变商品数量++
// 	$('.plus').on('click', function() {
// 	    var $count = $(this).parents('tr').find('.number-input input').val();//值
// 	    $count++;
// 	    if ($count >= 99) {
// 	        $count = 99;
// 	    }
// 	    $(this).parents('tr').find('.number-input input').val($count);//赋值回去
// 	    priceall();//重新计算总和。
// 	    setcookie($(this));//将改变的数量重新添加到cookie
	
// 	});
	
// 	//改变商品数量--
// 	$('.reduce').on('click', function() {
// 	    var $count = $(this).parents('tr').find('.number-input input').val();
// 	    $count--;
// 	    if ($count <= 1) {
// 	        $count = 1;
// 	    }
// 	    $(this).parents('tr').find('.number-input input').val($count);
// 	    priceall();
// 	    setcookie($(this));
// 	});
	
// 	//直接输入改变数量
// 	$('.number-input input').on('input', function() {
// 	    var $reg = /^\d+$/g; //只能输入数字
// 	    var $value = parseInt($(this).val());
// 	    if ($reg.test($value)) {//是数字
// 	        if ($value >= 99) {//限定范围
// 	            $(this).val(99);
// 	        } else if ($value <= 0) {
// 	            $(this).val(1);
// 	        } else {
// 	            $(this).val($value);
// 	        }
// 	    } else {//不是数字
// 	        $(this).val(1);
// 	    }
// 	    priceall();
// 	    setcookie($(this));
// 	});
	
// 	//7.计算数量改变后单个商品的价格
// 	function singlegoodsprice(obj) { //obj:当前元素
// 	    var $dj = parseFloat(obj.parents('tr').find('.price').find('font').html());//单价
// 	    var $cnum = parseInt(obj.parents('tr').find('.number-input input').val());//数量
// 	    return ($dj * $cnum).toFixed(2);//结果
// 	}
	
// 	//8.将改变后的数量的值存放到cookie
// 	//点击按钮将商品的数量和id存放cookie中
// 	var arrsid=[]; //商品的id
// 	var arrnum=[]; //商品的数量
// 	//提前获取cookie里面id和num
// 	function cookietoarray(){
// 		if($.cookie('cookiesid') && $.cookie('cookienum')){
// 			arrsid=$.cookie('cookiesid').split(',');//cookie商品的sid  
// 			arrnum=$.cookie('cookienum').split(',');//cookie商品的num
// 		}
// 	}
// 	function setcookie(obj) { //obj:当前操作的对象
// 		cookietoarray();//得到数组
// 	    var $index = obj.parents('tr').find('img').attr('sid');//通过id找数量的位置
// 	    arrnum[$.inArray($index,arrsid)] = obj.parents('tr').find('.number-input input').val();
// 	    addcookie('cookienum', arrnum.toString(), 7);
// 	}
	
// 	//9.删除操作
// 	//删除cookie
// 	function delgoodslist(sid, arrsid) {//sid：当前删除的sid，arrsid:cookie的sid的值
// 	    var $index = -1;
// 	    $.each(arrsid,function(index,value){//删除的sid对应的索引位置。 index:数组项的索引
// 	    	if(sid==value){
// 	    		$index=index;//如果传入的值和数组的值相同，返回值对应的索引。
// 	    	}
// 	    });
// 	    arrsid.splice($index, 1);//删除数组对应的值
// 	    arrnum.splice($index, 1);//删除数组对应的值
// 	    addcookie('cookiesid', arrsid.toString(), 7);//添加cookie
// 	    addcookie('cookienum', arrnum.toString(), 7);//添加cookie
// 	}
	
// 	//删除单个商品的函数(委托)
// 	$('tr').on('click', '.del', function(ev) {
// 		cookietoarray();//得到数组,上面的删除cookie需要。
// 	    if(confirm('你确定要删除吗？')){
// 	     	$(this).first().parents('tr').remove();//通过当前点击的元素找到整个一行列表，删除
// 	    }
// 	    delgoodslist($(this).first().parents('tr').find('img').attr('sid'), arrsid);
// 	    priceall();
// 	});


// 	//删除全部商品的函数
// 	$('.all_checkbox a:first').on('click', function() {
// 		cookietoarray();//得到数组,上面的删除cookie需要。
// 		if(confirm('你确定要全部删除吗？')){
// 		    $('tr:visible').each(function() {
// 		        if ($(this).find('input:checkbox').is(':checked')) {//复选框一定是选中的
// 		            $(this).remove();
// 		            delgoodslist($(this).find('img').attr('sid'), arrsid);
// 		        }
// 		    });
// 		    priceall();
// 		}
// 	});
// })();
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
//拼接数据
;(function () {
		$.ajax({
			url: 'http://10.31.162.48/html5-1810/Part%202/wanmei/wanmei/php/wanmeidata.php',
			dataType: 'json'
		}).done(function (data) {
			var $html = '<div class="main_content">';
			console.log(data);
			$.each(data, function (index, value) {
				$html += `
				 <div class="main_product">
				 	<a class="like" href="javascript:;"><span></span> <i>${value.sailnumber}</i></a>
			 		<a>
			 			<a href="http://10.31.162.48/html5-1810/Part%202/wanmei/wanmei/dist/details.html?sid=${value.sid}" target="_blank">
			 				<img data-original="${value.url}" />
			 			</a>
					</a>
					<p class="product_name ellipsis" title="${value.titile}">
						${value.title}
					</p>
					<p class="price">
						¥${value.price}
					</p>
					<div class="add_cart">
					<a class="stars" target="_blank" href="javascript:;" target="_blank">
					</a> <a class="add_btn" target="_blank" href="http://10.31.162.48/html5-1810/Part%202/wanmei/wanmei/dist/details.html?sid=${value.sid}">
					<span>
					</span>
					 加入购物车
					 </a>
					 </div>
				</div>	
			`;
			});
			$html += '</div>';
			$('.main_content').html($html);
		});
})();



//回到顶部按钮
;(function () {
	$(function () {
		$(".go_top").hide();
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$(".go_top").fadeIn();
			} else {
				$(".go_top").fadeOut();
			}
		});
		$(".go_top").click(function () {
			$('html,body').animate({
				scrollTop: 0
			}, 300)
			return false
		});
	});
})();

//大轮播图调用
;(function () {
	bannerListFn(
		$("#header_slider"),
		$(".hd"),
		$(".prev"),
		$(".next"),
		4000,
		true
	);
})();

//图片懒加载
;(function () {
	$(function () {
		$("img").lazyload({
			effect : "fadeIn"
		});
	});
})();


//下拉搜索栏
;(function () {
	$('.text_search').on('focus', function () {
		$(this).val('');
	})
	$('.text_search').on('input', function () {
		var that = $(this);
		$('.keyword_list').css('display', 'block');
		var $str = '';
		$.ajax({
			type: "get",
			url: "https://suggest.taobao.com/sug?code=utf-8&q=" + $(this).val() + "&_ksTS=1548331259728_369&callback=baidu",
			async: true,
			dataType: 'jsonp',
			success: function (data) {
				$.each(data, function (index, element) {
					$.each(element, function (indexs, aa) {
						$str += `<li>${aa[0]}</li>`;
					});
				});
				if (that.val() == '') {
					$('.keyword_list').hide();
				} else {
					$('.keyword_list ul').html($str);
				}
				$('.keyword_list ul li').each(function () {
					$(this).on('click', function () {
						that.val($(this).html());
						$('.keyword_list').css('display', 'none');
					})
				});
				$('body').on('click', function () {
					$('.keyword_list').css('display', 'none');
				})

			}
		});
	});
})();