import NextLink from 'next/link';
import { Chip, Grid, Link, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid"
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';

import { ShopLayout } from "@/components/layouts"


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre completo', width: 300 },
    { 
        field: 'paid', 
        headerName: 'Pagado', 
        description: 'Muestra informacion si esta pagada la orden o no',
        width: 200,  
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.paid
                    ? <Chip color="success" label="Pagada" variant="outlined" />
                    : <Chip color="error" label="Pendiente" variant="outlined" />
            )
        }
    },
    { 
        field: 'order', 
        headerName: 'Ver orden', 
        description: 'Muestra informacion si esta pagada la orden o no',
        width: 200,
        sortable: false,  
        renderCell: (params: GridRenderCellParams) => {
            return (
                <NextLink href={`/orders/${ params.row.id }`} passHref legacyBehavior >
                    <Link display="flex" alignItems="center" gap={ 1 } underline='always' >
                        Ver orden
                        <LaunchOutlinedIcon sx={{ fontSize: 15 }}/>
                    </Link>
                </NextLink>
            )
        }
    },
];

const rows: GridRowsProp = [
    { id: 1, fullname: 'Cesar Vargas', paid: true },
    { id: 2, fullname: 'Skadi Vargas', paid: false },
    { id: 3, fullname: 'Kali Vargas', paid: true },
];

const HistoryPage = () => {
  return (
    <ShopLayout title="History orders" pageDescription="Client history orders" >
        <Typography variant="h1" component="h1" >Historial de ordenes</Typography>

        <Grid container >
            <Grid item xs={ 12 } sx={{ height: 650, width: '100%' }} >
                <DataGrid
                    rows={ rows }
                    columns={ columns }
                    initialState={{
                        pagination: 
                        {
                            paginationModel: { pageSize: 10 }
                        },
                    }}
                    pageSizeOptions={[ 5, 10, 15 ]}
                />
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default HistoryPage