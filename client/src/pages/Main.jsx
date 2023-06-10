import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Context } from '..';
import { fetchGames, fetchTrainers } from '../http/trainerAPI';
import TrainerList from '../components/TrainerList/TrainerList';
import GameBar from '../components/GameBar';
import Carousels from '../components/Carousels';
import News from '../components/News';


const Main = observer(() => {
    const { trainer } = useContext(Context)

    useEffect(() => {
        fetchGames().then(data => trainer.setGames(data))
        // fetchTrainers(null).then(data => {
        //     trainer.setTrainers(data)
        // })
    }, [trainer])

    useEffect(() => {
        fetchTrainers(trainer.selectedGame.id).then(data => {
            trainer.setTrainers(data)
        })
    }, [trainer, trainer.selectedGame])


    return (
        <>
            <Carousels />

            <Container>
                <br />
                <h1 style={{
                    borderBottom: '5px solid transparent',
                    borderImage: "linear-gradient(0.25turn,#743ad5, #d53a9d)",
                    borderImageSlice: '1',
                    width: '320px'
                }}>Список тренеров</h1>
                <GameBar />
                <TrainerList />
                <News />
            </Container>
        </>
    );
});

export default Main;