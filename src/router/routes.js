//引入一级路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

//当打包构建应用时，JavaScript包会变得非常大，影响页面加载
//如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了

export default [
    {
        path: "/center",
        component: () => import('@/pages/Center'),
        meta: { show: true },
        children: [
            {
                path: "myorder",
                component: () => import('@/pages/Center/myOrder'),
            },
            {
                path: "grouporder",
                component: () => import('@/pages/Center/groupOrder'),
            },
            {
                path: "/center",
                redirect: '/center/myOrder',
            }
        ],
    },
    {
        path: "/paysuccess",
        component: () => import('@/pages/PaySuccess'),
        meta: { show: true },
        // beforeEnter: (to, from, next) => {
        //     if (from.path == '/pay') {
        //         next();
        //     } else {
        //         next(false);
        //     }
        // }
    },
    {
        path: "/pay",
        component: () => import('@/pages/Pay'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: "/trade",
        component: () => import('@/pages/Trade'),
        meta: { show: true },
        //路由独享守卫，trade只能从shopcart跳转过来
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next();
            } else {
                //停留在原路由
                next(false);
            }
        }
    },
    {
        path: "/shopcart",
        component: () => import('@/pages/ShopCart'),
        meta: { show: true },
    },
    {
        path: "/addcartsuccess",
        component: () => import('@/pages/AddCartSuccess'),
        meta: { show: true },
        name: "addcartsuccess"
    },
    {
        path: "/detail/:skuid",
        component: () => import('@/pages/Detail'),
        meta: { show: true }
    },
    {
        path: "/home",
        //路由懒加载，以后都用这种方式
        component: () => import('@/pages/Home'),
        meta: { show: true }
    },
    {
        path: "/search/:keyword?",
        component: () => import('@/pages/Search'),
        meta: { show: true },
        name: "search"
    },
    {
        path: "/login",
        component: () => import('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: "/register",
        component: () => import('@/pages/Register'),
        meta: { show: false }
    },
    //重定向，在项目跑起来的时候，访问/立马定向到首页
    {
        path: "*",
        redirect: "/home"
    }
]