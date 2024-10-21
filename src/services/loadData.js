import { companyArray } from '@/helpers/companyArray';
import { stockService } from './stockService';

class LoadData {
  constructor() {}

  allCompaniesDataArray = [];
  allCompaniesDataJSON = [];

  checkLastData() {
    let currentTime = new Date().getTime();
    let timeFromStorage = this.getLastStockDataTimestampFromLocalStorage();
    let diffMiliseconds = currentTime - timeFromStorage;
    let diffMinutes = diffMiliseconds / (1000 * 60);
    let roundedMinutes = diffMinutes.toFixed();
    if (roundedMinutes > 20) {
      this.updateLocalStorage();
    }
    this.getCompanyDataFromLocalStorage();
  }

  saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  async getLastStockDataTimestampFromLocalStorage() {
    let lastStockData = localStorage.getItem('lastStockData');
    if (lastStockData) {
      let lastStockDataTimestamp = await JSON.parse(lastStockData);
      return lastStockDataTimestamp;
    } else {
      this.updateLocalStorage();
    }
  }

  async getCompanyDataFromLocalStorage() {
    let companiesData = localStorage.getItem('companiesData') || '';
    if (companiesData) {
      this.allCompaniesDataJSON = await JSON.parse(companiesData);
    }
  }

  async getArrayByName(name) {
    return this.allCompaniesDataJSON      
      .filter(item => Object.prototype.hasOwnProperty.call(item, name))
        .map(item => item[name]);
  }

  async getFullCompanyData(companyName, sheetRow) {
    const result = await this.getArrayByName(companyName);
    const sheetRowValues = result[0][sheetRow];
    return sheetRowValues;
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
        [element.sheetName]: await this.updateCompaniesDataFromAPI(
          element.sheetName,
        ),
      };

      this.allCompaniesDataArray.push(singleCompanyData);
    }

    this.saveToLocalStorage(
      'companiesData',
      JSON.stringify(this.allCompaniesDataArray),
    );
  }

  async updateCompaniesDataFromAPI(sheetName) {
    return await stockService.getAllCompanyData(sheetName);
  }
}

export const loadData = new LoadData();
