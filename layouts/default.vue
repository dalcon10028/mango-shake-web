<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()

const links = [{
  id: 'home',
  label: '홈',
  icon: 'i-heroicons-home',
  to: '/',
  tooltip: {
    text: 'Home',
    shortcuts: ['G', 'H']
  }
}, {
  id: 'wallet',
  label: '자산',
  icon: 'i-heroicons-wallet',
  to: '/wallets',
  tooltip: {
    text: 'Wallet',
    shortcuts: ['G', 'I']
  }
}, {
  id: 'settings',
  label: '설정',
  to: '/settings',
  icon: 'i-heroicons-cog-8-tooth',
  children: [{
    label: '일반',
    to: '/settings',
    exact: true
  }, {
    label: 'Open API 관리',
    to: '/settings/api-key'
  }],
  tooltip: {
    text: 'Settings',
    shortcuts: ['G', 'S']
  }
}]

const adminLinks = [{
  label: 'Invite people',
  icon: 'i-heroicons-plus',
  to: '/'
}, {
  label: 'Help & Support',
  icon: 'i-heroicons-question-mark-circle',
  // click: () => isHelpSlideoverOpen.value = true
}]

const groups = [{
  key: 'links',
  label: 'Go to',
  commands: links.map(link => ({...link, shortcuts: link.tooltip?.shortcuts}))
}, {
  key: 'code',
  label: 'Code',
  commands: [{
    id: 'source',
    label: 'View page source',
    icon: 'i-simple-icons-github',
    click: () => {
      window.open(`https://github.com/nuxt-ui-pro/dashboard/blob/main/pages${route.path === '/' ? '/index' : route.path}.vue`, '_blank')
    }
  }]
}]

const defaultColors = ref(['green', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet'].map(color => ({
  label: color,
  chip: color,
  click: () => appConfig.ui.primary = color
})))
const colors = computed(() => defaultColors.value.map(color => ({
  ...color,
  active: appConfig.ui.primary === color.label
})))
</script>

<template>
  <div class="fixed inset-0 flex overflow-hidden">
    <DashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
    >
      <DashboardNavbar
        class="!border-transparent"
        :ui="{ left: 'flex-1' }"
      >
        <template #left>
          <DashboardDropdown/>
        </template>
      </DashboardNavbar>
      <DashboardSidebar>
        <DashboardSidebarLinks :links="links"/>
        <UDivider/>
<!--        <DashboardSidebarLinks :links="adminLinks"/>-->
        <template #footer>
          <DashboardUserDropDown/>
        </template>
      </DashboardSidebar>
    </DashboardPanel>
    <slot/>
  </div>
</template>
