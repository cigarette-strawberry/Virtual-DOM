import h from "./my-snabbdom/h.js";
import patch from "./my-snabbdom/patch.js";

const myButton1 = h("span", {}, "上树1");
const myButton2 = h("ul", {}, [
  h("li", {}, "上树2"),
  h("li", {}, "上树3"),
  h("li", {}, "上树4"),
]);
const container = document.getElementById("container");
const btn = document.getElementById("btn");

patch(container, myButton2);

const myButton3 = h("ol", {}, [
  h("li", {}, "上树5"),
  h("li", {}, "上树6"),
  h("li", {}, "上树7"),
  h("ul", {}, [
    h("li", {}, "上树8"),
    h("li", {}, "上树9"),
  ]),
]);

btn.onclick = function () {
  patch(myButton2, myButton3);
};
