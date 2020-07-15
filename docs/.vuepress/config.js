module.exports = {
    base: '/gstarp-diary/',
    title: 'GstarP Diary',
    themeConfig: {
        repo: 'https://github.com/GStarP',
        repoLabel: 'GitHub',
        nav: [
            { text: '首页', link: '/' },
            { text: '关于', link: '/articles/about.md' }
        ],
        sidebar: [
            ['/articles/nav.md', '导航']
        ]
    }
}