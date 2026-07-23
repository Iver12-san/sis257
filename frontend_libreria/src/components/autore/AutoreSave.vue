<script setup lang="ts">
import type { Autore } from '@/models/autore'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'autores'
const props = defineProps({
  mostrar: Boolean,
  autore: {
    type: Object as () => Autore,
    default: () => ({}) as Autore,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const autore = ref<Autore>({ ...props.autore })
watch(
  () => props.autore,
  (newVal) => {
    autore.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: autore.value.nombre,
      apellido: autore.value.apellido,
      nacionalidad: autore.value.nacionalidad,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${autore.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    autore.value = {} as Autore
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText
          id="nombre"
          v-model="autore.nombre"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="apellido" class="font-semibold w-3">Apellido</label>
        <InputText id="apellido" v-model="autore.apellido" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="nacionalidad" class="font-semibold w-3">Nacionalidad</label>
        <InputText
          id="nacionalidad"
          v-model="autore.nacionalidad"
          class="flex-auto"
          autocomplete="off"
        />
      </div>

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
