import { layoutMap } from '~/types/layout.type';

/**
 * 计算当前页面应该使用的布局
 * @param path 路由路径
 * @returns 当前应该使用的布局
 */
export const useLayoutType = (path: string): string => {
  let index: number = layoutTypeMap[path];
  return layoutNameMap[index];
};

const layoutTypeMap: layoutMap = {
  '/': 0,
  '/about': 0,
  '/user': 0,
  '/register': 2,
  '/login': 2,
  '/write': 0,
  '/postDetail': 3,
};

const layoutNameMap = ['default', 'user-manage', 'pure'];
