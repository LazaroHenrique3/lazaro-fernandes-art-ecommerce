import { BasePageEcommerceLayout } from '../../shared/layouts'

import { 
    AboutMe, 
    FuturePlans, 
    Inspiration,
} from './components'

export const About = () => {

    return (
        <BasePageEcommerceLayout>

            <AboutMe/>
            <Inspiration/>
            <FuturePlans/>

        </BasePageEcommerceLayout>
    )
}