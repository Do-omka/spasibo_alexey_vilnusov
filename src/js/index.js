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
	let recall = document.querySelectorAll('a[href="recall.html"]')
	for (let i = 0; i < recall.length; i++) {
		recall[i].addEventListener('click', (e)=> {
			e.preventDefault();
			document.getElementById('recall_popup').querySelector('[name="src"]').value = recall[i].dataset.src;
			document.getElementById('recall_popup').querySelector('button[type="submit"]').innerHTML = recall[i].innerHTML;
			document.getElementById('recall_popup').classList.add('active')
		})
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
	
	let toType
	if (document.querySelectorAll('.type')) {
		toType = document.querySelectorAll('.type')
		for (let i = 0; i < toType.length; i++) {
			let handlerType = onVisibilityChange(toType[i], function() {
				type(toType[i])
			})
			addEventListener('DOMContentLoaded', handlerType, false)
			addEventListener('scroll', handlerType, false)
			addEventListener('resize', handlerType, false)
		}
	}

	// let toCount
	// if (document.querySelectorAll('.count')) {
	// 	toCount = document.querySelectorAll('.count')
	// 	for (let i = 0; i < toType.length; i++) {
	// 		let handlerCount = onVisibilityChange(toCount[i], function() {
	// 			count(toCount[i])
	// 		})
	// 		addEventListener('DOMContentLoaded', handlerCount, false)
	// 		addEventListener('scroll', handlerCount, false)
	// 		addEventListener('resize', handlerCount, false)
	// 	}
	// }
	
	let handlerFlow = onVisibilityChange(document.querySelector('section.why ol'), function() {
		let li = document.querySelectorAll('section.why ol li')
		
		for (let i = 0; i < li.length; i++) {
			setTimeout(()=> {
				li[i].classList.remove('preload')
			}, 500 * i)
		}
		
	})
	
	let fadeIn
	if (document.querySelector('ol.fadeIn')) {
		fadeIn = onVisibilityChange(document.querySelector('ol.fadeIn'), function() {
			let li = document.querySelectorAll('ol.fadeIn li')
			
			for (let i = 0; i < li.length; i++) {
				setTimeout(()=> {
					li[i].classList.remove('fadeIn')
				}, 500 * i)
			}
			
		})
	}
	
	let zoomIn
	if (document.querySelectorAll('.zoomIn')) {
		zoomIn = document.querySelectorAll('.zoomIn')
		for (let i = 0; i < zoomIn.length; i++) {
			let handler = onVisibilityChange(zoomIn[i], function() {
				zoomIn[i].classList.remove('zoomIn')
			})
			addEventListener('DOMContentLoaded', handler, false)
			addEventListener('scroll', handler, false)
			addEventListener('resize', handler, false)
		}
	}
	
	if (document.querySelector('ol.fadeIn')) {
		fadeIn = onVisibilityChange(document.querySelector('ol.fadeIn'), function() {
			let li = document.querySelectorAll('ol.fadeIn li')
			
			for (let i = 0; i < li.length; i++) {
				setTimeout(()=> {
					li[i].classList.remove('fadeIn')
				}, 500 * i)
			}
			
		})
	}
	
	addEventListener('DOMContentLoaded', fadeIn, false)
	addEventListener('scroll', fadeIn, false)
	addEventListener('resize', fadeIn, false)
	
	addEventListener('DOMContentLoaded', handlerFlow, false)
	addEventListener('scroll', handlerFlow, false)
	addEventListener('resize', handlerFlow, false)
	
})
