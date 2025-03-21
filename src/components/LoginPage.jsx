import { useState } from "react";
import Error from "./Error";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const hadnleLogin = async () => {
    // if(!username){
    //   setError('Введите имя!')
    //   setTimeout(()=> setError(''), 3000)
    //   return 
    // }
    if(!password){
      setError('Введите пароль!')
      setTimeout(()=> setError(''), 3000)
      return 
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch('http://127.0.0.1:5000/login', {
      method: 'post',
      body: formData
    })

    const data = await response.json();
    if(response.ok){
      console.log('Авторизация')
      console.log(data.message);
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      localStorage.setItem('user_id', data.user_id)
      localStorage.setItem('username', username)
      setPassword('')
      setUsername('')
      navigate('/add_blog')
    } else {
      setError(data.message)
      setTimeout(()=> setError(''), 3000)
    }
  }


  return ( 
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%'
    }}>
      <Error message={error} />
      <div style={{
        border: '1px solid black',
        padding: '40px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        alignItems: 'center'
      }}>
        <h2>Авторизация</h2>
        <input type="text" placeholder="Логин" value={username} onChange={(e)=> setUsername(e.target.value)} style={{
          border: 'none',
          borderBottom: '1px solid black',
          fontSize: '24px'
        }}/>
        <input type="password" placeholder="Пароль" value={password} onChange={(e)=> setPassword(e.target.value)} style={{
          border: 'none',
          borderBottom: '1px solid black',
          fontSize: '24px'
        }}/>
        <button onClick={hadnleLogin} style={{
          marginTop: '10px',
          fontSize: '22px',
          border: 'none',
          borderRadius: '10px',
          padding: '10px',
          cursor: 'pointer'
        }}>Авторизация</button>
        <span>Нет аккаунта? <Link to={'/register'}>Создать</Link></span>
      </div>
    </div>
  );
}

export default LoginPage;