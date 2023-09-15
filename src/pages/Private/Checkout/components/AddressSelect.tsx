import {
    useMemo,
    useState
} from 'react'

import { useSearchParams } from 'react-router-dom'

import {
    Box,
    Grid,
    Typography,
    Pagination,
    LinearProgress,
    TextField
} from '@mui/material'

import { AddressSelectCard } from './AddressSelectCard'
import { IListAddress } from '../../../../shared/services/api/address/AddressService'
import { Environment } from '../../../../shared/environment'

//Hooks personalizados
import {
    UseFetchAddressData
} from '../hooks'

interface ISelectAddressFunctionProps {
    idAddress: string
    selectedAddressCep: string
}

interface IAddressSelectProps {
    setAddress: ({ idAddress, selectedAddressCep }: ISelectAddressFunctionProps) => void
    selectedAddress: string
}

export const AddressSelect: React.FC<IAddressSelectProps> = ({ setAddress, selectedAddress }) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [rows, setRows] = useState<IListAddress[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    //Fazer a pesquisa do input de pesquisa através da URL
    //Toda vez que for digitado um texto será mudado o searchParams da Url
    //Logo o valor vai ser modificado, o que por sua vez executa o useMemo
    //E por fim esse valor será armazenado em 'search'

    const search = useMemo(() => {
        //Pega o parâmetro na URL
        return searchParams.get('search') || ''
    }, [searchParams])

    const page = useMemo(() => {
        //Pega o parâmetro na URL
        return Number(searchParams.get('page') || '1')
    }, [searchParams])

    //Hooks personalizados
    UseFetchAddressData({ setIsLoading, setRows, setTotalCount, search, page })

    return (
        <Box width='100%' marginY={3}>
            <Box width='100%' marginBottom={2} gap={1} display='flex' justifyContent='space-between'>
                <Box marginLeft={5}>
                    <Typography variant='h6' noWrap textOverflow='ellipsis'>Selecione</Typography>
                </Box>

                <Box marginRight={5}>
                    <TextField size='small' onChange={e => setSearchParams({ search: e.target.value, page: '1' }, { replace: true })} />
                </Box>
            </Box>

            {(isLoading) ? (
                <Box paddingX={5}>
                    <LinearProgress variant='indeterminate' />
                </Box>
            ) : (
                <Grid container spacing={1} paddingX={5}>
                    {rows.map((row) => (
                        <AddressSelectCard
                            key={row.id}
                            id={row.id}
                            cep={row.cep}
                            city={row.city}
                            neighborhood={row.neighborhood}
                            number={String(row.number)}
                            state={row.state}
                            street={row.street}
                            selected={String(row.id) === selectedAddress}
                            handleAddress={setAddress}
                        />
                    ))}
                </Grid>
            )}

            {(totalCount > 0 && totalCount > Environment.LINE_LIMIT) && (
                <Grid container spacing={1} paddingX={5} marginTop={3} justifyContent='center'>
                    <Pagination
                        page={page}
                        count={Math.ceil(totalCount / Environment.LINE_LIMIT)}
                        onChange={(e, newPage) => setSearchParams({ search, page: newPage.toString() }, { replace: true })}
                    />
                </Grid>
            )}
        </Box>
    )
}