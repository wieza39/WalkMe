import React, {Fragment, useEffect, useState} from 'react'
import '../assets/sass/general.css'
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {useLocation} from "react-router-dom";
import {Avatar} from "@mui/material";


const loggedUser = localStorage.getItem('loggedUser')

const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Jak działamy?', href: '/#how-does-it-work', current: false },
    { name: 'O nas', href: '/#about', current: false },
    { name: 'Kontakt', href: '/#contact', current: false },
    { name: 'Znajdź opiekuna', href: '/search', current: true },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

    const [isVisible, setIsVisible] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }

        if (location.pathname === '/') {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        } else {
            setIsVisible(true);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (location.pathname === '/') {
            setIsVisible(window.scrollY > 100);
        }
    }, [location.pathname]);

    return (
        <Disclosure as="nav" className={` ${location.pathname === '/' ? ` navbar bg-gray-800 ${isVisible ? 'navbar-visible' : ''}` : 'bg-gray-800'}`}>
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </DisclosureButton>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <a href="/">
                                    <img
                                        className="h-8 w-auto "
                                        src="/images/logoW.png"
                                        alt="logo"
                                    />
                                    </a>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'theme-font bg-indigo-900' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/*<button*/}
                                {/*    type="button"*/}
                                {/*    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"*/}
                                {/*>*/}
                                {/*    <span className="absolute -inset-1.5" />*/}
                                {/*    <span className="sr-only">View notifications</span>*/}
                                {/*    <BellIcon className="h-6 w-6" aria-hidden="true" />*/}
                                {/*</button>*/}

                                { loggedUser ? (
                                /* Profile dropdown */
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <Avatar alt="Remy Sharp" src="" sx={{ width: 32, height: 32 }}/>
                                        </MenuButton>
                                    </div>
                                    <Transition
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <MenuItem>
                                                {({ focus }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Your Profile
                                                    </a>
                                                )}
                                            </MenuItem>
                                            <MenuItem>
                                                {({ focus }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Settings
                                                    </a>
                                                )}
                                            </MenuItem>
                                            <MenuItem>
                                                {({ focus }) => (
                                                    <a
                                                        href="/"
                                                        onClick={e => window.localStorage.clear()}
                                                        className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Sign out
                                                    </a>
                                                )}
                                            </MenuItem>
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                                    ) : (
                                    <div className="relative ml-3">
                                        <div>
                                            <div className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <a href="/sign-in"><i className="fa-solid text-2xl fa-arrow-right-to-bracket white-font"></i></a>
                                                <span className="sr-only">Open user menu</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>

                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    )
}
