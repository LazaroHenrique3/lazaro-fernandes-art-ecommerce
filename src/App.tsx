import { BrowserRouter } from 'react-router-dom'

import {
    AppThemeProvider,
    NavBarProvider,
    DrawerProvider,
    AuthProvider,
    CartProvider
} from './shared/contexts'

import { MainRoutes } from './routes'

//Importando o Toasts
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <AuthProvider>
            <AppThemeProvider>
                <CartProvider>

                    <BrowserRouter>

                        <NavBarProvider>
                            <DrawerProvider>
                                <MainRoutes />
                            </DrawerProvider>
                        </NavBarProvider>

                        <ToastContainer autoClose={5000} position={toast.POSITION.BOTTOM_LEFT} />
                    </BrowserRouter>

                </CartProvider>
            </AppThemeProvider>
        </AuthProvider>
    )
}

export default App
