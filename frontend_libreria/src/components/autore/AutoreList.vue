<script setup lang="ts">
import type { Autore } from '@/models/autore'
import http from '@/plugins/axios'
import { Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'autores'
const autores = ref<Autore[]>([])
const emit = defineEmits(['edit'])
const autoreDelete = ref<Autore | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

async function obtenerLista() {
  autores.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(autore: Autore) {
  emit('edit', autore)
}

function mostrarEliminarConfirm(autore: Autore) {
  autoreDelete.value = autore
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${autoreDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}
const autoresFiltrados = computed(() => {
  return autores.value.filter(
    (autore) =>
      autore.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      autore.apellido.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      autore.nacionalidad.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <div class="col-7 pl-0 mt-3">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
        <InputText
          v-model="busqueda"
          type="text"
          placeholder="Buscar por nombre, apellido o nacionalidad"
        />
      </InputGroup>
    </div>
    <table>
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Nacionalidad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(autore, index) in autoresFiltrados" :key="autore.id">
          <td>{{ index + 1 }}</td>
          <td>{{ autore.nombre }}</td>
          <td>{{ autore.apellido }}</td>
          <td>{{ autore.nacionalidad }}</td>
          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(autore)" />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(autore)"
            />
          </td>
        </tr>
        <tr v-if="autoresFiltrados.length === 0">
          <td colspan="4">No se encontraron resultados.</td>
        </tr>
      </tbody>
    </table>
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
