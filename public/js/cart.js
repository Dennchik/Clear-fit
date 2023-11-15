//* -------------------------------[Burger]-------------------------------------
const tabIcon = document.querySelector(".tab-button__icon");
const tabButton = document.querySelector('.tab-button');
document.querySelector('.tab-button__icon-wrapp').onclick = () => {
	tabIcon.classList.toggle('_active');
	tabButton.classList.toggle('_responsive');
};
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
				_opacityAdd();
			} else if (value > 1) {
				_opacityRemove();
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
//* ----------------------------[Shift-Tabs]-----------------------------------
const tablinks = document.querySelectorAll('.tab-button__item');
const tabcontents = document.querySelectorAll('.order-place__quick-order');
for (const i in tablinks) {
	const tablink = tablinks[i];
	const tabcontent = tabcontents[i];
	if (Object.hasOwnProperty.call(tabcontents, i)) {
		tablink.addEventListener('click', () => {
			const view_tablink = document.querySelector('.tab-button__item._active');
			const view_content = document.querySelector('.order-place__quick-order._active');
			tabButton.classList.remove('_responsive');
			tabIcon.classList.remove('_active');
			_toggleLink(view_tablink);
			if (view_tablink && view_tablink !== tabcontent) {
				_toggleLink(tablink);
			}
			_toggleLink(view_content);
			if (view_content && view_content !== tablink) {
				_toggleLink(tabcontent);
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
//* ------------------------------ [Select]-------------------------------------
document.querySelectorAll('[data-select]').forEach(function (selectGroup) {
	const itsSelects = selectGroup.querySelectorAll('.select');
	if (itsSelects) {
		itsSelects.forEach(itsSelect => {
			const listItems = itsSelect.querySelectorAll('.select__list-item');
			const selectButton = itsSelect.querySelector('.select__button');
			itsSelect.addEventListener('click', function (el) {
				target = el.target;
				if (target.closest('.select__button')) {
					const opened_select = document.querySelector('._active-collapse');
					_toggleOpen(itsSelect);
					if (el.target.closest('.select__box-button')) {
						start = el.target.closest('.select__box-button').nextElementSibling.querySelector('._selected');
					}
					if (!target.closest('.select').classList.contains('_active-collapse')) {
						selectButton.blur();
					}
					if (opened_select && opened_select !== itsSelect) {
						_toggleOpen(opened_select);
					}
				}
			});
			if (listItems.length !== 0) {
				var start = listItems[0];
				[].forEach.call(listItems, function (listItem) {
					listItem.addEventListener('click', function (e) {
						start = this;
						start.focus();
						selectButton.value = listItem.textContent;
						const el_selected = itsSelect.querySelector('._selected');
						_listItem(listItem);
						if (el_selected && el_selected !== listItem) {
							_listItem(el_selected);
						}
						//* -------------------------------------------------
						selectValue();
					});
				});
				function selectValue() {
					let buttons = selectGroup.getElementsByClassName('select__button');
					for (i = 0; i < buttons.length; i++) {
						buttons[i].value = start.textContent;
						selectButton.blur();
					};
				}
				//todo Переключатель классов
				const _listItem = (el) => {
					const collapse = new ItcCollapse(el.closest('._collapse'));
					if (el.classList.contains('_selected')) {
						el.classList.remove('_selected');
						collapse.toggle();
						el.closest('.select').classList.remove('_active-collapse');
					} else {
						el.classList.add('_selected');
					}
				};
			}
			selectGroup.addEventListener('keydown', function (e) {
				e = e || window.e;
				e.preventDefault();
				target = e.target;
				if (e.key == 'ArrowUp') {
					//* Arrow Up -------------------------------------
					let sibling = start.previousElementSibling;
					selectNext(sibling);
				} else if (e.key == 'ArrowDown') {
					//* Arrow Down -----------------------------------
					let sibling = start.nextElementSibling;
					selectNext(sibling);
				} else if (e.key == 'Enter') {
					//* Key Enter ------------------------------------
					selectValue();
					closeBos();
				}
			});
			// todo Переключение активного элемента и его выделение при изменении фокуса;
			function selectNext(sibling) {
				if (sibling !== null) {
					start.focus();
					start.classList.remove('_selected');
					sibling.focus();
					sibling.classList.add('_selected');
					start = sibling;
				}
			}
			//todo Переключатель классов
			const _toggleOpen = (el) => {
				const collapse = new ItcCollapse(el.closest('.select').querySelector('._collapse'));
				if (el.classList.contains('_active-collapse')) {
					el.classList.remove('_active-collapse');
					collapse.toggle();
				} else {
					el.classList.add('_active-collapse');
					collapse.toggle();
				}
			};
			//todo Нажатие на Tab или Escape. Закрыть дропдаун;
			document.addEventListener('keydown', function (el) {
				if (el.key === 'Tab' || el.key === 'Escape') {
					selectButton.blur();
					closeBos();
				}
			});
			//todo Клик снаружи дропдауна. Закрыть дропдаун;
			document.addEventListener('click', function (e) {
				const classList = e.target.classList;
				switch (true) {
					case classList.contains('select__button'):
						break;
					case classList.contains('select__list-item'):
						break;
					default:
						closeBos();
						break;
				};
			});
			//todo Клик снаружи дропдауна. Переключатель классов. Закрыть дропдаун;
			function closeBos() {
				const dropDown = document.querySelectorAll('.select');
				dropDown.forEach(el => {
					if (el.classList.contains('_active-collapse')) {
						_toggleOpen(el);
					}
				});
			}
		});
	}
});