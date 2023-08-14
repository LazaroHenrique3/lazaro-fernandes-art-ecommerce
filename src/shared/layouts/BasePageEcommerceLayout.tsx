import { Box } from '@mui/material'

import { NavBar, Footer } from '../components'

interface BasePageEcommerceLayout {
    children: React.ReactNode,
}

export const BasePageEcommerceLayout: React.FC<BasePageEcommerceLayout> = ({ children }) => {

    return (
        <Box height='100%' display='flex' flexDirection='column'>
            <NavBar />

            <Box flex={1} overflow='auto'>
                {children}

                <Footer />
            </Box>
        </Box>
    )
}