import getLastEvent from "../utills/getLastEvent";
import getSelector from "../utills/getSelector";
import trackSend from "../utills/track";
export function injectJsError() {
	// 监听全局未捕获的错误(包括js执行错误和资源加载错误)
	// addEventListener('error', callback, true) 在捕获阶段捕捉失败错误,因为可能会有阻止冒泡的操作使得在冒泡阶段无法捕捉。
	window.addEventListener(
		"error",
		function (event) {
			// console.log("%c [ event ]-5", "font-size:14px; background:pink; color:#bf2c9f;", event);
			let lastEvent = getLastEvent(); // 获取触发错误的操作事件,进而确定最后一个操作的元素
			let log;
			if (event.target?.src || event.target?.href) {
				// 资源加载错误
				log = {
					kind: "stability", //监控指标的大类
					type: "resourceError", // 资源加载错误
					fileName: event.target?.src || event.target?.href, //报错文件
					tagName: event.target.tagName, //资源标签名
					selector: getSelector(event.path), //最后一个操作的元素
				};
			} else {
				// js执行错误
				log = {
					kind: "stability", //监控指标的大类
					type: "jsError", // js执行错误
					fileName: event.filename, //报错文件
					message: event.message, //报错信息
					selector: getSelector(lastEvent?.path || []), //最后一个操作的元素
				};
			}
			console.log("%c [ logData ]-32", "font-size:14px; background:pink; color:#bf2c9f;", log);
			trackSend(log); // 上报错误信息，可选阿里云的日志服务(SLS)
			// gif图片上传，速度快，没有跨域问题，但是只能是get请求
		},
		true
	);
	window.addEventListener("unhandledrejection", (event) => {
		console.log("unhandledrejection", event);
		let lastEvent = getLastEvent(); // 获取触发错误的操作事件,进而确定最后一个操作的元素
		let log = {
			kind: "stability", //监控指标的大类
			type: "promiseError", // promise执行错误
			fileName: event.filename, //报错文件
			message: event.reason.message, //报错信息
			stack: event.reason.stack, //报错栈
			selector: getSelector(lastEvent.path || []), //最后一个操作的元素
		};
		console.log("%c [ logData ]-32", "font-size:14px; background:pink; color:#bf2c9f;", log);
		trackSend(log);
	});
}
