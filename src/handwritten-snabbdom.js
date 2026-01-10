import h from './my-snabbdom/h.js'
import patch from './my-snabbdom/patch.js'

const myButton1 = h('span', {}, '上树')
const container = document.getElementById('container')
const btn = document.getElementById('btn')

btn.onclick = function () {
  patch(container, myButton1)
}
