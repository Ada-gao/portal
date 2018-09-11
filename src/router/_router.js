const _import = require('./_import');
import Layout from '@/page/index/'
export default [
    {
        path: '/',
        name: '首页',
        redirect: '/wel'
    }, {
        path: '/wel',
        component: Layout,
        redirect: '/wel/index',
        children: [
            { path: 'index', name: '首页', component: _import('account/handle','views')},
            
            {path: '/account/handle/company_details',name: '公司详情',component: _import('account/company_details', 'views')},
            {path: '/account/handle/set_product', name: '产品设定',component: _import('account/set_product', 'views')},
            {path: '/account/handle/recharge', name: '账户充值',component: _import('account/recharge', 'views')},
            {path: '/account/handle/consump_details', name: '消费批次详情',component: _import('account/consump_details', 'views')},
        ]
    }, {
        path: '*',
        redirect: '/404',
        hidden: true
    }, {
        path: '/login',
        name: '登录页',
        component: _import('login/index')
    }, {
        path: '/lock',
        name: '锁屏页',
        component: _import('lock/index')
    }, {
        path: '/crud',
        component: Layout,
        redirect: '/crud/index',
        children: [{
            path: 'index',
            name: 'crud实例',
            component: _import('crud/index', 'views')
        }]
    }, {
        path: '/info',
        component: Layout,
        redirect: '/info/index',
        children: [
            {path: 'index', name: '修改密码', component: _import('admin/user/info', 'views')},
            {path: '/admin/user/create_account', name: '创建账户',component: _import('admin/user/create_account', 'views')}
        ]
    }, {
        path: '/admin',
        component: Layout,
        children: [
            { path: '/admin/company/detail', name: '公司信息', component: _import('admin/company/detail', 'views')},
            { path: '/admin/company/create', name: '新建公司', component: _import('admin/company/create', 'views')},
            { path: '/admin/company/change', name: '修改公司信息', component: _import('admin/company/change', 'views')}
        ]
    }, {
        path: '/404',
        component: _import('error-page/404', 'components'),
        name: '404'
    }, {
        path: '/403',
        component: _import('error-page/403', 'components'),
        name: '403'
    }, {
        path: '/500',
        component: _import('error-page/500', 'components'),
        name: '500'
    }, {
        path: '/myiframe',
        component: Layout,
        redirect: '/myiframe',
        meta: {keepAlive: true},
        children: [{
            path: ':routerPath',
            name: 'iframe',
            component: _import('iframe/main', 'components'),
            props: true
        }]
    }
]
