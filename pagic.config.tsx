import { React } from 'https://deno.land/x/pagic@v1.3.1/mod.ts';

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
      children: [
      ],
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
  head: <link rel="stylesheet" type="text/css" href="/assets/theme.css" />,
  port: 8000,
};
