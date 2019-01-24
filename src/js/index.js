function findAncestor (el, cls) {
	while ((el = el.parentElement) && !el.classList.contains(cls));
	return el
}

function isElementInViewport (el) {
	let rect = el.getBoundingClientRect()
	return !(rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight)
}

function onVisibilityChange(el, callback) {
	let old_visible = false
	return function () {
		let visible = isElementInViewport(el)
		if (visible != old_visible || visible) {
			old_visible = visible
			if (typeof callback == 'function') {
				callback()
			}
		}
	}
}

function type(text) {
	if (text.classList.contains('type')) {
		let textCont=[]
		textCont = text.textContent
		text.textContent = ''
		
		for (let i = 0; i < textCont.length; i++) {
			setTimeout(function() {
				let texts = document.createTextNode(textCont[i])
				text.appendChild(texts)
				text.classList.remove('type')
			}, 10 * i)
		}
	}
}

function toCount(el) {
	if (el.classList.contains('count')) {
		let incr = Number(el.innerHTML) / 1000
		let v = 0
		el.innerHTML = '0'
		
		for (let i = 0; i < 1000; i++) {
			setTimeout(function() {
				v += incr
				el.innerHTML = Math.round(v)
			}, i * 1)
		}

		el.classList.remove('count')
	}
}

document.addEventListener('DOMContentLoaded', (e)=> {
	
	for (let i = 0; i < document.querySelectorAll('a[href="pdpa.html"]').length; i++) {
		document.querySelectorAll('a[href="pdpa.html"]')[i].addEventListener('click',(e)=> {
			e.preventDefault();
			document.getElementById('pdpa').classList.add('active')
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
	
	
	// close buttons
	let close = document.querySelectorAll('.close')
	for (let i = 0; i < close.length; i++) {
		close[i].addEventListener('click', (e)=> {
			findAncestor(close[i], 'popup').classList.remove('active')
		})
	}
	
	// close popup on click outside
	let popup_close = document.querySelectorAll('.popup')
	for (let i = 0; i < popup_close.length; i++) {
		popup_close[i].addEventListener('click', (e)=> {
			popup_close[i].classList.remove('active')
		})
	}
	
	let popup_form = document.querySelectorAll('.popup .form')
	for (let i = 0; i < popup_form.length; i++) {
		popup_form[i].addEventListener('click', (e)=> {
			e.stopPropagation()
		})
	}
	
	if (document.querySelectorAll('.type')) {
		let toType = document.querySelectorAll('.type')
		for (let i = 0; i < toType.length; i++) {
			let handlerType = onVisibilityChange(toType[i], function() {
				type(toType[i])
			})
			addEventListener('DOMContentLoaded', handlerType, false)
			addEventListener('scroll', handlerType, false)
			addEventListener('resize', handlerType, false)
		}
	}
	
	if (document.querySelectorAll('.count')) {
		let count = document.querySelectorAll('.count')
		for (let i = 0; i < count.length; i++) {
			let handler = onVisibilityChange(count[i], function() {
				toCount(count[i])
			})
			addEventListener('DOMContentLoaded', handler, false)
			addEventListener('scroll', handler, false)
			addEventListener('resize', handler, false)
		}
	}
	
	let handlerFlow = onVisibilityChange(document.querySelector('section.why ol'), function() {
		let li = document.querySelectorAll('section.why ol li')
		
		for (let i = 0; i < li.length; i++) {
			setTimeout(()=> {
				li[i].classList.remove('preload')
			}, 500 * i)
		}
		
	})
	addEventListener('DOMContentLoaded', handlerFlow, false)
	addEventListener('scroll', handlerFlow, false)
	addEventListener('resize', handlerFlow, false)
	
	if (document.querySelector('ol.fadeIn')) {
		let fadeIn = onVisibilityChange(document.querySelector('ol.fadeIn'), function() {
			let li = document.querySelectorAll('ol.fadeIn li')
			
			for (let i = 0; i < li.length; i++) {
				setTimeout(()=> {
					li[i].classList.remove('fadeIn')
				}, 500 * i)
			}
		})
		
		addEventListener('DOMContentLoaded', fadeIn, false)
		addEventListener('scroll', fadeIn, false)
		addEventListener('resize', fadeIn, false)
	}
	
	if (document.querySelectorAll('.zoomIn')) {
		let zoomIn = document.querySelectorAll('.zoomIn')
		for (let i = 0; i < zoomIn.length; i++) {
			let handler = onVisibilityChange(zoomIn[i], function() {
				zoomIn[i].classList.remove('zoomIn')
			})
			addEventListener('DOMContentLoaded', handler, false)
			addEventListener('scroll', handler, false)
			addEventListener('resize', handler, false)
		}
	}

	
})
