虚拟DOM：用javascript对象 描述DOM的层次结构。DOM中的一切属性都在虚拟DOM中有对应的属性。

新虚拟DOM和老虚拟DOM进行diff（精细化比较），算出应该如何最小量更新，最后反映到真正的DOM上。

1、虚拟DOM如何被渲染函数（h函数）产生？
    h函数用来产生 虚拟节点（vNode）
    {
        children: [],
        data: {},
        elm: undefined,
        key: undefined,
        sel: 'div',
        text: '虚拟DOM'
    }
    h函数可以嵌套使用，从而得到虚拟DOM树

2、diff算法原理？

3、虚拟DOM如何通过diff变为真正的DOM？涵盖在diff算法里面。