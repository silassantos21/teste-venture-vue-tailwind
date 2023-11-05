<script setup>
import { computed, ref } from 'vue'
// import { cells, evalCell } from './store.js'
import { useStore } from 'vuex'

const store = useStore()

const cells = computed(() => {
  return store.getters['cell/cells']
})

const props = defineProps({
  c: Number,
  r: Number
})

const editing = ref(false)

function update(e) {
  editing.value = false
  cells.value[props.c][props.r] = e.target.value.trim()
}

function callEvalCell(cellDetails) {
  store.dispatch('cell/evalCell', cellDetails);
}
</script>

<template>
  <div class="cell" :title="cells[c][r]" @click="editing = true">
    <!-- {{ 'Meu valor é o' + cells[c][r] }} -->
    <input
      v-if="editing"
      :value="cells[c][r]"
      @change="update"
      @blur="update"
      @vue:mounted="({ el }) => el.focus()"
    >
    <!-- <span v-else>{{ callEvalCell(cells[c][r]) }}</span> -->
    <span v-else>{{ cells[c][r] }}</span>
  </div>
</template>

<style>
.cell, .cell input {
  height: 1.5em;
  line-height: 1.5;
  font-size: 15px;
}

.cell span {
  padding: 0 6px;
}

.cell input {
  width: 100%;
  box-sizing: border-box;
}
</style>