<script setup lang="ts">
import { sub } from 'date-fns'
import type { Period, Range } from '~/types'

const items = [[{
  label: 'New mail',
  icon: 'i-heroicons-paper-airplane',
  to: '/'
}, {
  label: 'New user',
  icon: 'i-heroicons-user-plus',
  to: '/'
}]]

const range = ref<Range>({ start: sub(new Date(), { days: 14 }), end: new Date() })
const period = ref<Period>('daily')
</script>

<template>
  <DashboardPage>
    <DashboardPanel grow>
      <DashboardNavbar title="Home">
        <template #right>
          <UTooltip
            text="Notifications"
            :shortcuts="['N']"
          >
            <UButton
              color="gray"
              variant="ghost"
              square
              @click="() => console.log('Notifications')"
            >
              <UChip
                color="red"
                inset
              >
                <UIcon
                  name="i-heroicons-bell"
                  class="w-5 h-5"
                />
              </UChip>
            </UButton>
          </UTooltip>

          <UDropdown :items="items">
            <UButton
              icon="i-heroicons-plus"
              size="md"
              class="ml-1.5 rounded-full"
            />
          </UDropdown>
        </template>
      </DashboardNavbar>

      <DashboardToolbar>
        <template #left>
          <HomeDateRangePicker
            v-model="range"
            class="-ml-2.5"
          />

          <HomePeriodSelect
            v-model="period"
            :range="range"
          />
        </template>
      </DashboardToolbar>

      <PanelContent>
        <HomeChart
          :period="period"
          :range="range"
        />

        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
           <HomeSales />
           <HomeCountries />
        </div>
      </PanelContent>
    </DashboardPanel>
  </DashboardPage>
</template>
