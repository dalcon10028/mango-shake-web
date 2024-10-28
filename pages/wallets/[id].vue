<script setup lang="ts">
import type {FormError, FormSubmitEvent} from '#ui/types'
import {useQuery} from "@tanstack/vue-query";
import {type Wallet, WalletSchema} from "~/domain/wallet";
import {useAPI} from "~/composables/useAPI";

const {params} = useRoute()

const {isLoading, isError, data: wallet, error, suspense } = useQuery<Wallet>({
  queryKey: ['wallet'],
  queryFn: () => useAPI<Wallet>(`/wallets/${params.id}`, WalletSchema),
  initialData: {} as Wallet,
})

await suspense()

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)

  toast.add({title: 'Profile updated', icon: 'i-heroicons-check-circle'})
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar :title="`Wallet #${params.id}`"/>
      <UDashboardPanelContent class="pb-24">
        <Suspense>
          <template #fallback>
            <USkeleton class="space-y-4">
            </USkeleton>
          </template>
          <WalletForm :wallet="wallet" @submit="onSubmit"/>
        </Suspense>
<!--        <WalletForm :wallet="wallet" @submit="onSubmit"/>-->

        <!-- ~/components/settings/DeleteAccountModal.vue -->
        <!--    <SettingsDeleteAccountModal v-model="isDeleteAccountModalOpen" />-->
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
