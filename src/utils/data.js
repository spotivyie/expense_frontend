import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut
} from 'react-icons/lu'

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: 'Dashboard',
        icon: LuLayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "02",
        label: 'Rendas',
        icon: LuWalletMinimal,
        path: "/income",
    },
    {
        id: "03",
        label: 'Despesas',
        icon: LuHandCoins,
        path: "/expense",
    },
    {
        id: "06",
        label: 'Sair',
        icon: LuLogOut,
        path: "logout",
    },
]