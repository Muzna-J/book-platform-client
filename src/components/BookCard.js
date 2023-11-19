import { Link } from 'react-router-dom';

function BookCard({book}) {
    const { title, coverImage, volumeId } = book;
    return (
        <div className="book-card">
        <div className="book-info">
        <h3>{title}</h3>
        <img src={coverImage} alt={title} />
        </div> 
        <Link to={`/book/${volumeId}`} className="view-more-button">
                View More
</Link>  
        </div>
    )
};

export default BookCard;