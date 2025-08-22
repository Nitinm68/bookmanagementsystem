// src/components/News.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          "https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=6&token=54187f4801023845f91f6f35f7f06991"
        );
        setNews(res.data.articles);
      } catch (error) {
        console.error("❌ Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-section bg-gray-100 p-6 rounded-md shadow-md my-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">🌍 World News</h2>
      {news.length === 0 ? (
        <p>Loading news...</p>
      ) : (
        <ul className="space-y-3">
          {news.map((item, index) => (
            <li key={index} className="border-b pb-2">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                {item.title}
              </a>
              <p className="text-sm text-gray-600">{item.source.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default News;
