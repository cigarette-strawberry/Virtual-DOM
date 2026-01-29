import h from "./my-snabbdom/h.js";
import patch from "./my-snabbdom/patch.js";

const container = document.getElementById("container");
const btn = document.getElementById("btn");

const myButton1 = h("p", {}, "上树1");

const myButton4 = h("p", {}, [h("span", {}, "上树5"), h("span", {}, "上树6")]);

const myButton2 = h("ul", {}, [
  h("li", { key: "3" }, "上树3"),
  h("li", { key: "2" }, "上树2"),
  h("li", { key: "5" }, "上树5"),
  h("li", { key: "4" }, "上树4"),
  h("li", { key: "1" }, "上树1"),
]);

const myButton3 = h("ul", {}, [
  h("li", { key: "1" }, "上树11"),
  h("li", { key: "2" }, "上树22"),
  h("li", { key: "5" }, "上树55"),
  h("li", { key: "3" }, "上树33"),
  h("li", { key: "4" }, "上树44"),
]);

// patch(container, myButton1);
patch(container, myButton2);

btn.onclick = function () {
  // patch(myButton1, myButton4)
  patch(myButton2, myButton3);
};
