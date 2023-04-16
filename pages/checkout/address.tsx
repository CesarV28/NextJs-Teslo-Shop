import { ShopLayout } from '@/components/layouts'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

const AddressPage = () => {
  return (
    <ShopLayout title="Address" pageDescription="Confirm address destination" >
        <Grid container spacing={ 2 } sx={{ mt: 2 }} >
            <Grid item xs={ 12 } sm={ 6 } >
                <TextField label="Nombre" variant="filled" fullWidth />
            </Grid>

            <Grid item xs={ 12 } sm={ 6 } >
                <TextField label="Apellido" variant="filled" fullWidth />
            </Grid>

            <Grid item xs={ 12 } sm={ 6 } >
                <TextField label="Dirección" variant="filled" fullWidth />
            </Grid>

            <Grid item xs={ 12 } sm={ 6 } >
                <TextField label="Dirección 2 (opcional)" variant="filled" fullWidth />
            </Grid>

            <Grid item xs={ 12 } sm={ 6 } >
                <TextField label="Ciudad" variant="filled" fullWidth />
            </Grid>

            <Grid item xs={ 12 } sm={ 6 } >
                <TextField label="Código postal" variant="filled" fullWidth />
            </Grid>

            <Grid item xs={ 12 } sm={ 6 } >
                <FormControl fullWidth>
                    <Select
                        variant="filled"
                        label="País"
                        value={ 1 }
                    >
                        <MenuItem value={ 1 } >Colombia</MenuItem>
                        <MenuItem value={ 2 } >Honduras</MenuItem>
                        <MenuItem value={ 3 } >Costa Rica</MenuItem>
                        <MenuItem value={ 4 } >México</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={ 12 } sm={ 6 } >
                <TextField label="Telefono" variant="filled" fullWidth />
            </Grid>
        </Grid>

        <Box sx={{ mt: 5}} display="flex" justifyContent="center" >
            <Button color="secondary" className="circular-btn" size="large" >
                Realizar pedido
            </Button>
        </Box>
    </ShopLayout>
  )
}

export default AddressPage