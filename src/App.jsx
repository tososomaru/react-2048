import React, { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import ControlPanel from './components/ControlPanel/ControlPanel';
import Score from './components/Score/Score';
import Button from './components/Button/Button';
import Grid from './components/Grid/Grid';
import Title from './components/Styles/Title';
import Container from './components/Styles/Row';
import Message from './components/Message/Message';
import Addition from './components/Addition/Addition';
import Column from './components/Styles/Column';
import Footer from './components/Footer/Footer';
import play from './functools/play';

const KeyDirections = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
};

const App = () => {
  const [numbers, setNumbers] = useState(play({ isNewGame: true }).nextField);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isLoss, setIsLoss] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [changedScore, setChangedScore] = useState(0);
  const [showAddition, setShowAddition] = useState(false);
  const [freeGame, setFreeGame] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const moveCallback = (direction) => {
    const { nextField, additional, defeat, victory } = play({
      prevField: numbers,
      direction,
      isNewGame: false,
    });

    if (additional) {
      setChangedScore(additional);
    }

    setNumbers(nextField);
    setScore(score + changedScore);
    if (!freeGame) {
      setIsWin(victory);
    }
    setIsLoss(defeat);
    if (score >= bestScore) {
      setBestScore(score + changedScore);
    }
  };

  const restartCallback = () => {
    const { nextField } = play({ isNewGame: true });
    setNumbers(nextField);
    setScore(0);
    setIsLoss(false);
    setIsWin(false);
    setFreeGame(false);
  };

  const handleKeyPress = (event) => {
    if (isWin) {
      setFreeGame(true);
    }
    if (isLoss) {
      return;
    }
    if (Object.keys(KeyDirections).includes(event.code)) {
      moveCallback(KeyDirections[event.code]);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [numbers]);

  useEffect(() => {
    const additionHandle = async () => {
      if (score) {
        setShowAddition(true);
        await delay(600);
        setShowAddition(false);
      }
    };

    additionHandle();
  }, [changedScore]);

  return (
    <Layout>
      <ControlPanel>
        <Title fontWeight="100px">2048</Title>
        <Container>
          <Score text="SCORE" score={score}>
            {showAddition && <Addition>{changedScore}</Addition>}
          </Score>
          <Score text="BEST" score={bestScore} />
        </Container>
      </ControlPanel>
      <ControlPanel>
        <span></span>
        <Button onClick={restartCallback}>New Game</Button>
      </ControlPanel>
      <Column height="500px" width="500px">
        <Grid numbers={numbers} />
        <Message
          trigger={isLoss}
          title="Game Over!"
          button="Restart?"
          callback={restartCallback}
        />
        <Message
          trigger={isWin && !freeGame}
          title="You Win!"
          button="Continue?"
          callback={() => setFreeGame(true)}
        />
      </Column>
      <Footer />
    </Layout>
  );
};

export default App;
