// import socketio from 'socket.io'
import './main.css'
/**
 * This will only include font files
 */
import '@aeternity/aepp-components/dist/aepp.fonts.css'
import '@aeternity/aepp-components/dist/aepp.components.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import getRouter from './router'
import store from './store'
import VueKonva from 'vue-konva'
import VueMeta from 'vue-meta'
import VueMatomo from 'vue-matomo'
/**
 * Documentation of the new components are here.
 *
 * http://aeternity.com/aepp-components/
 */
import Components from '@aeternity/aepp-components'

/**
 * Use this if you need a general reset.
 *
 * Includes global style changes like:
 *
 * - all needed fonts
 * - normalize.css
 *
 * html, body {} styles (like font, font-size)
 * p {}
 * h1, h2, h3, h4, h5, h6 {}
 */
// import '@aeternity/aepp-components/dist/aepp.global.css'

/**
 * These are all components styles. They're scoped
 * so they won't collide with other styles.
 */

Vue.use(VueRouter)

const router = getRouter(store);

Vue.use(Components)
Vue.use(VueKonva)
Vue.use(VueMeta)

Vue.use(VueMatomo, {
  // Configure your matomo server and site by providing
  host: 'http://localhost:8000',
  siteId: 1,

  // Changes the default .js and .php endpoint's filename
  // Default: 'piwik'
  trackerFileName: 'piwik',

  // Overrides the autogenerated tracker endpoint entirely
  // Default: undefined
  // trackerUrl: 'https://example.com/whatever/endpoint/you/have',

  // Enables automatically registering pageviews on the router
  router: router,

  // Enables link tracking on regular links. Note that this won't
  // work for routing links (ie. internal Vue router links)
  // Default: true
  enableLinkTracking: true,

  // Require consent before sending tracking information to matomo
  // Default: false
  requireConsent: false,

  // Whether to track the initial page view
  // Default: true
  trackInitialView: true,

  // Whether or not to log debug information
  // Default: false
  debug: true
})

Vue.config.productionTip = false

console.info('about to render Vue App')

/**
 * I would suggest exporting this Vue instance.
 *
 * In the future it might turn useful if you want to reference it
 * from some other packages that have no relation with VueJS
 *
 * Also looks nice.
 */


export default new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')
