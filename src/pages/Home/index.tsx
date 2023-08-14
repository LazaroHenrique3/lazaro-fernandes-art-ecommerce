import { BasePageEcommerceLayout } from '../../shared/layouts'
import { 
    Banner,
    Welcome,
    LatestArts,
    OriginalArts
} from './components'


export const Home = () => {

    return (
        <BasePageEcommerceLayout>
            <Banner/>
            <Welcome/>   
            <LatestArts/>
            <OriginalArts/>
        </BasePageEcommerceLayout>
    )
}