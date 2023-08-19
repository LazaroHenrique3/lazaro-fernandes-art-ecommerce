import { BasePageEcommerceLayout } from '../../shared/layouts'
import { 
    Banner,
    Welcome,
    PopularArts,
    OriginalArts
} from './components'


export const Home = () => {

    return (
        <BasePageEcommerceLayout>
            <Banner/>
            <Welcome/>   
            <PopularArts/>
            <OriginalArts/>
        </BasePageEcommerceLayout>
    )
}