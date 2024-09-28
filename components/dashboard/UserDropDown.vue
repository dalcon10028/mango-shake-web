<script setup lang="ts">
// const { isHelpSlideoverOpen } = useDashboard()
// const { isDashboardSearchModalOpen } = useUIState()
const { metaSymbol } = useShortcuts()

const items = computed(() => [
  [{
    slot: 'account',
    label: '',
    disabled: true
  }], [{
    label: 'API 키 추가',
    icon: 'i-heroicons-key',
    to: 'https://ui.nuxt.com/pro/purchase',
    target: '_blank'
  }], [{
    label: '로그아웃',
    icon: 'i-heroicons-arrow-left-on-rectangle'
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
        label="dalcon"
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      >
        <template #leading>
          <UAvatar
            src="https://avatars.githubusercontent.com/u/739984?v=4"
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
          dalcon10280@gmail.com
        </p>
        <p>
          계정으로 로그인
        </p>
      </div>
    </template>
  </UDropdown>
</template>
