import React, { useContext, useEffect, useState } from 'react';
import { fetchAllNews } from '../http/newsAPI';
import { useNavigate } from 'react-router-dom';
import { NEWS_ROUTER } from '../utils/consts';
import Paginations from './Paginations';
import { Context } from '..';
import { observer } from "mobx-react-lite";
import { useRef } from 'react';


const months = ['янв.', 'февр.', 'март', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сент.', 'окт', 'нояб.', 'дек.']


const News = observer(() => {
    const { news } = useContext(Context)
    const navigate = useNavigate()
    const ref = useRef(null);

    useEffect(() => {
        fetchAllNews(news.page, 5).then(data => {
            news.setNews(data.rows)
            news.setTotalCount(data.count)
        })
    }, [news.page])


    const scrollToNews = () => {
        const lastChildElement = ref.current?.lastElementChild;
        lastChildElement?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <br />
            <div ref={ref}>
                <h1 style={{
                    borderBottom: '5px solid transparent',
                    borderImage: "linear-gradient(0.25turn,#743ad5, #d53a9d)",
                    borderImageSlice: '1',
                    width: '160px'
                }}>Новости</h1>
            </div>

            {news.news.map(a =>
                <div key={a.id} className="row" onClick={() => navigate(NEWS_ROUTER + '/' + a.id)}>
                    <div className="example-1 cardcard">
                        <div className="wrapper">

                            <div className="date">
                                <span className="day">{new Date(a.publishedAt).getDate()}</span>
                                <span className="month">{months[new Date(a.publishedAt).getMonth()]}</span>
                                <span className="year">{new Date(a.publishedAt).getFullYear()}</span>
                            </div>

                            <div className="image">
                                <img className="book-image" src={a.image} alt="news" />
                            </div>

                            <div className="data">
                                <div className="contentcontent">
                                    <h1 className="title"><a className="cardTitle">{a.title}</a></h1>
                                    <p className="text">{a.description}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            <br /><br />
            <div style={{ maxWidth: "500px" }} onClick={scrollToNews}>
                <Paginations />
            </div>
            <br />

        </>
    );
});

export default News;