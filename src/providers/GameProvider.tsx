import React, { ReactNode, useEffect, useState,useRef } from "react";
import { GameContext } from "../contexts/GameContext";
import { CardDataType } from "../types/DataTypes";
import { FaceCards, GameStatus } from "../types/constants";
import Game from "../components/GameComponent";
interface GameProviderProps {
  children: ReactNode;
}

const faceCards = [FaceCards.KING,FaceCards.QUEEN,FaceCards.JACK]

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [userPoints, setUserPoints] = useState(0);
  const [housePoints, setHousePoints] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [userWon, setUserWon] = useState(false);
  const [allowChecks,setAllowCheck] = useState(false)
  const intialLoad = useRef(true)

  const winningTarget = 21;

  const checkIfUserWon = () => {
    if (userPoints === winningTarget || userPoints > housePoints) {
      setUserWon(true);
      console.log(`${userPoints} vs ${housePoints}`)
      setGameStatus(GameStatus.GAME_OVER);
    }

    if (
      userPoints === housePoints ||
      userPoints > winningTarget ||
      (userPoints < winningTarget && userPoints < housePoints)
    ) {
      setUserWon(false);
      setGameStatus(GameStatus.GAME_OVER);
    }
  };

  useEffect(() => {
        
        if (gameStatus === GameStatus.GAME_IN_MOTION && allowChecks) {
            checkIfUserWon();
        }
  

  }, [userPoints,gameStatus]);

  useEffect(() => {
    if(allowChecks){
        console.log("checking if you win")
        checkIfUserWon();
    }
  },[allowChecks])


  const startGame = (drawingPhase = false) => {
    drawingPhase ? startDrawingPhase() : startNormalGame();
  };

  const startNormalGame = () => {
    setGameStatus(GameStatus.GAME_IN_MOTION);
  };

  const startDrawingPhase = () => {
    setGameStatus(GameStatus.DRAWING_PHASE);
  };

  const handleStand = () => {
    checkIfUserWon()
    setGameStatus(GameStatus.GAME_OVER);
  
  };

  const playCard = (card: CardDataType, forHouse = false) => {
    const cardValue = getValueOfCard(card);
    addPoints(cardValue, forHouse);
  };

  const getValueOfCard = (card: CardDataType) => {
    const faceCardsLower = faceCards.map(fc => fc.toLowerCase());
    const cardValueLower = card.value.toLowerCase()

    if (cardValueLower  === FaceCards.ACE.toLowerCase()) {
      return calculateAceCard(userPoints);
    } else if (faceCardsLower.includes(cardValueLower as FaceCards)) {
      return 10;
    } else {
      return parseInt(card.value);
    }
  };

  const calculateAceCard = (currentPoints: number) => {
    return currentPoints <= 10 ? 11 : 1;
  };
  const updateAllowChecks = () => {
    setAllowCheck(true)
  }

  const addPoints = (points: number, forHouse = false) => {
    if(gameStatus !== GameStatus.GAME_OVER && userPoints <= winningTarget && housePoints  <= winningTarget ){
        if (!forHouse) {
        setUserPoints( userPoints + points);
        } else {
        setHousePoints(
            housePoints + points
        );
        }
    }
   
  };

  const resetGame = () => {
    setUserPoints(0)
    setHousePoints(0)
    setGameStatus(GameStatus.DRAWING_PHASE)
  };

  return (
    <GameContext.Provider
      value={{
        playCard,
        userPoints,
        housePoints,
        userWon,
        gameStatus,
        handleStand,
        startGame,
        resetGame,
        updateAllowChecks
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
