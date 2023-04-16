import { useState } from "react";
import NextLink from 'next/link';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Link, TextField, Typography } from "@mui/material"

import { AuthLayout } from "@/components/layouts"



const LoginPage = () => {

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <AuthLayout title="Login">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={ 2 } >
          <Grid item xs={ 12 } >
            <Typography variant="h1" component="h1" textAlign="center" >Inicar sesion</Typography>
          </Grid>

          <Grid item xs={ 12 } >
            <TextField label="Correo" type="email" variant="standard" fullWidth />
          </Grid>

          <Grid item xs={ 12 } >
            <FormControl sx={{  width: '100%' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
                <Input
                  placeholder="Contraseña"
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
          </Grid>

          <Grid item xs={ 12 } >
            <Button color="secondary" className="circular-btn" size="large" fullWidth >
              Ingresar
            </Button>
          </Grid>

          <Grid item xs={ 12 } display="flex" justifyContent="end" >
            <NextLink href="/auth/register" passHref legacyBehavior>
                <Link underline="always">
                  ¿No tienes cuenta?
                </Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  )
}

export default LoginPage