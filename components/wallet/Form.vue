<script setup lang="ts">
import { z } from 'zod'
import {ApiProviderSchema} from "~/domain/shared/api-provider";
import type {Form} from "#ui/types";

defineEmits(['submit'])

const Schema = z.object({
  appKey: z.string(),
  apiProvider: ApiProviderSchema,
  memo: z.string().max(20, 'Memo must be at most 20 characters.')
})

type Schema = z.infer<typeof Schema>

const {wallet} = defineProps<{
  wallet: Schema
}>()

const formRef = ref<Form<Schema>>()

const state = reactive<Schema>(<Schema>Object.assign({}, wallet))

defineExpose({
  formRef,
  state
})
</script>

<template>
  <UForm
    ref="formRef"
    :schema="Schema"
    :state="state"
    class="space-y-4"
    @submit="$emit('submit', $event.data)"
  >
    <UFormGroup
      name="apiProvider.name"
      label="Open API 제공자"
      description="Open API를 제공해주는 거래소 또는 증권사 입니다."
      class="grid md:grid-cols-2 grid-cols-1 gap-2 items-center"
      :ui="{ container: '' }"
    >
      <UInput
        disabled
        :model-value="state.apiProvider.name"
        size="md"
      >
        <template #leading>
          <UAvatar
            :src="state.apiProvider.iconUrl"
            :alt="state.apiProvider.value"
            size="xs"
          />
        </template>
      </UInput>
    </UFormGroup>

    <UDivider class="mb-4" />

    <UFormGroup
      name="appKey"
      label="앱 키"
      description="Open API 제공사에서 발급받은 앱 키입니다."
      class="grid md:grid-cols-2 grid-cols-1 gap-2 items-center"
      :ui="{ container: '' }"
    >
      <UInput
        disabled
        :model-value="state.appKey"
        icon="i-heroicons-key"
        size="md"
      />
    </UFormGroup>

    <UDivider class="mb-4" />

    <UFormGroup
      name="memo"
      label="메모"
      description="내부적으로 사용하는 메모입니다."
      class="grid md:grid-cols-2 grid-cols-1 gap-2 items-center"
      :ui="{ container: '' }"
    >
      <UTextarea
        v-model="state.memo"
        size="md"
      />
    </UFormGroup>

    <UDivider class="mb-4" />

    <UButton type="submit">
      저장
    </UButton>

  </UForm>
</template>
