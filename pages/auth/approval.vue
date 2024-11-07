<script setup lang="ts">
definePageMeta({
  layout: 'blank'
})

useSeoMeta({
  title: '회원가입 신청이 완료되었습니다'
})

const fields = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email'
}, {
  name: 'password',
  label: 'Password',
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
  label: 'Continue with GitHub',
  icon: 'i-simple-icons-github',
  color: 'white' as const,
  click: () => {
    console.log('Redirect to GitHub')
  }
}]

function onSubmit(data: any) {
  console.log('Submitted', data)
}
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <ULandingCard
    title="회원가입 신청이 완료되었습니다"
    description="관리자의 승인을 기다려주세요."
    color="primary"
    class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur"
  >
    <template #icon>
<!--      🎉-->
      <UIcon
        name="i-twemoji-party-popper"
        class="w-10 h-10 text-primary"
      />
    </template>
    <UButton
      size="md"
      block
      label="홈으로"
      :trailing="false"
      @click="() => $router.push('/')"
    />
  </ULandingCard>
</template>
