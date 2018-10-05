/**
 * 这个文件主要是用来检测性能，具体文档可以查看MDN：
 * https://developer.mozilla.org/zh-CN/docs
 * /Web/API/Window/performance
 */
import { inBrowser } from './env'

export let mark
export let measure

if (process.env.NODE_ENV !== 'production') {
  const perf = inBrowser && window.performance
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    /**
     * performance.mark()通过一个给定的名称，
     * 将该名称（作为键）和对应的DOMHighResTimeStamp
     *（作为值）保存在一个哈希结构里。该键值对表示了从某一时刻
     *（译者注：某一时刻通常是 navigationStart 事件发生时刻）
     * 到记录时刻间隔的毫秒数。（译者注：该方法一般用来多次记录时
     * 间，用于求得各记录间的时间差）
     */
    mark = tag => perf.mark(tag)
    measure = (name, startTag, endTag) => {
      perf.measure(name, startTag, endTag)
      perf.clearMarks(startTag)
      perf.clearMarks(endTag)
      perf.clearMeasures(name)
    }
  }
}
