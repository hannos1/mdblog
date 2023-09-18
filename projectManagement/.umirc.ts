import { defineConfig } from '@umijs/max';
import route from 'routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'mdblogManagement',
  },
  routes: route,
  npmClient: 'pnpm',
});
