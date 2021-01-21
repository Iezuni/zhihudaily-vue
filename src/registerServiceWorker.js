/* eslint-disable no-console */

import app from "./main.js"
import {
  register
} from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log('我准备好了!')
    },
    registered() {
      console.log('完成注册')
    },
    cached() {
      console.log('内容已经缓存.')
    },
    updatefound() {
      console.log('新内容已经在下载.')
    },
    updated() {
      let h = app.app.$createElement
      app.Message.success({
        duration: 5000,
        message: h('p', null, [
          h('span', null, '内容有更新'),
          h("el-link", {
            attrs: {
              type: "primary",
              href: `javascript:location.reload()`,
            }
          }, "点击更新")
        ])
      })
      console.log('新内容已经可用请刷新.')
    },
    offline() {
      console.log('无网络，正在使用离线模式 .')
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
