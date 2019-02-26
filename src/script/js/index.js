//拼接数据
;(function () {
		$.ajax({
			url: 'http://localhost/html5-1810/Part%202/wanmei/wanmei/php/wanmeidata.php',
			dataType: 'json'
		}).done(function (data) {
			var $html = '<div class="main_content">';
			console.log(data);
			$.each(data, function (index, value) {
				$html += `
				 <div class="main_product">
				 	<a class="like" href="javascript:;"><span></span> <i>${value.sailnumber}</i></a>
			 		<a>
			 			<a href="http://localhost/html5-1810/Part%202/wanmei/wanmei/dist/details.html?sid=${value.sid}" target="_blank">
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
		$("img").lazyload();
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