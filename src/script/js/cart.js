;(function(){
    //1.渲染商品列表, 传入两个参数，一个id和数量，根据id和数量渲染整个可见的列表.
	function goodslist(id,count){
		$clonebox=$('.cart_list').css('display','block').find('.clone').css('display','none')
		$('.clone').css('display','none')
		$.ajax({
			url:'http://10.31.162.48/html5-1810/Part%202/wanmei/wanmei/php/wanmeidata.php',//获取所有的接口数据
			dataType:'json'
		}).done(function(data){
            console.log(data)
			$.each(data,function(index,value){
				if(id==value.sid){//遍历判断sid和传入的sid是否相同，方便将那条数据设置到渲染的商品列表中。
					var $clonebox=$('.clone:hidden').clone(true,true);
					$clonebox.find('.p-name').find('img').attr('src',value.url);
					$clonebox.find('.p-name').find('img').attr('sid',value.sid);
					$clonebox.find('.p-name h1').find('a').html(value.title);
					$clonebox.find('.price').find('font').html(value.price);
                    $clonebox.find('.number-input').find('input').val(count);
                    $clonebox.css('display','');
					//计算每个商品的价格。
					$('tbody').append($clonebox);
					priceall();//计算总价的
				}
			});
		})
	}
	//2.获取cookie，执行渲染列表的函数
	if($.cookie('cookiesid') && $.cookie('cookienum')){
		var s=$.cookie('cookiesid').split(',');//数组sid
		var n=$.cookie('cookienum').split(',');//数组num
		$.each(s,function(i,value){                                                           
			goodslist(s[i],n[i]);
		});

		var sum=0;
		$.each(n,function(index,value){
			sum+=parseInt(value);
		})
		$('.cartNum').html(sum);
	}
	
	//3.如果购物车为空，显示cart_null盒子(购物车空空的)
	kong();
	function kong(){
		if($.cookie('cookiesid') && $.cookie('cookienum')){
			$('.cart_null').hide();//cookie存在，购物车有商品，隐藏盒子。
		}else{
			$('.cart_list').hide();
			$('.cart_null').show();
			$('.cartNum').html(0);

		}
	}
	
	//右侧购物车商品数量
	number();
	function number(){
		var sum=0;
		$.each(n,function(index,value){
			sum+=parseInt(value);
		})
		$('.cartNum').html(sum);
	};

	//4.计算总价和总的商品件数，必须是选中的商品。
	function priceall(){
		var $sum=0;
		var $count=0;
		$('.clone:visible').each(function(index,element){
		  if($(element).find('.state input').prop('checked')){
		  	$sum+=parseInt($(element).find('.number-input').find('input').val());
			$count+=(parseFloat($(element).find('.price').find('font').html()))*(parseInt($(element).find('.number-input').find('input').val()));
		  }
		});
		
		$('#num').find('font').html($sum);
		$('#checkoutPrice').html($count.toFixed(2));
	}
	
	//5.全选操作
	$('.all_checkbox input').on('change',function(){
		$('.clone:visible').find(':checkbox').prop('checked',$(this).prop('checked'));
		$('.all_checkbox input').prop('checked',$(this).prop('checked'));
		priceall();//取消选项，重算总和。
	});
	
	var $inputs=$('.clone:visible').find(':checkbox');
	$('tbody').on('change',$inputs,function(){//事件的委托的this指向被委托的元素
		if($('.clone:visible').find('input:checkbox').length==$('.clone:visible').find('input:checked').size()){
			$('.all_checkbox input').prop('checked',true);
		}else{
			$('.all_checkbox input').prop('checked',false);
		}
		priceall();//取消选项，重算总和。
	});
	
	//6.数量的改变
	//改变商品数量++
	$('.plus').on('click', function() {
	    var $count = $(this).parents('.clone').find('.number-input input').val();//值
	    $count++;
	    if ($count >= 99) {
	        $count = 99;
	    }
	    $(this).parents('.clone').find('.number-input input').val($count);//赋值回去
	    priceall();//重新计算总和。
		setcookie($(this));//将改变的数量重新添加到cookie
	
	});
	
	
	//改变商品数量--
	$('.reduce').on('click', function() {
	    var $count = $(this).parents('.clone').find('.number-input input').val();
	    $count--;
	    if ($count < 1) {
			$count = 1;
			alert('商品数量不得小于1！');
	    }
	    $(this).parents('.clone').find('.number-input input').val($count);
	    priceall();
		setcookie($(this));
	});
	
	//直接输入改变数量
	$('.number-input input').on('input', function() {
	    var $reg = /^\d+$/g; //只能输入数字
	    var $value = parseInt($(this).val());
	    if ($reg.test($value)) {//是数字
	        if ($value >= 99) {//限定范围
	            $(this).val(99);
	        } else if ($value <= 0) {
	            $(this).val(1);
	        } else {
	            $(this).val($value);
	        }
	    } else {//不是数字
	        $(this).val(1);
	    }
	    priceall();
		setcookie($(this));
	});
	
	//7.计算数量改变后单个商品的价格
	function singlegoodsprice(obj) { //obj:当前元素
	    var $dj = parseFloat(obj.parents('.clone').find('.price').find('font').html());//单价
	    var $cnum = parseInt(obj.parents('.clone').find('.number-input input').val());//数量
	    return ($dj * $cnum).toFixed(2);//结果
	}
	
	//8.将改变后的数量的值存放到cookie
	//点击按钮将商品的数量和id存放cookie中
	var arrsid=[]; //商品的id
	var arrnum=[]; //商品的数量
	//提前获取cookie里面id和num
	function cookietoarray(){
		if($.cookie('cookiesid') && $.cookie('cookienum')){
			arrsid=$.cookie('cookiesid').split(',');//cookie商品的sid  
			arrnum=$.cookie('cookienum').split(',');//cookie商品的num
		}
		var sum=0;
		$.each(arrnum,function(index,value){
			sum+=parseInt(value);
		})
		$('.cartNum').html(sum);
	}
	function setcookie(obj) { //obj:当前操作的对象
		cookietoarray();//得到数组
	    var $index = obj.parents('.clone').find('img').attr('sid');//通过id找数量的位置
		arrnum[$.inArray($index,arrsid)] = obj.parents('.clone').find('.number-input input').val();
		
		$.cookie('cookienum', arrnum.toString(), 7);

		var sum=0;
		$.each(arrnum,function(index,value){
			sum+=parseInt(value);
		})
		$('.cartNum').html(sum);
	}
	
	
	//9.删除操作
	//删除cookie
	function delgoodslist(sid, arrsid) {//sid：当前删除的sid，arrsid:cookie的sid的值
	    var $index = -1;
	    $.each(arrsid,function(index,value){//删除的sid对应的索引位置。 index:数组项的索引
	    	if(sid==value){
	    		$index=index;//如果传入的值和数组的值相同，返回值对应的索引。
	    	}
	    });
	    arrsid.splice($index, 1);//删除数组对应的值
	    arrnum.splice($index, 1);//删除数组对应的值
	    $.cookie('cookiesid', arrsid.toString(), 7);//添加cookie
	    $.cookie('cookienum', arrnum.toString(), 7);//添加cookie
	}
	
	//删除单个商品的函数(委托)
	$('.clone').on('click', '.del', function(ev) {
		cookietoarray();//得到数组,上面的删除cookie需要。
	    if(confirm('你确定要删除吗？')){
	     	$(this).first().parents('.clone').remove();//通过当前点击的元素找到整个一行列表，删除
	    }
	    delgoodslist($(this).first().parents('.clone').find('img').attr('sid'), arrsid);
		priceall();
		kong();
	});


	//删除全部商品的函数
	$('.f_left a:even').on('click', function() {
		alert(1);
		cookietoarray();//得到数组,上面的删除cookie需要。
		if(confirm('你确定要删除这些商品吗？')){
		    $('.clone:visible').each(function() {
		        if ($(this).find('input:checkbox').is(':checked')) {//复选框一定是选中的
		            $(this).remove();
		            delgoodslist($(this).find('img').attr('sid'), arrsid);
		        }
		    });
		    priceall();
		}
	});
	
	
})();

;(function(){
	$("#header").load("header.html",function(){
		$('.top .cartNum').html($('.right_nav .cartNum').html())
	}); 
	$("#nav").load("nav.html"); 
	$("#footer").load("footer.html"); 
})();