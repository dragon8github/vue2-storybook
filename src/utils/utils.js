import Vue from 'vue'
import hash from 'hash.js'
import moment from 'moment'
import { Message } from 'element-ui'

export const isDEV = process.env.NODE_ENV === 'development'
export const isPROD = process.env.NODE_ENV === 'production'

export const sleep = t => new Promise((resolve, reject) => setTimeout(() => window.requestAnimationFrame(() => resolve(t)), t))

/**
 * 仿 jQuery.parents('className')，更加灵活的版本。
 *
 * 示例：
 * parents(event.target, _ => _.className.includes('vue-grid-item'))
 */
 export const parents = (el = {}, exp = () => false, maxDeep = 100) => {
  // 获取父元素，这里就不验证了
  const parent = el.parentNode
  // 如果父元素存在
  if (parent && maxDeep) {
      // 如果找到了则返回，如果没有找到则继续找
      return exp(parent) ? parent : parents(parent, exp, --maxDeep)
  // 不满足遍历需求
  } else {
      return null
  }
}

export function getCurrentDate() {  
  // 获取当前年
  const current_year = moment().year()
  
  // 获取上个月
  const last_month = moment().month()

  // 开始时间
  const startTime = moment(`${current_year}/${last_month}/01`).format('YYYY/MM/DD')

  // 结束时间
  const lastTime = moment(getMonthLastDay(startTime)).format('YYYY/MM/DD')
  
  return [startTime, lastTime]
}

/**
 * 设配环境
 * @param {*} pcSize
 * @param {*} wallSize
 */
 export function adaptaEnv(pcSize, wallSize) {
  return isDEV ? pcSize : wallSize
}

export function getSymbol (n) {
  return n >= 0 ? '+' : ''
}

// vue 组件工厂
export const vueFactory = (component, propsData, config = {}) => {
  const _constructor = Vue.extend(component)
  const _initInstance = new _constructor({ el: document.createElement('div'), propsData, ...config })
  return _initInstance.$el
}

// vue 组件工厂2（上面是直接返回了dom，但这是设计失误，我应该返回 _initInstance ）
export const vueFactory2 = (component, propsData, config = {}) => {
  const _constructor = Vue.extend(component)
  const _initInstance = new _constructor({ el: document.createElement('div'), propsData, ...config })
  return _initInstance
}

// 返回某月最后一天的时间
export function getMonthLastDay(date = new Date()) {
 let t = new Date(date)
 let MonthNextFirstDay = new Date(t.getFullYear(), t.getMonth() + 1)
 let MonthLastDay = new Date(MonthNextFirstDay - 86400000)
 return MonthLastDay
}

// 保留小數點后2位 ——  /^[+-]?\d+(?:\.\d{0,1})?/
export const floor = (n, d = 1) => /(^[1-9]\d*$)/.test(n) ? n : Number((n).toString().match(eval(`/^[+-]?\\d+(?:\\.\\d{0,${d}})?/`)))

// 获取时间选择器的配置
export const shortcuts = (function(){
  let ary = [{
    text: '全量数据',
    onClick(picker) {
        const year = moment(picker.date).year()
        const month = moment().month() + 1
        const day = moment().endOf('month').format('DD')
        const start = new Date(`2016/5/5`)
        const end = new Date(`${year}/${month}/${day}`)
        picker.$emit('pick', [start, end]);
    }}, {
      text: '第一季度',
      onClick(picker) {
          const year = moment(picker.date).year()
          const start = new Date(`${year}/01/01`);
          const end = new Date(`${year}/03/31`);

          // 获取当前的时间
          const now = moment().format()
          // fixbug: 如果选择年份大于今年年份，那么取消
          if ((new Date(now)).getFullYear() < year) {
              return Message(`未找到 ${year}的数据`)
          }

          picker.$emit('pick', [start, end]);
      }
  }, {
      text: '第二季度',
      onClick(picker) {
          const year = moment(picker.date).year()
          const quarter = moment(`${year}0401`).format()
          // 获取当前的时间
          const now = moment().format()
          // fixbug: 如果选择年份大于今年年份，那么取消
          if ((new Date(now)).getFullYear() < year) {
              return Message(`未找到 ${year}的数据`)
          }
          
          if (now > quarter) {
              const start = new Date(`${year}/04/01`);
              const end = new Date(`${year}/06/30`);
              picker.$emit('pick', [start, end]);
          } else {
              return Message(`未找到 ${year}年的数据`)
          }
      }
  }, {
      text: '第三季度',
      onClick(picker) {
          const year = moment(picker.date).year()
          const quarter = moment(`${year}0701`).format()
          // 获取当前的时间
          const now = moment().format()
          // fixbug: 如果选择年份大于今年年份，那么取消
          if ((new Date(now)).getFullYear() < year) {
              return Message(`未找到 ${year}的数据`)
          }
          
          if (now > quarter) {
              const start = new Date(`${year}/07/01`);
              const end = new Date(`${year}/09/30`);
              picker.$emit('pick', [start, end]);
          } else {
              return Message(`未找到 ${year}年的数据`)
          }
      }
  }, {
      text: '第四季度',
      onClick(picker) {
          const year = moment(picker.date).year()
          const quarter = moment(`${year}1001`).format()
          // 获取当前的时间
          const now = moment().format()
          // fixbug: 如果选择年份大于今年年份，那么取消
          if ((new Date(now)).getFullYear() < year) {
              return Message(`未找到 ${year}年的数据`)
          }
          
          if (now > quarter) {
              const start = new Date(`${year}/10/01`);
              const end = new Date(`${year}/12/31`);
              picker.$emit('pick', [start, end]);
          } else {
              return Message(`未找到 ${year}年第4季度的数据`)
          }
      }
  }, {
      text: '近三个月',
      onClick(picker) {
          // 三个月前的月初
          const threeMonthsAgo = moment().subtract(2, 'month').format('YYYY/MM/01')
          // 转换为date类型
          const start = new Date(threeMonthsAgo)
          // 当天
          const end = moment()._d

          // 获取当前的时间
          const year = moment(picker.date).year()
          const now = moment().format()
          // fixbug: 如果选择年份大于今年年份，那么取消
          if ((new Date(now)).getFullYear() < year) {
              return Message(`未找到 ${year}年的数据`)
          }

          picker.$emit('pick', [start, end])
      }
  },{
      text: '上半年',
      onClick(picker) {
          // 选择的年限
          const year = moment(picker.date).year()
          // 选择的上半年左边界
          const secondHalf = moment(`${year}0615`).format()

          // 获取当前的时间
          const now = moment().format()
          // fixbug: 如果选择年份大于今年年份，那么取消
          if ((new Date(now)).getFullYear() < year) {
              return Message(`未找到 ${year}上半年的数据`)
          }

          // 只有当前时间大于选择的时间，才允许选择上半年
          if (+new Date(now) > +new Date(secondHalf)) {
              const start = new Date(`${year}/01/01`)
              const end = new Date(`${year}/06/30`)
              picker.$emit('pick', [start, end])
          // 否则，只允许选择极限月份
          } else {
              const start = new Date(`${year}/01/01`)
              picker.$emit('pick', [start, now])
          }
      }
  }, {
      text: '下半年',
      onClick(picker) {
          // 选择的年限
          const year = moment(picker.date).year()
          // 选择的下半年左边界
          const secondHalf = moment(`${year}0615`).format()
          // 获取当前的时间
          const now = moment().format()

          // 如果当前时间还不到半年，说明还不能选
          if (+new Date(secondHalf) > +new Date(now)) {
              return Message(`未找到 ${year}下半年的数据`)
          } else {
              const start = new Date(`${year}/7/1`)
              // const end = new Date(`${year}/12/31`)
              // picker.$emit('pick', [start, end])
              picker.$emit('pick', [start, now])
          }
      }
  }, {
      text: '一年',
      onClick(picker) {
          const year = moment(picker.date).year()
          const month = moment().month() + 1
          const day = moment().endOf('month').format('DD')
          const start = new Date(`${year}/01/01`)

          const now = moment().format()
          // fixbug: 如果选择年份大于今年年份，那么取消
          if ((new Date(now)).getFullYear() < year) {
              return Message(`未找到 ${year}年的数据`)
          }

          // 如果选择的年小于当前年，那么就是全年，否则就是直到这个月
          const end = year < moment().year() ? new Date(`${year}/12/31`) : new Date(`${year}/${month}/${day}`);
          picker.$emit('pick', [start, end]);
      }
  }]

  return ary
}());

// 模拟点击、输入、操作
// https://juejin.cn/post/6844903850336321549
// fireKeyEvent(el, 'keyup', 13)
export function fireKeyEvent(el, evtType, keyCode) {
  var evtObj;
  if (document.createEvent) {
      if (window.KeyEvent) {//firefox 浏览器下模拟事件
          evtObj = document.createEvent('KeyEvents');
          evtObj.initKeyEvent(evtType, true, true, window, true, false, false, false, keyCode, 0);
      } else {//chrome 浏览器下模拟事件
          evtObj = document.createEvent('UIEvents');
          evtObj.initUIEvent(evtType, true, true, window, 1);

          delete evtObj.keyCode;
          if (typeof evtObj.keyCode === "undefined") {//为了模拟keycode
              Object.defineProperty(evtObj, "keyCode", { value: keyCode });
          } else {
              evtObj.key = String.fromCharCode(keyCode);
          }

          if (typeof evtObj.ctrlKey === 'undefined') {//为了模拟ctrl键
              Object.defineProperty(evtObj, "ctrlKey", { value: true });
          } else {
              evtObj.ctrlKey = true;
          }
      }
      el.dispatchEvent(evtObj);

  } else if (document.createEventObject) {//IE 浏览器下模拟事件
      evtObj = document.createEventObject();
      evtObj.keyCode = keyCode
      el.fireEvent('on' + evtType, evtObj);
  }
}


// 街道映射
export const street = { '横沥': "横沥镇", '望牛墩': "望牛墩镇", '洪梅': "洪梅镇", '东城': "东城街道", '道滘': "道滘镇", '石排': "石排镇", '松山湖': "松山湖", '东坑': "东坑镇", '常平': "常平镇", '莞城': "莞城街道", '塘厦': "塘厦镇", '茶山': "茶山镇", '麻涌': "麻涌镇", '石碣': "石碣镇", '沙田': "沙田镇", '长安': "长安镇", '石龙': "石龙镇", '企石': "企石镇", '寮步': "寮步镇", '谢岗': "谢岗镇", '高埗': "高埗镇", '凤岗': "凤岗镇", '南城': "南城街道", '桥头': "桥头镇", '樟木头': "樟木头镇", '万江': "万江街道", '中堂': "中堂镇", '黄江': "黄江镇", '清溪': "清溪镇", '虎门': "虎门镇", '大朗': "大朗镇", '厚街': "厚街镇", '大岭山': "大岭山镇", }

/**
 * 计算几天后 或 几天前的几日
 * @param {*} date 今天
 * @param {*} day 正数代表未来, 负数代表过去
 */
export function getNextDate(date = new Date, day = 0) {
  var dd = new Date(date);
  dd.setDate(dd.getDate() + day);
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
  var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
  return y + "-" + m + "-" + d;
};


// 比较浅色的rgb，适合白色字体
export const randcolor = () => {
  const r = 100 + ~~(Math.random() * 100);
  const g = 135 + ~~(Math.random() * 100);
  const b = 100 + ~~(Math.random() * 100);
  return `rgb(${r}, ${g}, ${b})`
}

/**
 * 将一维的数据，转换成 el-tree 树结构
 *
 * 示例代码：
 *
 * const api_datas = {"id": "202010200704", "remark": "汇聚方式委办局", "data": [{"ID": 0, "DEPARTMENT": "东莞市", "PID": -1 }, {"ID": 1, "DEPARTMENT": "政数局", "PID": 0 }, {"ID": 2, "DEPARTMENT": "卫生局", "PID": 0 }, {"ID": 3, "DEPARTMENT": "交通运输局", "PID": 0 }, {"ID": 4, "DEPARTMENT": "教育局", "PID": 0 }, {"ID": 5, "DEPARTMENT": "生态环境局", "PID": 0 }, {"ID": 6, "DEPARTMENT": "民政局", "PID": 0 } ], "pageSize": 10, "pageNum": 1, "total": 7, "totalPage": 1, "startIndex": 1, "endIndex": 10 }
 * let data = api_datas.data.map(_ => ({ id: _.ID, label: _.DEPARTMENT, children: [], pid: _.PID }))
 * console.log(1, genTree(data))
 *
 * const api_datas2 = {"id": "202010200707", "remark": "入湖数据菜单树", "data": [{"ID": 1, "NAME": "分平台", "PID": 0, "CHILDNODE": 6 }, {"ID": 2, "NAME": "租户", "PID": 0, "CHILDNODE": 4 }, {"ID": 101, "NAME": "城管局分平台", "PID": 1, "CHILDNODE": 0 }, {"ID": 102, "NAME": "卫健局分平台", "PID": 1, "CHILDNODE": 0 }, {"ID": 103, "NAME": "教育局分平台", "PID": 1, "CHILDNODE": 0 }, {"ID": 201, "NAME": "工商局租户", "PID": 2, "CHILDNODE": 0 }, {"ID": 202, "NAME": "市监局租户", "PID": 2, "CHILDNODE": 0 } ], "pageSize": 10, "pageNum": 1, "total": 7, "totalPage": 1, "startIndex": 1, "endIndex": 10 }
 * let data2 = api_datas2.data.map(_ => ({ id: _.ID, label: _.NAME, children: [], pid: _.PID }))
 * console.log(2, genTree(data2))
 */
export const genEleTree = (data = []) => {
	// 记录当前的数组长度
	const len = data.length

	data.forEach((val, key) => {
		// 尝试找到父集引用
		const father = data.find(_ => _.id === val.pid)

		if (father) {
			// 父集引用插入数据
			father.children.push(val)
			// 标记删除
			val.KILL = true
		}

		return father
	})

	// 杀死标记的数据
	const newData = data.filter(_ => !_.KILL)

	// 毫无变化，说明所有的一维数组元素，都已经没有父集需要映射了
	const isEnd = len === newData.length

	// 如果已经结束了，那么返回数据本身，否则
	return isEnd ? newData : genEleTree(newData)
}

// 插入 style
export const injectCss = function (css, id = 'injectCss') {
    const style = document.createElement('style')
    style.id = id
    style.type = 'text/css'
    if (style.styleSheet) {
        style.styleSheet.cssText = css
    } else {
        style.appendChild(document.createTextNode(css))
    }
    document.getElementsByTagName('head')[0].appendChild(style)
}

export const get = (properties = [], obj) => properties.reduce((p, c) => (p[c] = obj[c], p), {})

// 瘦身对象（只留部分） ▶ slim({ name: 'Benjy', age: 18 }, ['age']) // => { age: 18 }
export const slim = (obj, properties = []) => properties.reduce((p, c) => (p[c] = obj[c], p), {})

// 瘦身对象（排除异己） ▶ omit({ name: 'Benjy', age: 18 }, ['age']) // => {name: "Benjy"}
export const omit = (obj, properties = []) => Object.entries(obj).reduce((p, [k, v]) => !properties.includes(k) ? (p[k] = v, p) : p, {})

// http://youmightnotneedjquery.com/#extend
// extend({}, objA, objB);
export var deepExtend = function(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj)
      continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object'){
          if(obj[key] instanceof Array == true)
            out[key] = obj[key].slice(0);
          else
            out[key] = deepExtend(out[key], obj[key]);
        }
        else
          out[key] = obj[key];
      }
    }
  }

  return out;
};

export function deepCopy(obj, cache = []) {
  if (obj === null || typeof obj !== 'object') {
      return obj
  }

  const hit = cache.find(c => c.original === obj)

  if (hit) {
      return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}

  cache.push({
      original: obj,
      copy
  })

  Object.keys(obj).forEach(key => {
      copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}


// getPublic('favicon.ico') => http://localhost:8080/favicon.ico
// 你需要把资源放在 /public 目录下
export const getPublic = name => process.env.BASE_URL + name

// 加密工具
export const encryption = v => {
  // 指纹
  const fingerprint = JSON.stringify(v)
  // 加密指纹
  const hashcode = hash.sha256().update(fingerprint).digest('hex')
  // 返回加密指纹
  return hashcode
}

export const isNaN = obj => obj !== obj

export const doTryAsync = async (_try = () => {}, _catch = () => {}) => {
  let _err = null
  let _result = null

  try {
      _result = await _try()
  } catch (err) {
      _err = err
      _catch(err)
  }

  return [_err, _result]
}


export const doTry = (_try = () => {}, _catch = () => {}) => {
  let _err = null
  let _result = null

  try {
      _result = _try()
  } catch (err) {
      _err = err
      _catch(err)
  }

  return [_err, _result]
}


// toLocaleString('en-US') + toFixed()
export const toNumber = (val, decimal = 0) => {
  const n = parseFloat(val)
  if (isNaN(n)) return val
  const result = parseFloat(n.toFixed(decimal)).toLocaleString('en-US')
  return result
}

// 传入的就是万条了，所以 24415，就等于 2亿 4415万
/**
 var result = toYiWan(24415)
 console.log(result[0], result[1]) // => 2 4415

 var result = toYiWan(70226)
 console.log(result[0], result[1]) // =>  226
*/
export const toYiWan = n => {
	const result = []
	// 亿
  result[0] = parseInt((n / 10000))
	// 万
	result[1] = toNumber((n % 10000).toFixed())
	return result
}


export const division = (ary, num, container = {}) => {
    for (let page = 0; page < Math.ceil(ary.length / num); page++) {
      container[page] = ary.slice(page * num, (page + 1) * num)
    }
    return container
}



/**
 * （推荐）say something ...

 ;(async function(){
    const a = await waitWhen(_ => document.getElementById('1234'))
    console.log(20191212102924, a)
 }())
 */
export const waitWhen = (conditionFn = () => false, wait = 10000, interval = 10, isgoon = false, startTime = Date.now()) => new Promise((resolve, reject) => {
  (function poll() {
      // 获取回调结果
      const result = conditionFn()

      // 获取是否超时
      const isTimeout = Date.now() - startTime > wait

      // 如果条件成立，那么立刻 resolve
      if (result) return resolve(result)

      // 如果时间超时，立刻 reject
      if (isTimeout) return isgoon ? resolve(null) : reject(result)

      // 否则继续轮询
      setTimeout(poll, interval)
  }())
})

// 剪切板
export const copyToClipboard = text => {
  const el = document.createElement('textarea')
  el.value = text
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
  return text
}


/**
 * 杀手皇后第二炸弹：自动关闭，超时关闭，报错关闭
 *
 * const result = await killerQueen2(
 *     () => store.dispatch('SET_LOADING', true),
 *     () => fetchDetails(params),
 *     () => store.dispatch('SET_LOADING', false),
 *     5000,
 * )
 */
export const killerQueen2 = async (showLoading = () => {}, fn = () => {}, closeLoading = () => {}, time = 10000) => {
  try {
      showLoading()
      const timer = setTimeout(closeLoading, time)
      const result = await fn()
      clearTimeout(timer)
      closeLoading()
      return result
  } catch (err) {
    console.warn('🎉killerQueen2: ', err)
  }
}

/**
 * 杀手皇后第一炸弹：（可手动触发）简单的超时触发函数 ...
 *
 * const close = killerQueen(
 *   () => console.log('开启打火机'),
 *   () => console.log('熄灭打火机'),
 *   10000,
 * )
 */
export const killerQueen = (fn = () => {}, cancel = () => {}, time = 10000) => {
  // 先执行操作
  fn()

  // 定时炸弹
  const timer = setTimeout(() => {
    // 败者食尘！
    cancel()
    // 消除痕迹
    cancel = () => console.warn(`Bite The Dust`)
  }, time)

  // 新参数：isCall ，默认为 true，即调用取消函数，有某些场景下，我仅想取消倒计时，但并不想触发回调函数。
  return (isCall = true) => {
    // 取消炸弹
    clearTimeout(timer)
    // 正常调用
    isCall && cancel()
  }
}

// 9位 简易版
export const MdUuid = () => Math.random().toString(36).slice(4)

// 解析路径
export const parsePath = (obj, path) => {
    const segments = path.split('.')
    for (let i = 0, len = segments.length; i < len; i++) {
        obj = obj[segments[i]]
    }
    return obj
}

/**
 * （推荐）深度设置 ...
 *
 * var a = {}
 * deepSet(a, 'a.b.c.d.e.f.g.h.i.j.k', 123)
 */
const $deepSet = (obj, path, v) => {
    // （重要）保存引用
    let o = obj

    // 分解路径
    const p = path.split('.')

    // 取出最后一位
    const last = p.pop()

    // 不断轮询路径
    while (p.length) {
        // 从左往右取出路径
        const k = p.shift()

        // ⚠️ 如果不存在则定义该对象
        if (!o[k]) o[k] = {}

        // 获取当前路径的值
        o = o[k]
    }

    // o[last] = typeof v === 'function' ? v() : v

    // fixbug: vue set
    Vue.set(o, last, typeof v === 'function' ? v() : v)

    // （重点）返回被串改的数组
    return obj
}

// 简单对比双方是否相等，如果不等就赋值
// 为了解决 Vue.watch 监听引用类型总是更新的问题：无论你是否数据是否一致，由于引用类型的地址是不一致的，所以总会触发更新，这很浪费性能。
export const diffSet = function(leftPath, rightValue, key) {
  // news: left 可能传入一个路径，而不是简单的一个参数了。
  const leftValue = parsePath(this, leftPath)

  // 分别对 left/right 进行序列化
  const _left = JSON.stringify(leftValue), _right = JSON.stringify(rightValue)

  // 如果默认是空数据结构，那想都不用想就赋值吧
  const isEmpty = _left === '{}' || _left === '[]' || _left === 'null' || !_left

  // 内容不同才赋值
  if (isEmpty || _left != _right) {
    // 深度设置
    $deepSet(this, leftPath, rightValue)
  }
}

/**
 * 示例:
 *
 * clickOutSide('.u-pointCard', cancel => {
 *     // 关闭弹窗
 *     this.points_html = ''
 *     // 取消事件本身
 *     cancel()
 * })
 */
export const clickOutSide = (className, fn) => {
  const _clickOutSide = e => {
    const el = document.querySelector(className)
    // 如果点击的不是指定的元素，那么执行回调，并且取消这个事件本身
    if (el && el.contains(e.target) === false) {
       // 执行函数，并且注入取消的回调
       fn(() => document.removeEventListener('mouseup', _clickOutSide))
    }
  }
  document.addEventListener('mouseup', _clickOutSide)
}

export const debug = (...args) => (console.log(...args), args[args.length - 1])

export const filterCity = (v = '') => v.replace(/街道|镇/g, '')

export const once = (func) => {
  var ran,
      result;

  if (!isFunction(func)) {
    throw new TypeError(funcErrorText);
  }
  return function() {
    if (ran) {
      return result;
    }
    ran = true;
    result = func.apply(this, arguments);

    // clear the `func` variable so the function may be garbage collected
    func = null;
    return result;
  };
}


// 折叠日志
export const logs = (info = '', ...args) => {
    // 如果本地有 stopLog, 就不会打印接口请求信息
    // 因为本地有大量动画运行，所以我调试时不希望有多余的接口信息影响我
    if(localStorage.stopLog)return;

    console.groupCollapsed(info)
    args.forEach(_ => console.log(_))
    console.groupEnd()
}

export var random = function (min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
}

// min（包含）～ max（包含）之间的随机数
export const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) ) + min

export const groupby = (ary = [], key = '', obj = {}) => ary.reduce((p, c) => {
  const g = c[key]

  if (!p[g]) {
    p[g] = [c]
  } else {
    p[g].push(c)
  }

  return p
}, {})


/**
 * 自定义 partial 偏应用（_bind）
 * demo 示例
 *
   // 期待有两个参数注入
   var a = function (a, b) { console.log(a, b, this) }
   // 我先注入第二个参数
   var aa = a.partial(undefined, 'god')
   // 被第三方执行，注入了第一个参数
   aa('shit') // => shit god
 */
export const partial = (fn, ...argv) => {
  // fixbug：震惊！argv也是一个引用类型，所以先复制一份出来。
  const _argv = argv.slice(0)

  // 返回已占位的函数（为了更方便的结合bind使用，本函数使用 function 而不适用箭头函数）
  return function (...args) {
       // 遍历占位符参数
       for (let [index, value] of _argv.entries()) {
           // 如果占位符为 undefined，说明需要补位的
           if (value === undefined) {
              argv[index] =  args[index]
           }
       }
       // 调用函数
       return fn.apply(this, argv)
   }
}

export const noRepeatSet = (data, properties) => {
  var cache = {}
  var result = []
  for (let i = 0; i < data.length; i++) {
      var p = data[i][properties]
      if (!cache[p]) {
          cache[p] = 1
          result.push(data[i])
      }
  }
  return result
}

// is 家族
export const isObject = input => input != null && Object.prototype.toString.call(input) === '[object Object]'
export const isFunction = v => Object.prototype.toString.call(v) === '[object Function]'
export const isString = input => Object.prototype.toString.call(input) === '[object String]'
export const isPromise = val => val && typeof val.then === 'function'
export const isDOM = val => val && val instanceof HTMLElement
export const isNumber = input => (typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]') && input === input



/**
 * map 方法只能返回一个参数，这个方法是用来返回多个的。
 * demo
   const list = [{ a: 'a1', b: 'b1' }, { a: 'a2', b: 'b2' }, ]
   const [a, b] = list.maps(_ => _.a, _ => _.b)
   console.log(a, b)
 */
Array.prototype.maps = function(...args) {
    // 初始化空数组，这是一个二维数组，长度与参数一致
    let ary = args.map(_ => [])

    // 开始遍历自身
    this.forEach((val, index, array) => {
        // 依次执行 fn
        for (let i = 0, len = args.length; i < len; i++) {
            // 获取当前函数
            const fn = args[i]
            // 调用函数，如果不是函数的话，就直接返回本身
            const result = isFunction(fn) ? fn(val, index, array) : fn
            // 插入第n个里边
            ary[i].push(result)
        }
    })

    // 返回最终结果
    return ary
}

Array.prototype.filters = function(...args) {
    // 初始化空数组，这是一个二维数组，长度与参数一致
    let ary = args.map(_ => [])

    // 开始遍历自身
    this.forEach((val, index, array) => {
        // 依次执行 fn
        for (let i = 0, len = args.length; i < len; i++) {
            // 获取当前函数
            const fn = args[i]

            if (fn(val, index, array)) {
               ary[i].push(val)
            }
        }
    })

    // 返回最终结果
    return ary
}

export const is = (type, val) => ![, null].includes(val) && val.constructor === type;


/**
 * 最简单且最安全的方法显示一个值，举个例子:
 * var obj = {a: 123 }
   maybe(_=> obj.a, 0); // 123
   maybe(_=> obj.b, 0); // 0
   maybe(_=> obj.a.b.s.w.holy.shit.fuck.god, 0); // 0
 */
export const maybe = (fn, n = '') => {
    try {
        const result = fn()

        return (result && result === result && result !== 'NaN' && result !== 'undefined' && result !== 'Invalid date') ? result : n
    } catch (err) {
        return n
    }
}

export const maybe0 = (fn, n = '') => {
  try {
      const result = fn() === 0 ? '0' : fn()

      return (result && result === result && result !== 'NaN' && result !== 'undefined' && result !== 'Invalid date') ? result : n
  } catch (err) {
      return n
  }
}

/**
 * 判断对象是否是一个空的对象，既{}
 */
export const isEmptyObject = obj => {
    if (Object.getOwnPropertyNames) {
        return (Object.getOwnPropertyNames(obj).length === 0);
    } else {
        var k;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
}

/**
 * 将对象转化为formdata格式
 */
export const obj2formdata = (json) => {
    var data = new FormData()
    if (json) {
        Object.keys(json).forEach(function(key) {
            data.append(key, json[key])
        });
    }
    return data
}


/**
 * 将对象转化为GET参数
 */
export const obj2formdatastr = (body) => {
    if (body) {
        let formparams = '';
        Object.keys(body).forEach(key => {
            if (formparams.length > 0) {
                formparams += '&';
            }
            formparams = formparams + key + '=' + body[key];
        });
        return formparams
    }
    return ''
}

/**
 * 函数节流（throttle）
 */
export const throttle = function(func, wait, options) {
  var timeout, context, args, result;
  // 标记时间戳
  var previous = 0;
  // options可选属性 leading: true/false 表示第一次事件马上触发回调/等待wait时间后触发
  // options可选属性 trailing: true/false 表示最后一次回调触发/最后一次回调不触发
  if (!options) options = {};

  var later = function() {
    previous = options.leading === false ? 0 : +(new Date());
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function() {
    // 记录当前时间戳
    var now = +(new Date());
    // 如果是第一次触发且选项设置不立即执行回调
    if (!previous && options.leading === false)
    // 将记录的上次执行的时间戳置为当前
    previous = now;
    // 距离下次触发回调还需等待的时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;

    // 等待时间 <= 0或者不科学地 > wait（异常情况）
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
          // 清除定时器
        clearTimeout(timeout);
        // 解除引用
        timeout = null;
      }
      // 将记录的上次执行的时间戳置为当前
      previous = now;

      // 触发回调
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    }
    // 在定时器不存在且选项设置最后一次触发需要执行回调的情况下
    // 设置定时器，间隔remaining时间后执行later
    else if (!timeout && options.trailing !== false)    {
      timeout = setTimeout(later, remaining);
    }
   return result;
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
};


 /**
 * 深度递归搜索
 * @param {Array} arr 你要搜索的数组
 * @param {Function} condition 回调函数，必须返回谓词，判断是否找到了。会传入(item, index, level)三个参数
 * @param {String} children 子数组的key
 */
export const deepFind = (arr, condition, children) => {
    // 即将返回的数组
    let main = []

    // 用try方案方便直接中止所有递归的程序
    try {
        // 开始轮询
        (function poll(arr, level, cb) {
            // 如果传入非数组
            if (!Array.isArray(arr)) return

            // 遍历数组
            for (let i = 0; i < arr.length; i++) {
                // 获取当前项
                const item = arr[i]

                // 先占位预设值
                main[level] = item

                // 扩展：如果是一个对象的话，添加一些标记属性
                if (Object.prototype.toString.call(item) === '[object Object]') {
                  item.__INDEX__ = i
                  item.__LEVEL__ = level
                }

                // 检验是否已经找到了
                const isFind = condition && condition(item, i, level) || false

                // 自杀函数
                const kill = () => {
                // 删除占位预设值
                  main.length = main.length - 1
                  // 触发回调
                  cb && cb()
                }

                // 如果已经找到了
                if (isFind) {
                    // 直接抛出错误中断所有轮询
                    throw Error
                // 如果存在children，那么深入递归
                } else if (children && item[children] && item[children].length) {
                    poll(item[children], level + 1,
                      // 如果本函数被触发，说明children还是找不到。
                      () => {
                      // 那么如果我是最后一条，那么我也自杀吧
                      if (i === arr.length - 1) {
                        kill()
                      }
                    })
                // 如果是最后一个且没有找到值，那么通过修改数组长度来删除当前项
                } else if (i === arr.length - 1) {
                  // 找不到，羞愧自杀
                  kill()
                }
            }
        })(arr, 0)
    // 使用try/catch是为了中止所有轮询中的任务
    } catch (err) {}

    // 返回最终数组
    return main
}

/**
 * chunk 数组分块函数
 * 对数组进行分块，满足条件的分为hit组，不满足分到miss组
 *
 * const ary = [1, 2, 3, 4, 5, 6, 7, 8]
 * const result = chunk(ary, _ => _ > 1)
 * console.log(result)
 */
export const chunk = (ary, fn) => ary.reduce(({ hit, miss } = {}, v) => {
  fn(v) ? hit.push(v) : miss.push(v)
  return { hit, miss }
}, { hit: [], miss: [] })


export const poll = (conditionFn, callback, wait = 4, maxTimeout = 10, timeout = 0) => {
  // 请求是否超出阈值
  if (++timeout > maxTimeout * 1000 / wait) throw new Error('overtime')
  // 如果条件满足，那么执行，否则轮询
  conditionFn() ? callback() : setTimeout(() => {poll(conditionFn, callback, wait, maxTimeout, timeout) }, wait)
}


export const pureMap = (ary = [], validate = () => true, cb = () => undefined) => {
  // copy
  let _ary = JSON.parse(JSON.stringify(ary))

  // filter
  _ary = _ary.map(v => {
    // validate
      if (validate(v)) {
        // callback
        return cb(v) || v
      } else {
        // default
        return v
      }
  });

  // filter ary
  return _ary
}

export const addClass = (el, cls) => {

    if (el.classList) {
        el.classList.add(cls)
    } else {
        var cur = ' ' + getClassName(el) + ' '
        if (cur.indexOf(' ' + cls + ' ') < 0) {
            el.setAttribute('class', (cur + cls).trim())
        }
    }
}

export const hasClass = (el, className) => {
  if (el.classList)
    el.classList.contains(className);
  else
    new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

export const getClassName = (el) => {
    return (el.className instanceof SVGAnimatedString ? el.className.baseVal : el.className)
}

export const removeClass = (el, cls) => {
    if (el.classList) {
        el.classList.remove(cls)
    } else {
        var cur = ' ' + getClassName(el) + ' ',
            tar = ' ' + cls + ' '
        while (cur.indexOf(tar) >= 0) {
            cur = cur.replace(tar, ' ')
        }
        el.setAttribute('class', cur.trim())
    }
}

export const exclude = (obj, ...attribute) =>  {
  // copy
  let _ = JSON.parse(JSON.stringify(obj))
    // 删除属性
  for (let i = 0, len = attribute.length; i < len; i++) {
    const attr = attribute[i]
      delete _[attr]
  }
  // pure obj
  return _
}



/**
 * 反向递归
 * @param {*} key       需要匹配的值
 * @param {*} treeData  匹配的数组
 */
export function getTreeDeepArr(key, treeData) {
  let arr = []; // 在递归时操作的数组
  let returnArr = []; // 存放结果的数组
  let depth = 0; // 定义全局层级
  // 定义递归函数
  function childrenEach(childrenData, depthN) {
    for (var j = 0; j < childrenData.length; j++) {
      depth = depthN; // 将执行的层级赋值 到 全局层级
      arr[depthN] = (childrenData[j].tagId);
      if (childrenData[j].tagId == key) {
        returnArr = arr.slice(0, depthN + 1); //将目前匹配的数组，截断并保存到结果数组，
        break
      } else {
        if (childrenData[j].childList) {
          depth++;
          childrenEach(childrenData[j].childList, depth);
        }
      }
    }
    return returnArr;
  }
  return childrenEach(treeData, depth);
}

// 补全
export const pad = (target, n) => {
    var zero = new Array(n).join('0');
    var str = zero + target;
    var result = str.substr(-n);
    return result;
}

// 获取24小时，从指定的时间开始
export const get24hourfrom = (start, count = 24) => {
  return [...Array(count)].map((v, index, array) => {
      return pad((index + start) % 24, 2)
  })
}

// 设置高亮
export const point = dom => {
  if (hasClass(dom, 'changing')) {
     removeClass(dom, 'changing')
  } else {
     addClass(dom, 'changing')
     addClass(dom, 'point')
     dom.addEventListener("webkitAnimationEnd", function() {
       removeClass(dom, 'changing')
     })
  }
}

// 缓存器
export const memoized = function (fn) {
  // 缓存队列
  var cache = {}
  return function () {
    // 以入参为key（todo:最好作为可配置）
    var __KEY__ = Array.prototype.slice.call(arguments)
    // 记录缓存
    return cache[__KEY__] || (cache[__KEY__] = fn.apply(this, arguments))
  }
}

export const dateYYYYMMDDHHmmss = t => {
    const date = new Date(t)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minu = date.getMinutes()
    const second = date.getSeconds()
    const arr = [month, day, hours, minu, second].map((item, index) => item < 10 ? '0' + item : item)
    return year + '-' + arr[0] + '-' + arr[1] + ' ' + arr[2] + ':' + arr[3] + ':' + arr[4]
}

export const dateYYYYMM = (t = +new Date) => {
	const date = new Date(t)
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const arr = [month, day].map((item, index) => item < 10 ? '0' + item : item)
	return year + '-' + arr[0] + '-' + arr[1]
}

export const dateYYYYMMDD = t => {
  var date = new Date(t);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  // console.log(t, Y+M+D);
  return Y+M+D
}

/**
 * 时间格式化  这个方法好像比上面上个更灵活一点
 * @param  {[type]} date 需要转换的时间
 * @param  {[type]} fmt  转换后的时间格式   如'yyyy-MM-dd hh:mm:ss'
 * @return Promise
 */
export function formatDate(time, fmt) {
  if (!time) return ''
  let date = new Date(time)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
    }
  }
  return fmt;
};


//获取最近3天日期
// getDay(0);//当天日期  年-月-日
// getDay(-3);//3天前日期  年-月-日

export function getDay(day, hasYear = false) {

  function doHandleMonth(month){
    var m = month;
    if(month.toString().length == 1){
      m = "0" + month;
    }
    return m;
  }

  var today = new Date();
  var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
  today.setTime(targetday_milliseconds); //注意，这行是关键代码

  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  if (hasYear) return tYear+"-"+tMonth+"-"+tDate;
  return tMonth+"-"+tDate
}


// 仿 Array.prototype.map 函数。兼容数组、对象的遍历
export const betterMap = (v, cb) => {
    let result = []
    for (var k in v) {
        result.push(cb && cb(v[k], k, v, result))
    }
    return result
};


// 仿 Array.prototype.filter 函数。兼容数组、对象的遍历
export const betterFilter = (v, cb) => {
    let result = []
    for (var k in v) {
        if (cb(v[k], k, v, result)) {
          result.push(v[k])
        }
    }
    return result
};
/**
 * 字符串定义几行显示
 * @param {*} name 字符串
 * @param {*} num  每行显示的字数
 */
export const lineFeedStr = (name, num) => {
  let newParamsName = ""; // 最终拼接成的字符串
  let paramsNameNumber = name.length; // 实际标签的个数
  let provideNumber = num; // 每行能显示的字的个数
  let rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
  /**
   * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
   */
  // 条件等同于rowNumber>1
  if (paramsNameNumber > provideNumber) {
    /** 循环每一行,p表示行 */
    for (let p = 0; p < rowNumber; p++) {
      let tempStr = ""; // 表示每一次截取的字符串
      let start = p * provideNumber; // 开始截取的位置
      let end = start + provideNumber; // 结束截取的位置
      // 此处特殊处理最后一行的索引值
      if (p == rowNumber - 1) {
        // 最后一次不换行
        tempStr = name.substring(start, paramsNameNumber);
      } else {
        // 每一次拼接字符串并换行
        tempStr = name.substring(start, end) + "\n";
      }
      newParamsName += tempStr; // 最终拼成的字符串
    }

  } else {
    // 将旧标签的值赋给新标签
    newParamsName = name;
  }
  //将最终的字符串返回
  return newParamsName
}

export const getDateDiff = dateTimeStamp => {
  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  var halfamonth = day * 15
  var month = day * 30
  var now = new Date().getTime()
  var diffValue = now - dateTimeStamp
  if (diffValue < 0) {
    return
  }
  var monthC = diffValue / month
  var weekC = diffValue / (7 * day)
  var dayC = diffValue / day
  var hourC = diffValue / hour
  var minC = diffValue / minute
  var result = ''
  if (monthC >= 1) {
    result = '' + parseInt(monthC) + '月前'
  } else if (weekC >= 1) {
    result = '' + parseInt(weekC) + '周前'
  } else if (dayC >= 1) {
    result = '' + parseInt(dayC) + '天前'
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC) + '小时前'
  } else if (minC >= 1) {
    result = '' + parseInt(minC) + '分钟前'
  } else result = '刚刚'
  return result
}

/**
 * 设配大屏
 * @param {*} pcSize
 * @param {*} wallSize
 */
export function adaptaWall(pcSize = 16, wallSize) {
    if (wallSize) {
        return window.innerWidth > 4000 ? wallSize : pcSize;
    }
    return window.innerWidth > 4000 ? pcSize * 4 : pcSize;
}

export function scrollIntoView(container, selected) {
  if (!selected) {
    container.scrollTop = 0;
    return;
  }

  const offsetParents = [];
  let pointer = selected.offsetParent;
  while (pointer && container !== pointer && container.contains(pointer)) {
    offsetParents.push(pointer);
    pointer = pointer.offsetParent;
  }
  const top = selected.offsetTop + offsetParents.reduce((prev, curr) => (prev + curr.offsetTop), 0);
  const bottom = top + selected.offsetHeight;
  const viewRectTop = container.scrollTop;
  const viewRectBottom = viewRectTop + container.clientHeight;

  if (top < viewRectTop) {
    // 上滚动
    container.scrollTop = top - 30;
  } else if (bottom > viewRectBottom) {
    // 下滚动
    container.scrollTop = bottom - container.clientHeight;
  }
}

// 查找到字符串中的手机号码，并且脱敏处理
// https://blog.csdn.net/yeshizhu/article/details/78354058
// https://blog.csdn.net/u010201575/article/details/90024828
export function matchPhoneNum(str, reg = /(1[3|4|5|7|8|9][\d]{9}|0[\d]{2,3}-[\d]{7,8}|400[-]?[\d]{3}[-]?[\d]{4})/g) {
    let phoneNums = str.match(reg)

    let _str = str

    // 字符串中如果有多个手机号码，需要批量处理
    for (let i = 0; i < phoneNums.length; i++) {
        let phone = phoneNums[i]

        //隐藏手机号中间4位(例如:12300102020,隐藏后为132****2020)
        const result = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')

        _str = str.replace(phone, result)
    }

    if (_str === str) {
        const left = str.slice(0, 3)
        const l = str.slice(3, -3).length
        const fstr = l > 3 ? '*'.repeat(l) : '***'
        const star = str.slice(3, -3).replace(/.+/, fstr)
        const right = str.slice(-3)
        _str = left + star + right
    }

    return _str
}

export const unique = a => [...new Set(a)]

// Function.prototype.before es5 版本
Function.prototype.before = function(beforefn) {
    var __self = this
    return function() {
        beforefn.apply(this, arguments)
        return __self.apply(this, arguments)
    }
}

/**
 * 以大带小
 *
 *  const data = drive(newV.data, (a, b) => +a.amount - +b.amount)
 *  this.render(data)
 */
export const drive = (ary, fn) => {
    // 数组长度
    const len = ary.length
    // 偶数长度
    const isEven = len % 2 === 0
    // 从大到小排序
    const _ary = ary.sort(fn)
    // 循环的次数
    const time = isEven ? len / 2 : Math.floor(len / 2) + 1
    // 返回新的数组
    return [...Array(time)].reduce((previousValue, currentValue, index) => {
        // 是否循环的最后一次
        const isLastTime = index === time - 1
        // 如果是奇数的，且最后一次的情况下
        if (!isEven && isLastTime) {
            // 没人可带，带我自己就够了
            return [...previousValue, _ary[index]]
            // 默认都带一个小弟
        } else {
            // 带上小弟
            return [...previousValue, _ary[index], _ary[len - 1 - index]]
        }
    }, [])
}

// 函数去抖（debounce）：比如5秒后执行一个函数，如果这期间又被调用，那倒计时重头来。你一抖就重新来，看你抖不抖
export var debounce = function(func, wait, immediate) {
  var timeout, result;

   // 定时器设置的回调，清除定时器，执行回调函数func
  var later = function(context, args) {
    timeout = null;
    if (args) result = func.apply(context, args);
  };

  var restArgs = function(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
      var length = Math.max(arguments.length - startIndex, 0);
      var rest = Array(length);
      for (var index = 0; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      switch (startIndex) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, arguments[0], rest);
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
      var args = Array(startIndex + 1);
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      args[startIndex] = rest;
      return func.apply(this, args);
    };
  };

  var delay = restArgs(function(func, wait, args) {
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  });

   // restArgs函数将传入的func的参数改造成Rest Parameters —— 一个参数数组
  var debounced = restArgs(function(args) {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 立即触发的条件：immediate为true且timeout为空
      var callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      // _.delay方法实际上是setTimeout()包裹了一层参数处理的逻辑
      timeout = delay(later, wait, this, args);
    }

    return result;
  });

  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
};


/**
 * 计算总数
 * 例如 totalize('-', 123)   return 123
 * @param {*} num1 
 * @param {*} num2 
 * @returns 
 */
 export function totalize(num1, num2) {
  if( ((isNaN(num1) && isNaN(num2)) || (num1 === null && num2 === null)) && (num1 !== '0' || num2 !== '0')) {
      return '-'
  } else {
      if((num1 !== '0' || num2 !== '0') && (isNaN(num1) || isNaN(num2)) || (num1 === null || num2 === null) ) {
          if(num1 === '-') return num2
          if(num2 === '-') return num1
      } else {
          return +num1 + +num2
      }
  }
}