import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import BookDetailsPage from './pages/BookDetailsPage';
import ReadingList from './components/ReadingList';
import {ReadingListProvider} from './context/ReadingListContext';
import Logout from './components/Logout';

function App() {
  return (
    <ReadingListProvider>
    <Router>
    <Navbar />
    <Routes>   
    <Route path='/signup' element={<SignupPage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/home' element={<HomePage />} />
    <Route path='/profile' element={<ProfilePage />} />
    <Route path='/book/:volumeId' element={<BookDetailsPage />} />
    <Route path='/reading-list' element={<ReadingList />} />
    <Route path='/logout' element={<Logout />} />
    </Routes>
    </Router>
    </ReadingListProvider> 
    
  );
}

export default App;
