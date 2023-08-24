import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import '../shared/services/yup/TranslationsYup'

import { PrivateCustomer } from '../shared/components'

import {
    useAuthContext,
    useNavBarContext,
    useDrawerContext
} from '../shared/contexts'

import {
    Home,
    Store,
    ProductDetails,
    About,
    Contact,
    MyAccount,
    Orders,
    PersonalData,
    Adresses,
    PageNotFound,
} from '../pages'

export const MainRoutes = () => {
    const { isAuthenticated } = useAuthContext()
    const { setPagesOptions, setSettingsOptions } = useNavBarContext()
    const { setDrawerOptions } = useDrawerContext()

    useEffect(() => {
        setPagesOptions([
            {
                label: 'Home',
                path: '/home'
            },
            {
                label: 'Loja',
                path: '/store'
            },
            {
                label: 'Sobre',
                path: '/about'
            },
            {
                label: 'Contato',
                path: '/contact'
            },
        ])

        const settingsOptions = [
            {
                label: `${isAuthenticated ? 'Sair' : 'Logar'}`,
                icon: `${isAuthenticated ? 'logout' : 'login'}`,
                path: '',
            },
            {
                label: 'Alternar Tema',
                icon: 'brightness_4_icon',
                path: '',
            },
        ]

        if (isAuthenticated) {
            settingsOptions.unshift({
                label: 'Meu perfil',
                icon: 'account_circle',
                path: '/customer/my-account',
            })
        }

        setSettingsOptions(settingsOptions)

        setDrawerOptions([
            {
                label: 'Minha Conta',
                icon: 'person',
                path: '/customer/my-account'
            },
            {
                label: 'Meus Pedidos',
                icon: 'shopping_bag_icon',
                path: '/customer/orders'
            },
            {
                label: 'Meus Dados',
                icon: 'contact_page_icon',
                path: '/customer/personal-data'
            },
            {
                label: 'Meus Endereços',
                icon: 'map',
                path: '/customer/adresses'
            },
        ])
    }, [isAuthenticated])

    return (
        <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/store' element={<Store />} />
            <Route path='/product/details/:id' element={<ProductDetails />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />

            <Route path='/customer/my-account' element={<PrivateCustomer><MyAccount /></PrivateCustomer>} />
            <Route path='/customer/orders' element={<PrivateCustomer><Orders /></PrivateCustomer>} />
            <Route path='/customer/personal-data' element={<PrivateCustomer><PersonalData /></PrivateCustomer>} />
            <Route path='/customer/adresses' element={<PrivateCustomer><Adresses /></PrivateCustomer>} />

            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}