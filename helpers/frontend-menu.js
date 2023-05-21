const getMenu = (role = 'USER_ROLE') => {
    const menu = [

        {
            title: 'My space',
            icon: 'mdi mdi-folder',
            submenu: [
                { title: 'Main', url: '/' },
                { title: 'Playlists', url: 'playlists' },
                { title: 'Songs', url: 'songs' },
                { title: 'Artists', url: 'artists' }
            ]
        }
    ];
    
    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ title: 'Users', url: 'users' })
    }
    return menu;
}

module.exports = { getMenu };