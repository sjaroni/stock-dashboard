import { companyArray } from '@/helpers/companyArray';
import { stockService } from './stockService';

let allCompaniesDataArray = [];

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

    this.updateCompanies();
    // this.showData();
  }

  // showData() {
  //   for (let index = 0; index < companyArray.length; index++) {
  //     const element = companyArray[index];
  //     console.log(element);
  //   }
  // }

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
    this.updateCompaniesArrayInLocalStorage();
    this.checkLastData();
  }

  async updateCompaniesArrayInLocalStorage() {
    await this.removeOldCampaniesDataFromLocalStorage();
    await this.updateCompanies();
    // await this.updateCompaniesRevenue();
    // await this.updateCompaniesNetIncome();
    // await this.updateCompaniesGrossMargin();
  }

  async removeOldCampaniesDataFromLocalStorage() {
    localStorage.removeItem('companiesData');
  }

  async updateCompanies() {
    
    for (let index = 0; index < companyArray.length; index++) {
      const element = companyArray[index];
      // console.log(element.sheetName);


      let singleCompanyData = {
        companySheetName: element.sheetName,
        companyRevenue: {
          a: element.revenueRow,
          b: 1,
        },
        companyNetIncome: {
          c: element.netIncomeRow,
          d: 1,
        },
        companyGrossMargin: {
          e: element.grossMarginRow,
          f: 1,
        },
      }

      allCompaniesDataArray.push(singleCompanyData);
    }
        
    localStorage.setItem('companiesData', JSON.stringify(allCompaniesDataArray));
    console.log(allCompaniesDataArray);
  }

  async updateCompaniesRevenue() {
    await stockService.getRevenueQuarterName(`${this.company.sheetName}`, this.company['revenueQuarter']);
    console.log('2updateCompaniesRevenue');
  }

  async updateCompaniesNetIncome() {
    console.log('3updateCompaniesNetIncome');
  }

  async updateCompaniesGrossMargin() {
    console.log('4updateCompaniesGrossMargin');
  }
}

export const loadData = new LoadData();
