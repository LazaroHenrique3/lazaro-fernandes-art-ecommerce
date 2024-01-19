import {
    createContext,
    useCallback,
    useState,
    useContext
} from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export type TProductCart = {
    id: number,
    image: string,
    title: string,
    price: number,
    weight: number,
    dimension: string,
    quantity: number,
    quantitySelected: number
}

interface ICartContextData {
    cartIsOpen: boolean
    productsInCart: TProductCart[]
    addProductInCart: (product: TProductCart) => void
    removeProductFromCart: (idProduct: number) => void
    updateProductQuantityFromCart: (idProduct: number, newQuantity: number) => void
    toggleCartIsOpen: () => void
    resetCart: () => void
}

const CartContext = createContext({} as ICartContextData)

const CART_STORAGE_KEY = 'CART_DATA'

interface ICartProviderProps {
    children: React.ReactNode
}
export const CartProvider: React.FC<ICartProviderProps> = ({ children }) => {
    const [productsInCart, setProductsInCart] = useState<TProductCart[]>(() => {
        // Recupere os dados do carrinho do localStorage durante a inicialização
        const storedCartData = localStorage.getItem(CART_STORAGE_KEY)
        return storedCartData ? JSON.parse(storedCartData) : []
    })
    const [cartIsOpen, setCartIsOpen] = useState(false)

    const saveCartToLocalStorage = (cartData: TProductCart[]) => {
        // Salve os dados do carrinho no localStorage
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData))
    }

    const addProductInCart = useCallback(async ({ id, image, title, price, weight, dimension, quantity, quantitySelected }: TProductCart) => {

        //Verificar se este produto já esta no carrinho
        const isProductInCart = productsInCart.some(item => item.id === id)
        if (isProductInCart) {
            toast.warning('Este produto já foi adicionado ao carrinho!')
            return
        }

        const newProduct: TProductCart = { id, image, title, price, weight, dimension, quantity, quantitySelected }

        setProductsInCart(prevProducts => {
            const updatedCart = [...prevProducts, newProduct]
            saveCartToLocalStorage(updatedCart)
            return updatedCart
        })

        toast.success('Produto adicionado ao carrinho!')
    }, [productsInCart])

    const updateProductQuantityFromCart = useCallback((idProduct: number, newQuantity: number): void => {

        // Encontre o produto correspondente pelo id no estado do carrinho
        const updatedProducts = productsInCart.map(product => {
            if (product.id === idProduct) {
                return {
                    ...product,
                    quantitySelected: newQuantity
                }
            }
            return product
        })

        setProductsInCart(updatedProducts)
        saveCartToLocalStorage(updatedProducts)

    }, [productsInCart])

    const removeProductFromCart = useCallback((idProduct: number) => {

        const updatedProducts = productsInCart.filter((product) => product.id !== idProduct)
        setProductsInCart(updatedProducts)
        saveCartToLocalStorage(updatedProducts)

        toast.success('Produto removido do carrinho!')

    }, [productsInCart])

    const toggleCartIsOpen = useCallback(() => {

        setCartIsOpen(!cartIsOpen)

    }, [cartIsOpen])

    const resetCart = useCallback(() => {

        setProductsInCart([])
        setCartIsOpen(false)

        // Limpe os dados do carrinho do localStorage ao redefinir o carrinho
        localStorage.removeItem(CART_STORAGE_KEY)

    }, [])

    return (
        <CartContext.Provider value={{
            cartIsOpen,
            productsInCart,
            addProductInCart,
            removeProductFromCart,
            updateProductQuantityFromCart,
            toggleCartIsOpen,
            resetCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => useContext(CartContext)