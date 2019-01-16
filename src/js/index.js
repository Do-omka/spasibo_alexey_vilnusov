function findAncestor (el, cls) {
	while ((el = el.parentel) && !el.clsList.contains(cls));
	return el
}

document.addEventListener('DOMContentLoaded', (e)=> {
	
	document.querySelector('a[href="#special"]').addEventListener('click',(e)=> {
		e.preventDefault()
		document.getElementById('special').scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    })
	})
})
