import React from 'react';
import { useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import { toast } from 'react-toastify';
import Button from '../UI/Button';
import Label from '../UI/Label';
import { evaluateResult, getRandomColorNumber } from '../utils/GameResultUtils';

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

    const newValues = evaluateResult(newResult, props.machineCashAmount, props.playerWalletCashAmount, freeSpins, props.spinCost);
    props.afterSpinCashResultChanged({
      machine: newValues.machine,
      playersWallet: newValues.playersWallet
    });
    setFreeSpins(() => newValues.freeSpins);
  }

  return (
    <div className="game flex flex-col items-center">
      <Label><span>Jackpot: </span><b>{props.machineCashAmount}</b><span> NOK</span></Label>
      <Label><span>Player's waller: </span><b>{props.playerWalletCashAmount}</b><span> NOK</span></Label>
      <Label><span>Free spins: </span><b>{freeSpins}</b></Label>

      <div className='machine'>
        {result.map((r, index) => <div key={index} className={'slot color' + r}></div>)}
      </div>

      <div className="actions pt-4v flex flex-col items-center gap-4">
        <Button
          type="button"
          primary
          onClick={handleSpin}
          disabled={props.playerWalletCashAmount - props.spinCost < 0}
        ><MaterialSymbol icon="play_arrow" size={25} /><span>Spin it for {props.spinCost} NOK!</span></Button>
        <Button
          type="button"
          onClick={props.leaveMachineClicked}
        ><MaterialSymbol icon="logout" size={25} /><span>Leave the machine</span></Button>
      </div>
    </div>
  );
}