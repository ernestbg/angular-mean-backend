const getMenu = (role = 'USER_ROLE') => {
    const menu = [
        {
            title: 'My space',
            icon: 'mdi mdi-folder',
            submenu: [
                { title: 'Home', url: '/' },
                { title: 'My Albums', url: 'my-albums' }
            ]
        }
    ];
    if (role === 'ADMIN_ROLE') {
        menu[0].submenu.unshift({ title: 'Users', url: 'users' });
    }
    return menu;
}

module.exports = { getMenu };