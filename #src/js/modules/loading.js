//* --------------------------------[jScript]-----------------------------------
// window.onload = function () {
// 	document.querySelector('.preloader').classList.add("preloader-remove");
// };
window.onload = function () {
	let preloader = document.querySelector('.preloader');
	setTimeout(() => {
		preloader.classList.add("preloader-remove");
	}, 250);

};