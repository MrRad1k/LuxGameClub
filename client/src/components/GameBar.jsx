import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from '../index';
import { Card, Container } from 'react-bootstrap';


const GameBar = observer(() => {
    const { trainer } = useContext(Context)

    const allTrainer = () => {
        trainer.setSelectedGame(trainer)
    }

    
    return (
        <Container className="d-flex p-3" >
            <div className="divStyle" >
                <Card
                    className='p-3 cardStyle'
                    style={{
                        borderBottom: !trainer.selectedGame.id && '5px solid transparent',
                        borderImage: "linear-gradient(0.25turn,#743ad5, #d53a9d)",
                        borderImageSlice: '1'
                    }}
                    onClick={allTrainer} >
                    Все игры
                </Card>

                {trainer.games.map(game =>
                    <Card
                        className='p-3 cardStyle'
                        style={{
                            borderBottom: game.id === trainer.selectedGame.id && '5px solid transparent',
                            borderImage: "linear-gradient(0.25turn,#743ad5, #d53a9d)",
                            borderImageSlice: '1'
                        }}
                        key={game.id}
                        onClick={() => trainer.setSelectedGame(game)}
                    >
                        {game.name}
                    </Card >
                )}
            </div>
        </Container>
    );
});

export default GameBar;