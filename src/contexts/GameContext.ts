import { useContext,createContext } from "react";

import { CardDataType } from "../types/DataTypes";
import { GameStatus } from "../types/constants";

interface GameContextType {
    playCard: (card: CardDataType,forHouse?:boolean) => void;
    handleStand: () => void;
    startGame: (start?:boolean) => void;
    resetGame: () => void;
    updateAllowChecks: () => void;
    userPoints:number;
    housePoints:number
    userWon:boolean;
    gameStatus:GameStatus
  }

export const GameContext = createContext<GameContextType | null>(null)



export const useGameContext = () => {
    const context = useContext(GameContext)
    if(!context){
        throw new Error("Game context needs to be wrapped in a provider ")
    }
    return context
}
