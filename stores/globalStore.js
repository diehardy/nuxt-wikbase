import {defineStore} from 'pinia'

export const useGlobalStore = defineStore('globalStore', {
  state: () => ({
    mobileSwapper: false,
    darkMode: false,
    articleContents: [],
    breadcrumbName: '',
  }),
  // getters: {
  //   getValue() {
  //     return this.mobileSwapper
  //   }
  // },
  // actions: {
  //   changeValue(val) {
  //     this.mobileSwapper = val
  //   },
  // }

})
