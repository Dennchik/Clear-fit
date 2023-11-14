//* ------------------------[Init - ItcCustomSelect]----------------------------
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