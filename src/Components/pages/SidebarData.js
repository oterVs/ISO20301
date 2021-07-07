import React from 'react'

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";


export const SidebarData = [
    {
        tittle: "Home",
        path: "/home",
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        tittle: "Reports",
        path: "/reports",
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    }
]