import { useState } from 'react';
import 'react-material-symbols/rounded';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import InitSettings from './components/InitSettings';
import Game from './components/Game';
import { MaterialSymbol } from 'react-material-symbols';

function App() {
  const [gameActivated, setGameActivated] = useState(false);
  const [cashState, setCashState] = useState({
    machine: 10000,
    cost: 10,
    playersWallet: 300
  });
  
  function handlePlayClicked(newCashState) {
    setGameActivated((_) => true);
    setCashState((_) => newCashState);
  }

  function handleAfterSpinResultChanged(result) {
    setCashState((prevState) => ({
      ...prevState,
      machine: result.machine,
      playersWallet: result.playersWallet
    }));
  }
  
  function handleLeaveGameClicked() {
    setGameActivated(false);
  }

  return (
    <div className="app h-screen flex flex-col items-center justify-center">
      <header className="app-header text-center p-6 text-3xl text-purple-500 m-4 bg-gray-100 rounded-xl flex items-center gap-2">
        <MaterialSymbol icon="nutrition"/>
        <span>Matej's Fruit Machine</span>
        <MaterialSymbol icon="nutrition"/>
      </header>
      <div className="content min-w-96 max-w-lg h-[27.25rem] p-4 rounded-xl bg-gray-100">
        {!gameActivated && <InitSettings cashState={cashState} playClicked={handlePlayClicked}></InitSettings>}
        {gameActivated && 
          <Game
            machineCashAmount={cashState.machine}
            spinCost={cashState.cost}
            playerWalletCashAmount={cashState.playersWallet}
            afterSpinCashResultChanged={handleAfterSpinResultChanged}
            leaveMachineClicked={handleLeaveGameClicked}
          ></Game>}
      </div>
    </div>
  );
}

export default App;
