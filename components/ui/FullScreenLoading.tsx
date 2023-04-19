import { Box, CircularProgress, Typography } from "@mui/material"


export const FullScreenLoading = () => {
  return (
    <Box 
        display="flex" justifyContent="center" 
        alignItems="center" flexDirection="column"
        gap={ 4 }
        height="calc(100vh - 200px)" 
    >
        <Typography variant="h1" component="h1" fontSize={ 50 } fontWeight={ 200 } >Loading...</Typography>
        <CircularProgress thickness={ 2 } />
    </Box>
  )
}
