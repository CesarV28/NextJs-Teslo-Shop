import { Typography } from "@mui/material";
import { ShopLayout } from "@/components/layouts";


import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import { FullScreenLoading } from "@/components/ui";



export default function HomePage() {

  const { products, isError, isLoading } = useProducts('/products');

  return (
    <ShopLayout title={"Teslo Shop - Home"} pageDescription={"Found the best teslo products here"}>
        <Typography variant="h1" component="h1" >Tienda</Typography>
        <Typography variant="h2" sx={{ mb: 1 }} >Todos los productos</Typography>

        {
          isLoading
            ? <FullScreenLoading/>
            : <ProductList products={ products } />
        }

    </ShopLayout>
  )
}
