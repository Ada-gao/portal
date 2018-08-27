const _import = require('./_import');
import Layout from '@/page/index/'
export default [{
  path: '/',
  name: '主页',
  redirect: '/wel'
}, {
  path: '/wel',
  component: Layout,
  redirect: '/wel/index',
  children: [{
    path: 'index',
    name: '首页',
    component: _import('wel')
  }]
}, {
  path: '/system',
  component: Layout,
  redirect: '/system',
  children: [
    {path: '/system/system_details',name: '系统详情',component: _import('system_manage/system_details', 'views')},
    {path: '/system/company_details_change',name: '系统详情修改',component: _import('system_manage/company_details_change', 'views')},
    {path: '/system/create_account', name: '创建账户',component: _import('system_manage/create_account', 'views')},
    {path: '/system/account_recharge', name: '账户充值',component: _import('system_manage/account_recharge', 'views')}
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
  children: [{
    path: 'index',
    name: '修改密码',
    component: _import('admin/user/info', 'views')
  }]
}, {
  path: '/admin/company',
  component: Layout,
  children: [
    { path: 'detail', name: '公司详情', component: _import('admin/company/detail', 'views')},
    { path: 'create', name: '公司账号创建', component: _import('admin/company/create', 'views')},
    { path: 'change', name: '公司详情修改', component: _import('admin/company/change', 'views')}
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
  meta: {
    keepAlive: true
  },
  children: [{
    path: ':routerPath',
    name: 'iframe',
    component: _import('iframe/main', 'components'),
    props: true
  }]
}]
