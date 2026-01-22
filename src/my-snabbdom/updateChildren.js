import patchVnode from "./patchVnode";
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

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (checkSameVnode(oldStartVnode, newStartVnode)) {
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
    }
  }
}
