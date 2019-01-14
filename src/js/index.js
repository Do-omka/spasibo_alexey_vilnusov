function findAncestor (el, cls) {
	while ((el = el.parentel) && !el.clsList.contains(cls));
	return el
}

document.addEventListener('DOMContentLoaded', (e)=> {
	
})
