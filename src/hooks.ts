import {
  useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import { play } from './logic/game/board';

// TODO: остается до тех пор, пока не выяснится
//  почему не робит свойство scroll-action одновременно для pan-x и pan-y
const useBodyScrollLock = () => {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = originalStyle);
  }, []);
};

const useLeave = (callback: CallableFunction) => {
  useEffect(() => () => {
    callback();
  }, []);
};

const useKeydown = (key: string, callback: (event: Event) => void) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler: EventListener = (event) => {
      if ((event as KeyboardEvent).key === key) {
        callbackRef.current(event);
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [key]);
};

const useGame = (data, setValues) => {
  const [game, setGame] = useState(() => data.game);
  const [score, setScore] = useState(data.score);
  const [bestScore, setBestScore] = useState(data.bestScore);

  useEffect(() => () => {
    setValues({
      game,
      score,
      bestScore,
    });
  }, [game.cells, score, bestScore]);

  const move = (direction: string) => {
    const gamePayload = play({ field: game.cells, direction, size: data.size });
    setGame(gamePayload);
    const newScore = score + gamePayload.additional;
    setScore(newScore);
    setBestScore(newScore > bestScore ? newScore : bestScore);
  };

  const restart = () => {
    setGame(play({ isNewGame: true, size: data.size }));
    setScore(0);
  };

  const resize = (size: number) => {
    setValues({ game: play({ isNewGame: true, size }) });
    setScore(0);
  };

  return {
    game, move, restart, score, bestScore, resize,
  };
};

export {
  useBodyScrollLock, useKeydown, useLeave, useGame,
};
