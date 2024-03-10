import React, { useState,ReactNode, useEffect,useCallback } from "react"
import { CardContext } from "../contexts/CardContext";
import { CardDataType } from "../types/DataTypes";
import axios from 'axios';

interface CardProviderType{
children: ReactNode;
}

interface  pngDataType{
    png:string
}
interface CardResponseType {
    value: string;
    suit: string;
    images: pngDataType;
  }
  
const CardProvider: React.FC<CardProviderType> = ({children}) => {
    const [selectedCards,setSetSelectedCards] = useState<CardDataType[] | null>(null)
    const [deck,setDeck] = useState<CardDataType[]>([])
    const [deckId,setDeckId] = useState<string | null>(null)
    
    const fetchAndShuffleDeck = async () => {
      try {
        // Fetch a new deck
        const newDeckResponse = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const newDeckId = newDeckResponse.data.deck_id;
        setDeckId(newDeckId);
      } catch (error) {
        console.error("Error fetching new deck:", error);
      }
    };

    useEffect(() => {
      fetchAndShuffleDeck();
    },[])


    const getNewDeck = () => {
        fetchAndShuffleDeck()
    }

    const pickCard = useCallback((howMany = 1) => {
      const DrawACard = async () => {
          try {
              if(deckId){
                  const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${howMany}`);
          
                  const drawnCards = response.data.cards;
                  const processedCards:CardDataType[]  = drawnCards.map((drawnCard:CardResponseType) => {
                      return {
                             value: drawnCard.value,
                              suit: drawnCard.suit,
                              png: drawnCard.images.png
                          }
                      
                  })

                  setSetSelectedCards(processedCards)
     
              }
              else{
                  throw new Error("issue retrieving card")
              }
    

          } catch (error) {
            console.error("Error fetching new deck:", error);
          }

          return null
        };

        return DrawACard()
        
  },[deckId])


    const shuffleDeck = () => {
        let shuffledDeck = [...deck]; 
        let currentIndex = shuffledDeck.length, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [shuffledDeck[currentIndex], shuffledDeck[randomIndex]] = [shuffledDeck[randomIndex], shuffledDeck[currentIndex]];
        }

        setDeck(shuffledDeck); 
    };
    return(
    <CardContext.Provider value={{selectedCards,pickCard,shuffleDeck,getNewDeck}}>
        {children}
    </CardContext.Provider>
    )
}

export default CardProvider