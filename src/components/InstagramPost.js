// import React from 'react';

// const InstagramPost = ({ post }) => {
//   return (
//     <div className="post-card">
//       {post.imageUrl ? (
//         <img
//           src={post.imageUrl}
//           alt={`Пост ${post.title}`}
//           style={{
//             width: '100%',
//             height: '100%',
//             objectFit: 'cover'
//           }}
//         />
//       ) : (
//         <div
//           style={{
//             width: '100%',
//             height: '100%',
//             backgroundColor: '#f1f1f1'
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default InstagramPost;

import React from 'react';

const InstagramPost = ({ post }) => {
    // Определяем формат поста на основе типа
    const isReel = post.type === 'reel';
  
    return (
      <div 
        className="post-card"
        style={{
          // Для Reels используем соотношение 9:16, для обычных постов - 1:1
          aspectRatio: isReel ? '9/16' : '1/1',
          position: 'relative',
          backgroundColor: '#f1f1f1',
          overflow: 'hidden',
          width: '100%'
        }}
      >
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={`Пост ${post.title}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f1f1f1'
            }}
          />
        )}
      </div>
    );
  };
  
  export default InstagramPost;