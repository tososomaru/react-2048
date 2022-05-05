import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ControlPanel from './components/ControlPanel';
import Score from './components/Score';
import Button from './components/Button';
import Grid from './components/Grid';
import Footer from './components/Footer';
import Message from './components/Message';
import Addition from './components/Addition';
import Column from './Styles/Column';
import Title from './Styles/Title';
import Container from './Styles/Row';

import play from './logic/play';

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
  const [additionalNumber, setAdditionalNumber] = useState({ row: 0, col: 0 });

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const moveCallback = (direction) => {
    const {
      nextField,
      additional,
      defeat,
      victory,
      additionalNumber: newNumber,
    } = play({
      prevField: numbers,
      direction,
      isNewGame: false,
    });

    if (additional) {
      setChangedScore(additional);
    }

    if (newNumber) {
      setAdditionalNumber(newNumber);
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
        <span />
        <Button onClick={restartCallback}>New Game</Button>
      </ControlPanel>
      <Column height="500px" width="500px">
        <Grid numbers={numbers} additionalNumber={additionalNumber} />
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
