import React, {Fragment} from 'react';
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

import {style} from "../../utils/style.js";
import { NavLink, useParams} from "react-router-dom";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const navigation = [
    { name: 'Dashboard', href: '/' },
    { name: 'Team', href: '/team' },
    { name: 'Projects', href: '/projects' },
]


function Navbar(props) {
    return (
       <div>
           <Disclosure as="nav" className={`${style.padding}`}>
               {({ open }) => (
                   <>
                       <div className={`${style.container} `}>
                           <div className="relative flex h-16 items-center justify-between">
                               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                   {/* Mobile menu button*/}
                                   <DisclosureButton className="relative inline-flex items-center
                                   justify-center rounded-md p-2 text-gray-400
                                   hover:text-black focus:outline-none ">
                                       {open ? (
                                           <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                       ) : (
                                           <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                       )}
                                   </DisclosureButton>
                               </div>
                               <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                   <NavLink to='/' className="flex flex-shrink-0 items-center">
                                       <img className="h-12 md:h-14 w-auto" src="./img/logo.svg" alt="Your Company"/>
                                   </NavLink>
                                   <div className="hidden sm:ml-6 sm:block">
                                       <div className="flex space-x-4">
                                           {navigation.map((item) => (
                                               <NavLink
                                                   key={item.name} to={item.href}

                                                   style={({ isActive, isPending }) => {
                                                       return {
                                                           color: isActive ? "text-primary" : "inherit",
                                                       };
                                                   }}
                                                   className={`bg-gray-900 text-primary
                                                   text-gray-300 hover:bg-gray-700 hover:text-primary
                                                       rounded-md px-3 py-2 text-xl font-medium
                                                       ${({ isActive, isPending }) => {
                                                       return isActive ? "active" : isPending ? "pending" : "";
                                                   }}
                                                       `}

                                               >
                                                   {item.name}
                                               </NavLink>
                                           ))}
                                       </div>
                                   </div>
                               </div>
                               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                   {/* Profile dropdown */}
                                   <Menu as="div" className="relative ml-3">
                                       <div>
                                           <MenuButton className="relative flex rounded-full bg-gray-800 text-sm ">

                                               <img
                                                   className="h-14 w-14 rounded-full"
                                                   src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                   alt=""
                                               />
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
                                           <MenuItems className="absolute right-0 z-10 mt-2 w-48
                                            origin-top-right rounded-md bg-white py-1 shadow-lg
                                            ring-black ring-opacity-5">
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
                                                           href="#"
                                                           className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                       >
                                                           Sign out
                                                       </a>
                                                   )}
                                               </MenuItem>
                                           </MenuItems>
                                       </Transition>
                                   </Menu>
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
                                           item.current ? 'bg-gray-900 text-black' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
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
       </div>

);
}

export default Navbar;