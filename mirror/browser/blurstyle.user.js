// ==UserScript==
// @name 		 Blurstyle mirror
// @version 	 5.0.0
// @description  better user experience
// @author		 xeon | xxnn
// @match        https://tankionline.com/play/*
// @match        https://ratings.tankionline.com/*
// @icon         https://github.com/xeon-git/BlurStyle/blob/main/resources/logo/blurstyle.png?raw=true
// @grant        GM_xmlhttpRequest
// ==/UserScript==

GM_xmlhttpRequest({method:"GET",url:"https://raw.githubusercontent.com/xeon-git/BlurStyle/refs/heads/main/mirror/browser/blurstyle.min.js",nocache:!0,onload:ev=>{eval(ev.responseText)}});