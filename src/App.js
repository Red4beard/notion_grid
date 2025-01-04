import React, { useState, useEffect } from 'react';
import InstagramPost from './components/InstagramPost';
import notionService from './services/notionService';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
    
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

    loadPosts();
  }, []);

  // Добавляем проверку состояния загрузки
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh'
      }}>
        Загрузка...
      </div>
    );
  }

  // Если загрузка завершена, показываем посты
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
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
    
//   useEffect(() => {
//     const loadPosts = async () => {
//       try {
//         const data = await notionService.getInstagramContent();
//         setPosts(data);
//       } catch (error) {
//         console.error('Ошибка загрузки:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPosts(); // Вызываем функцию загрузки
//   }, []); // Пустой массив зависимостей

//   return (
//     <div style={{ backgroundColor: 'white' }}>
//       <div className="posts-grid">
//         {posts.map(post => (
//           <InstagramPost key={post.id} post={post} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
