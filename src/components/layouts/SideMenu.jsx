import React, { useContext } from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import CharAvatar from '../Cards/CharAvatar'
import { Link } from 'react-router-dom';

const SideMenu = ({ activeMenu, mobile = false }) => {
    const { user, clearUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleClick = (route) => {
        if (route === "logout") {
            localStorage.clear()
            clearUser()
            navigate("/login")
        } else {
            navigate(route)
        }
    }

    return (
        <div className={`w-full ${mobile ? 'flex-col gap-4' : 'flex justify-between items-center'} flex`}>
            {/* User Info */}
            <Link
                to="/profile"
                className="flex items-center gap-3 mb-2 lg:mb-0 pr-6 hover:opacity-90"
            >
                {user?.profileImageUrl ? (
                    <img
                        src={user.profileImageUrl}
                        alt="Profile"
                        className="w-10 h-10 rounded-full bg-slate-400"
                    />
                ) : (
                    <CharAvatar
                        fullName={user?.fullName}
                        width="w-10"
                        height="h-10"
                        style="text-sm"
                    />
                )}
                <span className="text-gray-800 font-medium block">{user?.fullName}</span>
            </Link>

            {/* Menu Buttons */}
            <div className={`flex ${mobile ? 'flex-col' : 'flex-row'} gap-2`}>
                {SIDE_MENU_DATA.map((item, index) => (
                    <button
                        key={`menu_${index}`}
                        onClick={() => handleClick(item.path)}
                        className={`flex items-center gap-2 text-sm px-4 py-2 rounded-md transition ${
                            activeMenu === item.label
                                ? 'text-gray-700 hover:bg-gray-100'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <item.icon className='text-lg' />
                        <span className='md:inline'>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SideMenu
