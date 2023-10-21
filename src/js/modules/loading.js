//* --------------------------------[jScript]-----------------------------------
window.onload = function () {
	document.querySelector('.preloader').classList.add("preloader-remove");
};
//* --------------------------------[jQuery]------------------------------------
$(window).on('load', function () {
	$('.preloader').addClass("preloader-remove");
});