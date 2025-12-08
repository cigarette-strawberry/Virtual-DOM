export default function vnode(sel, data, children, text, elm) {
  const vnode = {
    sel,
    data,
    children,
    text,
    elm,
  };
  return vnode;
}
