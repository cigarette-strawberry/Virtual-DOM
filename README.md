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

    感受diff算法心得
    1、key是关键 节点的唯一标识 最小量更新
    2、只有在同一个虚拟节点的情况下，才会进行精细化比较。否则就是暴力删除旧的 插入新的
        如何定义是同一个虚拟节点？ 答: 虚拟节点的sel和key都必须相同。
    3、只进行同层比较，不会跨层比较。
    4、insertBefore() appendChild() 添加到页面内


2、diff算法原理？
    四种命中查找; 四个指针; 新节点指针: newHeadIndex,newTailIndex; 老节点指针: oldHeadIndex,oldTailIndex;

    1、新节点头部索引 老节点头部索引
    2、新节点尾部索引 老节点尾部索引
    3、新节点尾部索引 老节点头部索引 (移动节点，将新节点尾部对应的真实DOM移动到老节点头部对应的真实DOM之前)
    4、新节点头部索引 老节点尾部索引 (移动节点，将新节点头部对应的真实DOM移动到老节点尾部对应的真实DOM之后)

    命中一种就不再进行命中判断
    如果都没有命中，就需要用循环来查找


3、虚拟DOM如何通过diff变为真正的DOM？涵盖在diff算法里面。