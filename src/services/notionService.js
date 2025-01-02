const API_KEY = process.env.REACT_APP_NOTION_API_KEY;

class NotionService {
  constructor() {
    const devProxy = 'https://cors-anywhere.herokuapp.com/';
    
    // Используем оригинальный ID без изменений
    // this.databaseId = '16ed2176-428d-805c-909c-ddb1c7332a29';
    this.databaseId = '166937ca10d4814b87cfc08aa6a5c69d'
    this.baseUrl = `${devProxy}https://api.notion.com/v1`;
    this.headers = {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
      'Accept': 'application/json'
    };
  }

  // Проверка подключения
  async testConnection() {
    try {
      console.log('Отправляем тестовый запрос...');
      
      const response = await fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Детали ошибки:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      // Убираем попытку доступа к results[0]
      console.log('Подключение к API успешно:', data);
      return data;
    } catch (error) {
      console.error('Ошибка подключения к API:', error.message);
      throw error;
    }
  }
  formatPageData(page) {
    console.log('Данные страницы:', page);
    return {
      id: page.id,
      title: page.properties.Title?.title?.[0]?.text?.content || '',
      // Добавляем поле для изображения
      imageUrl: page.properties.Image?.files?.[0]?.file?.url || '',
      type: page.properties.Type?.select?.name || '',
      postedDate: page.properties['Posted Date']?.date?.start || ''
    };
  }
  // Получение данных из базы
  async getInstagramContent() {
    try {
      const response = await fetch(`${this.baseUrl}/databases/${this.databaseId}/query`, {
        method: 'POST',
        headers: this.headers
      });
  
      if (!response.ok) {
        throw new Error(`Ошибка получения данных: ${response.status}`);
      }
  
      const data = await response.json();
      // Форматируем каждую запись
      const formattedData = data.results.map(page => this.formatPageData(page));
      console.log('Отформатированные данные:', formattedData);
      return formattedData;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      throw error;
    }
  
  }
}

// Создаём один экземпляр сервиса
const notionServiceInstance = new NotionService();

// Экспортируем созданный экземпляр
export default notionServiceInstance;

// const API_KEY = process.env.REACT_APP_NOTION_API_KEY;

// class NotionService {
//   constructor() {
//     const devProxy = 'https://cors-anywhere.herokuapp.com/';
//     this.baseUrl = `${devProxy}https://api.notion.com/v1`;
//     this.databaseId = '16ed2176-428d-805c-909c-ddb1c7332a29';
    
//     this.headers = {
//       'Authorization': `Bearer ${API_KEY}`,
//       'Content-Type': 'application/json',
//       'Notion-Version': '2022-06-28',
//       'Accept': 'application/json'
//     };
//   }

//   async testConnection() {
//     try {
//       const response = await fetch(`${this.baseUrl}/users/me`, {
//         method: 'GET',
//         headers: this.headers
//       });
      
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log('Подключение к API успешно:', data);
//       return data;
//     } catch (error) {
//       console.error('Ошибка подключения к API:', error);
//       throw error;
//     }
//   }

//   // Добавляем этот метод сюда 👇
//   async getInstagramContent() {
//     try {
//       const response = await fetch(`${this.baseUrl}/databases/${this.databaseId}/query`, {
//         method: 'POST',
//         headers: this.headers
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       return data.results ? data.results : [];
//     } catch (error) {
//       console.error('Ошибка при получении данных:', error);
//       return [];
//     }
//   }

//   async createEmbedBlock(pageId) {
//     try {
//       const response = await fetch(`${this.baseUrl}/blocks/${pageId}/children`, {
//         method: 'PATCH',
//         headers: this.headers,
//         body: JSON.stringify({
//           children: [
//             {
//               object: 'block',
//               type: 'embed',
//               embed: {
//                 url: 'URL_ВАШЕГО_ПРИЛОЖЕНИЯ',
//               }
//             }
//           ]
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('Ошибка при создании embed блока:', error);
//       throw error;
//     }
//   }
// }

// const notionServiceInstance = new NotionService();
// export default notionServiceInstance;