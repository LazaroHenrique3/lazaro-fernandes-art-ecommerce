import {
    Box,
} from '@mui/material'

import { 
    NavBar, 
    Footer,
    Cart
} from '../components'

interface BasePageEcommerceLayout {
    children: React.ReactNode,
    showStaticFooter?: boolean,
}

export const BasePageEcommerceLayout: React.FC<BasePageEcommerceLayout> = ({ children, showStaticFooter = false }) => {

    return (
        <Box height='100vh' display='flex' flexDirection='column'>
            <NavBar />

            <Box flex={1} overflow='auto'>
                {children}
                <Cart/>
                {!showStaticFooter && <Footer />}
            </Box>

            {showStaticFooter && <Footer />}
        </Box>
    )
}
