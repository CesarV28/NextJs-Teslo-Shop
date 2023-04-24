import NextLink from 'next/link';
import { CartList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layouts'
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'


const SummaryPage = () => {

  return (
    <ShopLayout title='Resume order' pageDescription='Resume order' >
        <Typography variant="h1" component="h1" sx={{ mb: 5 }} >Resumen de la orden</Typography>

        <Grid container >
            <Grid item xs={ 12 } sm={ 7 }  >
                <CartList />
            </Grid>

            <Grid item xs={ 12 } sm={ 5 }  >
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h2" >Orden</Typography>
                        <Divider sx={{ my: 1 }} />

                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1, mt: 2 }}>
                            <Typography variant="subtitle1" >Direccion de entrega</Typography>  
                            <NextLink href="/checkout/address" passHref legacyBehavior >
                                <Link underline="always" >
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>       

                        <Typography>Cesar Vargas</Typography>                    
                        <Typography>Rio Blanco 821</Typography>                    
                        <Typography>Zapopan, Jalisco</Typography>                    
                        <Typography>Mexico</Typography>                    
                        <Typography>+52 86731876231</Typography>                                     

                        <Divider sx={{ my: 1 }} />

                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1, mt: 2 }}>
                            <Typography variant="subtitle1" >Detalles del pedido</Typography>  
                            <NextLink href="/cart" passHref legacyBehavior >
                                <Link underline="always" >
                                    Editar
                                </Link>
                            </NextLink>
                        </Box> 

                        
                        <OrderSummary/>
                        
                        <Box sx={{ mt: 3 }} >
                            <Button color="secondary" className="circular-btn" fullWidth >
                                Confirmar Orden
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default SummaryPage