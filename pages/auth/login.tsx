import { useContext, useState } from "react";
import NextLink from 'next/link';
import { ErrorOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Box, Button, Chip, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Link, TextField, Typography } from "@mui/material"

import { AuthLayout } from "@/components/layouts"
import { AuthContext } from "@/context";
import { validations } from "@/utils";
import { tesloApi } from "@/api";
import { useRouter } from "next/router";



type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {

  const router = useRouter();

  const { loginUser } = useContext( AuthContext )

  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onLoginUser = async( { email, password }: FormData ) => {
  
    setShowError(false);

    const isValidLogin = await loginUser( email, password );

    if( !isValidLogin ) {
      setShowError(true);
      setTimeout(() => { 
        setShowError(false);
      }, 3000);
      return;
    }

    router.replace('/');

  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={ handleSubmit( onLoginUser ) } noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={ 2 } >
            <Grid item xs={ 12 } >
              <Typography variant="h1" component="h1" textAlign="center" >Inicar sesion</Typography>
              <Chip 
                label="No se reconocio el usuario y contraseña" 
                variant="outlined" 
                color="error" 
                icon={ <ErrorOutline/> }
                className="fadeIn"
                sx={{ mt: 2, mb: 1, display: showError ? 'flex' : 'none'  }}
              />
            </Grid>

            <Grid item xs={ 12 } >
              <TextField 
                { ...register('email', 
                  { 
                    required: 'Este campo es requerido',
                    validate: validations.isEmail
                  })
                } 
                error={ !!errors.email }
                helperText={ errors.email?.message }
                label="Correo" 
                type="email" 
                variant="standard" 
                fullWidth 
              />
            </Grid>

            <Grid item xs={ 12 } >
              <FormControl sx={{  width: '100%' }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    { errors.password ? errors.password.message : 'Contraseña' }
                  </InputLabel>
                  <Input
                    { ...register('password', 
                      { 
                        required: 'Este campo es requerido',
                        minLength: { value: 6, message: 'Minimo 6 caracteres' },
                      })
                    }
                    error={ !!errors.password }
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
              <Button 
                  type="submit"
                  color="secondary" 
                  className="circular-btn" 
                  size="large" fullWidth 
                  disabled={ showError }
                >
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
      </form>
    </AuthLayout>
  )
}

export default LoginPage