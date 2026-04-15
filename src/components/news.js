import React, { useState, useEffect } from "react";

function News({ searchTerm }) {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch top headlines on mount
    const fetchNews = async () => {
        try {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=99f8f3f9319140baa500009cfd2c2a7b`);
            if (!response.ok) {
                throw new Error('News data not available');
            }
            const data = await response.json();
            setArticles(data.articles);
        } catch (err){
            setError('News currently unavailable');
        } finally {
            setLoading(false);
        }
    };
    fetchNews();
  }, []);

  // Filter articles based on search term (case-insensitive)
  const filteredArticles = articles.filter(article =>
    article.title && article.title.toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  return (
    <div className="card">
      <h2>News</h2>
        {loading && <p>Loading news...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && filteredArticles.length === 0 && <p>No news found.</p>}
        {filteredArticles.slice(0, 5).map((article, index) => (
          article.title && (
            <div key={index} className="news-item">
              <a href={article.url} target="_blank" rel="noreferrer">
                <p>{article.title}</p>
              </a>
              <small>{article.source?.name}</small>
            </div>
          )
        ))}
    </div>
  );
}

export default News;