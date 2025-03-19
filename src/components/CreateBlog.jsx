import { useState } from "react";
import { Link } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const createBlog = async () => {
    const response = await fetch('http://127.0.0.1:5000/add_blog' , {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({title, text, access_token: localStorage.getItem('access_token')})
    })

    const data = await response.json();
    if(response.ok){
      console.log(data.message);
      setText('')
      setTitle('')
    } else {
      console.log(data.message);
    }

  }

  return ( 
    <>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '1px solid black', padding: '30px', borderRadius: '10px'}}>
        <h2>Создать блог</h2>
        <input type="text" placeholder="Заголовок" value={title} onChange={(e)=> setTitle(e.target.value)} style={{
          border: 'none',
          borderBottom: '1px solid black',
          fontSize: '24px',
          outline: 'none'
        }}/>
        <input type="text" placeholder="Текст" value={text} onChange={(e)=> setText(e.target.value)} style={{
          border: 'none',
          borderBottom: '1px solid black',
          fontSize: '24px',
          outline: 'none'
        }}/>
        <button onClick={createBlog} style={{
          marginTop: '10px',
          fontSize: '22px',
          border: 'none',
          borderRadius: '10px',
          padding: '10px',
          cursor: 'pointer',
          outline: 'none'
        }}>Создать</button>
        <span><Link to='/blogs'>Список блогов</Link></span>
      </div>
    </>
  );
}

export default CreateBlog;