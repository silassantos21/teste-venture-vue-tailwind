// Create a new store instance.
const crudActions = {

  namespaced: true,
  state: {
    peoples: []
  },
  getters: {
    getPeoples: state => state.peoples
  },
  mutations: {
    addPeople: (state, people) => {
      state.peoples.push(people)
    },
    editPeople: (state, people) => {
      state.peoples.forEach((p, index) => {
        if (p.id === people.id) {
          state.peoples[index] = people
        }
      })
    },
    setModeEdit: (state, people) => {
      state.peoples.filter(p => p.id === people.id)[0].isModeEdit = people.boolean
    },
    removePeople: (state, id) => {
      state.peoples = state.peoples.filter(p => p.id !== id)
    }
  },
}

// const app = createApp({ /* your root component */ })


export default crudActions;
