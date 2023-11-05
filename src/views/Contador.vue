<script setup>
import TitleScreen from '@/components/TitleScreen.vue'
import { ref } from 'vue'

const count = ref(0)

const incrementar = () => {
  count.value++
}

const decrementar = () => {
  count.value--
}

</script>

<template>
  <div class="container mx-auto">
    <TitleScreen parentTitle="Contador" />
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-12">
        <BaseCard>
          <div class="flex mt-6" style="place-content: center; align-items: baseline;">
            <BaseBtn data-type="decrementar" :disabled="count === 0" class="mb-3 mr-3" :class="count === 0 ? 'text-grey' : 'text-primary'" xl @click="decrementar">
              <i class="i-Remove" :class="count > 0 && 'hover:bg-primary hover:text-white rounded-[50%]'" ></i>
            </BaseBtn>
            <span class="text-xl">{{ count }}</span>
            <BaseBtn data-type="incrementar" class="mb-3 mr-3 text-primary" xl @click="incrementar">
              <i class="i-Add hover:bg-primary hover:text-white rounded-[50%]"></i>
            </BaseBtn>
          </div>
        </BaseCard>
      </div>
      <div class="grid md:grid-cols-20 sm:grid-cols-5 gap-4 col-span-12 text-center">
        <BaseCard v-for="c in count" :key="c">
          <div class="text-green-500">
            <span class="text-xl">{{ c }}</span>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
