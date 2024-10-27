<script setup lang="ts">
import type { NuxtError } from '#app'
import type {PropType} from "vue";

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})

const props = defineProps({
  error: Object as () => NuxtError
})


useHead({
  htmlAttrs: {
    lang: 'ko'
  }
})
</script>

<template>
  <div>
    <DashboardMain>
      <UContainer>
        <DashboardPage>
          <DashboardPageError :error="error" />
        </DashboardPage>
      </UContainer>
    </DashboardMain>
    <UNotifications />
  </div>
</template>
