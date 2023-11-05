<script setup>
import TitleScreen from '@/components/TitleScreen.vue'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const editCols = ref(7)
const editRows = ref(20)

const cells = computed(() => {
  return store.getters['cell/cells']
})

const colsState = computed(() =>
  store.state.cell.cols
)

const rowsState = computed(() =>
  store.state.cell.rows
)

const buttonCondition = computed(() => {
  return editCols.value <=0 || editRows.value <= 0 || !editCols.value || !editRows.value
})

const disableStyle = ref("border-gray-300 bg-gray-300 text-gray-500")

const cols = computed(() => {
  return cells.value.map((_, i) => String.fromCharCode(65 + i))
})

const alterarDimensaoTabela = () => {
  if (colsState.value !== editCols.value) {
    store.commit('cell/setCol', editCols.value)
  }
  if (rowsState.value !== editRows.value) {
    store.commit('cell/setRow', editRows.value)
  }
}

</script>

<template>
  <div class="container mx-auto">
    <TitleScreen parentTitle="Tabela Planilha Redimensionável" />
    <div class="grid md:grid-cols-1 sm:grid-cols-1 gap-4">
      <div>
        <div class="col-span-12">
          <BaseCard>
            <span class="text-2xl mr-2">Linhas</span>
            <input data-type="linhas" v-model="editRows" type="number" min="1" class="focus:outline-none border border-gray px-3 py-2 rounded" placeholder="Nome"/>
            <span class="text-2xl ml-4">Colunas</span>
            <input data-type="colunas" v-model="editCols" type="number" min="1" class="disabled:bg-gray-300 focus:outline-none border border-gray px-3 mx-3 py-2 rounded" placeholder="Sobrenome"/>
            <BaseBtn data-type="botaoRedimensionarTabela" class="mb-3 mr-3 border" :disabled="buttonCondition" :class="buttonCondition ? disableStyle : 'border-info text-info hover:bg-info hover:text-white'"  xl @click="alterarDimensaoTabela">
              Atualizar dimensão de tabela
            </BaseBtn>
          </BaseCard>
        </div>
        <BaseCard>
          <!-- {{ cells }} -->
          <div style="max-width: 83vw; overflow-x: auto;">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th v-for="(c, index) in cols" :key="index">{{ c }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(i, index) in cells[0].length" :key="index">
                  <th>{{ i - 1 }}</th>
                  <td v-for="(c, j, index) in cols" :key="index">
                    <BaseCell :r="i - 1" :c="j"></BaseCell>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
  body {
    margin: 0;
  }

  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
  }

  th {
    background-color: #eee;
  }

  tr:first-of-type th {
    width: 100px;
  }

  tr:first-of-type th:first-of-type {
    width: 25px;
  }

  td {
    border: 1px solid #ccc;
    height: 1.5em;
    overflow: hidden;
  }
</style>
