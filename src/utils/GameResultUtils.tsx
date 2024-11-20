import { toast } from "react-toastify";

export function getRandomColorNumber(): number {
  return Math.round(Math.random() * (1 - 4) + 4);
}

export function evaluateResult(
  result: Array<number>,
  currentMachine: number,
  currentPlayerWallet: number,
  currentFreeSpins: number,
  spinCost: number
): { machine: number, playersWallet: number, freeSpins: number} {
  let cost = currentFreeSpins === 0 ? spinCost : 0;
  let machine = currentMachine + cost;
  let playersWallet = currentPlayerWallet - cost;
  let newFreeSpins = currentFreeSpins > 0 ? currentFreeSpins - 1 : currentFreeSpins;
  
  if (isJackpot(result)) {
    playersWallet = playersWallet + machine;
    machine = 0;
    toast.success("CONGRATULATIONS!!! YOU HAVE WON THE JACKPOT!!!");
  } else if (isHalfJackpot(result)) {
    const halfOfMachineCash = Math.round((machine) / 2);
    machine = halfOfMachineCash;
    playersWallet = playersWallet + halfOfMachineCash;
    toast.warning("CONGRATULATIONS!!! YOU HAVE WON HALF OF THE JACKPOT!!!");
  } else if (isSmallPrize(result)) {
    for (let i = 0; i < 5; i++) {
      machine = machine - spinCost;
      if (machine < 0) {
        newFreeSpins = newFreeSpins + 1;
        machine = machine + spinCost;
      } else {
        playersWallet = playersWallet + spinCost;
      }
    }
    toast.info("YOU HAVE WON SMALL PRIZE!!!");
  }

  if (playersWallet - spinCost < 0 && newFreeSpins === 0) {
    toast.error("YOU DON'T HAVE ENOUGH MONEY FOR ANOTHER SPIN");
  }

  return {
    machine,
    playersWallet,
    freeSpins: newFreeSpins
  }
}

export function isJackpot(result: Array<number>): boolean {
  return result.every(val => val === result[0]);
}

export function isHalfJackpot(result: Array<number>): boolean {
  const map = new Map();
  result.forEach(r => {
    map.set(r, true);
  });
  return result.length === map.size;
}

export function isSmallPrize(result: Array<number>): boolean {
  for (let index = 0; index < result.length; index++) {
    if (result[index] === result[index + 1]) {
      return true;
    }
  }
  return false;
}