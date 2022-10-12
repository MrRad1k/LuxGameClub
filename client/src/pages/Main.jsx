import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Context } from '..';
import { fetchGames, fetchTrainers, fetchTrainersAll } from '../http/trainerAPI';
import TrainerList from '../components/TrainerList/TrainerList';
import GameBar from '../components/GameBar';
import Paginations from '../components/Paginations';
import Carousels from '../components/Carousels';


const Main = observer(() => {
    const { trainer } = useContext(Context)

    useEffect(() => {
        fetchGames().then(data => trainer.setGames(data))
        fetchTrainers(null).then(data => {
            trainer.setTrainers(data)
        })
    }, [trainer])

    useEffect(() => {
        fetchTrainers(trainer.selectedGame.id).then(data => {
            trainer.setTrainers(data)
        })
    }, [trainer.selectedGame])


    return (
        <>
            <Carousels />

            <Container>
                <GameBar />
                <TrainerList />
                {/* <Paginations /> */}
            </Container>
        </>
    );
});

export default Main;