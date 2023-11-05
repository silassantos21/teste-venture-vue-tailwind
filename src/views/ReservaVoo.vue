<script setup>
import TitleScreen from '@/components/TitleScreen.vue'
import { ref, computed } from 'vue'

const vooOpcao = ref('ida')

const dataIda = ref('')
const dataVolta = ref('')

const isReturn = computed(() => vooOpcao.value === 'ida-volta')

const canBook = computed(() => !isReturn.value || stringToDate(dataVolta.value) > stringToDate(dataIda.value))

const reservar = () => {
  alert(
    isReturn.value
      ? `Reserve de voo com ida marcada para a data ${dataIda.value} e retorno na data ${dataVolta.value} feita com sucesso.`
      : `Reserve de voo com ida marcada para a data ${dataIda.value} feita com sucesso.`
  )
}

const stringToDate = (str) => {
  const [y, m, d] = str.split('-')
  return new Date(+y, m - 1, +d)
}

</script>

<template>
    <div class="container mx-auto">
      <TitleScreen parentTitle="Reservar Voo" />
      <div class="grid md:grid-cols-1 sm:grid-cols-1 gap-4" style="place-items: center;">
        <div class="w-3/4">
          <BaseCard>
            <div class="text-center">
              <p class="text-2xl">Aeroporto Venture</p>
            </div>
            <img class="rounded my-5 max-h-[20rem] relative z-1 m-auto" src="/images/imagem-aviao.jpg" alt="">
            <div class="grid grid-cols-1 items-center" style="text-align: center; place-items: center;">
              <div class="w-1/4">
                <select required v-model="vooOpcao" class="mb-6 text-black-70 bg-white px-3 py-2 transition-all cursor-pointer hover:border-blue-600/60 border rounded-lg outline-blue-600/80 appearance-none invalid:text-black-30 w-64">
                  <option value="" disabled selected>Selecione o tipo de voo</option>
                  <option value="ida">Voo somente ida</option>
                  <option value="ida-volta">Voo ida e volta</option>
                </select>
              </div>
              <div class="w-1/4">
                <input v-model="dataIda" datepicker-autohide type="text" onfocus="(this.type='date')" onblur="(this.type='text')" class="mb-6 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Selecione Ida">
              </div>
              <div class="w-1/4">
                <input :disabled="!isReturn" v-model="dataVolta" datepicker-autohide type="text" onfocus="(this.type='date')" onblur="(this.type='text')" :class="border-gray-300" class="mb-6 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg disabled:text-gray-400 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"  placeholder="Selecione Volta">
              </div>
              <div class="w-1/4" v-show="dataIda">
                <BaseBtn class="mb-3 mr-3 " :disabled="!canBook" :class="!canBook ? 'border-gray-300 bg-gray-300 text-gray-500' : 'border border-info text-info hover:bg-info hover:text-white '" xl @click="reservar">
                  Reservar
                </BaseBtn>
              </div>
              <div class="w-1/4 text-red-500" v-show="dataIda">
                <p>{{ canBook ? '' : 'A data de retorno deve ser após a data de ida.' }}</p>
              </div>
            </div>
            <!-- <input v-model="f" type="number" inputmode="decimal" pattern="[0-9]*[.,]?[0-9]*" class="focus:outline-none w-full border border-gray px-3 py-2 rounded" placeholder="Temperatura °F" @change="setF" /> -->
          </BaseCard>
        </div>
      </div>
    </div>
</template>