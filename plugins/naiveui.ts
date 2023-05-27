/**
 * 解决naiveui和tailwind样式冲突问题
 * 插件仅在客户端使用
 */
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:beforeMount', () => {
      if (process.server) { return; }
      const naive = document.createElement('style');
      naive.textContent = `
          button:is(.n-button), 
          [type='button']:is(.n-button), 
          [type='reset']:is(.n-button), 
          [type='submit']:is(.n-button) {
              background-color: var(--n-color)
          }`;
      document.head.appendChild(naive);
    });
  });