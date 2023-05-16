import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '../..';
import TrainerItem from './TrainerItem';


const TrainerList = observer(() => {
    const { trainer } = useContext(Context)

    
    return (
        <Row md={4}>
            {trainer.trainers.map(trainer =>
                trainer.isActivated &&
                <TrainerItem key={trainer.id} trainer={trainer} />
            )}
        </Row>
    );
});

export default TrainerList;