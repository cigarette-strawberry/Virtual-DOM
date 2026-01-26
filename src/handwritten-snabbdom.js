import h from "./my-snabbdom/h.js";
import patch from "./my-snabbdom/patch.js";

const container = document.getElementById("container");
const btn = document.getElementById("btn");

const myButton1 = h("p", {}, "上树1");

const myButton4 = h("p", {}, [h("span", {}, "上树5"), h("span", {}, "上树6")]);

const myButton2 = h("ul", {}, [
  h("li", { key: "1" }, "上树1"),
  h("li", { key: "2" }, "上树2"),
  h("li", { key: "3" }, "上树3"),
  h("li", { key: "4" }, "上树4"),
  h("li", { key: "5" }, "上树5"),
]);

const myButton3 = h("ul", {}, [
  h("li", { key: "8" }, "上树8"),
  h("li", { key: "1" }, "上树1"),
  h("li", { key: "2" }, "上树2"),
  h("li", { key: "3" }, "上树3"),
  h("li", { key: "7" }, "上树7"),
  h("li", { key: "4" }, "上树4"),
  h("li", { key: "5" }, "上树5"),
  h("li", { key: "6" }, "上树6"),
]);

patch(container, myButton2);

btn.onclick = function () {
  // patch(myButton1, myButton4)
  patch(myButton2, myButton3);
};
