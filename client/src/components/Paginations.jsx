import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Pagination } from "react-bootstrap";


const Paginations = observer(() => {
    const { news } = useContext(Context)
    const pageCount = Math.ceil(news.totalCount / news.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++)
        pages.push(i + 1)


    return (
        <Pagination size="sm" >
            <Pagination.First style={{ background: "rgb(25, 26, 34)" }} onClick={() => news.setPage(1)} />
            {pages.map(page =>
                <Pagination.Item style={{ background: "rgb(25, 26, 34)" }}
                    key={page}
                    active={news.page === page}
                    onClick={() => news.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
            <Pagination.Last style={{ background: "rgb(25, 26, 34)" }} onClick={() => news.setPage(pages.length)} />
        </Pagination>
    );
});

export default Paginations;