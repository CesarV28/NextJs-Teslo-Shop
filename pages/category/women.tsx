import { Typography } from "@mui/material"

import { ShopLayout } from "@/components/layouts"
import { ProductList } from "@/components/products"
import { FullScreenLoading } from "@/components/ui"

import { useProducts } from "@/hooks"


const WomenPage = () => {

  const { products, isError, isLoading } = useProducts('/products?gender=women');

  return (
    <ShopLayout title={"Teslo Shop - Women"} pageDescription={"Found the best teslo products for woman here"}>
        <Typography variant="h1" component="h1" >Tienda</Typography>
        <Typography variant="h2" sx={{ mb: 1 }} >Para Mujeres</Typography>

        {
          isLoading
            ? <FullScreenLoading/>
            : <ProductList products={ products } />
        }

    </ShopLayout>
  )
}

export default WomenPage