/**
 * 根据目录结构自动生成配置
 */

const fs = require('fs')

const baseConfig = {
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
            '/articles/'
        ],
        lastUpdated: 'Last Updated',
        search: false
    }
}

function autosidebar(config) {
    const articlePath = './docs/articles'
    const dirs = fs.readdirSync(articlePath, { withFileTypes: true })
 
    for (let dir of dirs) {
        if (dir.isDirectory()) {
            const title = dir.name
            const path = '/articles/' + title
            let children = []

            const filenameList = fs.readdirSync(articlePath + '/' + title)
            for (let filename of filenameList)
                if (filename !== 'README.md')
                    children.push(path + '/' + filename)

            config.themeConfig.sidebar.push({
                title,
                path,
                children
            })
        }
    }

    return config
}

module.exports = autosidebar(baseConfig)