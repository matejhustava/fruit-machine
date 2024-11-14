import React from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import { CashState } from '../types/CashState';

export default function InitSettings(props: {
    cashState: CashState,
    playClicked: (cashState: CashState) => void
}) {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target = e.currentTarget;

        const fd = new FormData(e.currentTarget);
        props.playClicked({
            machine: target.machine.value,
            cost: target.cost.value,
            playersWallet: target.player.value
        });
    }

    return <form onSubmit={handleSubmit}>
        <div className="init-settings flex flex-col items-center">
            <label htmlFor="machine" className="text-purple-500 pb-2">Cash in machine (NOK)</label>
            <input className="mb-4" type="number" id="machine" name="machine" defaultValue={props.cashState.machine} min={0}></input>

            <label htmlFor="cost" className="text-purple-500 pb-2">Spin cost (NOK)</label>
            <input className="mb-4" type="number" id="cost" name="cost" defaultValue={props.cashState.cost} min={0}></input>

            <label htmlFor="player" className="text-purple-500 pb-2">Player's wallet (NOK)</label>
            <input className="mb-4" type="number" id="player" name="player" defaultValue={props.cashState.playersWallet} min={0}></input>

            <div className="actions pt-4">
                <button
                    type="submit"
                    className='flex flex-row gap-2 items-center p-4 rounded-xl bg-purple-500 text-white hover:bg-purple-600'
                ><MaterialSymbol icon="joystick" size={25}/>Let's play the machine</button>
            </div>
        </div>
    </form>
}