import patchVnode from "./patchVnode";
import createElement from "./createElement";
// 判断是否是同一个虚拟节点
function checkSameVnode(oldVnode, newVnode) {
  return oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key;
}

export default function updateChildren(parentElm, oldChildren, newChildren) {
  console.log("🚀 ~ updateChildren ~ oldChildren:", oldChildren);
  console.log("🚀 ~ updateChildren ~ newChildren:", newChildren);
  // 老的子节点和新的子节点进行diff

  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldChildren.length - 1;
  let newEndIdx = newChildren.length - 1;
  let oldStartVnode = oldChildren[oldStartIdx];
  let newStartVnode = newChildren[newStartIdx];
  let oldEndVnode = oldChildren[oldEndIdx];
  let newEndVnode = newChildren[newEndIdx];

  let keyMap = {};

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    console.log("⭐");

    if (oldStartVnode == undefined || oldChildren[oldStartIdx] == null) {
      oldStartVnode = oldChildren[++oldStartIdx];
    } else if (oldEndVnode == undefined || oldChildren[oldEndIdx] == null) {
      oldEndVnode = oldChildren[--oldEndIdx];
    } else if (newStartVnode == undefined || newChildren[newStartIdx] == null) {
      newStartVnode = newChildren[++newStartIdx];
    } else if (newEndVnode == undefined || newChildren[newEndIdx] == null) {
      newEndVnode = newChildren[--newEndIdx];
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      // 新节点头部索引 老节点头部索引
      console.log("🚀 ~ updateChildren ~ ①新节点头部索引 老节点头部索引:");
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldChildren[++oldStartIdx];
      newStartVnode = newChildren[++newStartIdx];
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      // 新节点尾部索引 老节点尾部索引
      console.log("🚀 ~ updateChildren ~  ②新节点尾部索引 老节点尾部索引:");
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldChildren[--oldEndIdx];
      newEndVnode = newChildren[--newEndIdx];
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      // 新节点尾部索引 老节点头部索引
      console.log("🚀 ~ updateChildren ~ ③新节点尾部索引 老节点头部索引:");
      patchVnode(oldStartVnode, newEndVnode);
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      oldStartVnode = oldChildren[++oldStartIdx];
      newEndVnode = newChildren[--newEndIdx];
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      // 新节点头部索引 老节点尾部索引
      console.log("🚀 ~ updateChildren ~ ④新节点头部索引 老节点尾部索引:");
      patchVnode(oldEndVnode, newStartVnode);
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldChildren[--oldEndIdx];
      newStartVnode = newChildren[++newStartIdx];
    } else {
      // 四个都没命中
      for (let i = oldStartIdx; i <= oldEndIdx; i++) {
        const key = oldChildren[i]?.key;
        if (key !== undefined) {
          keyMap[key] = i;
        }
      }

      const idxInOld = keyMap[newStartVnode.key];

      if (idxInOld === undefined) {
        // 不存在是新添加的
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      } else {
        // 移动
        const eleToMove = oldChildren[idxInOld];
        patchVnode(eleToMove, newStartVnode);
        oldChildren[idxInOld] = undefined;
        parentElm.insertBefore(eleToMove.elm, oldStartVnode.elm);
      }
      newStartVnode = newChildren[++newStartIdx];
    }
  }

  if (newStartIdx <= newEndIdx) {
    console.log("newChildren中还有剩余节点未处理，添加");

    const before =
      newChildren[newEndIdx + 1] == null
        ? null
        : newChildren[newEndIdx + 1].elm;
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      const element = newChildren[i];
      // insertBefore方法可以自动识别出null，将dom挂载到最后面
      const dom = createElement(element);
      parentElm.insertBefore(dom, before);
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log("oldChildren中还有剩余节点未处理，删除");
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      const element = oldChildren[i];
      if (element) {
        parentElm.removeChild(element.elm);
      }
    }
  }
}
