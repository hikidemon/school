import { reactive } from 'vue'
import type { SizesType, ScreenType } from '@/common/types'

const BREAKPOINTS = {
  sm: 720, // мобилка
  md: 1024, // планшет
  lg: 1360, // десктоп
  xl: 1440, // fullHD
}

function sizes(screen: number): SizesType {
  if (screen >= BREAKPOINTS.xl) return 'xl'
  else if (screen >= BREAKPOINTS.lg) return 'lg'
  else if (screen >= BREAKPOINTS.md) return 'md'
  else if (screen >= BREAKPOINTS.sm) return 'sm'
  else return 'xs'
}

const screen = reactive<ScreenType>({
  size: sizes(window.innerWidth),
  width: window.innerWidth,
  height: window.innerHeight,
  isAlbumOrient: window.innerWidth > window.innerHeight,
  isMobile: sizes(window.innerWidth) === 'xs',
  isTablet: sizes(window.innerWidth) === 'sm',
  isLaptop: sizes(window.innerWidth) === 'md',
  isDesktop: sizes(window.innerWidth) === 'lg',
  isFullHd: sizes(window.innerWidth) === 'xl',
  isMobileOrTablet: ['xs', 'sm'].includes(sizes(window.innerWidth)),
})

window.addEventListener('resize', () => {
  screen.width = window.innerWidth

  screen.height = window.innerHeight

  screen.size = sizes(window.innerWidth)

  screen.isAlbumOrient = window.innerWidth > window.innerHeight

  screen.isMobile = sizes(window.innerWidth) === 'xs'

  screen.isTablet = sizes(window.innerWidth) === 'sm'

  screen.isLaptop = sizes(window.innerWidth) === 'md'

  screen.isDesktop = sizes(window.innerWidth) === 'lg'

  screen.isFullHd = sizes(window.innerWidth) === 'xl'

  screen.isMobileOrTablet = ['xs', 'sm'].includes(sizes(window.innerWidth))
})

export default screen
