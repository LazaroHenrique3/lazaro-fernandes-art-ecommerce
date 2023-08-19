import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Tooltip,
    MenuItem,
    Icon,
    List,
    Badge
} from '@mui/material'

import {
    useMatch,
    useNavigate,
    useResolvedPath
} from 'react-router-dom'

import {
    useAppThemeContext,
    useAuthContext,
    useNavBarContext,
    useCartContext
} from '../../contexts'

import logo from '../../.././images/logo.svg'

interface IListMenuItemProps {
    to: string,
    icon?: string,
    label: string,
    onClick: () => void
}

const ListMenuItem: React.FC<IListMenuItemProps> = ({ to, icon, label, onClick }) => {
    const navigate = useNavigate()
    const { toggleTheme } = useAppThemeContext()

    //Descobrindo se a rota foi seleciona ou não através da url
    const resolvePath = useResolvedPath(to)
    const match = useMatch({ path: resolvePath.pathname, end: false })

    const handleClick = () => {
        if (to !== '') {
            onClick?.()
            navigate(to)
        } else {
            onClick?.()
            toggleTheme()
        }
    }

    return (
        <MenuItem selected={(!!match && to !== '')} onClick={handleClick}>
            {icon && (
                <Icon>{icon}</Icon>
            )}
            <Typography marginLeft={1} textAlign="center">{label}</Typography>
        </MenuItem>
    )
}

export const NavBar = () => {
    const { logout, isAuthenticated, idUser } = useAuthContext()
    const { productsInCart, toggleCartIsOpen } = useCartContext()

    const {
        anchorElNav,
        anchorElUser,
        pagesOptions,
        settingsOptions,
        handleCloseNavMenu,
        handleCloseUserMenu,
        handleOpenNavMenu,
        handleOpenUserMenu
    } = useNavBarContext()

    return (
        <AppBar position="static" sx={{ zIndex: 1 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Avatar alt="Remy Sharp" src={logo} />

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <Icon>menu_icon</Icon>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pagesOptions.map((page) => (
                                <ListMenuItem key={page.label} to={page.path} label={page.label} onClick={handleCloseNavMenu} />
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <List sx={{ marginLeft: 2, display: 'flex', gap: 1 }}>
                            {pagesOptions.map((page) => (
                                <ListMenuItem key={page.label} to={page.path} label={page.label} onClick={handleCloseNavMenu} />
                            ))}
                        </List>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Carrinho">
                            <Badge badgeContent={String(productsInCart.length)} color="success" sx={{marginRight: 2}}>
                                <IconButton onClick={toggleCartIsOpen} sx={{ p: 0}}>
                                    <Icon sx={{ color: 'white' }}>shopping_cart</Icon>
                                </IconButton>
                            </Badge>
                        </Tooltip>
                        <Tooltip title="Abrir Opções">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Sharp" src="/static/images/avatar/1.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settingsOptions.map((setting) => (
                                <ListMenuItem key={setting.label} icon={setting.icon} to={setting.path} label={setting.label} onClick={handleCloseUserMenu} />
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
