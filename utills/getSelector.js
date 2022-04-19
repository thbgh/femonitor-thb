function getSelector(path) {
	return path
		.reverse()
		.filter((element) => element !== document && element !== window)
		.map((element) => {
			let selector = "";
			if (element.id) {
				selector = `${element.nodeName.toLowerCase()}#${element.id}`;
			} else if (element.className) {
				selector = `${element.nodeName.toLowerCase()}.${element.className.toString()}`;
			} else {
				selector = `${element.nodeName.toLowerCase()}`;
			}
			return selector;
		});
}
export default function (path) {
	if (Array.isArray(path)) {
		return getSelector(path);
	}
	return getSelector([path]);
}
