function handle(str) {
  console.log(str);
}

function debounce(fn, wait = 300) {
  let timer = null;
  return function (...params) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.call(this, ...params);
    }, wait);
  };
}

const debounceHandle = debounce(handle, 2000);

function throttle(fn, wait = 300) {
  let timer = null;
  return function (...params) {
    timer = setTimeout(() => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.call(this, ...params);
    }, wait);
  };
}

const throttleHandle = throttle(handle, 2000);