function isElementInViewport (el) {
	let rect = el.getBoundingClientRect()
	
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
		rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
	);
}

function onVisibilityChange(el, callback) {
	let old_visible
	return function () {
		let visible = isElementInViewport(el)
		if (visible != old_visible) {
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
						}, 30 * i)
					}(i))
				}
			},	30 * j)
		}(j))
	}
}

function findAncestor (el, cls) {
	while ((el = el.parentel) && !el.clsList.contains(cls));
	return el
}

document.addEventListener('DOMContentLoaded', (e)=> {
	
	document.querySelector('a[href="#special"]').addEventListener('click',(e)=> {
		e.preventDefault();
		document.getElementById('special').scrollIntoView({
			block: 'start',
			behavior: 'smooth'
		})
	})
	
})


window.addEventListener('load', (e)=> {
	
	let handler = onVisibilityChange(document.querySelector('.type'), function() {
		type('.type')

	});
	
	if (window.addEventListener) {
		// addEventListener('DOMContentLoaded', handler, false);
		// addEventListener('load', handler, false)
		addEventListener('scroll', handler, false)
		addEventListener('resize', handler, false)
	}
})
