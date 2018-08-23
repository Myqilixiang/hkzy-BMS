import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
  path: '/login',
  component: () =>
      import('@/views/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () =>
      import('@/views/404'),
  hidden: true
},
{
  path: '',
  component: Layout,
  redirect: 'dashboard',
  children: [{
    path: 'dashboard',
    component: () =>
        import('@/views/dashboard/index'),
    name: 'dashboard',
    meta: {
      title: 'dashboard',
      icon: 'sider-dashboard',
      noCache: true
    }
  }]
}
]
export const asyncRouterMap = [{
  path: '/access',
  component: Layout,
  redirect: '/access/medical-institution-mana',
  name: 'Access',
  meta: {
    title: '接入管理',
    icon: 'sider-access'
  },
  children: [{
    path: 'medical-institution-mana',
    name: 'MedicalInstitutionMana',
    component: () =>
          import('@/views/access-mana/MedicalInstitutionMana'),
    meta: {
      title: '医疗机构接入管理',
      icon: 'sider-medical'
    }
  },
  {
    path: 'organization-mana',
    name: 'OrganizationMana',
    component: () =>
          import('@/views/access-mana/OrganizationMana'),
    meta: {
      title: '组织机构管理',
      icon: 'sider-organization'
    }
  }
  ]
},

{
  path: '/monitoring',
  component: Layout,
  alwaysShow: true,
  redirect: '/monitoring/dashboard',
  name: 'Engine',
  meta: {
    title: '监控管理',
    icon: 'sider-monitoring'
  },
  children: [{
    path: 'dashboard',
    name: 'monitoringDashboard',
    component: () =>
          import('@/views/monitoring-mana/dashboard/index'),
    meta: {
      title: 'Dashboard',
      icon: 'sider-dashboard'
    }
  },
  {
    path: 'statistic',
    name: 'Statistic',
    component: () =>
          import('@/views/monitoring-mana/statistic/index'),
    meta: {
      title: '审方统计',
      icon: 'sider-statistic'
    }
  }
  ]
},

{
  path: '/basic',
  component: Layout,
  alwaysShow: true,
  redirect: '/basic/user-mana',
  name: 'Basic',
  meta: {
    title: '基础管理',
    icon: 'sider-basic'
  },
  children: [{
    path: 'user-mana',
    name: 'UserMana',
    component: () =>
          import('@/views/basic-mana/user-mana/index'),
    meta: {
      title: '平台用户管理',
      icon: 'sider-user'
    }
  },
  {
    path: 'role-mana',
    name: 'RoleMana',
    component: () =>
          import('@/views/basic-mana/role-mana'),
    meta: {
      title: '平台角色管理',
      icon: 'sider-role'
    }
  },
  {
    path: 'module-mana',
    name: 'ModuleMana',
    component: () =>
          import('@/views/basic-mana/module-mana/index'),
    meta: {
      title: '模块功能管理',
      icon: 'sider-module'
    }
  }, {
    path: 'auth-mana',
    name: 'AuthMana',
    component: () =>
          import('@/views/basic-mana/auth-mana/index'),
    meta: {
      title: '角色权限管理',
      icon: 'sider-auth'
    }
  }
  ]
}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
