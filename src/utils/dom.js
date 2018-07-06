export const createDom = function (el = 'div', tpl = '', attrs = {}, cname = '') {
  let dom = document.createElement(el)
  dom.className = cname
  dom.innerHTML = tpl
  Object.keys(attrs).forEach(item => {
    let key = item;
    let value = attrs[item]
    if (el === 'video' || el === 'audio') {
      if (value) {
        dom.setAttribute(key, value)
      }
    } else {
      dom.setAttribute(key, value)
    }
  })
  return dom
}

export const setAttribute = function (dom, attrs = {}) {
  Object.keys(attrs).forEach(item => {
    let key = item;
    let value = attrs[item]
    dom.setAttribute(key, value)
  })
}

export const hasClass = function (el, className) {
  if (el.classList) {
    return Array.prototype.some.call(el.classList, item => item === className)
  } else {
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
  }
}

export const addClass = function (el, className) {
  if (el.classList) {
    className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(item => {
      item && el.classList.add(item)
    })
  } else if (!hasClass(el, className)) {
    el.className += ' ' + className
  }
}
export const removeClass = function (el, className) {
  if (el.classList) {
    className.split(/\s+/g).forEach(item => {
      el.classList.remove(item)
    })
  } else if (hasClass(el, className)) {
    className.split(/\s+/g).forEach(item => {
      let reg = new RegExp('(\\s|^)' + item + '(\\s|$)')
      el.className = el.className.replace(reg, ' ')
    })
  }
}

export const toggleClass = function (el, className) {
  className.split(/\s+/g).forEach(item => {
    if (hasClass(el, item)) {
      removeClass(el, item)
    } else {
      addClass(el, item)
    }
  })
}

export const findDom = function (sel, el = document) {
  return el.querySelector(sel)
}

export const padStart = function (str, length, pad) {
  let charstr = String(pad);
  let len = length >> 0;
  let maxlen = Math.ceil(len / charstr.length)
  let chars = [];
  let r = String(str)
  while (maxlen--) {
    chars.push(charstr)
  }
  return chars.join('').substring(0, len - r.length) + r
}

export const format = function (time) {
  if (window.isNaN(time)) {
    return ''
  }
  let hour = padStart(Math.floor(time / 3600), 2, 0)
  let minute = padStart(Math.floor((time - hour * 3600) / 60), 2, 0)
  let second = padStart(Math.floor((time - hour * 3600 - minute * 60)), 2, 0)
  return (hour === '00' ? [minute, second] : [hour, minute, second]).join(':')
}

export const event = function (e) {
  if (e.touches) {
    let touch = e.touches[0] || e.changedTouches[0]
    e.clientX = touch.clientX || 0
    e.clientY = touch.clientY || 0
    e.offsetX = touch.pageX - touch.target.offsetLeft
    e.offsetY = touch.pageY - touch.target.offsetTop
  }
  e._target = e.target || e.srcElement
}

export const typeOf = function (obj) {
  return Object.prototype.toString.call(obj).match(/([^\s.*]+)(?=]$)/g)[0]
}

export const deepCopy = function (dst, src) {
  if (typeOf(src) === 'Object' && util.typeOf(dst) === 'Object') {
    Object.keys(src).forEach(key => {
      if (typeOf(src[key]) === 'Object' && !(src[key] instanceof Node)) {
        if (!dst[key]) {
          dst[key] = src[key]
        } else {
          util.deepCopy(dst[key], src[key])
        }
      } else {
        dst[key] = src[key]
      }
    })
    return dst
  }
}