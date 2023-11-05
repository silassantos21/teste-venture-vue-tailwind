import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ReservaVoo from '../../views/ReservaVoo.vue'

describe('ReservaVoo', () => {
  const wrapper = mount(ReservaVoo)

  it('Renderizando componente corretamente', () => {
    expect(wrapper.html()).toContain("Reservar Voo")
  })

  it('Está barrando a reserva, quando data de volta é menor que a data de ida', async () => {
    await wrapper.find('[data-type="selectTipoViagem"]').setValue('ida-volta')
    await wrapper.find('[data-type="dataIda"]').setValue('2023-11-10')
    await wrapper.find('[data-type="dataVolta"]').setValue('2023-11-03')
    expect(wrapper.vm.canBook).toBeFalsy()
  })

  it('Está concluindo uma reserva só de ida', async () => {
    await wrapper.find('[data-type="selectTipoViagem"]').setValue('ida')
    await wrapper.find('[data-type="dataIda"]').setValue('2023-11-10')

    let alertMessage;
    window.alert = message => {
      alertMessage = message;
    };

    await wrapper.find('[data-type="botaoReservar"]').trigger('click')

    expect(alertMessage).toBe('Reserva de voo com ida marcada para a data 2023-11-10 feita com sucesso.');
  })

  it('Está concluindo uma reserva de ida e volta', async () => {
    await wrapper.find('[data-type="selectTipoViagem"]').setValue('ida-volta')
    await wrapper.find('[data-type="dataIda"]').setValue('2023-11-10')
    await wrapper.find('[data-type="dataVolta"]').setValue('2023-11-13')    

    let alertMessage;
    window.alert = message => {
      alertMessage = message;
    };

    await wrapper.find('[data-type="botaoReservar"]').trigger('click')
    expect(alertMessage).toBe('Reserva de voo com ida marcada para a data 2023-11-10 e retorno na data 2023-11-13 feita com sucesso.');
  })

})