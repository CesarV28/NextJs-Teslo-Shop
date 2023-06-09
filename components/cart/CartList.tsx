import { FC, useContext } from "react";
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";

import { ItemCounter } from "../ui";

import { CartContext } from "@/context";
import { ICartProduct } from "@/interfaces";


interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {

  const { cart, updateCartQuantity,  removeProductInCart } = useContext(CartContext);  

  const onNewCartQuantityValue = ( product: ICartProduct, newQuantityValue: number ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity( product );
  }

  const onRemoveProduct = ( product: ICartProduct ) => {
    removeProductInCart( product );
  }

  return (
    <>
        {
            cart.map( product => (
               <Grid container spacing={ 2 } key={ product.slug + product.size } sx={{ mb: 1 }} >
                    <Grid item xs={ 3 } >
                        {/* Llevar a la pagina del producto */}
                        <NextLink href={`/product/${ product.slug }`} passHref legacyBehavior >
                            <Link>
                                <CardActionArea>
                                    <CardMedia 
                                        image={`/products/${ product.image }`}
                                        component="img"
                                        sx={{ borderRadius: '5px' }}
                                    />
                                </CardActionArea>
                            </Link>
                        </NextLink>
                    </Grid>
                    <Grid item xs={ 7 } >
                        <Box display="flex" flexDirection="column" >
                            <Typography variant="body1" >{ product.title }</Typography>
                            <Typography variant="body1" >Talla: <strong>{ product.size }</strong></Typography>
                            {/* Conditional */}
                            {
                                editable
                                ? <ItemCounter updateQuantity={ (value) => onNewCartQuantityValue(product, value) } maxValue={ 10 } currentValue={ product.quantity } />
                                : <Typography>Cantidad: { product.quantity } { product.quantity > 1 ? 'productos' : 'producto' } </Typography> 
                            }
                            
                        </Box>
                    </Grid>
                    <Grid item xs={ 2 } display="flex" alignItems="center" flexDirection="column" >
                        <Typography variant="subtitle1" >{`$${ product.price }`}</Typography>
                        {/* Editable */}
                         {
                            editable && (
                                <Button 
                                    onClick={ () => onRemoveProduct( product ) }
                                    variant="text" 
                                    color="secondary" 
                                >
                                    Remover
                                </Button>  
                            )
                         }
                    </Grid>
               </Grid>
            ))
        }
    </>
  )
}
