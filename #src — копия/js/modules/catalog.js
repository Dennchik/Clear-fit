//todo ---------- Initialize Swiper in JS - "Catalog Slide-list" ---------------
if (document.querySelector('.catalog__slide')) {
	new Swiper('.products-slide__item', {
		slidesPerView: 1,
		autoHeight: true,
		speed: 800,
		loop: true,
		preloadImages: true,
		pagination: {
			el: ".pagination",
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + (index + 1) + "</span>";
			},
		},
		keyboard: {
			enabled: true,
		},
		navigation: {
			nextEl: ".pagination-arrow-next",
			prevEl: ".pagination-arrow-prev",
		},
	});
}
//* ------------------------------[noUiSlider]----------------------------------
const priceSlider = document.querySelector(
	'.price-filter__slider');
noUiSlider.create(priceSlider, {
	start: [0, 100000],
	behaviour: 'drag',
	connect: true,
	tooltips: [
		wNumb({ decimals: 0, thousand: ' ', suffix: ' (RUB)' }),
		wNumb({ decimals: 0, thousand: ' ', suffix: ' (RUB)' })
	],
	range: {
		'min': [0],
		'max': [200000]
	},
	format: wNumb({
		decimals: 0, thousand: ' ',
		to: function (value) {
			return parseInt(value);
		},
		from: function (value) {
			return parseInt(value);
		}
	})
});
const priceStart = document.getElementById('price-start');
const priceEnd = document.getElementById('price-end');
const inputs = [priceStart, priceEnd];
priceSlider.noUiSlider.on('update', function (values, handle) {
	inputs[handle].value = values[handle];
});
inputs.forEach(function (input, handle) {
	input.addEventListener('change', function () {
		priceSlider.noUiSlider.setHandle(handle, this.value);
	});
});
//* -----------------------[Collapse Product Filter]----------------------------
if (isMobile.any()) {
	const collapse = new ItcCollapse(document.querySelector(
		'.filter__body'));
	document.querySelector('.filter__title').onclick = () => {
		collapse.toggle();
	};
}
//* -----------------------[Collapse filter elements]---------------------------
const sectionFilters = document.querySelectorAll('._filterToggle');
sectionFilters.forEach((sectionFilter) => {
	const trigger = sectionFilter.querySelector('.section-filter__title');
	trigger.addEventListener('click', () => {
		const opened_item = document.querySelector('._open');
		_toggleFilter(sectionFilter); // Переключить текущий элемент
		if (opened_item && opened_item !== sectionFilter) {
			_toggleFilter(opened_item);
		}
	});
});
const _toggleFilter = (sectionFilter) => {
	const collapse = new ItcCollapse(sectionFilter.querySelector('._collapse'));
	if (sectionFilter.classList.contains('_open')) {
		sectionFilter.classList.remove('_open');
		collapse.toggle();
	} else {
		sectionFilter.classList.add('_open');
		collapse.toggle();
	}
};
//* --------------[Displaying elements / change of - elements]------------------
const viewItems = document.querySelectorAll('.view-catalog__item');
for (let i = 0; i < viewItems.length; i++) {
	const viewItem = viewItems[i];
	viewItem.addEventListener('click', () => {
		const view_hover = document.querySelector('._hover');
		_toggleHover(viewItem);
		if (view_hover && view_hover !== viewItem) {
			_toggleHover(view_hover);
		}
		if (view_hover && view_hover === viewItem) {
			_toggleHover(viewItem);
		}
	});
}
const _toggleHover = (el) => {
	if (el.classList.contains('_hover')) {
		el.classList.remove('_hover');
	} else {
		el.classList.add('_hover');
	}
	if (el.classList.contains('view-catalog__item_list')) {
		const lists = document.querySelectorAll('.products-slide__list');
		for (let i = 0; i < lists.length; i++) {
			lists[i].classList.toggle('_show');
			const swiperWrapper = document.querySelector('.swiper-wrapper');
			swiperWrapper.style.height = '100%';
		}
	} else {
		const grids = document.querySelectorAll('.items-products');
		for (let i = 0; i < grids.length; i++) {
			grids[i].classList.toggle('_show');
		}
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
						// el.classList.remove('_selected');
						collapse.toggle();
						el.closest('.select').classList.remove('_active-collapse');
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
					// sibling = e.target;
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
const oneLincks = document.querySelector('.select-one').children;
const twoLincks = document.querySelector('.select-two').children;
for (const i in oneLincks) {
	const oneLinck = oneLincks[i];
	const twoLinck = twoLincks[i];
	if (Object.hasOwnProperty.call(twoLincks, i)) {
		oneLinck.addEventListener('click', function () {
			const one_linck = document.querySelector('.select-one').querySelector('._selected');
			const two_linck = document.querySelector('.select-two').querySelector('._selected');
			_selectList(one_linck);
			if (one_linck && one_linck !== twoLinck) {
				_selectList(oneLinck);
			}
			_selectList(two_linck);
			if (two_linck && two_linck !== oneLinck) {
				_selectList(twoLinck);
			}
		});
	}
}
for (const i in twoLincks) {
	const oneLinck = oneLincks[i];
	const twoLinck = twoLincks[i];
	if (Object.hasOwnProperty.call(oneLincks, i)) {
		twoLinck.addEventListener('click', function () {
			const one_linck = document.querySelector('.select-one').querySelector('._selected');
			const two_linck = document.querySelector('.select-two').querySelector('._selected');
			_selectList(one_linck);
			if (one_linck && one_linck !== twoLinck) {
				_selectList(oneLinck);
			}
			_selectList(two_linck);
			if (two_linck && two_linck !== oneLinck) {
				_selectList(twoLinck);
			}
		});
	}
}
const _selectList = (el) => {
	if (el.classList.contains('_selected')) {
		el.classList.remove('_selected');
	} else {
		el.classList.add('_selected');
	}
};