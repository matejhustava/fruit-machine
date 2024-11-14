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
        <div className="init-settings flex flex-col items-center">
            <label htmlFor="machine" className="text-purple-500 pb-2">Cash in machine (NOK)</label>
            <input className="mb-4" type="number" name="machine" defaultValue={cashState.machine} min={0}></input>

            <label htmlFor="cost" className="text-purple-500 pb-2">Spin cost (NOK)</label>
            <input className="mb-4" type="number" name="cost" defaultValue={cashState.cost} min={0}></input>

            <label htmlFor="player" className="text-purple-500 pb-2">Player's wallet (NOK)</label>
            <input className="mb-4" type="number" name="player" defaultValue={cashState.playersWallet} min={0}></input>

            <div className="actions pt-4">
                <button
                    type="submit"
                    className='flex flex-row gap-2 items-center p-4 rounded-xl bg-purple-500 text-white hover:bg-purple-600'
                ><MaterialSymbol icon="joystick" size={25}/>Let's play the machine</button>
            </div>
        </div>
    </form>
}