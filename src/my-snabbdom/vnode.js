export default function vnode(sel, data, children, text, elm) {
  const key = data?.key || ''
  const vnode = {
    sel,
    data,
    children,
    text,
    elm,
    key
  };
  return vnode;
}
