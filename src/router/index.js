import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
    	{
    		path: '/list',
    		meta: {
    			title: '商品列表',
    		},
    		component: (resolve) => require(['../views/list.vue'], resolve)
    	},
    	{
    		path: '/product/:id',
    		meta: {
    			title: '商品详情'
    		},
    		component: (resolve) => require(['../views/product.vue'], resolve)
    	},
    	{
    		path: '/cart',
    		meta: {
    			title: '购物车'
    		},
    		component: (resolve) => require(['../views/cart.vue'], resolve)
    	},
        {
            path: '/smallcart',
            meta: {
                title: '小购物车'
            },
            component: (resolve) => require(['../components/smallCart.vue'], resolve)
        },
    	{
    		path: '*',
    		redirect: '/list'
    	}
  ]
})
