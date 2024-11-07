<script setup lang="ts">
import {useAuthStore} from "~/store/useAuthStore";
import {AuthProvider} from "~/domain/auth/auth-provider";

definePageMeta({
  layout: 'blank'
})

useSeoMeta({
  title: 'Login'
})

const auth = useAuthStore()

const fields = [{
  name: 'email',
  type: 'email',
  label: '이메일',
  placeholder: 'Enter your email'
}, {
  name: 'password',
  label: '비밀번호',
  type: 'password',
  placeholder: 'Enter your password'
}]

const validate = (state: any) => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' })
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
  return errors
}

const providers = [{
  label: '카카오 로그인',
  icon: 'i-heroicons-chat-bubble-oval-left-solid',
  color: 'yellow',
  click: () => {
    auth.login(AuthProvider.KAKAO)
  }
}]

function onSubmit(data: any) {
  console.log('Submitted', data)
}
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      :providers="providers"
      title="Mangk Shake"
      align="top"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{
        label: '이메일로 로그인'
      }"
      @submit="onSubmit"
    >
      <template #icon>
        <UIcon
          name="i-heroicons-chart-pie"
          class="w-10 h-10 text-primary"
        />
      </template>
      <template #description>
        자산 포트폴리오 관리
      </template>
    </UAuthForm>
  </UCard>
</template>
