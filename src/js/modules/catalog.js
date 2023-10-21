//todo ---------- Initialize Swiper in JS - "Catalog Slide-list" ---------------
if (document.querySelector('.catalog__slide')) {
	new Swiper('.products-slide__item', {
		slidesPerView: 1,
		autoHeight: true,
		speed: 800,
		loop: true,
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
	tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
	range: {
		'min': [0],
		'max': [200000]
	},
	format: {
		to: function (value) {
			return parseInt(value);
		},
		from: function (value) {
			return parseInt(value);
		}
	}
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
//* ---------------------------[ItcCustomSelect]--------------------------------
document.addEventListener('DOMContentLoaded', () => {
	new ItcCustomSelect('.ui-select-1', {
		name: 'form[]',
		targetValue: 'byDefault',
		options: [
			['byDefault', 'По умолчанию'],
			['byPrice', 'По цене'],
			['byName', 'По названию']
		]
	});
	new ItcCustomSelect('.ui-select-2', {
		name: 'form[]',
		targetValue: '1',
		options: [
			['1', '6'],
			['2', '12'],
			['3', '24'],
			['4', '50']
		]
	});
	new ItcCustomSelect('.ui-select-3', {
		name: 'form[]',
		targetValue: '1',
		options: [
			['1', '6'],
			['2', '12'],
			['3', '24'],
			['4', '50']
		]
	});
});