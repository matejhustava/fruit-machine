import { useState } from 'react';
import 'react-material-symbols/rounded';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import InitSettings from './components/InitSettings';
import Game from './components/Game';

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
    <div className="app">
      <header className="app-header">
        Matej's Fruit Machine
      </header>
      <div className="content">
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
