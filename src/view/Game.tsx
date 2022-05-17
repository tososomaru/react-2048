import React, { useState, useEffect } from 'react';
import { Grid, Stack } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import GameBoard from '../components/GameBoard';
import Message from '../components/Message';
import Addition from '../components/Addition';
import Column from '../styles/Column';
import { useKeydown, useLeave, useGame } from '../hooks';
import Title from '../styles/Title';
import Score from '../components/Score';
import Button from '../components/Button';
import { useData } from '../context';
import ControlGroup from '../components/ControlGroup';

const KeyDirections = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
};

enum Directions {
  Up = 'ArrowUp',
  Down = 'ArrowDown',
  Left = 'ArrowLeft',
  Right = 'ArrowRight',
}

const Game = () => {
  const [showAddition, setShowAddition] = useState(false);
  const { data, setValues } = useData();
  const [late, setLate] = useState(false);
  const {
    game, move, restart, score, bestScore,
  } = useGame(data, setValues);

  // eslint-disable-next-line no-promise-executor-return
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const moveCallback = (direction: string) => {
    if (game.defeat) return;
    if (game.win) setLate(true);
    move(direction);
  };

  const upCallback = () => moveCallback(KeyDirections.ArrowUp);
  const downCallback = () => moveCallback(KeyDirections.ArrowDown);
  const leftCallback = () => moveCallback(KeyDirections.ArrowLeft);
  const rightCallback = () => moveCallback(KeyDirections.ArrowRight);

  useKeydown(Directions.Up, upCallback);
  useKeydown(Directions.Down, downCallback);
  useKeydown(Directions.Left, leftCallback);
  useKeydown(Directions.Right, rightCallback);

  const handlers = useSwipeable(
    {
      onSwipedLeft: () => moveCallback(KeyDirections.ArrowLeft),
      onSwipedRight: () => moveCallback(KeyDirections.ArrowRight),
      onSwipedUp: () => moveCallback(KeyDirections.ArrowUp),
      onSwipedDown: () => moveCallback(KeyDirections.ArrowDown),
    },
  );

  const lateGameCallback = () => { setLate(true); };

  useEffect(() => {
    // TODO: иногда очки резко исчезают
    const additionHandle = async () => {
      if (game.additional) {
        setShowAddition(true);
        await delay(400);
        setShowAddition(false);
      }
    };

    additionHandle();
  }, [score]);

  return (
    <>
      <Grid container spacing={1} sx={{ mt: 1, mb: 1 }}>
        <Grid item xs={4} sm={4}>
          <Title fontSize="60px">2048</Title>
        </Grid>

        <Grid item xs={8} sm={8} sx={{ display: 'flex', justifyContent: 'right' }}>
          <Stack spacing={4} direction="row" alignItems="center" justifyContent="center">
            <Score text="SCORE" score={score}>
              {showAddition && <Addition>{game.additional}</Addition>}
            </Score>
            <Score text="BEST" score={bestScore} />
          </Stack>
        </Grid>
        <Grid item xs={6} sm={6} />
        <Grid item xs={6} sm={6} sx={{ display: 'flex', justifyContent: 'right' }}>
          <Button onClick={restart}>New Game</Button>
        </Grid>
      </Grid>
      <Column>
        <GameBoard
          handlers={handlers}
          cells={game.cells}
          size={game.size}
        />
        <Message
          trigger={game.defeat}
          title="Game Over!"
          button="Restart?"
          callback={restart}
        />
        <Message
          trigger={!late && game.win}
          title="You Win!"
          button="Continue?"
          callback={lateGameCallback}
        />
      </Column>
      <ControlGroup
        show
        onLeft={leftCallback}
        onRight={rightCallback}
        onUp={upCallback}
        onDown={downCallback}
      />
    </>
  );
};

export default Game;
