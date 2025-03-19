import { useState } from "react";
import Error from "./Error";
import { Link } from "react-router-dom";

function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const hadnleReg = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch('http://127.0.0.1:5000/register', {
      method: 'post',
      body: formData
    })

    const data = await response.json();
    if(response.ok){
      console.log('Регистрация')
      console.log(data.message);
      setPassword('')
      setUsername('')
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
        <h2>Регистрация</h2>
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
        <button onClick={hadnleReg} style={{
          marginTop: '10px',
          fontSize: '22px',
          border: 'none',
          borderRadius: '10px',
          padding: '10px',
          cursor: 'pointer'
        }}>Зарегистрироваться</button>
        <span>Уже есть аккаунт? <Link to={'/login'}>Войти</Link></span>
      </div>
    </div>
  );
}

export default RegistrationPage;