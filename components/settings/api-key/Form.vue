<script setup lang="ts">
import type { FormError, FormSubmitEvent, Avatar } from '#ui/types'

const providers = [
  { id: 'UPBIT', label: '업비트', avatar: { src: 'https://upbit.com/favicon.jpg' } }
]

const emit = defineEmits(['close'])

const state = reactive({
  selectProvider: providers[0],
  name: undefined,
  email: undefined,
})

// https://ui.nuxt.com/components/form
const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Please enter a name.' })
  if (!state.email) errors.push({ path: 'email', message: 'Please enter an email.' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)

  emit('close')
}
</script>

<template>
  <UForm
    :validate="validate"
    :validate-on="['submit']"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup name="selectMenu" label="Open API 제공자">
      <USelectMenu v-model="state.selectProvider" placeholder="Select..." :options="providers">
        <template #leading>
          <UIcon v-if="!state.selectProvider" name="i-heroicons-user-circle" class="w-5 h-5" />
          <UAvatar v-else v-bind="(state.selectProvider.avatar as Avatar)" size="2xs" />
        </template>
      </USelectMenu>
    </UFormGroup>

    <UFormGroup
      label="AccessKey"
      name="AccessKey"
    >
      <UInput
        v-model="state.name"
        placeholder="AccessKey"
        autofocus
      />
    </UFormGroup>

    <UFormGroup
      label="SecretKey"
      name="SecretKey"
    >
      <UInput
        v-model="state.email"
        placeholder="SecretKey"
      />
    </UFormGroup>

    <div class="flex justify-end gap-3">
      <UButton
        label="취소"
        color="gray"
        variant="ghost"
        @click="emit('close')"
      />
      <UButton
        type="submit"
        label="저장"
        color="black"
      />
    </div>
  </UForm>
</template>
