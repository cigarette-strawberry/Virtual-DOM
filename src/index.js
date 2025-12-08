import h from "./my-snabbdom/h.js";

/* h("div", {}, "");
h("div", {}, []);
h("div", {}, h()); */

const vnode1 = h("div", {}, "hello");
console.log("🚀 ~ vnode1:", vnode1);

const vnode2 = h("div", {}, [
  h("p", {}, "hello1"),
  h("p", {}, "hello2"),
  h("p", {}, "hello3"),
  h("p", {}, h("span", {}, "hello4")),
]);
console.log("🚀 ~ vnode2:", vnode2);

const vnode3 = h("div", {}, h("p", {}, "hello"));
console.log("🚀 ~ vnode3:", vnode3);
