<template>
  <div class="event-list">
    <event-card v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script setup lang="ts">
import EventCard from '@/components/molecules/EventCard.vue'

defineProps<{ events: Array<{ id: number, title: string, image: string, date: string }> }>()
</script>

<style scoped>
.event-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
</style>
