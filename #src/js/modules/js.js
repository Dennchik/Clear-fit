var e = Object.defineProperty, r = Object.defineProperties, o = Object.getOwnPropertyDescriptors, t = Object.getOwnPropertySymbols, l = Object.prototype.hasOwnProperty,
	s = Object.prototype.propertyIsEnumerable,
	i = (r, o, t) => o in r ? e(r, o, {
		enumerable: !0, configurable: !0, writable: !0, value: t
	}) : r[o] = t,
	n = (e, r) => {
		for (var o in r || (r = {})) l.call(r, o) && i(e, o, r[o]); if (t) for (var o of t(r)) s.call(r, o) && i(e, o, r[o]); return e;
	}, c = (e, t) => r(e, o(t)); import { S as d, C as p, P as a } from "./vendor.fd82d376.js";
!function () {
	const e = document.createElement("link").relList;
	if (!(e && e.supports && e.supports("modulepreload"))) {
		for (const e of document.querySelectorAll('link[rel="modulepreload"]')) r(e);
		new MutationObserver((e => { for (const o of e) if ("childList" === o.type) for (const e of o.addedNodes) "LINK" === e.tagName && "modulepreload" === e.rel && r(e); })).observe(document, { childList: !0, subtree: !0 });
	}
	function r(e) {
		if (e.ep) return; e.ep = !0; const r = function (e) { const r = {}; return e.integrity && (r.integrity = e.integrity), e.referrerpolicy && (r.referrerPolicy = e.referrerpolicy), "use-credentials" === e.crossorigin ? r.credentials = "include" : "anonymous" === e.crossorigin ? r.credentials = "omit" : r.credentials = "same-origin", r; }(e);
		fetch(e.href, r);
	}
}();
!function (e) {
	const r = e.querySelector(".swiper"),
		o = r.cloneNode(!0);
	o.classList.add("triple-slider-prev"), e.insertBefore(o, r);
	const t = o.querySelectorAll(".swiper-slide"), l = t[t.length - 1];
	o.querySelector(".swiper-wrapper").insertBefore(l, t[0]);
	const s = r.cloneNode(!0); s.classList.add("triple-slider-next"), e.appendChild(s);
	const i = s.querySelectorAll(".swiper-slide")[0];
	s.querySelector(".swiper-wrapper").appendChild(i), r.classList.add("triple-slider-main");
	const u = { modules: [p, a], speed: 600, loop: !0, parallax: !0 }; let f; const y = new d(o, c(n({}, u), { allowTouchMove: !1, on: { click() { f.slidePrev(); } } })), m = new d(s, c(n({}, u), { allowTouchMove: !1, on: { click() { f.slideNext(); } } }));
	f = new d(r, c(n({}, u), { grabCursor: !0, controller: { control: [y, m] }, on: { destroy() { y.destroy(), m.destroy(); } } }));
}(document.querySelector(".triple-slider"));