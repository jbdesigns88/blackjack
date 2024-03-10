import React, { ReactNode,  useState } from "react";
import { GameContext } from "../contexts/GameContext";
import { CardDataType } from "../types/DataTypes";
import { FaceCards, GameStatus } from "../types/constants";

interface GameProviderProps {
  children: ReactNode;
}

const faceCards = [FaceCards.KING,FaceCards.QUEEN,FaceCards.JACK]

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [userPoints, setUserPoints] = useState(0);
  const [housePoints, setHousePoints] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [userWon, setUserWon] = useState(false);



  const winningTarget = 21;

  const userHitTheTargetPoint = () => {
    return userPoints === winningTarget
  }

  const userHasMorePointsThanHouse = () =>  {
    return userPoints > housePoints
  }

  const userPointsPassedTargetPoint = () => {
    return  userPoints > winningTarget
  }

  const userTiedWithHouse = () => {
   return  userPoints === housePoints
  }
  const userHasLessPointsThanHouseAndLessThanTarget =() => {
    return (!userHasMorePointsThanHouse()) && (!userTiedWithHouse()) && (!userPointsPassedTargetPoint())
  }

  const winningRequirements = ()=>{
    return userHitTheTargetPoint() ||  userHasMorePointsThanHouse()
  }

  const losingRequirements = () => {
    return  (userTiedWithHouse()) || (userPointsPassedTargetPoint()) || (userHasLessPointsThanHouseAndLessThanTarget())
  }
  const checkIfUserWon = () => {
    
      if (winningRequirements()) {
        setUserWon(true);
        setGameStatus(GameStatus.GAME_OVER);
      }

      if (losingRequirements()) {
        setUserWon(false);
        setGameStatus(GameStatus.GAME_OVER);
      }

  
  };



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
    setGameStatus(GameStatus.GAME_OVER);
    checkIfUserWon()
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
    setGameStatus(GameStatus.IDLE)
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
        checkIfUserWon
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
