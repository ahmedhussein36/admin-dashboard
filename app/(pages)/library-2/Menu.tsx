import React, { FC } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { BiCopy, BiDetail, BiDownload, BiTrash } from 'react-icons/bi'

const options = [
    { name: 'Copy Image URL', icon: <BiCopy className="size-5 fill-white/50" /> },
    { name: 'Download', icon: <BiDownload className="size-5 fill-white/50" /> },
    { name: 'Details', icon: <BiDetail className="size-5 fill-white/50" /> },
    { name: 'Delete', icon: <BiTrash className="size-5 fill-white/50" /> }
]


const DownMenu: FC = () => {
    return (
        <div className="fixed top-24 w-52 text-right">
            <Menu>
                <MenuButton className="inline-flex 
                        items-center gap-2 rounded-md 
                        bg-gray-800 py-1.5 px-3 text-sm/6 
                        font-semibold text-white shadow-inner
                        shadow-white/10 focus:outline-none 
                        data-[hover]:bg-gray-700 data-[open]:bg-gray-700 
                        data-[focus]:outline-1 data-[focus]:outline-white"
                >
                    Options
                </MenuButton>

                <MenuItems
                    transition
                    anchor="bottom end"
                    className="w-52 
                    origin-top-left 
                    rounded-xl 
                    border border-white/5 bg-black/70 p-1 
                    text-sm/6 text-white transition duration-200 
                    ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                > {
                        options.map((option, index) => (
                            <MenuItem key={index}>
                                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                    {option.icon}
                                    {option.name}
                                </button>
                            </MenuItem>
                        ))}



                </MenuItems>
            </Menu>
        </div>
    )
}

export default DownMenu 