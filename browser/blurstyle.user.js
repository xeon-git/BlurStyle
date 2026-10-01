// ==UserScript==
// @name 		 Blurstyle
// @version 	 5.0.0
// @description  better user experience
// @author		 xeon | xxnn
// @match        https://tankionline.com/play/*
// @match        https://ratings.tankionline.com/*
// @icon         https://hierophant.it/logo/blurstyle.png
// @grant        GM_xmlhttpRequest
// ==/UserScript==

GM_xmlhttpRequest({ method: "GET", url: "https://hierophant.it/blurStyle/build/blurstyle.min.js", nocache: !0, onload: ev => { eval(ev.responseText) } });