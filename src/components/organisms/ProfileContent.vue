<template>
  <div class="main-layout">
    <div class="left-side">
      <ProfileCard />
    </div>
    <div class="right-side">
      <TogglePanel class="toggle-container" v-model="showSchedule" @toggle-view="toggleView" />
      <div class="content">
        <ScheduleCard v-if="showSchedule" />
        <EventCard v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProfileCard from '../molecules/ProfileCard.vue'
import ScheduleCard from '../molecules/ScheduleCard.vue'
import EventCard from '../molecules/EventCard.vue'
import TogglePanel from '../molecules/TogglePanel.vue'

const showSchedule = ref(true)


const toggleView = (value: boolean) => {
  showSchedule.value = value
}
</script>

<style scoped lang="scss">
.main-layout {
  display: flex;
  padding: 20px;
  gap: 20px;
}

.left-side {
  width: 300px;

}

.right-side {
  flex: 2;
  margin-left: 325px;
  display: flex;
  flex-direction: column;
}

.toggle-container {
  display: flex;
  margin-bottom: 0px;
  width: 140%;
  margin-left: -20%;
}

.toggle-button {
  padding: 0px;
  color: var(--color-white);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}



.toggle-container .toggle-button:first-child {
  margin-right: 10px;
}

.content {

  width: 500px;
  padding: 20px;
  border-radius: 8px;

}
</style>
