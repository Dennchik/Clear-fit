//* --------------------------[Quantity products]-------------------------------
let quantityButtoms = document.querySelectorAll('.quantity__buttom');
if (quantityButtoms.length > 0) {
	for (let i = 0; i < quantityButtoms.length; i++) {
		const quantityButtom = quantityButtoms[i];
		quantityButtom.addEventListener('click', () => {
			let value = parseInt(quantityButtom.closest('.quantity').querySelector('input').value);
			if (quantityButtom.classList.contains('quantity-add')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1;
				}
			}
			quantityButtom.closest('.quantity').querySelector('input').value = value;
		});
	}
}
//* ----------------------------------------------------------------------------
const valuePrices = document.querySelectorAll('.value-price');
let sum = 0;
for (let i = 0; i < valuePrices.length; i++) {
	let valuePrice = valuePrices[i].textContent;
	valuePrice = parseInt(String(valuePrice).replace(/ /g, ''));
	sum[i] = valuePrice;
	sum += (+valuePrice);
}
const total = document.querySelector('.input-total');
total.innerHTML += " " + sum.toLocaleString({ useGrouping: true });
console.log(
	sum.toLocaleString({ useGrouping: true })
);

