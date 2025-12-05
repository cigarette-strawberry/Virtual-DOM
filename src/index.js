// 导入snabbdom库
import { init, h } from 'snabbdom';

// 创建一个简单的虚拟DOM节点
const vnode = h('div#container', [
  h('h1', 'Hello Virtual DOM'),
  h('p', '这是一个使用snabbdom的虚拟DOM示例')
]);

// 将虚拟DOM渲染到页面的body元素中
const patch = init([]);
patch(document.body, vnode);
