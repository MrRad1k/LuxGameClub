import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Pagination } from "react-bootstrap";


const Paginations = observer(() => {
    const { trainer } = useContext(Context)
    const pageCount = Math.ceil(trainer.totalCount / trainer.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++)
        pages.push(i + 1)


    return (
        <Pagination size="sm">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={trainer.page === page}
                    onClick={() => trainer.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Paginations;