let rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
  setTimeout(callback, 17)
}
let sty = document.createElement('div').style
let jrollMap = {} // 保存所有JRoll对象
let ua = navigator.userAgent.toLowerCase()
let prefix = (function () {
  let vendors = ['OT', 'msT', 'MozT', 'webkitT', 't']
  let transform
  let i = vendors.length

  while (i--) {
    transform = vendors[i] + 'ransform'
    if (transform in sty) return vendors[i]
  }
})()
let utils =  {
  // 兼容
  TSF: prefix + 'ransform',
  TSD: prefix + 'ransitionDuration',
  TFO: prefix + 'ransformOrigin',
  isAndroid: /android/.test(ua),
  isIOS: /iphone|ipad/.test(ua),
  isMobile: /mobile|phone|android|pad/.test(ua),

  // 判断浏览是否支持perspective属性，从而判断是否支持开启3D加速
  translateZ: (function (pre) {
    var f
    if (pre) {
      f = pre + 'Perspective' in sty
    } else {
      f = 'perspective' in sty
    }
    return f ? ' translateZ(0px)' : ''
  })(prefix.substr(0, prefix.length - 1)),

  // 计算相对偏移，a相对于b的偏移
  computeTranslate: function (a, b) {
    var x = 0
    var y = 0
    var s
    while (a) {
      s = window.getComputedStyle(a)[utils.TSF].replace(/matrix\(|\)/g, '').split(', ')
      x += parseInt(s[4]) || 0
      y += parseInt(s[5]) || 0
      a = a.parentElement
      if (a === b) {
        a = null
      }
    }
    return {
      x: x,
      y: y
    }
  },
  // 计算相对位置，a相对于b的位置
  computePosition: function (a, b) {
    var left = 0
    var top = 0
    while (a) {
      left += a.offsetLeft
      top += a.offsetTop
      a = a.offsetParent
      if (a === b) {
        a = null
      }
    }
    return {
      left: left,
      top: top
    }
  },
  /**
  * 在指定时间内将指定元素从开始位置移到结束位置并执行回调方法
  * el 必须是dom元素，必填
  * x,y 结束位置，必填
  * duration 过渡时长，单位ms，可选
  * callback 回调方法，可选
  * context 上下文，可选
  */
  moveTo: function (el, x, y, duration, callback, context) {
    var startX = 0
    var startY = 0
    var endX
    var endY
    var zoom = 1
    var stepX
    var stepY
    var d
    var result
    result = /translate\(([-\d.]+)px,\s+([-\d.]+)px\)\s+(?:translateZ\(0px\)\s+)?scale\(([\d.]+)\)/.exec(el.style[utils.TSF])
    if (result) {
      startX = Number(result[1])
      startY = Number(result[2])
      zoom = Number(result[3])
    }
    d = duration || 17
    stepX = (x - startX) / (d / 17)
    stepY = (y - startY) / (d / 17)
    endX = startX
    endY = startY

    function moving () {
      d = d - 17
      if (d < 17) {
        endX = x
        endY = y
      } else {
        endX = parseInt(endX + stepX, 10)
        endY = parseInt(endY + stepY, 10)
      }
      el.style[utils.TSF] = 'translate(' + endX + 'px, ' + endY + 'px)' + utils.translateZ + ' scale(' + zoom + ')'
      // 执行用户注册的滑动事件
      if (context) {
        context.x = endX
        context.y = endY
        context._execEvent('scroll')
        if (context.scrollBtnX) context._runScrollBarX()
        if (context.scrollBtnY) context._runScrollBarY()
      }

      if (d > 0 && !(endX === x && endY === y)) {
        rAF(moving)
      } else if (typeof callback === 'function') {
        callback()
      }
    }
    moving()
  }
}
console.log('come from utils')
export default {
  utils: utils,
  translate: function (el, x = 0, y = 0, options) {
    if (!el) return
    const defaultOptions = {
      useTransfrom: true,
      transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      transitionDuration: '0s'
    }
    for (let option in options) {
      defaultOptions[option] = options[option]
    }
    if (defaultOptions.useTransfrom) {
      el.style.transform = `translate3d(${x}px,${y}px,0)`
      el.style.transitionProperty = 'transform'
      //el.style.transitionTimingFunction = defaultOptions.transitionTimingFunction
      el.style.transitionDuration = defaultOptions.transitionDuration
    } else {
      el.style.left = x
      el.style.top = y
    }
  },
  setOpacity: function (el, x, options){
    if (!el) return
    const defaultOptions = {
      useTransfrom: true,
      transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      transitionDuration: '0s'
    }
    for (let option in options) {
      defaultOptions[option] = options[option]
    }
    el.style.opacity = x
    el.style.transitionDuration = defaultOptions.transitionDuration
  }
}

//阻止鼠标右键的点击
//document.oncontextmenu = new Function("event.returnValue=false");
//document.onselectstart = new Function("event.returnValue=false");
//document.onkeydown = function (e) {
//    console.log(e.keyCode)
//    if (e.keyCode == 83 || e.keyCode == 123) {
//        e.preventDefault();
//    }
//}
//document.oncontextmenu = function (evt) {
//    evt.preventDefault();
//}
//
//document.onselectstart = function (evt) {
//    evt.preventDefault();
//};

