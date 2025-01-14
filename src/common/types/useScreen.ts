export type ScreenType = {
  size: SizesType
  width: number
  height: number
  isAlbumOrient: boolean
  isMobile: boolean
  isTablet: boolean
  isMobileOrTablet: boolean
  isLaptop: boolean
  isDesktop: boolean
  isFullHd: boolean
}

export type SizesType = 'xl' | 'lg' | 'md' | 'sm' | 'xs'
