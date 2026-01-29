import vnode from './vnode'
import createElement from './createElement'
import patchVnode from './patchVnode.js'
export default function patch(oldVnode, newVnode) {
  // 判断传入的第一个参数，是DOM节点还是虚拟节点
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    // 传入的第一个参数是DOM节点，此时要包装为虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }

  // 判断 oldVnode 和 newVnode 是不是同一个节点
  if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
    console.log('是同一个节点，递归进行精细化比较')
    // 调用 patchVnode 函数，对节点进行精细化比较
    patchVnode(oldVnode, newVnode)
  } else {
    console.log('不是同一个节点，暴力删除旧的，插入新的')
    const newVnodeElm = createElement(newVnode)
    // 插入到老节点之前 上树
    // oldVnode.elm.parentNode 表示父节点
    
    if (oldVnode.elm.parentNode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }
    // 删除旧的节点
    if (oldVnode.elm && oldVnode.elm.parentNode) {
      oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
  }
}
