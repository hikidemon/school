<template>
  <div
    class="image-upload"
    @dragover.prevent="isDragging = true"
    @dragleave="isDragging = false"
    @drop.prevent="handleDrop"
    :class="{ dragging: isDragging }"
    @click="openFileDialog"
  >
    <p v-if="!images.length">Перетащите изображения сюда или нажмите для загрузки</p>
    <div v-else class="image-preview-container">
      <div v-for="(image, index) in images" :key="index" class="image-preview-wrapper">
        <img :src="image" alt="Preview" class="image-preview" />
        <el-icon class="delete-icon" @click.stop="removeImage(index)">
          <delete />
        </el-icon>
      </div>
    </div>
    <input type="file" @change="handleFileChange" accept="image/*" multiple hidden ref="fileInput" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Delete } from '@element-plus/icons-vue'

const isDragging = ref(false)
const images = ref([])
const fileInput = ref(null)

const emit = defineEmits(['upload'])

const handleDrop = (e) => {
  isDragging.value = false

  const files = e.dataTransfer.files

  if (files) {
    processImages(files)
  }
}

const handleFileChange = (e) => {
  const files = e.target.files

  if (files) {
    processImages(files)
  }
}

const processImages = (files) => {
  for (const file of files) {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()

      reader.onload = (e) => {
        images.value.push(e.target.result)
        emit('upload', files)
      }

      reader.readAsDataURL(file)
    }
  }
}

const removeImage = (index) => {
  images.value.splice(index, 1)
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
  transition:
    background-color 0.3s,
    border-color 0.3s;
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

.image-preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-preview-wrapper {
  position: relative;
}

.image-preview {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  margin-top: 10px;
  object-fit: contain;
}

.delete-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  color: #ff4757;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  padding: 5px;
}
</style>