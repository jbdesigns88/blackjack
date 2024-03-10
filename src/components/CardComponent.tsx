// CardComponent.jsx
import React from 'react';
import { CardDataType } from '../types/DataTypes';
import { Box } from '@mui/material';


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





