import React from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import { CashState } from '../interfaces/CashState';
import Button from './Button';
import Label from './Label';

export default function InitSettings(props: {
  cashState: CashState,
  playClicked: (cashState: CashState) => void
}) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const target = e.currentTarget;

    const fd = new FormData(e.currentTarget);
    props.playClicked({
      machine: target.machine.value,
      cost: target.cost.value,
      playersWallet: target.player.value
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="init-settings flex flex-col items-center">
        <Label htmlFor="machine">Cash in machine (NOK)</Label>
        <input className="mb-4" type="number" id="machine" name="machine" defaultValue={props.cashState.machine} min={0}></input>

        <Label htmlFor="cost">Spin cost (NOK)</Label>
        <input className="mb-4" type="number" id="cost" name="cost" defaultValue={props.cashState.cost} min={0}></input>

        <Label htmlFor="player">Player's wallet (NOK)</Label>
        <input className="mb-4" type="number" id="player" name="player" defaultValue={props.cashState.playersWallet} min={0}></input>

        <div className="actions pt-4">
          <Button type="submit" primary><MaterialSymbol icon="joystick" size={25} /><span>Let's play the machine</span></Button>
        </div>
      </div>
    </form>
  );
}