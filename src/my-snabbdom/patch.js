import vnode from './vnode'
import createElement from './createElement'
export default function patch(oldVnode, newVnode) {
  // 判断传入的第一个参数，是DOM节点还是虚拟节点
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    // 传入的第一个参数是DOM节点，此时要包装为虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }

  // 判断 oldVnode 和 newVnode 是不是同一个节点
  if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
    console.log('是同一个节点，递归进行精细化比较')
    // 判断 新旧Vnode 是否是同一个对象
    if (oldVnode === newVnode) return
    //判断 新Vnode 有没有 text属性
    if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
      // 新node有text属性
      if (oldVnode.text !== newVnode.text) {
        // 新老虚拟节点的 text 不相同，直接让新的text写入elm即可；如果老的elm是children，也会消失
        oldVnode.elm.innerText = newVnode.text
      }
    } else {
      // 新的Vnode 没有text属性 存在children
      if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      } else {
        // 老的Vnode没有children，新的有
        // 清空老的节点内容
        oldVnode.elm.innerText = ''
        // 遍历新的Vnode子节点，创建DOM，上树
        for (let i = 0; i < newVnode.children.length; i++) {
          const element = newVnode.children[i]
          const dom = createElement(element)
          oldVnode.elm.appendChild(dom)
        }
      }
    }
  } else {
    console.log('不是同一个节点，暴力删除旧的，插入新的')
    const newVnodeElm = createElement(newVnode)
    // 插入到老节点之前 上树
    if (oldVnode.elm.parentNode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }
    // 删除旧的节点
    if (oldVnode.elm && oldVnode.elm.parentNode) {
      oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
  }
}
