const marked = require('marked');
const Prism = require('prismjs');

// 注册vue语言支持
Prism.languages.vue = Prism.languages.extend('html', {
    punctuation: /({{|}})/gi,
});

function markdownLoader(val) {
    const html = marked(val, {
        highlight(code, lang) {
            return Prism.highlight(code, Prism.languages[lang] || Prism.languages.js);
        },
    });
    return `<template><div class="markdown">${html}</div></template>`;
}

module.exports = markdownLoader;
