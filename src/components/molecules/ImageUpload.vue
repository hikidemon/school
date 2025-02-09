<template>
  <div class="image-upload" @dragover.prevent="isDragging = true" @dragleave="isDragging = false"
    @drop.prevent="handleDrop" :class="{ 'dragging': isDragging }" @click="openFileDialog">
    <p v-if="!image">Перетащите изображение сюда или нажмите для загрузки</p>
    <img v-else :src="imagePreview" alt="Preview" class="image-preview" />
    <input type="file" @change="handleFileChange" accept="image/*" hidden ref="fileInput" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isDragging = ref(false)
const image = ref(null)
const imagePreview = ref(null)
const fileInput = ref(null)

const emit = defineEmits(['upload'])

const handleDrop = (e) => {
  isDragging.value = false

  const file = e.dataTransfer.files[0]

  if (file && file.type.startsWith('image/')) {
    processImage(file)
  }
}

const handleFileChange = (e) => {
  const file = e.target.files[0]

  if (file && file.type.startsWith('image/')) {
    processImage(file)
  }
}

const processImage = (file) => {
  const reader = new FileReader()

  reader.onload = (e) => {

    imagePreview.value = e.target.result

    image.value = file

    emit('upload', file)
  }

  reader.readAsDataURL(file)
}

const openFileDialog = () => {
  fileInput.value.click()
}
</script>

<style scoped lang="scss">
.image-upload {
  border: 2px dashed $color-primary;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  background-color: var(--color-white)-dark;
  transition: background-color 0.3s, border-color 0.3s;
  margin-bottom: 16px;
}

.image-upload.dragging {
  background-color: $color-primary-light;
  border-color: $color-primary;
}

.image-upload p {
  margin: 0;
  color: $color-primary;
  font-size: 14px;
}

.image-preview {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  margin-top: 10px;
  object-fit: contain;
}
</style>