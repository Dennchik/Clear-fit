//* --------------------------------[jScript]-----------------------------------
window.onload = function () {
	document.querySelector('.preloader').classList.add("preloader-remove");
};


// === Определение устройства вывода ===
"use strict";
var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: () => {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: () => {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: () => {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: () => {
		return navigator.userAgent.match(/IEMobile/i);
	},


	any: () => {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digit),when(breakpoint)"
// e.x. data-da="item,2,992"

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			const daPlace = daElement.hasAttribute('data-da-position') ? daElement.getAttribute('data-da-position') : 'last';
			const daResolutionBreakpoint = daElement.hasAttribute('data-da-resolution') ? daElement.getAttribute('data-da-resolution') : 768;
			// noinspection JSCheckFunctionSignatures
			daElement.setAttribute('data-da-index', number);
			//Заполняем массив первоначальных позиций
			originalPositions[number] = {
				"parent": daElement.parentNode,
				"index": indexInParent(daElement)
			};
			//Заполняем массив элементов
			daElementsArray[number] = {
				"element": daElement,
				"destination": document.querySelector('.' + daMove),
				"place": daPlace,
				"breakpoint": daResolutionBreakpoint
			};
			number++;
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = "max"; //Для MobileFirst поменять на min

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}

	//Основная функция
	function dynamicAdapt() {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}

	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		const children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}

	//Функция получения массива индексов элементов внутри родителя
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}

	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) {
				return -1;
			} else {
				return 1;
			} //Для MobileFirst поменять
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) {
				return 1;
			} else {
				return -1;
			}
		});
	}

	//Дополнительные сценарии адаптации
	function customAdapt() {
		// noinspection JSUnusedLocalSymbols
		const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());
class ItcCollapse {
	constructor(target, duration = 350) {
		this._target = target;
		this._duration = duration;
	}
	show() {
		const el = this._target;
		if (el.classList.contains('collapsing') || el.classList.contains('_show')) {
			return;
		}
		el.classList.remove('_collapse');
		const height = el.offsetHeight;
		el.style.height = 0;
		el.style.overflow = 'hidden';
		el.style.transition = `height ${this._duration}ms ease`;
		el.classList.add('collapsing');
		el.offsetHeight;
		el.style.height = `${height}px`;
		window.setTimeout(() => {
			el.classList.remove('collapsing');
			el.classList.add('_collapse');
			el.classList.add('_show');
			el.style.height = '';
			el.style.transition = '';
			el.style.overflow = '';

		}, this._duration);
	}
	hide() {
		const el = this._target;
		if (el.classList.contains('collapsing') || !el.classList.contains('_show')) {
			return;
		}
		el.style.height = `${el.offsetHeight}px`;
		el.offsetHeight;
		el.style.height = 0;
		el.style.overflow = 'hidden';
		el.style.transition = `height ${this._duration}ms ease`;
		el.classList.remove('_collapse');
		el.classList.remove('_show');
		el.classList.add('collapsing');
		window.setTimeout(() => {
			el.classList.remove('collapsing');
			el.classList.add('_collapse');
			el.style.height = '';
			el.style.transition = '';
			el.style.overflow = '';
		}, this._duration);
	}
	toggle() {
		this._target.classList.contains('_show') ? this.hide() : this.show();
	}
}
//# sourceMappingURL=app-cart.js.map
