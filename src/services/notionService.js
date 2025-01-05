
class NotionService {
    async getInstagramContent() {
        try {
            const response = await fetch('/api/notion');
            if (!response.ok) {
                throw new Error(`Ошибка получения данных: ${response.status}`);
            }
            const data = await response.json();
            return data.results.map(page => this.formatPageData(page));
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            throw error;
        }
    }

    // Добавляем метод formatPageData, который использовался в предыдущей версии
    formatPageData(page) {
        return {
            id: page.id,
            title: page.properties.Title?.title?.[0]?.text?.content || '',
            imageUrl: page.properties.Image?.files?.[0]?.file?.url || '',
            type: page.properties.Type?.select?.name || '',
            postedDate: page.properties['Posted Date']?.date?.start || ''
        };
    }
}

// 2. Создаем экземпляр класса
const notionService = new NotionService();

// 3. Экспортируем экземпляр
export default notionService;

// перед устнановкой API-роута Vercel
// const API_KEY = process.env.REACT_APP_NOTION_API_KEY;
// const DATABASE_ID = process.env.REACT_APP_NOTION_DATABASE_ID;

// class NotionService {
//   constructor() {
//     const devProxy = 'https://cors-anywhere.herokuapp.com/';
    
//     // Используем значение из .env
//     this.databaseId = DATABASE_ID; 
    
//     this.baseUrl = `${devProxy}https://api.notion.com/v1`;
//     this.headers = {
//       'Authorization': `Bearer ${API_KEY}`,
//       'Content-Type': 'application/json',
//       'Notion-Version': '2022-06-28',
//       'Accept': 'application/json'
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
//       imageUrl: page.properties.Image?.files?.[0]?.file?.url || '',
//       type: page.properties.Type?.select?.name || '',
//       postedDate: page.properties['Posted Date']?.date?.start || ''
//     };
//   }

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
//         const formattedData = data.results.map(page => this.formatPageData(page));
        
//       console.log('Отформатированные данные:', formattedData);
//       return formattedData;
//     } catch (error) {
//       console.error('Ошибка при получении данных:', error);
//       throw error;
//     }
//   }
// }

// const notionServiceInstance = new NotionService();
// export default notionServiceInstance;


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


//--------------------------------------------
// // Получаем ключи из переменных окружения
// const API_KEY = process.env.REACT_APP_NOTION_API_KEY;
// const DATABASE_ID = process.env.REACT_APP_NOTION_DATABASE_ID;

// class NotionService {
//   constructor() {
//     // Инициализируем основные параметры для работы с API
//     this.databaseId = DATABASE_ID;
//     this.baseUrl = '/api/v1';  // Используем относительный путь для прокси
//     this.headers = {
//       'Authorization': `Bearer ${API_KEY}`,
//       'Content-Type': 'application/json',
//       'Notion-Version': '2022-06-28',
//       'Accept': 'application/json'
//     };
//   }

//   // Метод для проверки подключения к API
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
//       console.log('Подключение к API успешно:', data);
//       return data;
//     } catch (error) {
//       console.error('Ошибка подключения к API:', error.message);
//       throw error;
//     }
//   }

//   // Метод для форматирования данных страницы
//   formatPageData(page) {
//     console.log('Данные страницы:', page);
//     return {
//       id: page.id,
//       title: page.properties.Title?.title?.[0]?.text?.content || '',
//       imageUrl: page.properties.Image?.files?.[0]?.file?.url || '',
//       type: page.properties.Type?.select?.name || '',
//       postedDate: page.properties['Posted Date']?.date?.start || ''
//     };
//   }

//   // Основной метод для получения контента из базы данных
//     async getInstagramContent() {
//         try {
//             // Шаг 1: Проверяем наличие необходимых настроек
//             console.log('🔄 Проверяем настройки:', {
//                 'База данных доступна': !!this.databaseId,
//                 'API ключ доступен': !!API_KEY,
//                 'URL базы': this.baseUrl
//             });

//             // Шаг 2: Формируем URL для проверки базы данных
//             const checkUrl = `${this.baseUrl}/databases/${this.databaseId}`;
//             console.log('🔍 Проверяем доступ к базе данных:', checkUrl);

//             // Шаг 3: Делаем тестовый запрос к базе данных
//             console.log('📡 Отправляем тестовый запрос...');
//             const testResponse = await fetch(checkUrl, {
//                 method: 'GET',
//                 headers: this.headers
//             }).catch(error => {
//                 console.error('🚨 Ошибка при проверке базы:', {
//                     message: error.message,
//                     type: error.name
//                 });
//                 throw new Error(`Ошибка подключения: ${error.message}`);
//             });

//             // Шаг 4: Проверяем результат тестового запроса
//             console.log('📊 Статус тестового запроса:', testResponse.status);
//             const testText = await testResponse.text();
//             console.log('📝 Ответ тестового запроса:', testText);

//             if (!testResponse.ok) {
//                 throw new Error(`База данных недоступна: ${testResponse.status}`);
//             }

//             // Шаг 5: Формируем основной запрос для получения данных
//             const requestBody = {
//                 page_size: 100,  // Получаем до 100 записей
//                 filter: {
//                     property: "Status",
//                     select: {
//                         equals: "Published"  // Фильтруем только опубликованные
//                     }
//                 },
//                 sorts: [
//                     {
//                         property: "Posted Date",
//                         direction: "descending"  // Сортируем по дате, новые первыми
//                     }
//                 ]
//             };

//             // Шаг 6: Отправляем основной запрос
//             console.log('📤 Отправляем основной запрос:', JSON.stringify(requestBody, null, 2));
//             const response = await fetch(`${checkUrl}/query`, {
//                 method: 'POST',
//                 headers: this.headers,
//                 body: JSON.stringify(requestBody)
//             });

//             // Шаг 7: Обрабатываем ответ
//             if (!response.ok) {
//                 const errorText = await response.text();
//                 console.error('🚫 Ошибка при получении данных:', {
//                     status: response.status,
//                     text: errorText
//                 });
//                 throw new Error(`Ошибка получения данных: ${response.status}`);
//             }

//             // Шаг 8: Преобразуем и возвращаем данные
//             const data = await response.json();
//             console.log('✅ Получены данные:', data);
            
//             const formattedData = data.results.map(page => this.formatPageData(page));
//             console.log('🎯 Форматированные данные:', formattedData);
            
//             return formattedData;

//         } catch (error) {
//             // Шаг 9: Обрабатываем возможные ошибки
//             console.error('💥 Произошла ошибка:', {
//                 name: error.name,
//                 message: error.message,
//                 stack: error.stack
//             });
//             throw error;  // Пробрасываем ошибку дальше
//         }
//     }
// }

// // Создаём единственный экземпляр сервиса
// const notionServiceInstance = new NotionService();

// // Экспортируем этот экземпляр для использования в других частях приложения
// export default notionServiceInstance;

//--------------------------------------------------------

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