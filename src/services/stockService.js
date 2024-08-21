import axios from 'axios';
class StockService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://sheetdb.io/api/v1/ay174zkrilrhe'
    });
  }

  async fetchData(sheetName) {
    try {
      const response = await this.apiClient.get(`?sheet=${sheetName}&offset=1&single_object=true`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  async getRevenue(sheetName){
    const data = this.fetchData(sheetName);    
    return data;
  }
}

export const stockService = new StockService();