import { useContext,createContext } from "react";

import { CardDataType } from "../types/DataTypes";


interface CardContextType {
    selectedCards:CardDataType[] | null;
    pickCard:(howMany?:number)=>void
    shuffleDeck:()=>void
    getNewDeck: () => void
  }

export const CardContext = createContext<CardContextType | null>(null)



export const useCardContext = () => {
    const context = useContext(CardContext)
    if(!context){
        throw new Error("Card context needs to be wrapped in a provider ")
    }
    return context
}
