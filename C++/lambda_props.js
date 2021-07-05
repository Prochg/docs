import projectConfig from '/docs/pagic.config.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "C++/lambda.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "C++/lambda.html",
    'title': "C++ lambda",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>C++ lambda</h1>\n<h3 id="%E6%A8%A1%E6%9D%BF%E5%A6%82%E4%BD%95%E8%AF%86%E5%88%ABlambda%E8%A1%A8%E8%BE%BE%E5%BC%8F">模板如何识别lambda表达式<a class="anchor" href="#%E6%A8%A1%E6%9D%BF%E5%A6%82%E4%BD%95%E8%AF%86%E5%88%ABlambda%E8%A1%A8%E8%BE%BE%E5%BC%8F">§</a></h3>\n<p>随着lambda表达式在C++中的应用越来越普遍，经常会遇到跟lambda表达式相关的模板类型解析，但是标准C++还没有对应的traits。</p>\n<p>lambda表达式本身是重载了operator () 的匿名类，可以根据此特性来识别是否lambda表达式，具体代码如下：</p>\n<pre class="language-autoit"><code class="language-autoit">template<span class="token operator">&lt;</span>typename R<span class="token punctuation">,</span> typename C<span class="token punctuation">,</span> typename IsMutable<span class="token punctuation">,</span> typename<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> Args<span class="token operator">></span>\nstruct lambda_type_info\n{\n  using type <span class="token operator">=</span> <span class="token function">R</span><span class="token punctuation">(</span>Args<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token comment">;</span>\n  using return_type <span class="token operator">=</span> R<span class="token comment">;</span>\n   using is_mutable <span class="token operator">=</span> IsMutable<span class="token comment">;</span>\n\n  <span class="token keyword">enum</span> { arity <span class="token operator">=</span> sizeof<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">(</span>Args<span class="token punctuation">)</span> }<span class="token comment">;</span>\n\n  template<span class="token operator">&lt;</span>size_t i<span class="token operator">></span>\n  struct arg\n  {\n    typedef typename std<span class="token punctuation">:</span><span class="token punctuation">:</span>decay<span class="token operator">&lt;</span>typename std<span class="token punctuation">:</span><span class="token punctuation">:</span>tuple_element<span class="token operator">&lt;</span>i<span class="token punctuation">,</span> std<span class="token punctuation">:</span><span class="token punctuation">:</span>tuple<span class="token operator">&lt;</span>Args<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">></span><span class="token operator">></span><span class="token punctuation">:</span><span class="token punctuation">:</span>type<span class="token operator">></span><span class="token punctuation">:</span><span class="token punctuation">:</span>type type<span class="token comment">;</span>\n  }<span class="token comment">;</span>\n}<span class="token comment">;</span>\n\ntemplate<span class="token operator">&lt;</span>typename T<span class="token punctuation">,</span> typename <span class="token operator">=</span> void<span class="token operator">></span>\nstruct lambda_type\n{\n  <span class="token keyword">static</span> constexpr bool is_lambda <span class="token operator">=</span> <span class="token boolean">false</span><span class="token comment">;</span>\n}<span class="token comment">;</span>\n\ntemplate<span class="token operator">&lt;</span>class T<span class="token operator">></span>\nstruct lambda_type<span class="token operator">&lt;</span>T<span class="token punctuation">,</span> typename std<span class="token punctuation">:</span><span class="token punctuation">:</span>enable_if<span class="token operator">&lt;</span>std<span class="token punctuation">:</span><span class="token punctuation">:</span>is_same<span class="token operator">&lt;</span><span class="token function">decltype</span><span class="token punctuation">(</span><span class="token function">void</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>T<span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token function">operator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> void<span class="token operator">></span><span class="token punctuation">:</span><span class="token punctuation">:</span>value<span class="token operator">></span><span class="token punctuation">:</span><span class="token punctuation">:</span>type<span class="token operator">></span> <span class="token punctuation">:</span> lambda_type<span class="token operator">&lt;</span><span class="token function">decltype</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>T<span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token function">operator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">></span>\n{\n  <span class="token keyword">static</span> constexpr bool is_lambda <span class="token operator">=</span> <span class="token boolean">true</span><span class="token comment">;</span>\n}<span class="token comment">;</span>\n\ntemplate<span class="token operator">&lt;</span>typename R<span class="token punctuation">,</span> typename C<span class="token punctuation">,</span> typename<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> Args<span class="token operator">></span>\nstruct lambda_type<span class="token operator">&lt;</span>R <span class="token punctuation">(</span>C<span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">(</span>Args<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token operator">></span> <span class="token punctuation">:</span> lambda_type_info<span class="token operator">&lt;</span>R<span class="token punctuation">,</span> C<span class="token punctuation">,</span> std<span class="token punctuation">:</span><span class="token punctuation">:</span>true_type<span class="token punctuation">,</span> Args<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">></span>\n{\n}<span class="token comment">;</span>\n\ntemplate<span class="token operator">&lt;</span>typename R<span class="token punctuation">,</span> typename C<span class="token punctuation">,</span> typename<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> Args<span class="token operator">></span>\nstruct lambda_type<span class="token operator">&lt;</span>R <span class="token punctuation">(</span>C<span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">(</span>Args<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token operator">></span> <span class="token punctuation">:</span> lambda_type_info<span class="token operator">&lt;</span>R<span class="token punctuation">,</span> C<span class="token punctuation">,</span> std<span class="token punctuation">:</span><span class="token punctuation">:</span>false_type<span class="token punctuation">,</span> Args<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">></span>\n{\n}<span class="token comment">;</span>\n</code></pre>\n<p>使用过程：</p>\n<pre class="language-autoit"><code class="language-autoit">  auto lambda <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>int param<span class="token punctuation">)</span> {}<span class="token comment">;</span>\n\n  <span class="token operator">/</span><span class="token operator">/</span> 判断是否lambda表达式，可以用于enable_if中\n  lambda_type<span class="token operator">&lt;</span><span class="token function">decltype</span><span class="token punctuation">(</span>lambda<span class="token punctuation">)</span><span class="token operator">></span><span class="token punctuation">:</span><span class="token punctuation">:</span>is_lambda<span class="token comment">;</span>\n\n  <span class="token operator">/</span><span class="token operator">/</span> 获取lambda表达式的函数调用类型 <span class="token function">void</span><span class="token punctuation">(</span>int<span class="token punctuation">)</span>，可以用于某些需要转换成明确函数调用的地方\n  std<span class="token punctuation">:</span><span class="token punctuation">:</span>function<span class="token operator">&lt;</span>lambda_type<span class="token operator">&lt;</span><span class="token function">decltype</span><span class="token punctuation">(</span>lambda<span class="token punctuation">)</span><span class="token operator">></span><span class="token punctuation">:</span><span class="token punctuation">:</span>type<span class="token operator">></span> pfn <span class="token operator">=</span> lambda<span class="token comment">;</span>\n\n  <span class="token operator">/</span><span class="token operator">/</span> 获取lambda表达式的参数类型\n  lambda_type<span class="token operator">&lt;</span><span class="token function">decltype</span><span class="token punctuation">(</span>lambda<span class="token punctuation">)</span><span class="token operator">></span><span class="token punctuation">:</span><span class="token punctuation">:</span>arg<span class="token operator">&lt;</span><span class="token number">0</span><span class="token operator">></span><span class="token punctuation">:</span><span class="token punctuation">:</span>type param<span class="token comment">;</span>\n</code></pre>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/docs/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "C++ lambda"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h3 id="%E6%A8%A1%E6%9D%BF%E5%A6%82%E4%BD%95%E8%AF%86%E5%88%ABlambda%E8%A1%A8%E8%BE%BE%E5%BC%8F">模板如何识别lambda表达式<a class="anchor" href="#%E6%A8%A1%E6%9D%BF%E5%A6%82%E4%BD%95%E8%AF%86%E5%88%ABlambda%E8%A1%A8%E8%BE%BE%E5%BC%8F">§</a></h3>\n<p>随着lambda表达式在C++中的应用越来越普遍，经常会遇到跟lambda表达式相关的模板类型解析，但是标准C++还没有对应的traits。</p>\n<p>lambda表达式本身是重载了operator () 的匿名类，可以根据此特性来识别是否lambda表达式，具体代码如下：</p>\n<pre class="language-autoit"><code class="language-autoit">template<span class="token operator">&lt;</span>typename R<span class="token punctuation">,</span> typename C<span class="token punctuation">,</span> typename IsMutable<span class="token punctuation">,</span> typename<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> Args<span class="token operator">></span>\nstruct lambda_type_info\n{\n  using type <span class="token operator">=</span> <span class="token function">R</span><span class="token punctuation">(</span>Args<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token comment">;</span>\n  using return_type <span class="token operator">=</span> R<span class="token comment">;</span>\n   using is_mutable <span class="token operator">=</span> IsMutable<span class="token comment">;</span>\n\n  <span class="token keyword">enum</span> { arity <span class="token operator">=</span> sizeof<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">(</span>Args<span class="token punctuation">)</span> }<span class="token comment">;</span>\n\n  template<span class="token operator">&lt;</span>size_t i<span class="token operator">></span>\n  struct arg\n  {\n    typedef typename std<span class="token punctuation">:</span><span class="token punctuation">:</span>decay<span class="token operator">&lt;</span>typename std<span class="token punctuation">:</span><span class="token punctuation">:</span>tuple_element<span class="token operator">&lt;</span>i<span class="token punctuation">,</span> std<span class="token punctuation">:</span><span class="token punctuation">:</span>tuple<span class="token operator">&lt;</span>Args<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">></span><span class="token operator">></span><span class="token punctuation">:</span><span class="token punctuation">:</span>type<span class="token operator">></span><span class="token punctuation">:</span><span class="token punctuation">:</span>type type<span class="token comment">;</span>\n  }<span class="token comment">;</span>\n}<span class="token comment">;</span>\n\ntemplate<span class="token operator">&lt;</span>typename T<span class="token punctuation">,</span> typename <span class="token operator">=</span> void<span class="token operator">></span>\nstruct lambda_type\n{\n  <span class="token keyword">static</span> constexpr bool is_lambda <span class="token operator">=</span> <span class="token boolean">false</span><span class="token comment">;</span>\n}<span class="token comment">;</span>\n\ntemplate<span class="token operator">&lt;</span>class T<span class="token operator">></span>\nstruct lambda_type<span class="token operator">&lt;</span>T<span class="token punctuation">,</span> typename std<span class="token punctuation">:</span><span class="token punctuation">:</span>enable_if<span class="token operator">&lt;</span>std<span class="token punctuation">:</span><span class="token punctuation">:</span>is_same<span class="token operator">&lt;</span><span class="token function">decltype</span><span class="token punctuation">(</span><span class="token function">void</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>T<span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token function">operator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> void<span class="token operator">></span><span class="token punctuation">:</span><span class="token punctuation">:</span>value<span class="token operator">></span><span class="token punctuation">:</span><span class="token punctuation">:</span>type<span class="token operator">></span> <span class="token punctuation">:</span> lambda_type<span class="token operator">&lt;</span><span class="token function">decltype</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>T<span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token function">operator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">></span>\n{\n  <span class="token keyword">static</span> constexpr bool is_lambda <span class="token operator">=</span> <span class="token boolean">true</span><span class="token comment">;</span>\n}<span class="token comment">;</span>\n\ntemplate<span class="token operator">&lt;</span>typename R<span class="token punctuation">,</span> typename C<span class="token punctuation">,</span> typename<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> Args<span class="token operator">></span>\nstruct lambda_type<span class="token operator">&lt;</span>R <span class="token punctuation">(</span>C<span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">(</span>Args<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token operator">></span> <span class="token punctuation">:</span> lambda_type_info<span class="token operator">&lt;</span>R<span class="token punctuation">,</span> C<span class="token punctuation">,</span> std<span class="token punctuation">:</span><span class="token punctuation">:</span>true_type<span class="token punctuation">,</span> Args<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">></span>\n{\n}<span class="token comment">;</span>\n\ntemplate<span class="token operator">&lt;</span>typename R<span class="token punctuation">,</span> typename C<span class="token punctuation">,</span> typename<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> Args<span class="token operator">></span>\nstruct lambda_type<span class="token operator">&lt;</span>R <span class="token punctuation">(</span>C<span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">(</span>Args<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token operator">></span> <span class="token punctuation">:</span> lambda_type_info<span class="token operator">&lt;</span>R<span class="token punctuation">,</span> C<span class="token punctuation">,</span> std<span class="token punctuation">:</span><span class="token punctuation">:</span>false_type<span class="token punctuation">,</span> Args<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">></span>\n{\n}<span class="token comment">;</span>\n</code></pre>\n<p>使用过程：</p>\n<pre class="language-autoit"><code class="language-autoit">  auto lambda <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>int param<span class="token punctuation">)</span> {}<span class="token comment">;</span>\n\n  <span class="token operator">/</span><span class="token operator">/</span> 判断是否lambda表达式，可以用于enable_if中\n  lambda_type<span class="token operator">&lt;</span><span class="token function">decltype</span><span class="token punctuation">(</span>lambda<span class="token punctuation">)</span><span class="token operator">></span><span class="token punctuation">:</span><span class="token punctuation">:</span>is_lambda<span class="token comment">;</span>\n\n  <span class="token operator">/</span><span class="token operator">/</span> 获取lambda表达式的函数调用类型 <span class="token function">void</span><span class="token punctuation">(</span>int<span class="token punctuation">)</span>，可以用于某些需要转换成明确函数调用的地方\n  std<span class="token punctuation">:</span><span class="token punctuation">:</span>function<span class="token operator">&lt;</span>lambda_type<span class="token operator">&lt;</span><span class="token function">decltype</span><span class="token punctuation">(</span>lambda<span class="token punctuation">)</span><span class="token operator">></span><span class="token punctuation">:</span><span class="token punctuation">:</span>type<span class="token operator">></span> pfn <span class="token operator">=</span> lambda<span class="token comment">;</span>\n\n  <span class="token operator">/</span><span class="token operator">/</span> 获取lambda表达式的参数类型\n  lambda_type<span class="token operator">&lt;</span><span class="token function">decltype</span><span class="token punctuation">(</span>lambda<span class="token punctuation">)</span><span class="token operator">></span><span class="token punctuation">:</span><span class="token punctuation">:</span>arg<span class="token operator">&lt;</span><span class="token number">0</span><span class="token operator">></span><span class="token punctuation">:</span><span class="token punctuation">:</span>type param<span class="token comment">;</span>\n</code></pre>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E6%A8%A1%E6%9D%BF%E5%A6%82%E4%BD%95%E8%AF%86%E5%88%ABlambda%E8%A1%A8%E8%BE%BE%E5%BC%8F" }, "\u6A21\u677F\u5982\u4F55\u8BC6\u522Blambda\u8868\u8FBE\u5F0F")))),
    'author': "yvanlin",
    'contributors': [
        "yvanlin"
    ],
    'date': "2021-07-05T04:23:20.000Z",
    'updated': null,
    'excerpt': "模板如何识别lambda表达式 随着lambda表达式在C++中的应用越来越普遍，经常会遇到跟lambda表达式相关的模板类型解析，但是标准C++还没有对应的traits。 lambda表达式本身是重载了operator () 的匿名类，可以根据此特性来识别是...",
    'cover': undefined,
    'sidebar': [
        {
            "text": "C++",
            "children": [
                {
                    "text": "C++ lambda",
                    "link": "C++/lambda.html",
                    "pagePath": "C++/lambda.md"
                }
            ]
        },
        {
            "text": "Windows系统开发",
            "children": []
        }
    ]
};
