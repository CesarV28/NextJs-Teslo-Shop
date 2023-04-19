import { GetServerSideProps, NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { ShopLayout } from "@/components/layouts";

import { ProductList } from "@/components/products";

import { dbProducts } from "@/database";

import { IProduct } from "@/interfaces";



interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string
}

const SearchPagen: NextPage<Props> = ({ products, foundProducts, query }) => {


  return (
    <ShopLayout title={"Teslo Shop - Search"} pageDescription={"Found the best teslo products here"}>
        <Typography variant="h1" component="h1" >Buscar producto</Typography>

        {
            foundProducts
                ? <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize" >Buscaste: { query }</Typography>
                : <Box display="flex" gap={ 1 } >
                    <Typography variant="h2" sx={{ mb: 1 }} >No encontramos lo que buscabas:</Typography>
                    <Typography variant="h2" sx={{ mb: 1 }} color="secondary" textTransform="capitalize" >{ query }</Typography>
                  </Box>
        }
        

        <ProductList products={ products } />

    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { query } = params as { query: string };

    if( query.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    const products = await dbProducts.getProductsByTerms( query );

    const foundProducts = products.length > 0;

    if( !foundProducts ) {

        const products = await dbProducts.getAllProducts();

        return {
            props: {
                products,
                foundProducts, 
                query
            }
        }
    }

    return {
        props: {
            products,
            foundProducts, 
            query
        }
    }
}

export default SearchPagen;
