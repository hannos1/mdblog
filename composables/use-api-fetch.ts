type UseApiFetchOptions = {
  method?: string;
  body?: Record<string, any>; // 定义对象的类型并且限定内部属性的类型
};

export const useApiFetch = <T>(
  api: string | (() => string),
  options?: UseApiFetchOptions,
) => {
  const {
    public: { apiBaseUrl },
  } = useRuntimeConfig();
  const token = useLocalStorage('token');

  return useFetch<T>(api, {
    baseURL: apiBaseUrl,
    onRequest: async (context) => {
      if (token) {
        context.options.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
    },
    ...options,
  });
};
