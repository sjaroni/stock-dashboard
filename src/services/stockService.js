import axios from 'axios';

// const order = [
//   {
//     "": "95,678",
//     "Mar 21": "72,683",
//     "Jun 21": "63,948",
//     "Sep 21": "65,083",
//     "Dec 21": "104,429",
//     "Mar 22": "77,457",
//     "Jun 22": "63,355",
//     "Sep 22": "70,958",
//     "Dec 22": "96,388",
//     "Mar 23": "73,929",
//     "3 Aug 23": "60,584",
//     "2 Nov 23": "67,184",
//     "1 Feb 24": "96,458",
//     "2 Mai 24": "66,886",
//     "1 Aug 24": "61,564"
//   }
// ]

class StockService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://sheetdb.io/api/v1/ay174zkrilrhe'
    });
  }

  async fetchData(sheetName) {
    try {
      const response = await this.apiClient.get(`?sheet=${sheetName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  async getRevenue(sheetName){
    const data = this.fetchData(sheetName);    
    return data;
    // return onRenderTracked.map(key => data[3][key]);
  }
  
  async getRevenue2(sheetName) {
    // Holen der Daten aus der API
    const data = await this.fetchData(sheetName);
  
    // Liste der Spaltenüberschriften (die Schlüssel des Objekts)
    const keys = Object.keys(data[3]);
  
    // Extrahieren der Werte aus dem vierten Objekt im Array
    const revenueData = keys.map(key => data[3][key]);
  
    return revenueData;
  }

}

export const stockService = new StockService();