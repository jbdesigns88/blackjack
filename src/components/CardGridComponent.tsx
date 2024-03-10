import React from 'react';
import { Box, Typography } from '@mui/material';
import CardComponent from './CardComponent';
import { CardDataType } from '../types/DataTypes';

interface CardGridProps {
  cards: CardDataType[];
  title: string;
}

const CardGrid: React.FC<CardGridProps> = ({ cards, title }) => {
  return (
    <Box sx={{ width: '100%', mt: 2 }}>

      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', color: 'white' , fontSize:{xs: '0.8em', sm: '1em',  md: '1.25em',}}}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '3px', justifyContent: 'center' }}>
        {cards.map((card, index) => (
          <Box key={`card-${index}`} sx={{ flex: '1 0 auto', maxWidth: 'calc(33.333% - 3px)' }}>
            <CardComponent card={card} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CardGrid;
