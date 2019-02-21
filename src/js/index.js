function findAncestor (el, cls) {
	while ((el = el.parentElement) && !el.classList.contains(cls));
	return el
}

function isElementInViewport (el) {
	let rect = el.getBoundingClientRect()
	return !(rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight)
}

function toType(el, to, handler) {
	if (el.classList.contains('type')) {
		let delay, text = to.textContent
		for (let i = 0; i < text.length; i++) {
			setTimeout(function() {
				el.innerHTML += text[i]
				// el.insertAdjacentHTML('beforeend', to[i])
				el.classList.remove('type')
			}, 8 * i)
			delay = 8 * (i)
		}
		setTimeout(function() {
			el.innerHTML = to.innerHTML
		}, delay)
		
		removeEventListener('scroll', handler, false)
		removeEventListener('resize', handler, false)
	}
}

function toCount(el, to, handler) {
	if (el.classList.contains('count')) {
		let incr = to / 1000
		let v = 0
		
		for (let i = 0; i < 1000; i++) {
			setTimeout(function() {
				v += incr
				el.innerHTML = Math.round(v)
			}, i * 1)
		}
		el.classList.remove('count')
		
		removeEventListener('scroll', handler, false)
		removeEventListener('resize', handler, false)
	}
}

addEventListener('DOMContentLoaded', (e)=> {
	
	for (let i = 0; i < document.querySelectorAll('a[href="pdpa.html"]').length; i++) {
		document.querySelectorAll('a[href="pdpa.html"]')[i].addEventListener('click',(e)=> {
			e.preventDefault();
			document.getElementById('pdpa_popup').classList.add('active')
		})
	}
	
	if (document.querySelector('a[href="#special"]')) {
		document.querySelector('a[href="#special"]').addEventListener('click',(e)=> {
			e.preventDefault();
			document.getElementById('special').scrollIntoView({
				block: 'start',
				behavior: 'smooth'
			})
		})
	}
	
	// recall popup
	if (document.querySelectorAll('a[href="recall.html"]')) {
		let recall = document.querySelectorAll('a[href="recall.html"]')
		for (let i = 0; i < recall.length; i++) {
			recall[i].addEventListener('click', (e)=> {
				e.preventDefault();
				document.getElementById('recall_popup').querySelector('[name="src"]').value = recall[i].dataset.src;
				document.getElementById('recall_popup').querySelector('button[type="submit"]').innerHTML = recall[i].innerHTML;
				document.getElementById('recall_popup').classList.add('active')
			})
		}
	}
	
	// apply popup
	if (document.querySelectorAll('a[href="apply.html"]')) {
		let apply = document.querySelectorAll('a[href="apply.html"]')
		for (let i = 0; i < apply.length; i++) {
			apply[i].addEventListener('click', (e)=> {
				e.preventDefault();
				document.getElementById('apply_popup').querySelector('[name="src"]').value = apply[i].dataset.src;
				document.getElementById('apply_popup').querySelector('button[type="submit"]').innerHTML = apply[i].innerHTML;
				document.getElementById('apply_popup').classList.add('active')
			})
		}
	}
	
	// howtoinvest popup
	if (document.querySelectorAll('a[href="howtoinvest.html"]')) {
		let howtoinvest = document.querySelectorAll('a[href="howtoinvest.html"]')
		for (let i = 0; i < howtoinvest.length; i++) {
			howtoinvest[i].addEventListener('click', (e)=> {
				e.preventDefault();
				document.getElementById('howtoinvest_popup').classList.add('active')
				findAncestor(howtoinvest[i], 'popup').classList.remove('active')
			})
		}
	}
	
	
	// close buttons
	let close = document.querySelectorAll('button.close')
	for (let i = 0; i < close.length; i++) {
		close[i].addEventListener('click', (e)=> {
			findAncestor(close[i], 'popup').classList.remove('active')
		})
	}
	
	// close popup on click outside
	let popup_close = document.querySelectorAll('.popup:not(.banner)')
	for (let i = 0; i < popup_close.length; i++) {
		popup_close[i].addEventListener('click', (e)=> {
			if (e.target == popup_close[i]) {
				popup_close[i].classList.remove('active')
			}
		})
	}
	
	// let popup_form = document.querySelectorAll('.popup .form')
	// for (let i = 0; i < popup_form.length; i++) {
	// 	popup_form[i].addEventListener('click', (e)=> {
	// 		e.stopPropagation()
	// 	})
	// }
	
	if (document.querySelectorAll('.type')) {
		let ttype = document.querySelectorAll('.type')
		for (let i = 0; i < ttype.length; i++) {
			let to = ttype[i].cloneNode(true)
			ttype[i].textContent = ''
			let handler = ()=> {
				if (isElementInViewport(ttype[i])) {
					toType(ttype[i], to)
				}
			}
			handler()
			addEventListener('scroll', handler, false)
			addEventListener('resize', handler, false)
		}
	}
	
	if (document.querySelectorAll('.count')) {
		let count = document.querySelectorAll('.count')
		for (let i = 0; i < count.length; i++) {
			let to = Number(count[i].innerHTML)
			let handler = ()=> {
				if (isElementInViewport(count[i])) {
					toCount(count[i], to, handler)
				}
			}
			count[i].innerHTML = 0;
			handler()
			addEventListener('scroll', handler, false)
			addEventListener('resize', handler, false)
		}
	}
	
	if (document.querySelector('section.why ol')) {
		let li = document.querySelectorAll('section.why ol li')
		for (let i = 0; i < li.length; i++) {
			li[i].classList.add('preload')
		}
		let handler = ()=> {
			if (isElementInViewport(document.querySelector('section.why ol'))) {
				let li = document.querySelectorAll('section.why ol li')
				for (let i = 0; i < li.length; i++) {
					setTimeout(()=> {
						li[i].classList.remove('preload')
					}, 500 * i)
				}
			}
		}
		handler()
		addEventListener('scroll', handler, false)
		addEventListener('resize', handler, false)
	}
	
	if (document.querySelector('ol.fadeIn')) {
		let li = document.querySelectorAll('ol.fadeIn li')
		for (let i = 0; i < li.length; i++) {
			li[i].classList.add('preload')
		}
		
		let handler = ()=> {
			if (isElementInViewport(document.querySelector('ol.fadeIn'))) {
				let li = document.querySelectorAll('ol.fadeIn li')
				for (let i = 0; i < li.length; i++) {
					setTimeout(()=> {
						li[i].classList.remove('preload')
					}, 500 * i)
				}
			}
		}
		handler()
		addEventListener('scroll', handler, false)
		addEventListener('resize', handler, false)
	}
	
	if (document.querySelectorAll('.zoomIn')) {
		let zoomIn = document.querySelectorAll('.zoomIn')
		for (let i = 0; i < zoomIn.length; i++) {
			zoomIn[i].classList.add('preload')
		}
		
		for (let i = 0; i < zoomIn.length; i++) {
			let handler = ()=> {
				if (isElementInViewport(zoomIn[i])) {
					zoomIn[i].classList.remove('preload')
				}
			}
			handler()
			addEventListener('scroll', handler, false)
			addEventListener('resize', handler, false)
		}
	}
	
})
