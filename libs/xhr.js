import trackSend from "../utills/track";
export function injectXHR() {
	// 改写 window.XMLHttpRequest,监听自定义接口请求错误
	// console.log("injectXHR");
	let XMLHttpRequest = window.XMLHttpRequest;
	let oldOpen = XMLHttpRequest.prototype.open;
	XMLHttpRequest.prototype.open = function (method, url, async) {
		this.logData = { method, url, async };
		return oldOpen.apply(this, arguments);
	};
	let oldSend = XMLHttpRequest.prototype.send;
	XMLHttpRequest.prototype.send = function (body) {
		let startTime = Date.now();
		if (this.logData.url.indexOf("logstore/track") === -1) {
			// 屏蔽掉上报请求本上
			let handler = (type) => (event) => {
				let duration = Date.now() - startTime;
				this.logData = {
					...this.logData,
					params: body || "",
					duration,
					status: this.status,
					statusText: this.statusText,
					kind: "stability", //监控指标的大类
					type: "APIError", // 资源加载错误
				};

				// console.log("%c [ logData ]-25", "font-size:14px; background:pink; color:#bf2c9f;", this.logData);
				this.status !== 200 && trackSend(this.logData); // 上报数据
			};
			this.addEventListener("load", handler("load"), false); // 请求成功
			this.addEventListener("error", handler("error"), false); // 请求失败
			this.addEventListener("abort", handler("abort"), false); // 请求终止
		}
		return oldSend.apply(this, arguments);
	};
}
