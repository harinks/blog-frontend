import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/Header';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import MyBlogs from './pages/MyBlogs';
import SingleBlogPage from './pages/SingleBlogPage';
import NotFound from './pages/NotFound';

function App() {

  const { user } = useSelector(state => state.user)


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        {!user && (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </>
        )}
        {user && (
          <>
            <Route path='/Create-blog' element={<CreateBlog />} />
            <Route path='/blogs/:id/edit' element={<EditBlog />} />
            <Route path='/blogs/me' element={<MyBlogs />} />
          </>
        )}
        <Route path='/blogs/:id' element={<SingleBlogPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
