//* --------------------------[Quantity products]-------------------------------
const counters = document.querySelectorAll('[data-quantity]');
const productPrices = document.querySelectorAll('.product-prices>p');
if (counters) {
	counters.forEach(counter => {
		counter.addEventListener('click', (e) => {
			const target = e.target;
			if (target.closest('.quantity__buttom')) {
				if (target.closest('.quantity').querySelector('input').value == '' && (target.classList.contains('quantity-remove') || target.classList.contains('quantity-add'))) {
					target.closest('.quantity').querySelector('input').value = 0;
				}
				let value = parseInt(target.closest('.quantity').querySelector('input').value);

				if (target.classList.contains('quantity-add')) {
					value++;
				} else {
					--value;
				}
				if (value <= 1) {
					value = 1;
					target.closest('.quantity').querySelector('.quantity-remove').classList.add('_disabled');
				} else {
					target.closest('.quantity').querySelector('.quantity-remove').classList.remove('_disabled');
				}

				target.closest('.quantity').querySelector('input').value = value;
			}
			_totalSum();
		});
		counter.querySelector('input').addEventListener('keyup', (e) => {
			e = e || window.e;

			const target = e.target;
			let value = parseInt(target.closest('.quantity').querySelector('input').value);
			if (value <= 1) {
				_opcityAdd();
			} else if (value > 1) {
				_opcityRemove();
			}
			if (e.key === 'Enter') {
				value = value;
				console.log(value);
				if (value <= 1) {
					value = 1;
				}
			} else if (e.key === 'ArrowUp') {
				value++; console.log(value);
			} else if (e.key === 'ArrowDown') {
				--value;
				if (value < 1) {
					value = 1;
				}
			} else if (e.key === 'ArrowLeft') {
				--value;
				if (value <= 1) {
					value = 1;
				}
			} else if (e.key === 'ArrowRight') {
				value++;
			}
			value.oninput = function () {
				this.value = this.value.replace(/[^\d]/g, '');
			};
			value = isNaN(value) ? 1 : value;
			target.closest('.quantity').querySelector('input').value = value;
			function _opcityAdd() {
				target.closest('.quantity').querySelector('.quantity-remove').classList.add('_disabled');
			}
			function _opcityRemove() {
				target.closest('.quantity').querySelector('.quantity-remove').classList.remove('_disabled');
			}
			_totalSum();
		});
	});
};

function _totalSum() {
	let totalSum = 0;
	productPrices.forEach(productPrice => {
		const inputTotal = document.querySelector('.input-total');
		let valuePrice = parseInt(String(productPrice.textContent).replace(/ /g, ''));
		let quantity = productPrice.closest('.shopping-cart__item').querySelector('input').value;

		totalSumProduct = (valuePrice * quantity);
		totalSum += (+totalSumProduct);

		productPrice.closest('.shopping-cart__item').querySelector('.card-name__quantity-price').textContent = totalSumProduct.toLocaleString();
		inputTotal.innerHTML = totalSum.toLocaleString();
	});
}
_totalSum();
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
//# sourceMappingURL=cart.js.map
