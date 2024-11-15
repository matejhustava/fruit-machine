import React from 'react';
import { useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import { ToastContainer, toast } from 'react-toastify';
import Button from './Button';
import Label from './Label';

export default function Game(props: {
  machineCashAmount: number,
  spinCost: number,
  playerWalletCashAmount: number,
  afterSpinCashResultChanged: (result: { machine: number, playersWallet: number }) => void,
  leaveMachineClicked: () => void
}) {
  const [result, setResult] = useState([1, 2, 3, 4])
  const [freeSpins, setFreeSpins] = useState(0);

  function handleSpin(): void {
    toast.dismiss();
    const newResult = [getRandomColorNumber(), getRandomColorNumber(), getRandomColorNumber(), getRandomColorNumber()];
    setResult(() => [...newResult]);
    evaluateResult(newResult);
    if (freeSpins > 0) {
      setFreeSpins((prevState) => prevState - 1);
    }
  }

  function getRandomColorNumber(): number {
    return Math.round(Math.random() * (1 - 4) + 4);
  }

  function evaluateResult(result: Array<number>): void {
    let machine = +props.machineCashAmount;
    let playersWallet = +props.playerWalletCashAmount;
    let newFreeSpins = +freeSpins;
    let cost = freeSpins === 0 ? +props.spinCost : 0;

    if (isJackpot(result)) {
      playersWallet = playersWallet + machine;
      machine = 0;
      toast.success("CONGRATULATIONS!!! YOU HAVE WON THE JACKPOT!!!");
    } else if (isHalfJackpot(result)) {
      const halfOfMachineCash = Math.round((machine + cost) / 2);
      machine = halfOfMachineCash;
      playersWallet = playersWallet - cost + halfOfMachineCash;
      toast.warning("CONGRATULATIONS!!! YOU HAVE WON HALF OF THE JACKPOT!!!");
    } else if (isSmallPrize(result)) {
      for (let i = 0; i < 5; i++) {
        machine = machine - +props.spinCost;
        if (machine < 0) {
          newFreeSpins = newFreeSpins + 1;
          machine = machine + +props.spinCost;
        } else {
          playersWallet = playersWallet + +props.spinCost;
        }
      }
      toast.info("YOU HAVE WON SMALL PRIZE!!!");
    } else {
      machine = machine + cost;
      playersWallet = playersWallet - cost;
    }

    props.afterSpinCashResultChanged({
      machine,
      playersWallet
    });
    setFreeSpins(() => newFreeSpins)

    if (playersWallet - props.spinCost < 0 && newFreeSpins === 0) {
      toast.error("YOU DON'T HAVE ENOUGH MONEY FOR ANOTHER SPIN");
    }
  }

  function isJackpot(result: Array<number>): boolean {
    return result.every(val => val === result[0]);
  }

  function isHalfJackpot(result: Array<number>): boolean {
    const map = new Map();
    result.forEach(r => {
      map.set(r, true);
    });
    return result.length === map.size;
  }

  function isSmallPrize(result: Array<number>): boolean {
    return false;
    for (let index = 0; index < result.length; index++) {
      if (result[index] === result[index + 1]) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="game flex flex-col items-center">
      <Label><span>JACKPOT: </span><b>{props.machineCashAmount}</b><span>NOK</span></Label>
      <Label><span>PLAYERS WALLET: </span><b>{props.playerWalletCashAmount}</b><span>NOK</span></Label>
      <Label><span>SPIN COST: </span><b>{props.spinCost}</b><span>NOK</span></Label>
      <Label><span>FREE SPINS: </span><b>{freeSpins}</b></Label>

      <div className='machine'>
        {result.map((r, index) => <div key={index} className={'slot color' + r}></div>)}
      </div>

      <div className="actions pt-4v flex flex-col items-center gap-4">
        <Button
          type="button"
          primary
          onClick={handleSpin}
          disabled={props.playerWalletCashAmount - props.spinCost < 0}
        ><MaterialSymbol icon="play_arrow" size={25} /><span>Spin it!</span></Button>
        <Button
          type="button"
          onClick={props.leaveMachineClicked}
        ><MaterialSymbol icon="logout" size={25} /><span>Leave the machine</span></Button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}