import { reactive } from 'vue'

const cell = {
  namespaced: true,
  state: {
    cols: 7,
    rows: 20
  },
  getters: {
    cells (state) {
      return reactive(
        Array.from(Array(state.cols).keys()).map((i) =>
          Array.from(Array(state.rows).keys()).map((i) => '')
        ))
    }
  },
  mutations: {
    setCol: (state, col) => {
      state.cols = col
    },
    setRow: (state, row) => {
      state.rows = row
    }
  },
  actions: {
    evalCell(store, exp) {
      if (!exp.startsWith('=')) {
        return exp
      }
      exp = exp
        .slice(1)
        .replace(
          /\b([A-Z])(\d{1,2})\b/g,
          (_, c, r) => `get(${c.charCodeAt(0) - 65},${r})`
        )
    
      try {
        return new Function('get', `return ${exp}`)(store.dispatch(getCellValue))
      } catch (e) {
        return `#ERROR ${e}`
      }
    },
    getCellValue(store, c, r) {
      const val = store.dispatch(evalCell, store.state.cells[c][r])
      const num = Number(val)
      return Number.isFinite(num) ? num : val
    }
  }
}

export default cell;
