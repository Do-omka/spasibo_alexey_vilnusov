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

function type(slctr) {
	let text=[], textCont=[]
	text = document.querySelectorAll(slctr)
	
	for (let i = 0; i < text.length; i++) {
		textCont[i] = text[i].textContent
		text[i].textContent = ''
	}
	
	for (let j = 0; j < text.length; j++) {
		(function(j) {
			setTimeout(function() {
				for (let i = 0; i < textCont[j].length; i++) {
					(function(i) {
						setTimeout(function() {
							let texts = document.createTextNode(textCont[j][i])
							text[j].appendChild(texts)
							text[j].classList.remove('type')
						}, 10 * i)
					}(i))
				}
			},	10 * j)
		}(j))
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
	let recall = document.querySelectorAll('.recall')
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

	let handlerType = onVisibilityChange(document.querySelector('.totype'), function() {
		type('.type')
	})
	
	let handlerFlow = onVisibilityChange(document.querySelector('section.why ol'), function() {
		let li = document.querySelectorAll('section.why ol li')
		
		for (let i = 0; i < li.length; i++) {
			(function (i) {
				setTimeout(()=> {
					li[i].classList.remove('preload')
					
				}, 500 * i)
			})(i)
		}
		
	})
	
	addEventListener('DOMContentLoaded', handlerType, false)
	addEventListener('scroll', handlerType, false)
	addEventListener('resize', handlerType, false)
	addEventListener('DOMContentLoaded', handlerFlow, false)
	addEventListener('scroll', handlerFlow, false)
	addEventListener('resize', handlerFlow, false)
	
})
