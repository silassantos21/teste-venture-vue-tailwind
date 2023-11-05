<script setup>
import { ref, onUnmounted, computed } from 'vue'
import TitleScreen from '@/components/TitleScreen.vue'

const duration = ref(15 * 1000)
const elapsed = ref(0)

let lastTime
let handle

const update = () => {
  elapsed.value = performance.now() - lastTime
  if (elapsed.value >= duration.value) {
    cancelAnimationFrame(handle)
  } else {
    handle = requestAnimationFrame(update)
  }
}

const reset = () => {
  elapsed.value = 0
  lastTime = performance.now()
  update()
}

const progressRate = computed(() =>
  Math.min(elapsed.value / duration.value, 1)
)

const progressRateWidth = computed(() =>
  progressRate.value * 100
)

reset()

onUnmounted(() => {
  cancelAnimationFrame(handle)
})

</script>

<template>
    <div class="container mx-auto">
      <TitleScreen parentTitle="Cronômetro" />
      <div class="grid md:grid-cols-1 sm:grid-cols-1 gap-4">
        <div>
          <BaseCard>
            <img v-if="progressRate < 1" class="rounded my-5 max-h-[20rem] relative z-1 m-auto" src="/images/giphy.gif" alt="">
            <img v-if="progressRate === 1" class="rounded my-5 max-h-[20rem] relative z-1 m-auto" src="/images/tempo-concluido.jpg" alt="">
            <div class="text-center" v-if="progressRate < 1">
              <p class="text-2xl">Carregando em {{ (duration / 1000).toFixed(1) }} Segundos ({{ (elapsed / 1000).toFixed(1) }}s - {{ progressRateWidth.toFixed(2) }}%)</p>
            </div>
            <div class="text-center" v-if="progressRate === 1">
              <p class="text-2xl text-green-600">Carregamento Concluído! </p>
            </div>
            <div class="mt-8 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: progressRateWidth + '%' }"></div>
              <!-- <progress class="bg-blue-600 h-2.5 rounded-full" :value="progressRate"></progress> -->
            </div>
            <div class="my-8 grid grid-cols-1 items-center" style="text-align: center; place-items: center;">
              <div class="w-3/4">                
                <div class="flex flex-col mt-5 space-y-2 p-2 text-left">
                  Duração de Progresso <input type="range" class="bg-blue-600" v-model="duration" min="1" max="30000">
                  {{ (duration / 1000).toFixed(1) }} segundos
                </div>
              </div>
              <div class="w-1/4">
                <BaseBtn class="mb-3 mr-3 border border-info text-info hover:bg-info hover:text-white" xl @click="reset">
                  Recomeçar
                </BaseBtn>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
</template>
