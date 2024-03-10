// CardComponent.jsx
import React, { useEffect, useState  }  from 'react';
import { CardDataType } from '../types/DataTypes';
import { Box } from '@mui/material';
const suitSymbols: { [key: string]: string } = {
    'Clubs': '♣',
    'Diamonds': '♦',
    'Hearts': '♥',
    'Spades': '♠'
};

const CardComponent = ({ card,mainDisplay=false }: {card:CardDataType,mainDisplay?:boolean}) => {
    return card && (

        
        <Box
        component="img"
        sx={{
          width: '100%',
          maxWidth: mainDisplay ? '120px' : '80px',
        }}
        alt="Playing Card"
        src={card.png}
      />
    );
};

export default CardComponent;





