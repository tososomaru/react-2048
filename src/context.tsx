import React, {
  createContext, FC, useContext, useState,
} from 'react';
import { play } from './logic/game/board';

const Context = createContext();

type Props = {
  children: React.ReactNode
};

type Settings = {
  size: number,
  show: boolean,
  shake: boolean,
  night: boolean,
};

type ContextProps = {
  data: Settings,
  setValues: CallableFunction,
};

const ContextProvider: FC<Props> = ({ children }) => {
  const [data, setData] = useState({
    size: 4, show: true, shake: true, night: false, game: play({ isNewGame: true, size: 4 }), score: 0, bestScore: 0,
  });

  const setValues = (values: any) => {
    setData((prevState) => ({
      ...prevState,
      ...values,
    }));
  };

  const value: ContextProps = { data, setValues };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;

export const useData = () => useContext(Context);
