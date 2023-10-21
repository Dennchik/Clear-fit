jQuery(document).ready(function ($) {
	$(window).on('load', function () {
		let $preloader = $('.loading'),
			$loader = $preloader.find('.loading__loader');
		$loader.fadeOut();
		$preloader.delay(250).fadeOut(200);
	});
});

