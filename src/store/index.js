import { createStore } from 'vuex'

import largeSidebar from './modules/largeSidebar'
import crudActions from './modules/crudActions'
import cell from './modules/cell'


export default  createStore({
  modules: {
    largeSidebar,
    crudActions,
    cell      
  }
});