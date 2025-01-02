import React from 'react';

const NotionEmbed = () => {
  return (
    <div style={{
      display: 'flex',
      width: '100%',
      gap: '20px'
    }}>
      {/* Левая часть - для таблицы Notion */}
      <div style={{
        width: '60%',
        minHeight: '844px',
        backgroundColor: 'white'
      }}>
        {/* Здесь будет ваша таблица Notion */}
      </div>

      {/* Правая часть - для сетки Instagram */}
      <div style={{
        width: '390px', // Фиксированная ширина как у телефона
        height: '844px', // Фиксированная высота
        border: '1px solid #e1e1e1',
        borderRadius: '20px',
        overflow: 'hidden',
        backgroundColor: 'white'
      }}>
        <div className="posts-grid">
          {/* Ваша существующая сетка постов */}
        </div>
      </div>
    </div>
  );
};

export default NotionEmbed;