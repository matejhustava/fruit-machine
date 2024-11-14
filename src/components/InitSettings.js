import { MaterialSymbol } from 'react-material-symbols';

export default function InitSettings({cashState, playClicked}) {
    function handleSubmit(e) {
        e.preventDefault();

        const fd = new FormData(e.target);
        playClicked({
            machine: fd.get('machine'),
            cost: fd.get('cost'),
            playersWallet: fd.get('player')
        });
    }

    return <form onSubmit={handleSubmit}>
        <div className="init-settings">
            <label htmlFor="machine">Cash in machine (NOK)</label>
            <input type="number" name="machine" defaultValue={cashState.machine} min={0}></input>

            <label htmlFor="cost">Spin cost (NOK)</label>
            <input type="number" name="cost" defaultValue={cashState.cost} min={0}></input>

            <label htmlFor="player">Player's wallet (NOK)</label>
            <input type="number" name="player" defaultValue={cashState.playersWallet} min={0}></input>

            <div className="actions">
                <button type="submit" className='primary'><MaterialSymbol icon="joystick"/>Let's play the machine</button>
            </div>
        </div>
    </form>
}