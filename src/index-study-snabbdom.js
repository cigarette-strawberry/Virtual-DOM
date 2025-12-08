import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([
  // 通过传入模块初始化 patch 函数
  classModule, // 开启 classes 功能
  propsModule, // 支持传入 props
  styleModule, // 支持内联样式同时支持动画
  eventListenersModule, // 添加事件监听
]);

const container = document.getElementById("container");

// 创建虚拟节点
const vNode = h("div", { style: { color: "red" } }, "这是一个红色的div");
console.log("🚀 ~ vNode:", vNode);

// 嵌套h函数
const vNode1 = h("ul", { style: { color: "red" } }, [
  h("li", {}, "这是一个红色的div"),
  h("li", {}, [h("div", {}, "这是一个红色的div嵌套")]),
  h("li", {}, "这是一个红色的div"),
]);
console.log("🚀 ~ vNode1:", vNode1);

// 让虚拟节点上树
patch(container, vNode1);
