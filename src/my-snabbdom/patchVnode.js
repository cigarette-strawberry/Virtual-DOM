import createElement from "./createElement";
import updateChildren from "./updateChildren";

export default function patchVnode(oldVnode, newVnode) {
  // 判断 新旧Vnode 是否是同一个对象
  if (oldVnode === newVnode) return;
  //判断 新Vnode 有没有 text属性
  if (
    newVnode.text !== undefined &&
    (newVnode.children === undefined || newVnode.children.length === 0)
  ) {
    // 新node有text属性
    if (oldVnode.text !== newVnode.text) {
      // 新老虚拟节点的 text 不相同，直接让新的text写入elm即可；如果老的elm是children，也会消失
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    // 新的Vnode 没有text属性 存在children
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
      // 老的Vnode有children，新的Vnode也有children，最复杂情况
      /* // 双指针
      let unIndex = 0;
      for (let i = 0; i < newVnode.children.length; i++) {
        const iCh = newVnode.children[i];
        let isExist = false;
        for (let j = 0; j < oldVnode.children.length; j++) {
          const jCh = oldVnode.children[j];
          if (iCh.sel === jCh.sel && iCh.key === jCh.key) {
            isExist = true;
          }
        }
        if (!isExist) {
          // 新的子节点在老的子节点中不存在，创建新的DOM，上树
          const dom = createElement(iCh);
        //   iCh.elm = dom;
          if (unIndex < oldVnode.children.length) {
            oldVnode.elm.insertBefore(dom, oldVnode.children[unIndex].elm);
          } else {
            oldVnode.elm.appendChild(dom);
          }
        } else {
          unIndex++;
        }
      } */
    } else {
      // 老的Vnode没有children，新的有
      // 清空老的节点内容
      oldVnode.elm.innerText = "";
      // 遍历新的Vnode子节点，创建DOM，上树
      for (let i = 0; i < newVnode.children.length; i++) {
        const element = newVnode.children[i];
        const dom = createElement(element);
        oldVnode.elm.appendChild(dom);
      }
    }
  }
}
