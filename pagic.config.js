const nav = [
    {
        text: '技术文档',
        link: '/docs/index.html',
    },
];
const sidebar = {
    '/': [
        {
            text: 'C++',
            children: [
                'C++/lambda.md',
            ]
        },
        {
            text: 'Windows系统开发',
            children: [],
        },
    ],
};
export default {
    srcDir: 'docs',
    root: '/docs/',
    theme: 'docs',
    plugins: ['sidebar', 'prev_next'],
    title: '斜阳草树 寻常巷陌',
    description: '',
    github: 'https://github.com/Prochg/docs',
    nav,
    sidebar,
    tools: {
        editOnGitHub: false,
        backToTop: true,
    },
    md: {
        anchorLevel: [1, 2, 3, 4, 5, 6],
        tocEnabled: true,
        tocLevel: [1, 2, 3, 4]
    },
    head: (React.createElement(React.Fragment, null,
        React.createElement("link", { rel: "stylesheet", type: "text/css", id: "customTheme", href: "/docs/assets/theme.css" }),
        React.createElement("script", { src: "/docs/assets/custom.js" }))),
    port: 8000,
};
