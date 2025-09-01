import React, { useState } from 'react';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { logo } from '../assets';
import clsx from 'clsx';
import AuthActionButton from './AuthActionButton';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="!bg-white dark:bg-gray-900 fixed w-full h-20 z-50 top-0 start-0 border-b !border-gray-200 dark:border-gray-600 shadow dark:border dark:border-gray-00">
      <div className="max-w-full h-full flex flex-wrap items-center justify-between mx-auto px-10">
        {/* Logo */}
        <a href="/homepage" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-10" alt="Logo"/>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
            Lamtusco
          </span>
        </a>

        {/* Buttons + Toggle */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

            <AuthActionButton />
            <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded={menuOpen}
            >
                <span className="sr-only">Open main menu</span>
                {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
        </div>


        {/* Menu items */}
        <div
            className={clsx(
            'items-center justify-between w-full md:flex md:w-auto md:order-1',
            menuOpen ? 'block' : 'hidden'
            )}
            id="navbar-sticky"
        >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg !bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 text-xl">
                {/* <li>
                    <a
                        href="/homepage"
                        className="block py-2 px-3 !text-gray-900 rounded-sm hover:!bg-gray-100 md:hover:!bg-transparent md:hover:!text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500"
                    >
                        Home
                    </a>
                </li> */}
                <li>
                    <a
                        href="/stream-cameras"
                        className="block py-2 px-3 !text-gray-900 rounded-sm hover:!bg-gray-100 md:hover:!bg-transparent md:hover:!text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500"
                    >
                        Camera
                    </a>
                </li>
                {/* <li>
                    <a
                        href="#"
                        className="block py-2 px-3 !text-gray-900 rounded-sm hover:!bg-gray-100 md:hover:!bg-transparent md:hover:!text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500"
                    >
                        Citis
                    </a>
                </li> */}
                {/* <li>
                    <a
                        href="#"
                        className="block py-2 px-3 !text-gray-900 rounded-sm hover:!bg-gray-100 md:hover:!bg-transparent md:hover:!text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500"
                    >
                        Timezones
                    </a>
                </li> */}
                <li>
                    <a
                        href="/create-cameras"
                        className="block py-2 px-3 !text-gray-900 rounded-sm hover:!bg-gray-100 md:hover:!bg-transparent md:hover:!text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500"
                    >
                        New cameras
                    </a>
                </li>
                {/* <li>
                    <a
                        href="#"
                        className="block py-2 px-3 !text-gray-900 rounded-sm hover:!bg-gray-100 md:hover:!bg-transparent md:hover:!text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500"
                    >
                        FAQ
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="block py-2 px-3 !text-gray-900 rounded-sm hover:!bg-gray-100 md:hover:!bg-transparent md:hover:!text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500"
                    >
                        Contact
                    </a>
                </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
