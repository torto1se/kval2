import React, { useState, useEffect } from "react";

function Comments({ blogId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const accessToken = localStorage.getItem('access_token');
  const [newText, setNewText] = useState('');
  const currentUserId = localStorage.getItem('user_id');
  const [shift, setShift] = useState(1); // Номер страницы
  const [limit, setLimit] = useState(10); // Количество комментариев на странице
  const [editing, setEditing] = useState({}); // Состояние редактирования

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get_messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            access_token: accessToken,
            blog_id: blogId,
            shift,
            limit
          })
        });

        const data = await response.json();
        if (response.ok) {
          setComments(data.messages);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    fetchComments();
  }, [blogId, shift, limit, accessToken]);

  const addComment = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/add_message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_token: accessToken,
          blog_id: blogId,
          text: newComment,
        })
      });

      const data = await response.json();
      if (response.ok) {
        setNewComment('');
        const newResponse = await fetch('http://127.0.0.1:5000/get_messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_token: accessToken,
          blog_id: blogId,
          text: newComment,
        })
      });
       const newData = await newResponse.json();
         setComments(newData.messages);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/delete_message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_token: accessToken,
          message_id: commentId
        })
      });

      const data = await response.json();
      if (response.ok) {
        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const editComment = async (commentId, newText) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/edit_message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_token: accessToken,
          message_id: commentId,
          text: newText
        })
      });

      const data = await response.json();
      if (response.ok) {
        setComments(prevComments => prevComments.map(comment => comment.id === commentId ? { ...comment, text: newText } : comment));
        setEditing(prevEditing => ({ ...prevEditing, [commentId]: false }));
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const handleEdit = (commentId) => {
    setEditing(prevEditing => ({ ...prevEditing, [commentId]: true }));
  };

  const handleSaveEdit = (commentId, newText) => {
    editComment(commentId, newText);
  };


  return (
     <div>
      <h3>Комментарии</h3>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} style={{
            border: '1px solid gray',
            padding: '5px',
            marginBottom: '5px',
            borderRadius: '10px',
            paddingLeft: '15px'
          }}>
             <span>{comment.username}</span>
            {editing[comment.id] ? (
              <div>
                <input
                  type="text"
                  defaultValue={comment.text}
                  onChange={(e) => setNewText(e.target.value)}
                />
               <button onClick={() => editComment(comment.id, newText)}>Сохранить</button>
                <button onClick={() => setEditing(prevEditing => ({ ...prevEditing, [comment.id]: false }))}>Отмена</button>
              </div>
            ) : (
              <p>{comment.text}</p>
            )}
            {currentUserId == comment.user_id && (
              <div style={{width: '100%', display: 'flex', justifyContent: 'right', gap: '4px'}}>
                {editing[comment.id] ? (
                  <span></span>
                ) : (
                  <button onClick={() => handleEdit(comment.id)}>Редактировать</button>
                )}
                <button onClick={() => deleteComment(comment.id)}>Удалить</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Введите текст..."
      />
      <button onClick={addComment}>Добавить</button>
    </div>
  );
}

export default Comments;
