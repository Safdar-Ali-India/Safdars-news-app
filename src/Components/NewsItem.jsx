import image from '../assets/news.svg';
import { truncateText } from '../utils/text';

const FALLBACK_DESCRIPTION =
  'News at its best for the worldzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz';

const NewsItem = ({ title, description, src, url }) => {
  const displayTitle = truncateText(title, 50, 'Untitled headline');
  const displayDescription = truncateText(description, 90, FALLBACK_DESCRIPTION);

  return (
    <div
      className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 news-card"
      style={{ maxWidth: '345px' }}
    >
      <img
        src={src || image}
        style={{ height: '200px', width: '343px' }}
        className="card-img-top"
        alt={displayTitle}
      />
      <div className="card-body">
        <h5 className="card-title">{displayTitle}</h5>
        <p className="card-text">{displayDescription}</p>
        <a href={url} className="btn btn-primary">
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
