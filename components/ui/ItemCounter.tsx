import { FC, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";


interface Props {
  currentValue?: number;
  maxValue: number;

  // Methods
  updateQuantity: ( newValue: number ) => void;
}

export const ItemCounter: FC<Props> = ({ currentValue = 1, maxValue, updateQuantity }) => {

  const [counter, setCounter] = useState(currentValue);

  const incrementCounter = ( count: number ) => {
    if( counter >= maxValue ) return;
    setCounter( counter + count );
    updateQuantity( counter + count );
  }

  const decrementCounter = ( count: number ) => {
    if( counter === 0 ) return;
    setCounter( counter - count );
    updateQuantity( counter - count );
  }

  return (
    <Box display="flex" alignItems="center" >
        <IconButton
          onClick={ () => decrementCounter(1) }
        >
            <RemoveCircleOutline/>
        </IconButton>
        <Typography sx={{ width: 40, textAlign: 'center' }} >{ currentValue }</Typography>
        <IconButton
          onClick={ () => incrementCounter(1) }
        >
            <AddCircleOutline/>
        </IconButton>
    </Box>
  )
}
