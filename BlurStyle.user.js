// ==UserScript==
// @name 		     BlurStyle
// @version 	   4.0
// @description	 better user experience
// @author		   xeon | xxnn
// @match        https://*.tankionline.com/*
// @icon         https://media.discordapp.net/attachments/1198382685882691665/1198383109683560548/blurstyle.png 
// @grant        GM_xmlhttpRequest
// ==/UserScript==

GM_xmlhttpRequest({
    method : "GET",
    url : "https://raw.githubusercontent.com/xeon-git/BlurStyle/main/BlurStyle.js",
    nocache: true,
    onload: (ev) =>
    {
      eval(ev.responseText);
    }
  });