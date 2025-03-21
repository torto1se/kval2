import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function BlogInfo() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState([]);
  const accessToken = localStorage.getItem('access_token');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get_blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            access_token: accessToken,
            blog_id: blogId
          })
        });

        const data = await response.json();
        if (response.ok) {
          setBlog(data);
          setTitle(data.title); // Инициализируем состояние из данных блога
          setText(data.text);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    fetchBlog();
  }, [blogId, accessToken]);

  const editBlog = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/edit_blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_token: accessToken,
          blog_id: blogId,
          title: title,
          text: text
        })
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Блог успешно отредактирован');
        setBlog(prevBlog => ({ ...prevBlog, title: title, text: text }));
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px'
    }}>
      <h2>Информация о блоге</h2>
      <span>
        Заголовок: <br /> 
        <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      </span>
      <span>
        Текст: <br />
         <textarea
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      </span>
      <button onClick={editBlog}>Сохранить</button>
      <Link to={'/blogs'}><button>Список блогов</button></Link>
    </div>
  );
}

export default BlogInfo;
