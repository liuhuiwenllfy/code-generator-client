import {defineStore} from 'pinia'

// @ts-ignore
export const useCommonStore = defineStore('common', {
    state: () => {
        return {
            name: 'CodeEase',
            dark: true,
            fullScreen: false,
            globalSize: 'default',
            fullscreenLoading: false,
            loading: false,
        }
    },
    persist: {
        paths: ['dark', 'globalSize', 'fullScreen']
    },
    getters: {
        getName(state) {
            return state.name
        },
        getDark(state) {
            return state.dark
        },
        getFullScreen(state) {
            return state.fullScreen
        },
        getGlobalSize(state) {
            return state.globalSize
        },
        getFullscreenLoading(state) {
            return state.fullscreenLoading
        },
        getLoading(state) {
            return state.loading
        },
    },
    actions: {
        changeName(param: string) {
            this.name = param
        },
        changeDark(param: boolean) {
            this.dark = param
        },
        changeFullScreen(param: boolean) {
            this.fullScreen = param
        },
        changeGlobalSize(param: string) {
            this.globalSize = param
        },
        changeFullscreenLoading(param: boolean) {
            this.fullscreenLoading = param
        },
        changeLoading(param: boolean) {
            this.loading = param
        },
    }
})
