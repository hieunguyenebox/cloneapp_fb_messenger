import { makeAutoObservable } from "mobx";


interface AppStore {
  HeaderHeight: number
  BottomTabHeight: number
}

class AppStore {
  HeaderHeight: number = 0
  BottomTabHeight: number = 0
  constructor() {
    makeAutoObservable(this)
  }

  setHeaderHeight(height: number) {
    this.HeaderHeight = height
  }

  setBottomTabHeight(height: number) {
    this.BottomTabHeight = height
  }
}

const appStore = new AppStore
export default appStore