<template>
  <div class="transition-container">
    <div :class="{ 'fade-in': showSchedule, 'fade-out': !showSchedule }">
      <schedule-card v-if="showSchedule" />
    </div>
    <div :class="{ 'fade-in': !showSchedule, 'fade-out': showSchedule }">
      <event-card v-if="!showSchedule" />
    </div>
    <div class="toggle-button-container">
      <button @click="toggleScheduleView">Переключить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScheduleCard from '../molecules/ScheduleCard.vue'
import EventCard from '../molecules/EventCard.vue'

const showSchedule = ref(true)

const toggleScheduleView = () => {
  showSchedule.value = !showSchedule.value
}
</script>

<style scoped lang="scss">
.transition-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.fade-in {
  animation: fadeIn 0.5s forwards;
}

.fade-out {
  animation: fadeOut 0.5s forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(20px);
  }
}

.toggle-button-container {
  margin-top: 20px;
  text-align: center;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: var(--color-white);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

.schedule-card,
.event-card {
  max-width: 600px;
  width: 100%;
  margin: 10px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 20px;
}

.schedule-card h2,
.event-card h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--color-black)-light;
}
</style>
