import NextLink from 'next/link'
import { RemoveShoppingCartOutlined } from '@mui/icons-material'
import { Box, Link, Typography } from '@mui/material'
import { ShopLayout } from '@/components/layouts'


const EmptyPage = () => {
  return (
    <ShopLayout title='Empty Cart' pageDescription='There are not articles on the cart' >
        <Box 
            display="flex" justifyContent="center" alignItems="center"  
            height="calc(100vh - 200px)" 
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
            <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
           <Box display="flex" flexDirection="column" alignItems="center" >
                <Typography>Your cart is empty  </Typography>
                <NextLink href='/' passHref legacyBehavior >
                    <Link typography="h4" color="secondary" >
                        Let's buy
                    </Link>
                </NextLink>
           </Box>
        </Box>
    </ShopLayout>
  )
}

export default EmptyPage