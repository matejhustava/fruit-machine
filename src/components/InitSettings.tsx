import React from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import { CashState } from '../interfaces/CashState';
import Button from '../UI/Button';
import Label from '../UI/Label';
import LabeledNumberInput from '../UI/LabeledNumberInput';

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
        <LabeledNumberInput id="machine" label="Cash in machine (NOK)" defaultValue={props.cashState.machine} min={0}></LabeledNumberInput>
        <LabeledNumberInput id="cost" label="Spin cost (NOK)" defaultValue={props.cashState.cost} min={0}></LabeledNumberInput>
        <LabeledNumberInput id="player" label="Player's wallet (NOK)" defaultValue={props.cashState.playersWallet} min={0}></LabeledNumberInput>

        <div className="actions pt-4">
          <Button type="submit" primary><MaterialSymbol icon="joystick" size={25} /><span>Let's play the machine</span></Button>
        </div>
      </div>
    </form>
  );
}