// 数据上报请求，使用阿里云SLS
const host = "cn-shanghai.log.aliyuncs.com";
const project = "femonitor-thb";
const logStorage = "logstore";
export default function (logData = {}) {
	// SLS规定logData的字段值只能是字符串类型
	for (const key in logData) {
		if (typeof logData[key] !== "string") {
			logData[key] = `${logData[key]}`;
		}
	}
	let body = JSON.stringify({ __logs__: [logData] });
	// console.log("%c [ body ]-13", "font-size:14px; background:pink; color:#bf2c9f;", body);
	let url = `http://${project}.${host}/logstores/${logStorage}/track`;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("x-log-apiversion", "0.6.0");
	xhr.setRequestHeader("x-log-bodyrawsize", body.length);
	xhr.onload = function () {
		// console.log(xhr.response);
	};
	xhr.onerror = function (error) {
		console.log("[ error ] >", error);
	};
	window.requestIdleCallback(()=>{xhr.send(body)})//浏览器空闲时间发送上报请求
}
