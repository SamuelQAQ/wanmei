//回到顶部按钮
;
(function () {
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
