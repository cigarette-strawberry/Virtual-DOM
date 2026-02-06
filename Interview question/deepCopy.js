function deepCopy(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;

  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  if (hash.has(obj)) return hash.get(obj);

  const cloneObj = new obj.constructor();
  hash.set(obj, cloneObj);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepCopy(obj[key], hash);
    }
  }

  return cloneObj;
}


/* 方法	作用	返回值	适用场景	缺点
typeof	检测基本类型	类型字符串	快速判断基本类型	null返回'object'，无法区分复杂类型
instanceof	检测原型链	boolean	检查对象是否为某个类的实例	基本类型返回false，跨窗口失效
constructor	获取构造函数	构造函数引用	获取对象构造函数	可被修改，不可靠
hasOwnProperty	检测自身属性	boolean	检查对象自身是否有某属性	需要确保对象继承自Object */