import { describe, it, expect, beforeEach, vi } from 'vitest'

import { mount } from '@vue/test-utils'

import { createStore } from 'vuex'

import CrudAcoes from '../../views/CrudAcoes.vue'

describe('CrudAcoes', () => {
  let wrapper;
  let store;
  let commitMock;
  
  beforeEach(() => {
    // Configurar um módulo Vuex de exemplo para testes
    store = createStore({
      state: {
        crudActions: {
          peoples: [],
        },
      }
    })

    wrapper = mount(CrudAcoes, {
      global: {
        plugins: [store],
      }
    })

    commitMock = vi.fn();
    store.commit = commitMock;
  });

  it('Renderizando componente corretamente', () => {
    expect(wrapper.html()).toContain("Ações CRUD (Adicionar, Atualizar e Remover)")
  })

  it('Deve Adicionar uma pessoa', async () => {

    await wrapper.find('[data-type="name"]').setValue('João')
    await wrapper.find('[data-type="surName"]').setValue('Fernandes')
    await wrapper.find('[data-type="botaoAdicionar"]').trigger('click')

    expect(commitMock).toHaveBeenCalledWith('crudActions/addPeople', {
      id: expect.any(Number),
      name: 'João',
      surName: 'Fernandes',
      isModeEdit: false,
    });

    expect(wrapper.vm.name).toBe('');
    expect(wrapper.vm.surName).toBe('');
  })

  it('Deve alterar uma pessoa', async () => {

    const person = { id: 1, name: 'João', surName: 'Fernandes', isModeEdit: false };
    store.state.crudActions.peoples.push(person);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    await wrapper.find('[data-type="botaoAlterar"]').trigger('click')
    
    expect(commitMock).toHaveBeenCalledWith('crudActions/setModeEdit', {
      id: 1,
      boolean: true,
    });

    store.state.crudActions.peoples[0].isModeEdit = true

    await new Promise(resolve => setTimeout(resolve, 500));

    await wrapper.find('[data-type="nameToEdit"]').setValue('Estela')
    await wrapper.find('[data-type="surNameToEdit"]').setValue('Ferreira')

    await wrapper.find('[data-type="botaoSalvarAlteracao"]').trigger('click')

    expect(commitMock).toHaveBeenCalledWith('crudActions/editPeople', {
      id: 1,
      name: 'Estela',
      surName: 'Ferreira',
      isModeEdit: false,
    });

    expect(commitMock).toHaveBeenCalledWith('crudActions/setModeEdit', {
      id: 1,
      boolean: false,
    });
    
  });

  it('Deve remover uma pessoa', async () => {

    const person = { id: 1, name: 'Marcelo', surName: 'Marmelo', isModeEdit: false };
    store.state.crudActions.peoples.push(person);

    await new Promise(resolve => setTimeout(resolve, 500));

    await wrapper.find('[data-type="botaoRemover"]').trigger('click')

    expect(store.commit).toHaveBeenCalledWith('crudActions/removePeople', 1);
  });
})