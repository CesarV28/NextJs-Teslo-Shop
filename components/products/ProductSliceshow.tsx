import { FC } from "react";
import { Slide } from "react-slideshow-image";

import 'react-slideshow-image/dist/styles.css';
import styles from './css/ProductSliceshow.module.css';


interface Props {
    images: string[];
}

export const ProductSliceshow: FC<Props> = ({ images }) => {
  return (
    <Slide
        easing="ease"
        duration={ 4000 }
        indicators
    >
        {
            images.map( image => {
                const url = `/products/${ image }`;
                return (
                    <div className={ styles['each-slide-effect'] } key={ image } >
                        <div style={{
                                backgroundImage: `url(${ url })`,
                                backgroundSize: 'cover',
                                height: '500px'
                            }}
                        >

                        </div>
                    </div>
                )
            })
        }
    </Slide>
  )
}
