import React, { useState,ReactNode, useEffect } from "react"
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
    const [remainingCards,setRemainingCards] = useState<number | null>(null)
    const [deck,setDeck] = useState<CardDataType[]>([])
    const [deckId,setDeckId] = useState<string | null>(null)
    

    useEffect(() => {
        const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
        const fetchAndShuffleDeck = async () => {
            try {
              // Fetch a new deck
              const newDeckResponse = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
              const newDeckId = newDeckResponse.data.deck_id;
              setDeckId(newDeckId);
              setRemainingCards(newDeckResponse.data.remaining)
            } catch (error) {
              console.error("Error fetching new deck:", error);
            }
          };
      
          fetchAndShuffleDeck();

    },[])


    const pickCard = (howMany = 1) => {
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
                    setRemainingCards(response.data.remaining)
                }
                else{
                    throw new Error("issue retrieving card")
                }
              // Fetch a new deck

            } catch (error) {
              console.error("Error fetching new deck:", error);
            }

            return null
          };

          return DrawACard()
          
    }

    const shuffleDeck = () => {
        let shuffledDeck = [...deck]; // Make a copy of the deck to shuffle
        let currentIndex = shuffledDeck.length, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [shuffledDeck[currentIndex], shuffledDeck[randomIndex]] = [shuffledDeck[randomIndex], shuffledDeck[currentIndex]];
        }

        setDeck(shuffledDeck); // Update the state with the shuffled deck
    };
    return(
    <CardContext.Provider value={{selectedCards,pickCard,shuffleDeck}}>
        {children}
    </CardContext.Provider>
    )
}

export default CardProvider