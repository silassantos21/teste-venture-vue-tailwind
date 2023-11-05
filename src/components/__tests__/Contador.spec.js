import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Contador from '../../views/Contador.vue'

describe('Contador', () => {
  const wrapper = mount(Contador)

  it('Renderizando componente corretamente', () => {
    expect(wrapper.html()).toContain("Contador")
  })

  it('Está incrementando corretamente', async () => {
    await wrapper.find('[data-type="incrementar"]').trigger('click')
    expect(wrapper.vm.count).toBe(1);
  })

  it('Está decrementando corretamente', async () => {
    await wrapper.find('[data-type="decrementar"]').trigger('click')
    expect(wrapper.vm.count).toBe(0);
  })
})