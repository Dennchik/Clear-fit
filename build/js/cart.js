//* --------------------------[Quantity products]-------------------------------
const counters = document.querySelectorAll('[data-quantity]');
const productPrices = document.querySelectorAll('.product-prices>p');
if (counters) {
	counters.forEach(counter => {
		counter.addEventListener('click', (e) => {
			target = e.target;
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
					_opacityAdd();
				} else {
					_opacityRemove();
				}

				target.closest('.quantity').querySelector('input').value = value;
			}
			_totalSum();
		});
		counter.querySelector('input').addEventListener('keyup', (e) => {
			e = e || window.e;
			const target = e.target;
			let value = parseInt(target.closest('.quantity').querySelector('input').value);
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
				let = _opacityAdd();
			} else if (value > 1) {
				let = _opacityRemove();
			}
			value = isNaN(value) ? 1 : value;
			target.closest('.quantity').querySelector('input').value = value;
			_totalSum();
			value.oninput = function () {
				this.value = this.value.replace(/[^\d]/g, '');
			};
		});
	});
};
function _opacityAdd() {
	target.closest('.quantity').querySelector('.quantity-remove').classList.add('_disabled');
}
function _opacityRemove() {
	target.closest('.quantity').querySelector('.quantity-remove').classList.remove('_disabled');
}
function _totalSum() {
	let totalSum = 0;
	productPrices.forEach(productPrice => {
		const inputTotal = document.querySelector('.input-total');
		let valuePrice = parseInt(String(productPrice.textContent).replace(/ /g, ''));
		let quantity = productPrice.closest('.shopping-cart__item').querySelector('input').value;

		totalSumProduct = (valuePrice * quantity);
		totalSum += (+totalSumProduct);

		productPrice.closest('.shopping-cart__item').querySelector('.card-name__quantity-price').textContent = totalSumProduct.toLocaleString('ru-Ru', {
			style: 'currency',
			currency: 'RUB',
			minimumFractionDigits: 0,
		});
		inputTotal.innerHTML = totalSum.toLocaleString() + `<i class="icon-ruble"></i>`;
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
///* ------------------------------ [Select]-------------------------------------
const itsSelect = document.querySelectorAll('[data-select]');
if (itsSelect) {
	itsSelect.forEach(select => {
		const dropDownBtn = select.querySelector('.dropdown__button');
		const dropDownBox = select.querySelector('.dropdown__box-button');
		const dropDownList = select.querySelector('.dropdown__list');
		const listItems = dropDownList.querySelectorAll('.dropdown__list-item');

		dropDownBox.addEventListener('click', function (el) {
			target = el.target;
			if (target.closest('.dropdown__box-button')) {
				target = el.target.closest('.dropdown__box-button').nextElementSibling.querySelector('._selected');
				dropDownBtn.value = target.innerText;
			}
		});

		let start = listItems[0];
		if (listItems.length !== 0) {
			[].forEach.call(listItems, function (list) {
				list.addEventListener('click', function () {
					start = this;
					start.focus();
					dropDownBtn.value = list.innerText;

					const el_selected = dropDownList.querySelector('._selected');
					_listItem(list);
					if (el_selected && el_selected !== list) {
						_listItem(el_selected);
					} else {
						list.classList.add('_selected');
					}
				});
			});

			// //todo Переключатель классов
			const _listItem = (list) => {
				const collapse = new ItcCollapse(list.closest('._collapse'));
				if (list.classList.contains('_selected')) {
					list.classList.remove('_selected');
					collapse.toggle();
					list.closest('.dropdown').classList.remove('_active-collapse');
				} else {
					list.classList.add('_selected');
				}
			};
		}

		select.addEventListener('keydown', function (e) {
			e = e || window.e;
			if (e.key == 'ArrowUp') {
				//* Arrow Up
				let sibling = start.previousElementSibling;
				selectNext(sibling);

			} else if (e.key == 'ArrowDown') {
				//* Arrow Down
				let sibling = start.nextElementSibling;
				selectNext(sibling);
			}
		});

		//todo Нажатие на Tab или Escape. Закрыть дропдаун
		document.addEventListener('keydown', function (el) {
			if (el.key === 'Tab' || el.key === 'Escape') {
				openBos();
			}
		});

		//todo Клик снаружи дропдауна. Закрыть дропдаун
		document.addEventListener('click', function (e) {
			const classList = e.target.classList;
			switch (true) {
				case classList.contains('dropdown__button'):
					break;
				case classList.contains('dropdown__list-item'):
					break;
				default:
					openBos();
					break;

			};
		});

		function selectNext(sibling) {
			if (sibling !== null) {
				start.focus();
				start.classList.remove('_selected');
				sibling.focus();
				sibling.classList.add('_selected');
				start = sibling;
			}
		}
	});


	function openBos() {
		const dropDown = document.querySelectorAll('.dropdown');
		dropDown.forEach(el => {
			if (el.classList.contains('_active-collapse')) {
				_toggleOpen(el);
			}
		});
	}

}

const dropDowun = document.querySelectorAll('.dropdown');
dropDowun.forEach((item) => {
	const trigger = item.querySelector('.dropdown__button');
	trigger.addEventListener('click', () => {
		const opened_item = document.querySelector('._active-collapse');
		_toggleOpen(item);
		console.log(item);
		if (opened_item && opened_item !== item) {
			_toggleOpen(opened_item);
		}
	});
});

// //todo Переключатель классов
const _toggleOpen = (el) => {
	const collapse = new ItcCollapse(el.querySelector('._collapse'));
	if (el.classList.contains('_active-collapse')) {
		el.classList.toggle('_active-collapse');
		collapse.toggle();
	} else {
		el.classList.add('_active-collapse');
		collapse.toggle();
	}
};
//* ----------------------------------------------------------------------------
window.addEventListener("keydown", function (e) {
	if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
		e.preventDefault();
	}
}, false);
//# sourceMappingURL=cart.js.map
