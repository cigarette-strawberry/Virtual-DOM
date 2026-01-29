import vnode from "./vnode.js";

// 形态1 h("div", {}, "");
// 形态2 h("div", {}, []);
// 形态3 h("div", {}, h());
export default function h(sel, data, children) {
  if (arguments.length !== 3) {
    throw new Error("h函数参数错误");
  }

  if (typeof children === "string" || typeof children === "number") {
    // 形态1 字符串或者数字 作为文本内容
    return vnode(sel, data, undefined, children, undefined);
  } else if (Array.isArray(children)) {
    // 形态2 数组 作为子节点
    for (let i = 0; i < children.length; i++) {
      if (
        typeof children[i] !== "object" ||
        !children[i].hasOwnProperty("sel")
      ) {
        throw new Error("h函数参数错误");
      }
    }
    return vnode(sel, data, children, undefined, undefined);
  } else if (typeof children === "object" && children.hasOwnProperty("sel")) {
    // 形态3 虚拟节点 作为子节点
    return vnode(sel, data, [children], undefined, undefined);
  } else {
    throw new Error("h函数参数错误");
  }
}
