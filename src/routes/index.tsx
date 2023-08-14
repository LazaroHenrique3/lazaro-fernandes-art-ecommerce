import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import '../shared/services/yup/TranslationsYup'

import { useNavBarContext } from '../shared/contexts'

import {
    Home,
    Store,
    About,
    Contact,
    PageNotFound,
} from '../pages'

export const MainRoutes = () => {
    const { setPagesOptions, setSettingsOptions } = useNavBarContext()

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

        setSettingsOptions([
            {
                label: 'Meu perfil',
                path: '/customer/profile'
            },
            {
                label: 'Logout',
                path: '/customer/logout'
            }
        ])
    }, [])

    return (
        <Routes>
            <Route path='/home' element={<Home />} />

            <Route path='/store' element={<Store />} />

            <Route path='/about' element={<About />} />

            <Route path='/contact' element={<Contact />} />

            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}