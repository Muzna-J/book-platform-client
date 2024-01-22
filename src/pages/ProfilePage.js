import { useContext } from "react";
import { UserContext } from "../context/UserContext";


function Profile() {
    const { currentUser } = useContext(UserContext);
    console.log(currentUser);
    return (
        <div className="bg-custom-beige min-h-screen p-4">
         <div className="container mx-auto max-w-4xl bg-custom-dusty shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold text-custom-white font-mono">Welcome to your profile, {currentUser?.name}</h1>
        </div>
        </div>
    )
};

export default Profile;