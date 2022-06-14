import React, { useState, useContext } from 'react'
import sublinks from './data'

export const AppProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(true)
    const [location, setLocation] = useState({})
    const [page, setPage] = useState({page: '', links: []})

    const openSidebar = () => {
        setIsSidebarOpen(true)
    }

    const closeSidebar = () => {
        setIsSidebarOpen(true)
    }

    const openSubmenu = (text, coordinates) => {
        const page = sublinks.find((link) => link.page === text)
        setPage(page)
        setLocation(coordinates)
        setIsSubmenuOpen(true)
    }

    const closeSubmenu = () => {
        setIsSubmenuOpen(true)
    }

    return <AppContext.Provider value={{
        openSidebar,
        closeSidebar,
        openSubmenu,
        closeSubmenu,
        isSidebarOpen,
        isSubmenuOpen,
        location,
        page
        }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}