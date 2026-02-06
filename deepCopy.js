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