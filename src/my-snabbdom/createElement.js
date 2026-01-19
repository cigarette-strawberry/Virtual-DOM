export default function createElement(vnode) {
  console.log('🚀 ~ vnode:', vnode)
  console.log('将虚拟节点 ‘vnode’ 插入到 ‘pivot’ 之前')
  // 创建dom节点
  const domNode = document.createElement(vnode.sel)
  // 判断是字节点还是文本
  if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
    // 文字
    domNode.innerText = vnode.text
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 递归创建子节点
    vnode.children.forEach(childVnode => {
      // 递归去创建DOM
      const childDomNode = createElement(childVnode)
      // 添加到页面
      domNode.appendChild(childDomNode)
    })
  }

  // 补充elm属性
  vnode.elm = domNode

  return vnode.elm
}
