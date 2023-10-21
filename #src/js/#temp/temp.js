if (document.querySelector('.products-slide')) {
	let mainslide = new Swiper('.items-products__column', {
		// effect: "fade",
		// autoplay: {
		// 	delay: 15500,
		// 	disableOnInteraction: false,
		// },
		// observer: true,
		// observeParents: true,
		slidesPerView: 3, // Колличество слайдов на странице;
		spaceBetween: 30,
		// centeredSlides: true,
		autoHeight: true,
		speed: 800,
		preloadImages: true,
		// touchRatio: 0,
		// simulateTouch: false,
		// loop: true,

		// lazy: true,
		// pagination: {
		// 	el: ".mainslide__dots",
		// 	clickable: true,
		// },
		keyboard: {
			enabled: true,
		},
		navigation: {
			// nextEl: ".mainslide__next",
			// prevEl: ".mainslide__prev",
		},
		// on: {
		// lazyImageReady: function () {
		// 	ibg();
		// },
		// },
		// If we need scrollbar
		// scrollbar: {
		// 	el: 'swiper-scrollbar'
		// },
	});
}