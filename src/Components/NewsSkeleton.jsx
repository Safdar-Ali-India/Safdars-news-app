const PLACEHOLDER_COUNT = 6;

const NewsSkeleton = () => {
  return (
    <div className="news-grid">
      {Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => (
        <div
          key={index}
          className="card bg-dark mb-3 news-skeleton"
          style={{ maxWidth: '345px', width: '345px' }}
        >
          <div className="skeleton-block skeleton-image" />
          <div className="card-body">
            <div className="skeleton-block skeleton-title" />
            <div className="skeleton-block skeleton-text" />
            <div className="skeleton-block skeleton-text short" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsSkeleton;
