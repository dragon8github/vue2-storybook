function createLink(innerHTML, onclick) {
    let link = document.createElement('a')
    link.className = 'shortcutLink'
    link.onclick = onclick
    link.innerHTML = innerHTML
    return link
}

// 快捷方式链接
// 由于 el-autocomplete 只支持 item 定制，不支持 .el-autocomplete-suggestion__wrap 定制。暂时用注入 dom 的方式来粗鲁的实现快捷链接
createShortcutLinks() {
    this.$nextTick(() => {
        // 删除上一次创建的所有链接
        document.querySelectorAll('.shortcutLinks').forEach((val, key) => val.remove())
        const shortcutLinks = document.createElement('div')
        shortcutLinks.className = 'shortcutLinks'
        shortcutLinks.append(createLink('酒店（10021）', this.handleSelect))
        shortcutLinks.append(createLink('娱乐场所（2021）', this.handleSelect))
        shortcutLinks.append(createLink('图书馆（10）', this.handleSelect))
        document.querySelector('.el-scrollbar__view').insertAdjacentElement('beforebegin', shortcutLinks)
    })
},