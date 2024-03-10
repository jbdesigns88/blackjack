import React, { ReactNode, useState } from "react";
import { PlayerContext } from "../contexts/PlayerContext";
import { PlayerDataType } from "../types/DataTypes";

interface PlayerProviderType{
    children:ReactNode
}

const PlayerProvider: React.FC<PlayerProviderType> = ({children}) => {
    const [player,setPlayer] = useState<PlayerDataType | null>(null)

    const signInPlayer =  (user:PlayerDataType)=>{
        setPlayer(user)
    }
    const signOutPlayer =  ()=>{
        setPlayer(null)
    }

return (
<PlayerContext.Provider value={{player,signInPlayer,signOutPlayer}}>
        {children}
    </PlayerContext.Provider>
)
}

export default PlayerProvider