import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import BookDetailsPage from './pages/BookDetailsPage';
import ReadingList from './components/ReadingList';


function App() {
  return (
    <Router>
    <Navbar />
    <Routes>   
    <Route path='/signup' element={<SignupPage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/home' element={<HomePage />} />
    <Route path='/profile' element={<ProfilePage />} />
    <Route path='/book/:volumeId' element={<BookDetailsPage />} />
    <Route path='/reading-list' element={<ReadingList />} />
    </Routes>
    </Router> 
    
  );
}

export default App;
