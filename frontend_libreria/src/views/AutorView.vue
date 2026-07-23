<script setup lang="ts">
import AutoreList from '@/components/autore/AutoreList.vue'
import AutoreSave from '@/components/autore/AutoreSave.vue'
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const autoreListRef = ref<typeof AutoreList | null>(null)
const autoreEdit = ref<any>(null)

function handleCreate() {
  autoreEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(autore: any) {
  autoreEdit.value = autore
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  autoreListRef.value?.obtenerLista()
}
</script>

<template>
  <div>
    <h2>Autores</h2>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <AutoreList ref="autoreListRef" @edit="handleEdit" />
    <AutoreSave
      :mostrar="mostrarDialog"
      :autore="autoreEdit"
      :modoEdicion="!!autoreEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
