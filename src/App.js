import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/styles/tailwind.css'
import './App.css';
import './index.css';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import BookDetailsPage from './pages/BookDetailsPage';
import ReadingList from './components/ReadingList';
import { ReadingListProvider } from './context/ReadingListContext';
import Logout from './components/Logout';
import { UserProvider } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfigProvider } from './context/ConfigContext';



function App() {
  return (
    <ConfigProvider>
    <UserProvider> 
    <ReadingListProvider>
    <Router>
    <Navbar />
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    <Routes>   
    <Route path='/signup' element={<SignupPage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/' element={<HomePage />} />
    <Route path='/profile' element={<ProfilePage />} />
    <Route path='/book/:volumeId' element={<BookDetailsPage />} />
    <Route path='/reading-list' element={<ReadingList />} />
    <Route path='/logout' element={<Logout />} />
    </Routes>
    </Router>
    </ReadingListProvider>
    </UserProvider>
    </ConfigProvider> 
    
  );
}

export default App;
