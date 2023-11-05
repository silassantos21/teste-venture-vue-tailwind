import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Cronometro from '../../views/Cronometro.vue'

describe('Cronometro', () => {
  const wrapper = mount(Cronometro)

  it('Renderizando componente corretamente', () => {
    expect(wrapper.html()).toContain("Cronômetro")
  })

  it('Está completando a barra, depois de 10 segundos', async () => {
    await wrapper.find('[data-type="rangeDuracaoCronometro"]').setValue(3000)

    // Se colocar um valor muito alto, dá timeout no teste
    await new Promise(resolve => setTimeout(resolve, 3000));

    expect(wrapper.vm.progressRateWidth).toBe(100);
  })

  it('Está recomeçando o cronômetro', async () => {
    await wrapper.find('[data-type="recomecarCronometro"]').trigger('click')
    expect(wrapper.vm.elapsed).toBeLessThan(1)
  })

})