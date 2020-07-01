import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import leftIndividual from '../components/left/individual.vue'
import leftQuotation from '../components/left/quotation.vue'
import leftAssets from '../components/left/assets.vue'
import entrust from '../components/left/orderList/entrust.vue'
import position from '../components/left/orderList/position.vue'
import closedPosition from '../components/left/orderList/closedPosition.vue'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Trade',
      component: Home,
      redirect: '/trade/individual',
      children: [
        {
          path: '/trade/individual',
          name: 'individual',
          component: leftIndividual
        },
        {
          path: '/trade/quotation',
          name: 'Quotation',
          component: leftQuotation
        },
        {
          path: '/trade/assets',
          name: 'Assets',
          component: leftAssets,
          redirect: '/trade/assets/entrust',
          children: [
            {
              path: '/trade/assets/entrust',
              name: 'entrust',
              component: entrust
            },
            {
              path: '/trade/assets/position',
              name: 'position',
              component: position
            },
            {
              path: '/trade/assets/closedPosition',
              name: 'closedPosition',
              component: closedPosition
            }
          ]
        }
      ]
    }
  ]
})
