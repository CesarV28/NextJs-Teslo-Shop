import { CartList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layouts'
import { CartContext } from '@/context'
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { useContext } from 'react'

const CartPage = () => {

  const { cart } = useContext(CartContext);

  return (
    <ShopLayout title='Cart - 3' pageDescription='Cart list' >
        <Typography variant="h1" component="h1" sx={{ mb: 5 }} >Carrito</Typography>

        <Grid container >
            <Grid item xs={ 12 } sm={ 7 }  >
                <CartList editable />
            </Grid>

            <Grid item xs={ 12 } sm={ 5 }  >
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h2" >Resumen ({`${cart.length}` || 0} {`${cart.length > 1 ? 'productos' : 'producto'}`} {`en tu carrito`})</Typography>
                        <Divider sx={{ my: 1 }} />
                        
                        <OrderSummary/>
                        
                        <Box sx={{ mt: 3 }} >
                            <Button color="secondary" className="circular-btn" fullWidth >
                                Ckeckout
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default CartPage