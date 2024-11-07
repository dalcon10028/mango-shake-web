<script setup lang="ts">
// const { isHelpSlideoverOpen } = useDashboard()
// const { isDashboardSearchModalOpen } = useUIState()
import {useAuthStore} from "~/store/useAuthStore";

const { metaSymbol } = useShortcuts()
const { logout, user } = useAuthStore()

const items = computed(() => [
  [{
    slot: 'account',
    label: '',
    disabled: true
  }], [{
    label: 'Open API 키 등록',
    icon: 'i-heroicons-key',
    to: 'https://ui.nuxt.com/pro/purchase',
    target: '_blank'
  }], [{
    label: '로그아웃',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: () => { logout() }
  }]
])
</script>

<template>
  <UDropdown
    mode="hover"
    :items="items"
    :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }"
    :popper="{ strategy: 'absolute', placement: 'top' }"
    class="w-full"
  >
    <template #default="{ open }">
      <UButton
        color="gray"
        variant="ghost"
        class="w-full"
        :label="user?.nickname"
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      >
        <template #leading>
          <UAvatar
            :src="user?.profileImageUrl ?? 'assets/icons/mango.jpeg'"
            size="2xs"
          />
        </template>

        <template #trailing>
          <UIcon
            name="i-heroicons-ellipsis-vertical"
            class="w-5 h-5 ml-auto"
          />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="text-left">
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ user?.username }}
        </p>
        <p>
          계정으로 로그인
        </p>
      </div>
    </template>
  </UDropdown>
</template>
