import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLargeSideBar = defineStore('largeSideBar', () => {
  const sidebarToggleProperties = ref({
    isSideNavOpen: true
  })
  const getSideBarToggleProperties = computed(() => { 
    sidebarToggleProperties.value.isSideNavOpen
  })
  function toggleSidebarProperties() {
    sidebarToggleProperties.value.isSideNavOpen = !sidebarToggleProperties.value.isSideNavOpen
  }

  return { sidebarToggleProperties, getSideBarToggleProperties, toggleSidebarProperties }
})
