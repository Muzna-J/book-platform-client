import { Link } from 'react-router-dom';

    function BookCard({ book }) {
        const { title, coverImage, volumeId } = book;
        return (
            <div className="max-w-40 rounded overflow-hidden shadow-lg bg-custom-dusty m-4 flex flex-col">
                <div className="flex-grow p-4 font-mono flex justify-center"> 
                    <img src={coverImage} alt={title} className="h-180 object-cover" /> 
                </div>
                <Link to={`/book/${volumeId}`} className="bg-custom-crimson hover:bg-custom-orange text-white font-mono font-bold py-2 px-4 rounded-b-lg block text-center">
                    View More
                </Link>
            </div>
        );
    }

export default BookCard;


