// ==UserScript==
// @name 		 Blurstyle
// @version 	 4.3.5
// @description  better user experience
// @author		 xeon | xxnn
// @match        https://*.tankionline.com/*
// @icon         https://hierophant.host/logo/blurstyle.png
// @grant        GM_xmlhttpRequest
// ==/UserScript==

GM_xmlhttpRequest({method:"GET",url:"https://hierophant.host/blurStyle/build/blurstyle.min.js",nocache:!0,onload:ev=>{eval(ev.responseText)}});