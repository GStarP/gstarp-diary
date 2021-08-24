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

function autoSidebar(config) {
    const articlePath = './docs/articles'
    const dirs = fs.readdirSync(articlePath, { withFileTypes: true })
 
    for (let dir of dirs) {
        if (dir.isDirectory()) {
            const title = dir.name
            const relativePath = '/articles/' + title
            let children = []

            const filenameList = fs.readdirSync(articlePath + '/' + title)
            for (let filename of filenameList)
                if (filename !== 'README.md')
                    children.push(relativePath + '/' + filename)

            config.themeConfig.sidebar.push({
                title,
                path: relativePath,
                children
            })
        }
    }

    return config
}

function autoArchieve() {
    const articlePath = './docs/articles'
    const dirs = fs.readdirSync(articlePath, { withFileTypes: true })
 
    for (let dir of dirs) {
        if (dir.isDirectory()) {
            const path = articlePath + '/' + dir.name
            const readme = path + '/README.md'
            let readmeContent = `# ${dir.name}\n\n`

            const relativePath = '/articles/' + dir.name

            const filenameList = fs.readdirSync(articlePath + '/' + dir.name)
            for (let filename of filenameList) {
                if (filename !== 'README.md') {
                    const content = fs.readFileSync(path + '/' + filename, { encoding: 'utf-8' })
                    const firstLine = content.split('\n')[0]
                    const title = firstLine.substr(2, firstLine.length - 3)
                    readmeContent += `### [${title}](${relativePath}/${filename})\n\n`
                }
            }

            fs.writeFileSync(readme, readmeContent, { flag: 'w' })
        }
    }
}

function preHandle(config) {
    autoArchieve()
    config = autoSidebar(baseConfig)
    return config
}

module.exports = preHandle(baseConfig)