import projectConfig from '/docs/pagic.config.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': undefined,
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p><a href="https://prochg.github.io/docs/">斜阳草树 寻常巷陌</a></p>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { href: "/docs/assets/theme.css", id: "customTheme", rel: "stylesheet", type: "text/css" }),
        React.createElement("script", { src: "/docs/assets/custom.js" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@17.0.2/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@17.0.2/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/docs/index.js", type: "module" })),
    'footer': React.createElement("footer", null,
        "Powered by\u00A0",
        React.createElement("a", { href: "https://github.com/xcatliu/pagic", target: "_blank" }, "Pagic")),
    'contentTitle': undefined,
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p><a href="https://prochg.github.io/docs/">斜阳草树 寻常巷陌</a></p>'
        } }),
    'toc': null,
    'author': "yvanlin",
    'contributors': [
        "yvanlin"
    ],
    'date': "2021-05-31T04:42:14.000Z",
    'updated': null,
    'excerpt': "斜阳草树 寻常巷陌",
    'cover': undefined,
    'sidebar': [
        {
            "text": "C++",
            "children": []
        },
        {
            "text": "Windows系统开发",
            "children": []
        }
    ]
};
