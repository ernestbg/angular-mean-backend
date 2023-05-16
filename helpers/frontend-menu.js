const getMenu = (role = 'USER_ROLE') => {
    const menu = [
        {
            title: 'Home',
            icon: 'mdi mdi-gauge',
            submenu: [
                { title: 'Main', url: '/' },
                { title: 'ProgressBar', url: 'progress' },
                { title: 'Graphics', url: 'graphic1' },
                { title: 'Promises', url: 'promises' },
                { title: 'Rxjs', url: 'rxjs' },
            ]
        },
        {
            title: 'Maintenance',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                { title: 'Main', url: '/' },
                //{ title: 'Users', url: 'users' },
                { title: 'Playlists', url: 'playlists' },
                { title: 'Songs', url: 'songs' }
            ]
        }
    ];
    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ title: 'Users', url: 'users' })
    }
    return menu;
}

module.exports = { getMenu };