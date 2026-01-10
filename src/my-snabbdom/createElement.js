export default function (vnode, pivot) {
  console.log('🚀 ~ vnode:', vnode)
  console.log('将虚拟节点 ‘vnode’ 插入到 ‘pivot’ 之前')
  let domNode = document.createElement(vnode.sel)
  // 判断是字节点还是文本
  if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
    domNode.innerText = vnode.text

    pivot.parentNode.insertBefore(domNode, pivot)
  }
}
