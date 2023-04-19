import { Typography } from "@mui/material"

import { ShopLayout } from "@/components/layouts"
import { ProductList } from "@/components/products"
import { FullScreenLoading } from "@/components/ui"

import { useProducts } from "@/hooks"


const MenPage = () => {

  const { products, isError, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayout title={"Teslo Shop - Men"} pageDescription={"Found the best teslo products for man here"}>
        <Typography variant="h1" component="h1" >Tienda</Typography>
        <Typography variant="h2" sx={{ mb: 1 }} >Para Hombres</Typography>

        {
          isLoading
            ? <FullScreenLoading/>
            : <ProductList products={ products } />
        }

    </ShopLayout>
  )
}

export default MenPage