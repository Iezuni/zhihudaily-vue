/* eslint-disable no-console */

import {
  register
} from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        '我准备好了!'
      )
    },
    registered() {
      console.log('完成注册')
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('新内容已经在下载.')
    },
    updated() {
      console.log('新内容已经可用请刷新.')
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })
}