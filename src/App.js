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



function App() {
  return (
    <UserProvider>
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
    </UserProvider> 
    
  );
}

export default App;
