import { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ReadingListContext } from '../context/ReadingListContext';
import { UserContext } from '../context/UserContext';


const Logout = () => {
    const navigate = useNavigate();
    const { clearReadingList } = useContext(ReadingListContext);
    const { refreshCurrentUser } = useContext(UserContext);


    
    useEffect(() => {
            (async () => {
                try {
            await axios.post('http://localhost:5005/logout', {}, { withCredentials: true }); // {} the empty JavaScript object represents the data payload sent with the POST request. In the case of a logout request, there is no need to send any data, which is why it's an empty object.
            clearReadingList();
            refreshCurrentUser();
            navigate('/login'); 
        } catch (error) {
            console.error('Logout failed:', error);
           
        }
    })();
}, [navigate, clearReadingList, refreshCurrentUser ]); 

 // Dependency array includes navigate to ensure useEffect is run when navigate changes

return null; // for rendering nothing since this component is only for logout functionality
   
};

export default Logout;
