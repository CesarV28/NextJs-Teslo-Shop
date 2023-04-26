import { useContext, useState } from "react";
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ErrorOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Chip, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Link, TextField, Typography } from "@mui/material"

import { AuthLayout } from "@/components/layouts"
import { validations } from "@/utils";
import { tesloApi } from "@/api";
import { AuthContext } from "@/context";



type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {

  const router = useRouter();

  const { registerUser } = useContext( AuthContext )

  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onRegisterForm = async({ name, email, password }: FormData) => {

    setShowError(false);

    const { hasError, message } = await registerUser( name, email, password ); 

    if( hasError ) {
      setShowError(true);
      setErrorMessage( message || 'Ocurrio un error' );
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
    <AuthLayout title="Register">
      <form onSubmit={ handleSubmit(onRegisterForm) } noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={ 2 } >
            <Grid item xs={ 12 } >
              <Typography variant="h1" component="h1" textAlign="center" >Crear cuenta</Typography>
              <Chip 
                label={ errorMessage } 
                variant="outlined" 
                color="error" 
                icon={ <ErrorOutline/> }
                className="fadeIn"
                sx={{ mt: 2, mb: 1, display: showError ? 'flex' : 'none'  }}
              />
            </Grid>

            <Grid item xs={ 12 } >
              <TextField 
                { ...register('name', 
                  { 
                    required: 'Este campo es requerido',
                    minLength: { value: 3, message: 'Minimo 3 caracteres' },
                  })
                }
                error={ !!errors.name }
                helperText={ errors.name?.message }
                label="Nombre" 
                type="text" 
                variant="standard" 
                fullWidth 
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
                    placeholder="Contraseña"
                    { ...register('password', 
                      { 
                        required: 'Este campo es requerido',
                        minLength: { value: 6, message: 'Minimo 6 caracteres' },
                      })
                    }
                    error={ !!errors.password }
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

            <Grid item xs={ 12 } sx={{ mt: 1 }} >
              <Button 
                  type="submit"
                  color="secondary" 
                  className="circular-btn" 
                  size="large" 
                  fullWidth 
                  disabled={ showError }
                >
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={ 12 } display="flex" justifyContent="end" >
              <NextLink href="/auth/login" passHref legacyBehavior>
                  <Link underline="always">
                    iniciar sesion
                  </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage