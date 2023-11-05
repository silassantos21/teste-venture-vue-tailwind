<script setup>
import TitleScreen from '@/components/TitleScreen.vue'
import { ref } from 'vue'

const count = ref(0)

</script>

<template>
    <div class="container mx-auto">
        <TitleScreen parentTitle="Contador" />
        <div class="grid grid-cols-12 gap-5">
            <div class="col-span-12">
              <BaseCard>
                <div class="flex mt-6" style="place-content: center; align-items: baseline;">
                  <BaseBtn v-if="count === 0" class="mb-3 mr-3 text-grey" xl disabled>
                    <i class="i-Remove rounded-[50%]"></i>
                  </BaseBtn>
                  <BaseBtn v-if="count > 0" class="mb-3 mr-3 text-primary" xl @click="count--">
                    <i class="i-Remove hover:bg-primary hover:text-white rounded-[50%]"></i>
                  </BaseBtn>
                  <span class="text-xl">{{ count }}</span>
                  <BaseBtn class="mb-3 mr-3 text-primary" xl @click="count++">
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
