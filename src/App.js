import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import RefreshToken from './components/RefreshToken';
import CreateBlog from './components/CreateBlog';
import Blogs from './components/Blogs';
import BlogInfo from './components/BlogInfo';

function App() {
  const username = localStorage.getItem('username');
  const navigate = useNavigate()

  const Logout = () => {
    localStorage.clear();
    navigate('/login')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{
        display: 'flex',
      }}>
      <div style={{display: 'flex', alignItems:'center', gap: '10px', width: '96%', justifyContent: 'right'}}>
        <h3>{username}</h3>
        <span>{username ? <span style={{display: 'flex', gap: '7px'}}><Link to={'/add_blog'} style={{color: 'black', textDecoration: 'none'}}>Создать блог</Link> <Link to={'/blogs'} style={{color: 'black', textDecoration: 'none'}}>Список блогов</Link><button onClick={Logout}>Выйти</button></span> : <span></span>}</span>
      </div>
      </header>
      <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/register' element={<RegistrationPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/add_blog' element={<CreateBlog />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path="/blog/:blogId" element={<BlogInfo />} />
        </Routes>
        <RefreshToken />
      </div>
    </div>
  );
}

export default App;
