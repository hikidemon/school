import { ROUTE_NAMES } from '@/common/constants'
import { createRouter, createWebHistory } from 'vue-router'

import UiKit from '@/pages/UiKit/UiKit.vue'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage.vue'
import AllPage from '@/pages/AuthPage/AllPage.vue'
import MainPage from '@/pages/MainPage/MainPage.vue'
import CreatePost from '@/components/organisms/CreatePost.vue'
import ProfileContent from '@/components/organisms/ProfileContent.vue'
import NewsContent from '@/components/organisms/NewsContent.vue'
import Schedule from '@/components/organisms/ScheduleContent.vue'
import TeacherContent from '@/components/organisms/TeacherContent.vue'
import StudentContent from '@/components/organisms/StudentContent.vue'
import EventContent from '@/components/organisms/EventContent.vue'
import ProgramsContent from '@/components/organisms/ProgramsContent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/ui',
      name: ROUTE_NAMES.UiKit,
      component: UiKit
    },
    {
      path: '/auth',
      name: ROUTE_NAMES.AuthPage,
      component: AllPage
    },
    {
      path: '/main',
      name: ROUTE_NAMES.MainPage,
      component: MainPage,
      children: [
        {
          path: '',
          redirect: { name: ROUTE_NAMES.NewsContent }
        },
        {
          path: 'profile-content',
          name: ROUTE_NAMES.ProfileContent,
          component: ProfileContent
        },
        {
          path: 'posts',
          name: ROUTE_NAMES.NewsContent,
          component: NewsContent
        },
        {
          path: 'schedule',
          name: ROUTE_NAMES.Schedule,
          component: Schedule
        },
        {
          path: 'teacher',
          name: ROUTE_NAMES.TeacherContent,
          component: TeacherContent
        },
        {
          path: 'student',
          name: ROUTE_NAMES.StudentContent,
          component: StudentContent
        },
        {
          path: 'events',
          name: ROUTE_NAMES.EventContent,
          component: EventContent
        },
        {
          path: 'programs',
          name: ROUTE_NAMES.ProgramsContent,
          component: ProgramsContent
        }
      ]
    },

    {
      path: '/:pathMatch(.*)*',
      component: NotFoundPage
    }
  ]
})

export default router
