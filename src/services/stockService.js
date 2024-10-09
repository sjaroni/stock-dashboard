import axios from 'axios';
class StockService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://sheetdb.io/api/v1/ay174zkrilrhe'
    });
  }

  // async fetchData(sheetName, row) {
  //   try {
  //     const response = await this.apiClient.get(`?sheet=${sheetName}&offset=${row}&single_object=true`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     return [];
  //   }
  // }

  async fetchCompanyData(sheetName) {
    try {
      const response = await this.apiClient.get(`?sheet=${sheetName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  async getAllCompanyData(sheetName){
    const data = this.fetchCompanyData(sheetName);
    return data;
  }

  // async getRevenueQuarterName(sheetName, row){
  //   const data = this.fetchData(sheetName, row);    
  //   return data;
  // }

  // async getRevenue(sheetName, row){
  //   const data = this.fetchData(sheetName, row);    
  //   return data;
  // }
}

export const stockService = new StockService();