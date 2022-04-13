let lastEvent;
["click", "mouseover", "touchstart", "mousedown"].forEach((eventType) => {
	document.addEventListener(
		eventType,
		(event) => {
			lastEvent = event;
		},
		{
			capture: true, //捕获阶段
			passive: true, // 不阻止默认事件
		}
	);
});
export default function () {
	return lastEvent;
}
