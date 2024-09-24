class LoadData {
  constructor() {}

  checkLastData() {
    let currentTime = new Date().getTime();
    let timeFromStorage = this.getLocalStorage();
    let diffMiliseconds = currentTime - timeFromStorage;
    let diffMinutes = diffMiliseconds / (1000 * 60);
    let roundedMinutes = diffMinutes.toFixed();
    if (roundedMinutes > 15) {
      console.log('update data from api');
      this.setLocalStorage();
    }
  }

  getLocalStorage() {
    let lastStockData = localStorage.getItem('lastStockData');
    if (lastStockData) {
      let element = JSON.parse(lastStockData);
      return element;
    } else {
      console.log('1st time load data from api');      
      this.setLocalStorage();
    }
  }

  setLocalStorage() {
    localStorage.setItem('lastStockData', new Date().getTime());
    this.checkLastData();
  }
}

export const loadData = new LoadData();
