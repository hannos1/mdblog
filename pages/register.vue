<template>
  <div
    class="w-60 h-48 absolute"
    style="
      display: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
    "
  >
    <n-form ref="formRef" :label-width="80" :rules="rules">
      <n-form-item first label="账号" path="name">
        <n-input
          v-model:value="formValue.name"
          placeholder="输入账号"
        />
      </n-form-item>
      <n-form-item first label="密码" path="password">
        <n-input
          v-model:value="formValue.password"
          type="password"
          placeholder="输入密码"
        />
      </n-form-item>
      <n-form-item first label="确认密码" path="password">
        <n-input
          v-model:value="formValue.confirmPassword"
          type="password"
          placeholder="输入密码"
        />
      </n-form-item>
      <NuxtLink to="/login" style="font-size: 12px"
        >已有账号？登陆</NuxtLink
      >
      <n-form-item>
        <n-button attr-type="button" @click="login">
          注册
        </n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { FormInst, FormItemRule, useMessage } from 'naive-ui';
import type {
  CurrentUser,
  BaseRequest,
} from '~~/types/user.type';

useHead({
  title: '注册',
});

const router = useRouter();
const message = useMessage();
const formRef = ref<FormInst | null>(null);
const formValue = ref({
  name: '',
  password: '',
  confirmPassword: '',
});
const rules = {
  name: {
    required: true,
    trigger: ['input'],
    validator: (rule: FormItemRule, value: string) => {
      if (formValue.value.name.trim() === '') {
        return new Error('账户不能为空');
      }
      return true;
    },
  },
  password: {
    required: true,
    trigger: ['input'],
    validator: (rule: FormItemRule, value: string) => {
      if (formValue.value.password.trim() === '') {
        return new Error('密码不能为空');
      }
      return true;
    },
  },
  confirmPassword: {
    required: true,
    trigger: ['input'],
    validator: (rule: FormItemRule, value: string) => {
      if (formValue.value.confirmPassword.trim() === '') {
        return new Error('密码不能为空');
      }
      if (
        formValue.value.confirmPassword !==
        formValue.value.password
      ) {
        return new Error('两次密码不一样');
      }
      return true;
    },
  },
};

const userRegister = async () => {
  const { data } = await useApiFetch<BaseRequest<CurrentUser>>(
    'user/register',
    {
      method: 'POST',
      body: {
        username: formValue.value.name,
        password: formValue.value.password,
        confirmPassword: formValue.value.confirmPassword,
      },
    },
  );
  if (data.value?.statusCode === 2201) {
    router.push('/login');
    message.success('注册成功');
  } else {
    message.error(`${data.value?.message}`);
  }
};

const login = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      userRegister();
    } else {
      console.log(errors);
      message.error('输入格式有误！');
    }
  });
};
</script>

<style scoped></style>
