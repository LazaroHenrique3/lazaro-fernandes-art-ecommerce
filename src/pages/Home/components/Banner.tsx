import {
    Box
} from '@mui/material'

import bannerImage from '../../.././images/home-banner.jpg'

export const Banner = () => {

    return (
        <Box
            component='section'
            height='80vh'
            sx={{
                backgroundImage: `url(${bannerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
    )
}