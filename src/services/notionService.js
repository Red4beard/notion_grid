// Получаем API ключ из переменных окружения
const API_KEY = process.env.REACT_APP_NOTION_API_KEY;

class NotionService {
  constructor() {
    // Используем полный URL для API Notion
    this.baseUrl = 'https://api.notion.com/v1';
    
    // Берем ID базы данных из переменных окружения или используем запасной вариант
    this.databaseId = process.env.REACT_APP_NOTION_DATABASE_ID || '16f937ca10d4809591f2d320ddf01689';
    
    // Настраиваем заголовки для запросов
    this.headers = {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
      // Добавляем CORS заголовки
      'Access-Control-Allow-Origin': '*'
    };
  }

  // Проверка подключения к API
  async testConnection() {
    try {
      console.log('🔍 Начинаем проверку подключения к API...');
      
      const response = await fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Ошибка подключения:', {
          status: response.status,
          statusText: response.statusText,
          details: errorText
        });
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Подключение успешно:', data);
      return data;
    } catch (error) {
      console.error('❌ Ошибка API:', error.message);
      throw error;
    }
  }

  // Форматирование данных страницы
  formatPageData(page) {
    console.log('📄 Обработка страницы:', page.id);
    
    return {
      id: page.id,
      title: page.properties.Title?.title?.[0]?.text?.content || 'Без названия',
      imageUrl: page.properties.Image?.files?.[0]?.file?.url || 
                page.properties.Image?.files?.[0]?.external?.url || '',
      type: page.properties.Type?.select?.name || 'post',
      postedDate: page.properties['Posted Date']?.date?.start || ''
    };
  }

  // Получение данных из базы
  async getInstagramContent() {
    try {
      console.log('📥 Загрузка данных из базы...');
      
      const response = await fetch(`${this.baseUrl}/databases/${this.databaseId}/query`, {
        method: 'POST',
        headers: this.headers,
        // Добавляем пустой body для POST запроса
        body: JSON.stringify({})
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Ошибка получения данных:', {
          status: response.status,
          text: errorText
        });
        throw new Error(`Ошибка получения данных: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Получены сырые данные:', data);

      const formattedData = data.results.map(page => this.formatPageData(page));
      console.log('✨ Отформатированные данные:', formattedData);
      
      return formattedData;
    } catch (error) {
      console.error('❌ Ошибка при получении данных:', error);
      throw error;
    }
  }
}

// Создаём и экспортируем единственный экземпляр сервиса
const notionServiceInstance = new NotionService();
export default notionServiceInstance;








// const API_KEY = process.env.REACT_APP_NOTION_API_KEY;

// class NotionService {
//   constructor() {
//     // Используем оригинальный ID без изменений
//     // this.databaseId = '16ed2176-428d-805c-909c-ddb1c7332a29';
//     this.databaseId = process.env.REACT_APP_NOTION_DATABASE_ID || '16f937ca10d4809591f2d320ddf01689';
//     this.baseUrl = `/v1`;
//     this.headers = {
//       'Authorization': `Bearer ${API_KEY}`,
//       'Content-Type': 'application/json',
//       'Notion-Version': '2022-06-28'
//     };
//   }

//   // Проверка подключения
//   async testConnection() {
//     try {
//       console.log('Отправляем тестовый запрос...');
      
//       const response = await fetch(`${this.baseUrl}/users/me`, {
//         method: 'GET',
//         headers: this.headers
//       });
      
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('Детали ошибки:', {
//           status: response.status,
//           statusText: response.statusText,
//           body: errorText
//         });
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       // Убираем попытку доступа к results[0]
//       console.log('Подключение к API успешно:', data);
//       return data;
//     } catch (error) {
//       console.error('Ошибка подключения к API:', error.message);
//       throw error;
//     }
//   }
//   formatPageData(page) {
//     console.log('Данные страницы:', page);
//     return {
//       id: page.id,
//       title: page.properties.Title?.title?.[0]?.text?.content || '',
//       // Добавляем поле для изображения
//       imageUrl: page.properties.Image?.files?.[0]?.file?.url || '',
//       type: page.properties.Type?.select?.name || '',
//       postedDate: page.properties['Posted Date']?.date?.start || ''
//     };
//   }
//   // Получение данных из базы
//   async getInstagramContent() {
//     try {
//       const response = await fetch(`${this.baseUrl}/databases/${this.databaseId}/query`, {
//         method: 'POST',
//         headers: this.headers
//       });
  
//       if (!response.ok) {
//         throw new Error(`Ошибка получения данных: ${response.status}`);
//       }
  
//       const data = await response.json();
//       // Форматируем каждую запись
//       const formattedData = data.results.map(page => this.formatPageData(page));
//       console.log('Отформатированные данные:', formattedData);
//       return formattedData;
//     } catch (error) {
//       console.error('Ошибка при получении данных:', error);
//       throw error;
//     }
  
//   }
// }

// // Создаём один экземпляр сервиса
// const notionServiceInstance = new NotionService();

// // Экспортируем созданный экземпляр
// export default notionServiceInstance;

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