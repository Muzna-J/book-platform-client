import { Link } from 'react-router-dom';

function BookCard({book}) {
    const { title, coverImage, volumeId } = book;
    return (
        <div className="max-w-40  rounded overflow-hidden shadow-lg bg-custom-dusty m-4 flex flex-col">
            <div className="flex-grow p-4">
                <img src={coverImage} alt={title} className="mb-2" />
                <h3 className="font-bold text-center mb-2">{title}</h3>
        </div> 
        <Link to={`/book/${volumeId}`} className="bg-custom-crimson 500 hover:bg-custom-beige 700 text-white font-bold py-2 px-4 rounded-b-lg block text-center">
                View More
</Link>  
        </div>
    )
};

export default BookCard;