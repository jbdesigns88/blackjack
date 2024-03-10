import React, { useEffect, useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import GameProvider from "../providers/GameProvider";
import { GameStatus } from "../types/constants";
import { CardDataType } from "../types/DataTypes";
import CardComponent from "./CardComponent";
import CardGrid from "./CardGridComponent";
import CardProvider from "../providers/CardProvider";
import { useCardContext } from "../contexts/CardContext";
import { Grid, Typography, Button, Box } from "@mui/material";
import PlayerProvider from "../providers/PlayerProvider";
import { usePlayerContext } from "../contexts/PlayerContext";
import Player from "./PlayerComponent";

  
const BlackJack = () => {
  const {
    playCard,
    userWon,
    userPoints,
    housePoints,
    gameStatus,
    handleStand,
    startGame,
    resetGame,
    updateAllowChecks
  } = useGameContext();
  const { getNewDeck, pickCard, selectedCards } = useCardContext();
  const {player} = usePlayerContext()

  const [drawnCards,setDrawnCards] = useState<CardDataType[] | null>(null);
  const [currentCard, setCurrentCard] = useState<CardDataType | null>(null);

  const [houseCards, setHouseCards] = useState<CardDataType[]>([]);
  const [userCards, setUserCards] = useState<CardDataType[]>([]);

  const [message, setMessage] = useState("");


  useEffect(() => {
    if(gameStatus === GameStatus.DRAWING_PHASE){
        pickCard(4)
    }
    if (gameStatus === GameStatus.GAME_OVER) {
      setMessage(userWon ? "You Won!" : " You Lost!");
    }
  }, [gameStatus]);

  useEffect(() => {
    if(selectedCards){setDrawnCards(selectedCards)}
  },[selectedCards])

  useEffect(() => {

    if( drawnCards && drawnCards.length > 0){
        const cardToDistribute = drawnCards[drawnCards.length - 1];

        if(drawnCards.length % 2 === 0){
            setHouseCards(prevHouseCards => [...prevHouseCards, cardToDistribute]);
        }
        else{
            setUserCards(prevUserCards => [...prevUserCards, cardToDistribute]);
        }

        setDrawnCards(drawnCards.slice(0,-1))
    }



  },[drawnCards])

  useEffect(() => {
    userCards.forEach((userCard) => {
        playCard(userCard)
        if(gameStatus === GameStatus.GAME_IN_MOTION){
            setCurrentCard(userCard)
        }
    })
  },[userCards])

  useEffect(() => {
    houseCards.forEach((houseCard) => {
        playCard(houseCard, true)
    })
  },[houseCards])


  useEffect(() => {
    if(userCards.length > 2){
        updateAllowChecks()
    }
  },[userPoints])

  useEffect(() => {
    if(gameStatus === GameStatus.DRAWING_PHASE && drawnCards?.length === 0){
       if(userCards.length === 2 && houseCards.length === 2){
            startGame()
        }

    }
   
  },[userPoints,housePoints,drawnCards])



  const handleHit = () => {

    if ( gameStatus === GameStatus.GAME_IN_MOTION ) {
        pickCard()
        
    }

    console.log(`${JSON.stringify(selectedCards)}`)
  };

  const handleStart = (drawingPhase = false) => {
    startGame(drawingPhase);
  };

  const handlePlayAgain = () => {
    setDrawnCards(null)
    setCurrentCard(null)
    setHouseCards([])
    setUserCards([])
    resetGame()
    getNewDeck()

  };

  return (
    <>
    <Box> 
   <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' , pb:{ xs:'200px',sm:'0'} }}>
      {gameStatus === GameStatus.GAME_OVER && <Typography variant="h4" sx={{ mb: 2, color: 'white' }}>{userWon ? "You Won!" : "You Lost!"}</Typography>}
      <Grid item spacing={2} justifyContent="center">
        {gameStatus === GameStatus.IDLE && (
          <Button sx={styles.startButton} onClick={() => handleStart(true)}>Start Game</Button>
        )}
        {(gameStatus === GameStatus.GAME_IN_MOTION || gameStatus === GameStatus.DRAWING_PHASE) && (
          <Button sx={styles.standButton} onClick={handleStand}>Stand</Button>
        )}
        {gameStatus === GameStatus.GAME_OVER && (
          <Button sx={styles.playAgainButton} onClick={handlePlayAgain}>Play Again</Button>
        )}
        {gameStatus === GameStatus.GAME_IN_MOTION && (
          <Button sx={styles.hitButton} onClick={handleHit}>Hit</Button>
        )}
      </Grid>

      <Grid  item xs={12} sx={{width:"100%" , maxWidth:"640px"}}  alignItems="center" justifyContent="center">
            <Grid container xs={12} spacing={3} >
                <Grid item xs={6}>
                    <Typography sx={styles.score}>House Points: {housePoints}</Typography>
                  
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={styles.score}> {player?.username} Points: {userPoints}</Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12}>
            
        {(currentCard )&& 
        (
            <>
             <Typography sx={{color:"#FFD700"}}>Current Card:</Typography>
        <CardComponent card={currentCard} mainDisplay={true} />
        </>
        )
        }
        </Grid>


    </Grid>
 
         <Grid sx={styles.gameCardsContainer} xs={12} container>
                <Grid xs={12} sm={6} item>
                    <CardGrid cards={houseCards} title="House Cards" />
                  
                </Grid>
                <Grid xs={12} sm={6} item>
                    <CardGrid cards={userCards} title={`${player?.username} Cards`} />
                </Grid>
            </Grid>
          
        </Box>
    
    </>
  );
};


const ShowLoginOrGame = () => {
  const {player} = usePlayerContext()

  return player == null ? <Player/> : <BlackJack/>
}
const Game = () => {
  return (
    <>
    <PlayerProvider>
      <GameProvider>
        <CardProvider>
          <ShowLoginOrGame/>
        </CardProvider>
      </GameProvider>
      </PlayerProvider>
    
    </>
  );
};

export default Game;

const styles = {
  gameCardTopContainer: {
    padding: "10px 20px",
  },
  cardUserInfo: {
    color: "#FFFFFF",
    fontSize: "1em",
    textAlign: "left",
  },
  gameCardsContainer: {
    position:"fixed",
    bottom:0,

    borderTop: "2px solid #FFD700",
    backgroundColor: "#41322C",
    boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.2)',
    padding: "10px 20px",
  },
  startButton: {
    backgroundColor: "#FFD700", 
    color: "#173517", 
    "&:hover": {
      backgroundColor: "#E6C200",
    },
  },
  hitButton:{
    backgroundColor: "#C0C0C0",
    margin:"0 5px",
    color: "#173517",
    "&:hover": {
      backgroundColor: "#A8A8A8",
    },
  },
  standButton: {
    backgroundColor: "#C0C0C0", 
    color: "#173517",
    "&:hover": {
      backgroundColor: "#A8A8A8",
    },
  },
  playAgainButton: {
    backgroundColor: "#FFD700",
    color: "#173517",
    "&:hover": {
      backgroundColor: "#E6C200",
    },
  },
  score: {
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#f5f5dc",
    color: "#173517",
    width: "100%",
    fontSize:{xs: '0.7em', sm: '1em'}

  },


};


