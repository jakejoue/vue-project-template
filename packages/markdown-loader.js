const marked = require('marked');
const Prism = require('prismjs');

// 注册vue语言支持
Prism.languages.vue = Prism.languages.extend('html', {
    punctuation: /({{|}})/gi,
});

// 自定义render
const renderer = new marked.Renderer();
const linkRenderer = renderer.link;

renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text);

    if (/^(http|https):\/\//.test(href)) {
        return html.replace(/^<a /, '<a target="_blank" rel="noopener" ');
    } else {
        return html;
    }
};

function markdownLoader(val) {
    const html = marked(val, {
        renderer: renderer,
        highlight(code, lang) {
            return Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup);
        },
    });
    return `<template><div class="markdown-page">${html}</div></template>`;
}

module.exports = markdownLoader;
