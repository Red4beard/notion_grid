import React, { useState, useEffect } from 'react';
import InstagramPost from './components/InstagramPost';
import notionService from './services/notionService';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Добавляем состояние loading

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await notionService.getInstagramContent();
        setPosts(data);
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts(); // Вызываем функцию загрузки
  }, []); // Пустой массив зависимостей

  return (
    <div style={{ backgroundColor: 'white' }}>
      <div className="posts-grid">
        {posts.map(post => (
          <InstagramPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default App;

// import React, { useState, useEffect } from 'react';
// import InstagramPost from './components/InstagramPost';
// import notionService from './services/notionService';
// import './App.css';

// function App() {
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);
  
//     useEffect(() => {
//       const loadPosts = async () => {
//         console.log('Начинаем загрузку постов...'); // Отладочный лог
//         try {
//           const data = await notionService.getInstagramContent();
//           console.log('Получены данные:', data); // Отладочный лог
//           setPosts(Array.isArray(data) ? data : []);
//         } catch (error) {
//           console.error('Ошибка загрузки:', error);
//           setPosts([]);
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       loadPosts();
//     }, []);
  
//     console.log('Текущие посты:', posts); // Отладочный лог
  
//     return (
//       <div style={{ 
//         backgroundColor: 'white',
//         maxWidth: '390px',
//         margin: '0 auto'
//       }}>
//         {loading ? (
//           <div>Загрузка...</div>
//         ) : (
//           <div className="posts-grid">
//             {Array.isArray(posts) && posts.length > 0 ? (
//               posts.map(post => (
//                 <InstagramPost key={post.id} post={post} />
//               ))
//             ) : (
//               <div>Нет доступных постов</div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   }

// export default App;