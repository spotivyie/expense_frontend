import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import SideMenu from './SideMenu'
import logo from '../assets/images/expense.png';

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false)

    return (
        <header className='w-full bg-white border-b border-gray-200/50 backdrop-blur-md sticky top-0 z-30'>
            <div className='flex items-center justify-between px-6 py-4'>
                <div className='flex items-center gap-4'>
                    <button
                        className='block lg:hidden text-black'
                        onClick={() => setOpenSideMenu(!openSideMenu)}
                    >
                        {openSideMenu ? (
                            <HiOutlineX className='text-2xl' />
                        ) : (
                            <HiOutlineMenu className='text-2xl' />
                        )}
                    </button>
                    <img
                        src={logo}
                        alt="Expense Logo"
                        className="h-8 w-auto"
                    />
                </div>

                <nav className='hidden lg:block'>
                    <SideMenu activeMenu={activeMenu} />
                </nav>
            </div>

            {openSideMenu && (
                <div className='lg:hidden px-4 pb-4'>
                    <SideMenu activeMenu={activeMenu} mobile />
                </div>
            )}
        </header>
    )
}

export default Navbar
