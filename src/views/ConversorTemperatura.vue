<script setup>
import TitleScreen from '@/components/TitleScreen.vue'
import { ref, watch } from 'vue'

const count = ref(0)

const c = ref(0)
const f = ref(32)

// watch(c, (val) => {
//   f.value = val * (9 / 5) + 32
// })

// watch(f, (val) => {
//   c.value = (val - 32) * (5 / 9)
// })

function setC(e, v = +e.target.value) {
  c.value = v
  f.value = v * (9 / 5) + 32
}

function setF(e, v = +e.target.value) {
  f.value = v
  c.value = (v - 32) * (5 / 9)
}

</script>

<template>
    <div class="container mx-auto">
      <TitleScreen parentTitle="Conversor de Temperatura" />
      <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        <div>
          <BaseCard>
            <div class="text-center">
              <p class="text-2xl">Celsius</p>
            </div>
            <img class="rounded my-5 max-h-[20rem] relative z-1 m-auto" src="/images/bandeiras-de-todos-os-países-do-mundo.jpg" alt="">
            <input v-model="c" type="number" class="focus:outline-none w-full border border-gray px-3 py-2 rounded" placeholder="Temperatura °C"  @change="setC"/>
          </BaseCard>
        </div>
        <div>
          <BaseCard>
            <div class="text-center">
              <p class="text-2xl">Fahrenheit</p>
            </div>
            <img class="rounded my-5 max-h-[20rem] relative z-1 m-auto" src="/images/bandeira-estados-unidos.jpg" alt="">
            <input v-model="f" type="number" inputmode="decimal" pattern="[0-9]*[.,]?[0-9]*" class="focus:outline-none w-full border border-gray px-3 py-2 rounded" placeholder="Temperatura °F" @change="setF" />
          </BaseCard>
        </div>
      </div>
    </div>
</template>
