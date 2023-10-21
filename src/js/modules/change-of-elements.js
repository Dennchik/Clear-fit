//* --------------[Displaying elements / change of - elements]------------------
const viewItems = document.querySelectorAll('.view-catalog__item');
for (let i = 0; i < viewItems.length; i++) {
	const viewItem = viewItems[i];
	console.log(viewItem);
	viewItem.addEventListener('click', () => {
		const view_hover = document.querySelector('._hover');
		console.log(view_hover);
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
		const itemsColumn = document.querySelector('.catalog__slide');
		const swiperWrapper = document.querySelector('.swiper-wrapper');
		itemsColumn.classList.toggle('_list');
		swiperWrapper.style.height = '100%';
	}
};