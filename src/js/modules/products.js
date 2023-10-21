//todo ------------ Initialize Swiper in JS - "Product Slide" ------------------
if (document.querySelector('.product-slide')) {
	var swiper = new Swiper(".thumb-slide", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var swiper2 = new Swiper(".product-slide__slide", {
		spaceBetween: 10,
		speed: 800,
		loop: true,
		navigation: {
			prevEl: ".product-slide__prew",
			nextEl: ".product-slide__next",
		},
		thumbs: {
			swiper: swiper,
		},
	});
}

//* --------------------------------[Tabs]--------------------------------------
const tablinks = document.querySelectorAll('._tablinks');
const tabcontents = document.querySelectorAll('._tabcontent');
for (const i in tablinks) {
	const tablink = tablinks[i];
	const tabcontent = tabcontents[i];
	if (Object.hasOwnProperty.call(tabcontents, i)) {
		tablink.addEventListener('click', () => {
			const view_tablink = document.querySelector('._active');
			const view_content = document.querySelector('._show');
			_toggleLink(view_tablink);
			if (view_tablink && view_tablink !== tabcontent) {
				_toggleLink(tablink);
			}
			_toggleShow(view_content);
			if (view_content && view_content !== tablink) {
				_toggleShow(tabcontent);
			}
		});
	}
}
const _toggleLink = (el) => {
	if (el.classList.contains('_active')) {
		el.classList.remove('_active');
	} else {
		el.classList.add('_active');
	}
};
const _toggleShow = (el) => {
	if (el.classList.contains('_show')) {
		el.classList.remove('_show');
	} else {
		el.classList.add('_show');
	}
};
//* --------------------------[Quantity products]-------------------------------
let quantityButtoms = document.querySelectorAll('.quantity__buttom');
if (quantityButtoms.length > 0) {
	for (let i = 0; i < quantityButtoms.length; i++) {
		const quantityButtom = quantityButtoms[i];
		quantityButtom.addEventListener('click', () => {
			let value = parseInt(quantityButtom.closest('.quantity').querySelector('input').value);
			if (quantityButtom.classList.contains('quantity-add')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1;
				}
			}
			quantityButtom.closest('.quantity').querySelector('input').value = value;
		});
	}
}