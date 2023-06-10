import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneNews } from '../http/newsAPI';
import { Container } from 'react-bootstrap';

const News = () => {
    const { id } = useParams()
    const [news, setNews] = useState([])

    useEffect(() => {
        fetchOneNews(id).then(data => setNews(data))
    }, [id])

    const date = new Date(news.publishedAt)

    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const dateStr = day + '-' + month + '-' + year

    return (
        <Container>
            <br/>
            <h1>{news.title}</h1>
            <p>Дата публикации: {dateStr}</p>
            <br/>
            <img width='1200px' height='600px'src={news.image} alt="news" />
            <br/><br/><br/>
            <p style={{fontSize: '20px', marginRight: '100px'}}>{news.content}</p>
            <br/><br/>
        </Container>
    );
};

export default News;