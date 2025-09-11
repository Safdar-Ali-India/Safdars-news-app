import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import { buildHeadlinesUrl, normalizeArticles } from '../utils/newsApi';

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setHasError(false);

      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const url = buildHeadlinesUrl(category, apiKey);
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setArticles(normalizeArticles(data));
      } catch (error) {
        if (error.name !== 'AbortError') {
          setHasError(true);
          setArticles([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [category]);

  return (
    <>
      <h2 className="d-flex justify-content-center align-items-center gap-2 p-4">
        Latest <span className="badge text-bg-success">news</span>
        {!loading && !hasError && articles.length > 0 && (
          <span className="badge text-bg-secondary">{articles.length}</span>
        )}
      </h2>

      {loading && <p className="text-center text-light">Loading headlines...</p>}
      {hasError && !loading && (
        <p className="text-center text-danger">Could not load news. Try again later.</p>
      )}

      {!loading &&
        !hasError &&
        articles.length === 0 && (
          <p className="text-center text-secondary">No headlines for this category right now.</p>
        )}

      {!loading &&
        !hasError &&
        articles.map((news, index) => (
          <NewsItem
            key={news.url || index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))}
    </>
  );
};

export default NewsBoard;
