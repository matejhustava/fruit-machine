import { useState } from 'react';
import 'react-material-symbols/rounded';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import InitSettings from './components/InitSettings';
import Game from './components/Game';
import React from 'react';
import { CashState } from './interfaces/CashState';
import Header from './components/Header';

function App() {
  const [gameActivated, setGameActivated] = useState<boolean>(false);
  const [cashState, setCashState] = useState<CashState>({
    machine: 10000,
    cost: 10,
    playersWallet: 300
  });
  
  function handlePlayClicked(newCashState: CashState) {
    setGameActivated((_) => true);
    setCashState((_) => newCashState);
  }

  function handleAfterSpinResultChanged(result: {machine: number, playersWallet: number}) {
    setCashState((prevState) => ({
      ...prevState,
      machine: result.machine,
      playersWallet: result.playersWallet
    }));
  }
  
  function handleLeaveGameClicked() {
    setGameActivated(() => false);
  }

  return (
    <div className="app h-screen flex flex-col items-center justify-center">
      <Header/>
      <div className="content min-w-96 max-w-lg h-[31rem] p-4 rounded-xl bg-gray-100">
        {
          gameActivated ?
            <Game
              machineCashAmount={cashState.machine}
              spinCost={cashState.cost}
              playerWalletCashAmount={cashState.playersWallet}
              afterSpinCashResultChanged={handleAfterSpinResultChanged}
              leaveMachineClicked={handleLeaveGameClicked}
            ></Game>
            : <InitSettings cashState={cashState} playClicked={handlePlayClicked}></InitSettings>
        }
      </div>
    </div>
  );
}

export default App;
