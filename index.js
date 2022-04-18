import { injectJsError } from "./libs/jsError";
import { injectXHR } from "./libs/xhr";
import { timing } from "./libs/timing";
// console.log("monitoring...");
export default {
	injectJsError,
	injectXHR,
	startAll: () => {
		injectJsError();
		injectXHR();
		timing();
	},
};
