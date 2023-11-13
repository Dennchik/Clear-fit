setInterval(() => {
	const date = new Date();
	const clock = document.getElementById("clock");
	clock.innerHTML =
		`${date.getHours()} : ${date.getMinutes()}  ` + `( ${date.getSeconds()} )`;
}, 1000);