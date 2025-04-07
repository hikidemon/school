export interface Post {
  id: number | null
  title: string
  content: string
  date: string
  image: any[]
  type: 'news' | 'event'
  area:string
  eventdate?: string
  time: string
  isRegistered?: boolean
}
