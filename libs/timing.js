import trackSend from "../utills/track";
export function timing() {
	window.addEventListener("load", (event) => {
        // console.log('%c [ performance.timing ]-5', 'font-size:14px; background:pink; color:#bf2c9f;', performance.timing)
		if (!performance.timing) {
			console.log("你的浏览器不支持 performance 接口");
			return;
		}
		const {
			fetchStart,
			connectStart,
			connectEnd,
			requestStart,
			responseStart,
			responseEnd,
			domLoading,
			domInteractive,
			domContentLoadedEventStart,
			domContentLoadedEventEnd,
			loadEventStart,
		} = performance.timing;
		let logData = {
			kind: "experience", // 用户体验指标
			type: "timing", // 统计每个阶段的时间
			connectTime: connectEnd - connectStart, // 连接时间
			ttfbTime: responseStart - requestStart, // 首字节到达用时
			responseTime: responseEnd - responseStart, //响应耗时
			parseDOMTime: loadEventStart - domLoading, //DOM解析时间
			domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart, // DOM加载用时(区别于load事件)
			timeToInteractive: domInteractive - fetchStart, // 首次可交互时间
			loadTime: loadEventStart - fetchStart, //完整的加载时间
		};
		console.log("%c [ logData ]-34", "font-size:14px; background:pink; color:#bf2c9f;", logData);
		trackSend(logData);
	});
}
