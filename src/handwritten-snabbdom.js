import h from "./my-snabbdom/h.js";
import patch from "./my-snabbdom/patch.js";

const myButton1 = h("button", {}, "click me");
const container = document.getElementById("container");

patch(container, myButton1);
