import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Error from "./Error";
import Comments from "./Comments";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [shift, setShift] = useState(1); // Номер страницы
  const [limit, setLimit] = useState(50); // Количество блогов на странице
  const [error, setError] = useState('')
  const [showComments, setShowComments] = useState({});
  const accessToken = localStorage.getItem('access_token')

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/blogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            access_token: accessToken,
            shift,
            limit
          })
        });

        const data = await response.json();
        if (response.ok) {
          setBlogs(data.blogs);
        } else {
          setError(data.message)
          setTimeout(()=> setError(''), 3000)
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    fetchBlogs();
  }, [shift, limit, accessToken]);

  const deleteBLog = async (blogId) => {
    const response = await fetch('http://127.0.0.1:5000/delete_blog', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({access_token: accessToken, blog_id: blogId})
    })
    if(response.ok) {
       const newResponse = await fetch('http://127.0.0.1:5000/blogs', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          access_token: accessToken,
          shift,
          limit
        })
      });
      const newData = await newResponse.json();
      setBlogs(newData.blogs);
    } else {
      console.error('Ошибка удаления');
    }
  }

    const handleShowComments = (blogId) => {
    setShowComments(prevState => ({ ...prevState, [blogId]: !prevState[blogId] }));
  };

  

  return (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }}>
    <Error message={error} />
    <h2>Список блогов</h2>
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} style={{
          border: '1px solid black',
          padding: '10px',
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '10px',
          borderRadius: '10px',
          // Удалено maxHeight, чтобы блок сам расширялся
        }}>
          <h3>{blog.title}</h3>
          <p style={{
            wordBreak: 'break-word' // Чтобы текст не выходил за пределы блока
          }}>
            {blog.text}
          </p>
          <button onClick={() => deleteBLog(blog.id)}>Удалить</button>
          <Link to={`/blog/${blog.id}`}>
            <button>Информация</button>
          </Link>

           <button onClick={() => handleShowComments(blog.id)}>Показать комментарии</button>
          {showComments[blog.id] && <Comments blogId={blog.id} />}
        </div>
      ))}
    </div>
  </div>
);

}

export default Blogs;
