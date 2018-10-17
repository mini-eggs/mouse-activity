import { mouse, debounce, throttle } from "./main";

var pkg = mouse;
pkg["debounce"] = debounce;
pkg["throttle"] = throttle;

if (typeof module !== "undefined") {
  module["exports"] = pkg;
} else {
  window["mouseActivity"] = pkg;
}
