<template>
  <el-dialog
    :title="isEditMode ? 'Редактировать пост' : 'Создать пост'"
    :model-value="visible"
    width="600px"
    @update:model-value="handleClose"
  >
    <el-form @submit.prevent="handleSubmit" class="post-form">
      <el-form-item label="Заголовок поста" prop="title" class="elform">
        <a-input v-model="form.title" placeholder="Введите заголовок" class="input-field" />
      </el-form-item>

      <el-form-item label="Описание поста" prop="content" class="elform">
        <a-input type="textarea" v-model="form.content" placeholder="Введите описание" class="input-field" />
      </el-form-item>

      <el-form-item label="Дата проведения" prop="date" v-if="form.type === 'event'">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Выберите дату"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <el-form-item label="Время проведения" prop="time" v-if="form.type === 'event'">
        <el-time-picker
          v-model="form.time"
          placeholder="Выберите время"
          format="HH:mm"
          value-format="HH:mm"
        />
      </el-form-item>

      <el-form-item label="Место проведения" prop="area" v-if="form.type === 'event'">
        <a-input v-model="form.area" placeholder="Введите место проведения" class="input-field" />
      </el-form-item>

      <el-form-item label="Изображения" prop="images">
        <image-upload @upload="handleImageUpload" :images="form.image" />
      </el-form-item>

      <a-button class="submit-button" type="success" @click="handleSubmit">
        {{ isEditMode ? 'Сохранить изменения' : 'Создать пост' }}
      </a-button>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElNotification } from 'element-plus'
import ImageUpload from '@/components/molecules/ImageUpload.vue'
import { Post } from '@/common/types/Post'
import { postService } from '@/common/utils/PostService'

const props = defineProps<{
  visible: boolean
  postToEdit?: Post | null
}>()

const emit = defineEmits(['success', 'close'])

const form = ref<Post>({
  id: null,
  title: '',
  content: '',
  type: 'event',
  image: [],
  area: '',
  date: '',
  time: '',
  eventdate: ''
})

const isEditMode = ref(false)

const handleImageUpload = (files: File[] | File) => {
  const filesArray = Array.isArray(files) ? files : [files];
  form.value.image = filesArray.map(file => {
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return file;
  });
}

const handleSubmit = async () => {
  if (!form.value.title || !form.value.content) {
    ElNotification({ title: 'Ошибка', message: 'Заполните все поля', type: 'error' })
    return
  }

  const postData: Post = {
    ...form.value,
    eventdate: `${form.value.date} ${form.value.time}`,
  }

  try {
    if (isEditMode.value && form.value.id !== null) {
      await postService.updatePost(form.value.id, postData)
    } else {
      await postService.createPost(postData)
    }

    ElNotification({ title: 'Успех', message: 'Пост успешно сохранен', type: 'success' })
    emit('success', postData)
    resetForm()
  } catch (error) {
    ElNotification({ title: 'Ошибка', message: 'Не удалось сохранить пост', type: 'error' })
  }
}

const resetForm = () => {
  form.value = {
    id: null,
    title: '',
    content: '',
    type: 'event',
    image: [],
    area: '',
    date: '',
    time: '',
    eventdate: ''
  }
  isEditMode.value = false
  emit('close')
}

const handleClose = () => {
  resetForm()
  emit('close')
}

watch(
  () => props.postToEdit,
  (post) => {
    if (post) {
      form.value = { ...post }
      isEditMode.value = true
    } else {
      resetForm() // Сбрасываем форму, если postToEdit равен null
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.post-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--color-white)-dark;
  border-radius: 8px;
}

.elform {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  border: 1px solid $color-primary;
  border-radius: 4px;
  font-size: 1rem;
  padding: 0px;
  margin-top: 8px;
  outline: none;
  resize: vertical;
}

.submit-button {
  background-color: $color-primary;
  color: var(--color-white);
  padding: 10px 20px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  margin-top: 20px;
}

.submit-button:hover,
.submit-button:active {
  box-shadow: $box-shadow;
  background: linear-gradient(90deg, $color-primary-gradient);
  animation: gradient-shift 4s linear infinite;
}
</style>