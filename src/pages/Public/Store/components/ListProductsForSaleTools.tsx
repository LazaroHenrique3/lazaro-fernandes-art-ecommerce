import {
    Box,
    Paper,
    TextField,
    Button,
    Icon,
    useTheme
} from '@mui/material'

import { Environment } from '../../../../shared/environment'

interface IListToolsProps {
    searchText?: string
    showFilterButton: boolean

    openSearchFilterMenu: boolean
    onClickFilterButton: (openSearchFilterMenu: boolean) => void

    onChangeSearchText?: (newText: string) => void
}

export const ListProductsForSaleTools: React.FC<IListToolsProps> = ({
    searchText = '',
    showFilterButton,
    openSearchFilterMenu,
    onClickFilterButton,
    onChangeSearchText,
}) => {
    const theme = useTheme()

    return (
        <Box marginBottom={5} padding={1} paddingX={2} marginRight={2} display='flex' alignSelf='end' alignItems='center' gap={1} width='250px' height={theme.spacing(5)} component={Paper}>
            <TextField 
                value={searchText} 
                size='small' 
                placeholder={Environment.SEARCH_INPUT} 
                onChange={(e) => onChangeSearchText?.(e.target.value)}/>

            {showFilterButton && (
                <Button variant='contained' onClick={() => onClickFilterButton(!openSearchFilterMenu)}>
                    <Icon>
                        filter_alt
                    </Icon>
                    <Icon>
                        {openSearchFilterMenu ? 'expand_less' : 'expand_more' }
                    </Icon>
                </Button>
            )}
        </Box>
    )
}