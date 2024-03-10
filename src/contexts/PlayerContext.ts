import { useContext,createContext } from "react";

import { CardDataType, PlayerDataType } from "../types/DataTypes";
import { GameStatus } from "../types/constants";

interface PlayerContextType {
        player:PlayerDataType | null
        signInPlayer: (user:PlayerDataType)=>void
        signOutPlayer: ()=>void
  }

export const PlayerContext = createContext<PlayerContextType | null>(null)



export const usePlayerContext = () => {
    const context = useContext(PlayerContext)
    if(!context){
        throw new Error(" Player context needs to be wrapped in a provider ")
    }
    return context
}
