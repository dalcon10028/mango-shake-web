<script setup lang="ts">
import {format, sub} from 'date-fns'
import type { Period, Range } from '~/types'
import {useQuery} from "@tanstack/vue-query";
import {type DataRecord, DataRecordsSchema} from "~/domain/stat";
import {useAPI} from "~/composables/useAPI";

const items = [[{
  label: 'New mail',
  icon: 'i-heroicons-paper-airplane',
  to: '/'
}, {
  label: 'New wallets',
  icon: 'i-heroicons-wallets-plus',
  to: '/'
}]]

const range = ref<Range>({ start: sub(new Date(), { days: 14 }), end: new Date() })
const period = ref<Period>('daily')

const { data } = useQuery<DataRecord[]>({
  queryKey: ['revenue', range],
  queryFn: () => {
    return useAPI<DataRecord[]>(`/stats/aum`, DataRecordsSchema, {
      params: {
        startDate: format(range.value.start, 'yyyy-MM-dd'),
        endDate: format(range.value.end, 'yyyy-MM-dd'),
      }
    })
  },
  initialData: [],
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="홈">
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
      </UDashboardNavbar>

      <UDashboardToolbar>
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
      </UDashboardToolbar>

      <PanelContent>
        <HomeChart
          :period="period"
          :data="data"
        />

        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
           <HomeSales />
           <HomeCountries />
        </div>
      </PanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
