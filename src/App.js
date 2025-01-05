import React, { useState, useEffect } from 'react';
import InstagramPost from './components/InstagramPost';
import notionService from './services/notionService';
import './App.css';

function App() {
  // Состояния для управления данными и загрузкой
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Стили для нашего интерфейса
  const styles = {
    header: {
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      padding: '15px 0',
      borderBottom: '1px solid #f0f0f0',
      zIndex: 1000,
      width: '100%',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    buttonContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      textAlign: 'left'
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#000',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: isRefreshing ? 'not-allowed' : 'pointer',
      opacity: isRefreshing ? 0.7 : 1,
      transition: 'all 0.2s ease',
      fontSize: '14px',
      fontWeight: '500'
    }
  };

  // Функция загрузки постов
  const loadPosts = async () => {
    try {
      setIsRefreshing(true);
      const data = await notionService.getInstagramContent();
      setPosts(data);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Загружаем посты при первом рендере
  useEffect(() => {
    loadPosts();
  }, []);

  // Показываем загрузку
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: 'white'
      }}>
        Загрузка...
      </div>
    );
  }

  // Основной интерфейс
  return (
    <div style={{ backgroundColor: 'white' }}>
      <header style={styles.header}>
        <div style={styles.buttonContainer}>
          <button 
            onClick={loadPosts}
            disabled={isRefreshing}
            style={styles.button}
          >
            {isRefreshing ? 'Обновляем...' : 'Обновить'}
          </button>
        </div>
      </header>
      <div className="posts-grid">
        {posts.map(post => (
          <InstagramPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default App;

//до добавления кнопки
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

//     loadPosts();
//   }, []);
    
//   useEffect(() => {
//     console.log('Current posts:', posts);
//   }, [posts]);

//   // Добавляем проверку состояния загрузки
//   if (loading) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         minHeight: '100vh'
//       }}>
//         Загрузка...
//       </div>
//     );
//   }

//   // Если загрузка завершена, показываем посты
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