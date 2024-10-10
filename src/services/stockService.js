import axios from 'axios';
class StockService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://sheetdb.io/api/v1/ay174zkrilrhe'
    });
  }

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
}

export const stockService = new StockService();