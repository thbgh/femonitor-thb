import { injectJsError } from "./libs/jsError";
import { injectXHR } from "./libs/xhr";
// console.log("monitoring...");
export default {
	injectJsError,
	injectXHR,
	startAll: () => {
		injectJsError();
		injectXHR();
	},
};
