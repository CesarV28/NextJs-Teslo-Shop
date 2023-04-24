import { useContext, useState } from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { ProductSliceshow, SizeSelector } from "@/components/products";
import { ItemCounter } from "@/components/ui";

import { dbProducts } from "@/database";

import { ICartProduct, IProduct, ISize } from "@/interfaces";
import { useRouter } from "next/router";
import { CartContext } from "@/context";





// const product = initialData.products[0];

interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {

  const router = useRouter();
  const { addProductToCart } = useContext(CartContext);

  const [temCartProduct, setTemCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const selectedSize = ( size: ISize ) => {
    setTemCartProduct( (currentProduct: ICartProduct ) => ({
      ...currentProduct,
      size
    }));
  }

  const updateQuantity = ( quantity: number ) => {
    setTemCartProduct( (currentProduct: ICartProduct ) => ({
      ...currentProduct,
      quantity
    }));
  }

  const onAddProduct = () => {

    if( temCartProduct.quantity === 0 || !temCartProduct.size ) {
      return;
    }

    // TODO: call action context to add product to cart
    addProductToCart( temCartProduct );
    

    router.push('/cart');
  }

  return (
    <ShopLayout title={ product.title } pageDescription={ product.description } >
      <Grid container spacing={ 3 } >
        <Grid item xs={ 12 } sm={ 7 } >
          <ProductSliceshow images={ product.images } />
        </Grid>

        <Grid item xs={ 12 } sm={ 5 } >
          <Box display="flex" flexDirection="column" >
            {/* titulos*/}
            <Typography variant="h1" component="h1" >{ product.title }</Typography>
            <Typography variant="subtitle1" component="h2" >{ `$${product.price}` }</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }} >
              <Typography variant="subtitle2" >Cantidad</Typography>
              {/* Item counter */}
              <ItemCounter
                currentValue={ temCartProduct.quantity }
                updateQuantity={ updateQuantity }
                maxValue={ product.inStock }
              />
              <SizeSelector 
                // selectedSize={ product.sizes[0] } 
                sizes={ product.sizes }
                selectedSize={ temCartProduct.size }
                onSelectedSize={ selectedSize }
              />
            </Box>

            {
              ( product.inStock > 0 ) 
              ? (
                  <Button 
                    color="secondary" 
                    className="circular-btn" 
                    onClick={ onAddProduct }
                    disabled={ (temCartProduct.quantity === 0 || !temCartProduct.size )  }
                  >
                    {
                      temCartProduct.size
                      ? 'Agregar al carrito'
                      : 'Seleccione una talla'
                    }
                  </Button>
                )
              : (
                  <Chip label="No hay disponibles" color="error" variant="outlined" />
                )
            }
            

            

            <Box sx={{ mt: 2 }} >
              <Typography variant="subtitle2" >Descripcion</Typography>
              <Typography variant="body2" >{ product.description }</Typography>
            </Box>

          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}


// ########## No usar esto

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
//   const { slug = '' } = params as { slug: string };

//   const product = await dbProducts.getProductBySlug( slug );

//   if( !product ) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map( ({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: "blocking"
  }
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };

  const product = await dbProducts.getProductBySlug( slug );

  if( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage;