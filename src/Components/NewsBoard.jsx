import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';

const NewsBoard = ({category}) => {
    // const [articles, setArticles] = useState([]);
const [state, setState] = useState([]);
const [hasError, setHasError] = useState(false);
    // useEffect(() => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}`;
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(response => response.json())
    //         .then(data => setArticles(data))
    //         .catch(error => console.error(error));

    // }, [])

const fetchData = () =>{
    // let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}`;
    fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=2fe95fcde45746dcb281c234d6068bd0`)
    .then(response =>response.json())
    .then(res => {


        setState(res.articles)
        console.log(res);
    }
        
        )
    .catch(err => setHasError(true))

}


useEffect(()=>{
fetchData();
},[category])

    // console.log(articles); 

    return (
        <>
<h2 className="d-flex justify-content-center p-4">Latest <span className="badge text-bg-success">  news</span> </h2>
 
           {state && state.map((news, index) => (
              <NewsItem
                    key={index}
                    title={news.title}
                    description={news.description}
                    src={news.urlToImage}
                    url={news.url}
                /> 
             ))}   
        </>
    )
};

export default NewsBoard;
