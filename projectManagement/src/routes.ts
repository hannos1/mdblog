type RouteConfigType = Array<
  | {
      component?: string | undefined;
      layout?: false | undefined;
      path?: string | undefined;
      redirect?: string | undefined;
      routes?: RouteConfigType;
      wrappers?: Array<string> | undefined;
    }
  | { [x: string]: any }
>;

const routes: RouteConfigType = [
  {
    path: '/',
    redirect: '/baseManagement',
  },
  {
    name: '基本信息',
    path: '/baseManagement',
    component: './BaseManagement/BaseManagement',
  },
  {
    name: '卡片信息管理',
    path: '/cardManagement',
    component: './CardManagement/CardManagement',
  },
  {
    name: '文章管理',
    path: '/articleManagement',
    component: './ArticleManagement/ArticleManagement',
  },
  {
    name: '简历管理',
    path: '/resumeManagement',
    component: './ResumeManagement/ResumeManagement',
  },
  {
    name: '登陆页面',
    path: '/login',
    component: './Login/Login',
  },
];

export default routes;
