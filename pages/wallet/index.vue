<script setup lang="ts">
import {type Wallet, WalletsSchema, WalletStatus} from "~/domain/wallet";
import {useAPI} from "~/composables/useAPI";
import {useQuery} from "@tanstack/vue-query";
import {type Pagination, withPagination} from "~/domain/shared/pagination";

const { $formatDate } = useNuxtApp()


const defaultColumns = [{
  key: 'id',
  label: '#'
}, {
  key: 'apiProvider',
  label: 'API 제공자',
}, {
  key: 'appKey',
  label: '앱 키'
}, {
  key: 'status',
  label: '상태'
}, {
  key: 'memo',
  label: '메모'
}, {
  key: 'createdAt',
  label: '생성시간'
}, {
  key: 'actions'
}]

const q = ref('')
const selectedColumns = ref(defaultColumns)
const selectedStatuses = ref([])
const selectedLocations = ref([])
const sort = ref({ column: 'id', direction: 'asc' as const })
const columns = computed(() => defaultColumns.filter(column => selectedColumns.value.includes(column)))

const query = computed(() => ({ q: q.value, status: selectedStatuses.value, locations: selectedLocations.value, sort: sort.value.column, order: sort.value.direction }))

console.log('query', query.value)

const { isLoading, isError, data: wallets, error } = useQuery<Wallet[]>({
  queryKey: ['wallets'],
  queryFn: () => {
    return useAPI<Wallet[]>('/wallets', WalletsSchema)
    // const { items } = await useAPI<Pagination<Wallet>>('/wallets', withPagination<Wallet>(WalletSchema))
    // return items
  },
  initialData: [],
})

const actions = (row: Wallet) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id)
  }]
]
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="Wallets"
        :badge="wallets.length"
      >
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <USelectMenu
            v-model="selectedStatuses"
            icon="i-heroicons-check-circle"
            placeholder="Status"
            multiple
            :options="WalletStatus.map(status => status)"
            :ui-menu="{ option: { base: 'capitalize' } }"
          />
          <UInput v-model="q" placeholder="메모검색" />
        </template>
      </UDashboardToolbar>

      <UTable
        v-model:sort="sort"
        :rows="wallets"
        :columns="columns"
        :loading="isLoading"
        :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
        :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
        sort-mode="manual"
        class="w-full"
        :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
      >
        <template #apiProvider-data="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar
              :src="row.apiProvider.iconUrl"
              :alt="row.apiProvider.value"
              size="xs"
            />

            <span class="text-gray-900 dark:text-white font-medium">{{ row.apiProvider.name }}</span>
          </div>
        </template>

        <template #status-data="{ row }">
          <UBadge
            :label="row.status"
            :color="row.status === 'ACTIVE' ? 'green' : 'red'"
            variant="subtle"
            class="capitalize"
          />
        </template>

        <template #createdAt-data="{ row }">
          <span>{{ $formatDate(row.createdAt) }}</span>
        </template>

        <template #actions-data="{ row }">
          <UDropdown :items="actions(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>
