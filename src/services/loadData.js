import { companyArray } from '@/helpers/companyArray';
import { stockService } from './stockService';

let allCompaniesDataArray = [];

class LoadData {
  constructor() {}

  checkLastData() {
    let currentTime = new Date().getTime();
    let timeFromStorage = this.getLastStockDataTimestampFromLocalStorage();
    let diffMiliseconds = currentTime - timeFromStorage;
    let diffMinutes = diffMiliseconds / (1000 * 60);
    let roundedMinutes = diffMinutes.toFixed();
    if (roundedMinutes > 15) {
      this.updateLocalStorage();
    }
  }

  saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  getLastStockDataTimestampFromLocalStorage() {
    let lastStockData = localStorage.getItem('lastStockData');
    if (lastStockData) {
      let lastStockDataTimestamp = JSON.parse(lastStockData);
      return lastStockDataTimestamp;
    } else {
      this.updateLocalStorage();
    }
  }

  updateLocalStorage() {
    this.saveToLocalStorage('lastStockData', new Date().getTime());
    this.addCompaniesDataInLocalStorage();
    this.checkLastData();
  }

  async addCompaniesDataInLocalStorage() {
    await this.removeCampaniesDataFromLocalStorage();
    await this.updateCompaniesData();
  }

  async removeCampaniesDataFromLocalStorage() {
    localStorage.removeItem('companiesData');
  }

  async updateCompaniesData() {
    for (let index = 0; index < companyArray.length; index++) {
      const element = companyArray[index];

      let singleCompanyData = {
        companySheetName: element.sheetName,
        companyData: await this.updateCompaniesDataFromAPI(element.sheetName),
      };

      allCompaniesDataArray.push(singleCompanyData);
    }

    this.saveToLocalStorage(
      'companiesData',
      JSON.stringify(allCompaniesDataArray),
    );
  }

  async updateCompaniesDataFromAPI(sheetName) {
    return await stockService.getAllCompanyData(sheetName);
  }
}

export const loadData = new LoadData();
