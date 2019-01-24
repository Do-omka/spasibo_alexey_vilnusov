"use strict";function findAncestor(e,t){for(;(e=e.parentElement)&&!e.classList.contains(t););return e}function isElementInViewport(e){var t=e.getBoundingClientRect();return!(t.bottom<0||t.right<0||t.left>window.innerWidth||t.top>window.innerHeight)}function onVisibilityChange(t,n){var o=!1;return function(){var e=isElementInViewport(t);(e!=o||e)&&(o=e,"function"==typeof n&&n())}}function type(e){var o=[],r=[];o=document.querySelectorAll(e);for(var t=0;t<o.length;t++)r[t]=o[t].textContent,o[t].textContent="";for(var n=0;n<o.length;n++)!function(n){setTimeout(function(){for(var e=0;e<r[n].length;e++)!function(t){setTimeout(function(){var e=document.createTextNode(r[n][t]);o[n].appendChild(e),o[n].classList.remove("type")},10*t)}(e)},10*n)}(n)}document.addEventListener("DOMContentLoaded",function(e){for(var t=0;t<document.querySelectorAll('a[href="pdpa.html"]').length;t++)document.querySelectorAll('a[href="pdpa.html"]')[t].addEventListener("click",function(e){e.preventDefault(),document.getElementById("pdpa").classList.add("active")});document.querySelector('a[href="#special"]')&&document.querySelector('a[href="#special"]').addEventListener("click",function(e){e.preventDefault(),document.getElementById("special").scrollIntoView({block:"start",behavior:"smooth"})});for(var n=document.querySelectorAll(".recall"),o=function(t){n[t].addEventListener("click",function(e){e.preventDefault(),document.getElementById("recall_popup").querySelector('[name="src"]').value=n[t].dataset.src,document.getElementById("recall_popup").querySelector('button[type="submit"]').innerHTML=n[t].innerHTML,document.getElementById("recall_popup").classList.add("active")})},r=0;r<n.length;r++)o(r);for(var c=document.querySelectorAll(".close"),i=function(t){c[t].addEventListener("click",function(e){findAncestor(c[t],"popup").classList.remove("active")})},l=0;l<c.length;l++)i(l);for(var a=document.querySelectorAll(".popup"),u=function(t){a[t].addEventListener("click",function(e){a[t].classList.remove("active")})},d=0;d<a.length;d++)u(d);for(var s=document.querySelectorAll(".popup .form"),f=0;f<s.length;f++)s[f].addEventListener("click",function(e){e.stopPropagation()});var p=onVisibilityChange(document.querySelector(".totype"),function(){type(".type")}),m=onVisibilityChange(document.querySelector("section.why ol"),function(){for(var t=document.querySelectorAll("section.why ol li"),e=0;e<t.length;e++)!function(e){setTimeout(function(){t[e].classList.remove("preload")},500*e)}(e)});addEventListener("DOMContentLoaded",p,!1),addEventListener("scroll",p,!1),addEventListener("resize",p,!1),addEventListener("DOMContentLoaded",m,!1),addEventListener("scroll",m,!1),addEventListener("resize",m,!1)});