<script setup>
import TitleScreen from '@/components/TitleScreen.vue'
import { ref, shallowReactive, toRaw } from 'vue'

const history = shallowReactive([[]])
const index = ref(0)
const circles = ref([])
const selected = ref()
const adjusting = ref(false)

const svgRef = ref(null)

const disableStyle = ref("border-gray-300 bg-gray-300 text-gray-500")

function mark({ clientX: x, clientY: y }) {
  const rect = svgRef.value.getBoundingClientRect();
  const cx = x - rect.left;
  const cy = y - rect.top;
  const r = 30;
  circles.value.push({ cx, cy, r });
  if (adjusting.value) {
    adjusting.value = false
    selected.value = null
    push()
    return
  }

  selected.value = [...circles.value].reverse().find(({ cx, cy, r }) => {
    const dx = cx - x
    const dy = cy - y
    return Math.sqrt(dx * dx + dy * dy) <= r
  })

  if (!selected.value) {
    push()
    playTiro()
  }
}

function adjust(circle) {
  selected.value = circle
  adjusting.value = true
}

function push() {
  history.length = ++index.value
  history.push(clone(circles.value))
  console.log(toRaw(history))
}

function voltar() {
  playRecarregando()
  circles.value = clone(history[--index.value])
}

function refazer() {
  playTiro()
  circles.value = clone(history[++index.value])
}

function clone(circles) {
  return circles.map((c) => ({ ...c }))
}

function playTiro() {
  const audioTiro = new Audio('/audio/som-de-tiro.mp3');
  audioTiro.play();
}

function playRecarregando() {
  const audioRecarregando = new Audio('/audio/recarregando-tiro.mp3');
  audioRecarregando.play();
}

</script>

<template>
  <div class="container mx-auto">
    <TitleScreen parentTitle="Desenhar Círculo" />
    <div class="grid md:grid-cols-1 sm:grid-cols-1 gap-4" style="place-items: center;">
      <div class="w-full">
        <BaseCard>
          <div class="text-center mb-4">
            <p class="text-2xl">Tiro ao alvo</p>
          </div>
          <div class="grid grid-cols-2 gap-4 text-center w-full my-5" style="justify-items: center;">
            <BaseBtn :disabled="index <= 0" sm class="rounded-full w-2/4" :class="index <= 0 ? disableStyle : 'bg-danger text-white'" @click="voltar">
              <i class="i-Previous text-3xl"></i>
            </BaseBtn>
            <BaseBtn :disabled="index >= history.length - 1" sm class="rounded-full w-2/4" :class="index >= history.length - 1 ? disableStyle : 'bg-info text-white'" @click="refazer">
              <i class="i-Next1 text-3xl"></i>
            </BaseBtn>
          </div>
          <div style="text-align: -webkit-center;">
            <svg @click="mark" width="100%" height="130vh" ref="svgRef">
              <circle
                v-for="(circle, index) in circles"
                :key="index"
                :cx="circle.cx"
                :cy="circle.cy"
                :r="circle.r"
                :fill="circle === selected ? '#ccc' : '#fff'"
                @click="selected = circle"
                @contextmenu.prevent="adjust(circle)"
              ></circle>
            </svg>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<style>

svg {
  background: top;
  background-repeat: no-repeat;
  background-image: url('/images/tiro-ao-alvo.jpg')
}

circle {
  stroke: #000;
}

</style>