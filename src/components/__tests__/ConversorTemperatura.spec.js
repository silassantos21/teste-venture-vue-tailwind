import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ConversorTemperatura from '../../views/ConversorTemperatura.vue'

describe('ConversorTemperatura', () => {
  const wrapper = mount(ConversorTemperatura)

  it('Renderizando componente corretamente', () => {
    expect(wrapper.html()).toContain("Conversor de Temperatura")
  })

  it('Está convertendo de Celsius para Fahrenheit', async () => {
    await wrapper.find('[data-type="celsius"]').setValue(20)
    expect(wrapper.vm.f).toBe(68);
  })

  it('Está convertendo de Fahrenheit para Celsius', async () => {
    await wrapper.find('[data-type="fahrenheit"]').setValue(68)
    expect(wrapper.vm.c).toBe(20);
  })
})