//todo ------------ Initialize Swiper in JS - "Product Slide" ------------------
const contentProducts = document.querySelectorAll('.content-product');
if (document.querySelector('.product-slide')) {
	let swiper = new Swiper(".thumb-slide", {
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
const actions = document.querySelectorAll('[data-action]');
const productPrices = document.querySelectorAll('.product-prices>p');

productPrices.forEach(productPrice => {
	valuePrice = parseInt(String(productPrice.textContent).replace(/ /g, ''));
});
if (actions) {
	actions.forEach(action => {
		action.addEventListener('click', (e) => {
			target = e.target;
			if (target.closest('.input')) {
				value = 1;
			} else if (target.closest('.quantity__buttom')) {
				if (target.closest('.quantity').querySelector('input').value == '' && (target.classList.contains('quantity-remove') || target.classList.contains('quantity-add'))) {
					target.closest('.quantity').querySelector('input').value = 0;
				}
				value = parseInt(target.closest('.quantity').querySelector('input').value);

				if (target.classList.contains('quantity-add')) {
					value++;
				} else {
					--value;
				}
				if (value <= 1) {
					value = 1;
					_opacityAdd();
				} else {
					_opacityRemove();
				}
				target.closest('.quantity').querySelector('input').value = value;
			}
			let NewSum = _totalSumProduct();
			action.querySelector('.product-prices>p').innerHTML = totalSum.toLocaleString();
			NewSum();



		});
		action.querySelector('input').addEventListener('keyup', (e) => {
			e = e || window.e;
			target = e.target;
			value = parseInt(target.closest('.quantity').querySelector('input').value);

			if (e.key === 'Enter') {
				value = value;
				if (value <= 1) {
					value = 1;
				}
			} else if (e.key === 'ArrowDown') {
				--value;
				if (value <= 1) {
					value = 1;
				}
			} else if (e.key === 'ArrowUp') {
				value++;
			} else if (e.key === 'ArrowLeft') {
				--value;
				if (value <= 1) {
					value = 1;
				}
			} else if (e.key === 'ArrowRight') {
				value++;
			}
			if (value <= 1) {
				_opacityAdd();
			} else if (value > 1) {
				_opacityRemove();
			}
			value.oninput = function () {
				this.value = this.value.replace(/[^\d]/g, '');
			};
			value = isNaN(value) ? 1 : value;
			target.closest('.quantity').querySelector('input').value = value;

			let NewSum = _totalSumProduct();
			action.querySelector('.product-prices>p').innerHTML = totalSum.toLocaleString();
			NewSum();
		});

	});
}
function _opacityAdd() {
	target.closest('.quantity').querySelector('.quantity-remove').classList.add('_disabled');
}
function _opacityRemove() {
	target.closest('.quantity').querySelector('.quantity-remove').classList.remove('_disabled');
}
function _totalSumProduct() {
	totalSum = (valuePrice * value);
	function _NewTotal() {
		totalSum = parseInt(String(totalSum).replace(/ /g, ''));
	}
	return _NewTotal;
}