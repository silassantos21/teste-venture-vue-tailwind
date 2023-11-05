<script setup>
import TitleScreen from '@/components/TitleScreen.vue'
import { computed, ref } from 'vue'

import { useStore } from 'vuex'

const store = useStore()

const countId = ref(0)

const name = ref('')
const surName = ref('')

const nameToEdit = ref('')
const surNameToEdit = ref('')

const disableStyle = ref("border-gray-300 bg-gray-300 text-gray-500")

const adicionar = () => {
  countId.value++
  store.commit('crudActions/addPeople', { id: countId.value, name: name.value, surName: surName.value, isModeEdit: false });
  name.value = ''
  surName.value = ''
}

const alterar = (id) => {
  store.commit('crudActions/editPeople', { id, name: nameToEdit.value, surName: surNameToEdit.value, isModeEdit: false });
  store.commit('crudActions/setModeEdit', { id, boolean: false });
}

const remover = (id) => {
  store.commit('crudActions/removePeople', id);
}

const modeEditFunction = (id, boolean) => {
  const peopleToEdit = peoples.value.filter(p => p.id === id)[0] 
  nameToEdit.value = peopleToEdit.name
  surNameToEdit.value = peopleToEdit.surName
  store.commit('crudActions/setModeEdit', { id, boolean });
}

const buttonCondition = computed(() =>
  peoples.value.length === 17 || !name.value
)

const peoples = computed(() =>
  store.state.crudActions.peoples
)

</script>

<template>
  <div class="container mx-auto">
    <TitleScreen parentTitle="Ações CRUD (Adicionar, Atualizar e Remover)" />
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-12">
        <BaseCard>
          <input data-type="name" v-model="name" type="text" class="focus:outline-none border border-gray px-3 py-2 rounded" placeholder="Nome"/>
          <input data-type="surName" v-model="surName" :disabled="!name" type="text" class="disabled:bg-gray-300 focus:outline-none border border-gray px-3 mx-3 py-2 rounded" placeholder="Sobrenome"/>
          <BaseBtn data-type="botaoAdicionar" class="mb-3 mr-3 border" :disabled="buttonCondition" :class="buttonCondition ? disableStyle : 'border-info text-info hover:bg-info hover:text-white'"  xl @click="adicionar">
            Adicionar
          </BaseBtn>
        </BaseCard>
      </div>
      <div class="grid md:grid-cols-20 sm:grid-cols-5 gap-4 col-span-12 text-center">
        <BaseCard v-for="(p, index) in peoples" :key="index" class="text-center">
          <img class="w-20 h-20 m-auto shadow-lg avatar-md rounded-full" :src="`/images/faces/generic-user.png`" alt=""/>
          <p v-if="!p.isModeEdit" class="text-base my-4">{{ p.name }}{{ (p.surName ? ', ' : '') }} {{ p.surName }}</p>
          <p v-if="!p.isModeEdit" class="text-base my-4">Identificador: {{ p.id }}</p>
          <div v-if="p.isModeEdit" class="my-5">
            <input data-type="nameToEdit" v-model="nameToEdit" type="text" class="mb-2 focus:outline-none border border-gray-300 py-2 rounded" placeholder="Nome"/>
            <input data-type="surNameToEdit" v-model="surNameToEdit" :disabled="!nameToEdit" type="text" class="focus:outline-none border border-gray-300 py-2 rounded" placeholder="Sobrenome"/>
          </div>
          <div v-if="p.isModeEdit" class="grid grid-cols-2 gap-4 text-center">
            <BaseBtn sm class="bg-danger text-white rounded-full" @click="modeEditFunction(p.id, false)">
              Cancelar
            </BaseBtn>
            <BaseBtn data-type="botaoSalvarAlteracao" sm :disabled="!nameToEdit" class="bg-info text-white rounded-full" @click="alterar(p.id)">
              Salvar
            </BaseBtn>
          </div>
          <div v-if="!p.isModeEdit" class="grid grid-cols-2 gap-4 text-center">
            <BaseBtn data-type="botaoRemover" sm class="bg-danger text-white rounded-full" @click="remover(p.id)">
              Remover
            </BaseBtn>
            <BaseBtn data-type="botaoAlterar" sm class="bg-info text-white rounded-full" @click="modeEditFunction(p.id, true)">
              Alterar
            </BaseBtn>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
