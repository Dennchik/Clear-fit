// * ---------------------------[Burger-Top-Menu]-------------------------------
const overlay = document.getElementById('menu');
const burgerMenu = document.querySelector('.burger-menu');
const page = document.querySelector('.top-header__menu');
document.querySelector('.burger-menu').onclick = () => {
	burgerMenu.classList.toggle('_open');
	overlay.classList.toggle('_overlay');
	page.classList.toggle('_fx');
};
// * ---------[Выпадающий блок 'Side Bar Menu (JS)' & 'Search JS']--------------
const items = document.querySelectorAll(`._slideToggle`);
items.forEach((item) => {
	const trigger = item.querySelector('._trigger-click');
	trigger.addEventListener('click', () => {
		const opened_item = document.querySelector('._open');
		_toggleItem(item);
		if (opened_item && opened_item !== item) {
			_toggleItem(opened_item);
		}
	});
});
const _toggleItem = (item) => {
	const collapse = new ItcCollapse(item.querySelector('._collapse'));
	if (item.classList.contains('_open')) {
		item.classList.remove('_open');
		collapse.toggle();
	} else {
		item.classList.add('_open');
		collapse.toggle();
	}
};
//* -----------------------[Side Bar Menu / Sub-Menu]---------------------------
if (isMobile.any()) {
	const menuParents = document.querySelectorAll('.menu-page__parent');
	const menuList = document.querySelector('.menu-page__list');
	menuParents.forEach((menuParent) => {
		const trigger = menuParent.querySelector('._trigger-menu');
		trigger.addEventListener('click', () => {
			const opened_menu = menuList.querySelector('._open');
			_toggleMenu(menuParent);
			if (opened_menu && opened_menu !== menuParent) {
				_toggleMenu(opened_menu);
			}
		});
	});
	const _toggleMenu = (menuParent) => {
		const collapse = new ItcCollapse(menuParent.querySelector('._collapse'));
		if (menuParent.classList.contains('_open')) {
			menuParent.classList.remove('_open');
			collapse.toggle();
		} else {
			menuParent.classList.add('_open');
			collapse.toggle();
		}
	};
} else {
	const menuParents = document.querySelectorAll('.menu-page__parent');
	for (let i = 0; i < menuParents.length; i++) {
		const menuParent = menuParents[i];
		menuParent.addEventListener('mouseenter', () => {
			menuParent.classList.add('_open');
		});
		menuParent.addEventListener('mouseleave', () => {
			menuParent.classList.remove('_open');
		});
	}
}
//* ------------------------[Выбор товара в поиске]-----------------------------
const searchSelect = document.querySelector('.search-page__title');
const checkboxCategories = document.querySelectorAll(
	'.categories-search__checkbox'
);
for (let i = 0; i < checkboxCategories.length; i++) {
	const checkboxCategory = checkboxCategories[i];
	checkboxCategory.addEventListener('change', () => {
		checkboxCategory.classList.toggle('_active');
		const checkboxActiveCategory = document.querySelectorAll(
			'.categories-search__checkbox._active'
		);
		if (checkboxActiveCategory.length > 0) {
			searchSelect.classList.add('_category');
			const searchPageSelected = searchSelect.querySelector(
				'.search-page__selected'
			);
			searchPageSelected.innerHTML =
				searchPageSelected.getAttribute('data-text') +
				' ' +
				checkboxActiveCategory.length;
		} else {
			searchSelect.classList.remove('_category');
		}
	});
};
