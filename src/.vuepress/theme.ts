import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://github.com/Mly66",

  author: {
    name: "Mr.Mly",
    url: "https://mly66.github.io/blog/",
  },

  iconAssets: "fontawesome-with-brands",

  logo: "/logo.svg",

  repo: "Mly66/Mly66",

  docsDir: "src",

  // 导航栏
  navbar,

  // 侧边栏
  sidebar,

  // 页脚
  footer: "mly798798@gmail.com",
  displayFooter: true,

  // 博客相关
  blog: {
    description: "Hello World!",
    intro: "/intro.html",
    medias: {
      Baidu: "https://www.baidu.com",
      BiliBili: "https://www.bilibili.com",
      Bitbucket: "https://bitbucket.org",
      Dingding: "https://www.dingtalk.com",
      Discord: "https://discord.com",
      Dribbble: "https://dribbble.com",
      Email: "mailto:mly798798@163.com",
      Evernote: "https://www.evernote.com",
      Facebook: "https://www.facebook.com",
      Flipboard: "https://flipboard.com",
      Gitee: "https://gitee.com",
      GitHub: "https://github.com",
      Gitlab: "https://gitlab.com",
      Gmail: "mailto:mly798798@gamil.com",
      Instagram: "https://www.instagram.com",
      Lark: "https://www.larksuite.com",
      Lines: "https://line.me",
      Linkedin: "https://www.linkedin.com",
      Pinterest: "https://www.pinterest.com",
      Pocket: "https://getpocket.com",
      QQ: "https://im.qq.com",
      Qzone: "https://qzone.qq.com",
      Reddit: "https://www.reddit.com",
      Rss: "https://x.com",
      Steam: "https://store.steampowered.com",
      Twitter: "https://twitter.com",
      Wechat: "https://weixin.qq.com", 
      Weibo: "https://www.weibo.com",
      Whatsapp: "https://www.whatsapp.com", 
      Youtube: "https://www.youtube.com",
      Zhihu: "https://www.zhihu.com",
      Mly66: {
        icon: "https://theme-hope-assets.vuejs.press/logo.svg",
        link: "https://github.com/Mly66",
      },
    },
  },

  // 加密配置
  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
    },
  },

  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 在这里配置主题提供的插件
  plugins: {
    blog: true,

    // 启用之前需安装 @waline/client
    // 警告: 这是一个仅供演示的测试服务，在生产环境中请自行部署并使用自己的服务！
    // comment: {
    //   provider: "Waline",
    //   serverURL: "https://waline-comment.vuejs.press",
    // },

    components: {
      components: ["Badge", "VPCard"],
    },

    // 此处开启了很多功能用于演示，你应仅保留用到的功能。
    markdownImage: {
      figure: true,
      lazyload: true,
      size: true,
    },

    // markdownMath: {
    //   // 启用前安装 katex
    //   type: "katex",
    //   // 或者安装 mathjax-full
    //   type: "mathjax",
    // },

    // 此功能被开启用于演示，你应仅当使用时保留。
    markdownTab: true,

    // 此处开启了很多功能用于演示，你应仅保留用到的功能。
    mdEnhance: {
      align: true,
      attrs: true,
      component: true,
      demo: true,
      include: true,
      mark: true,
      plantuml: true,
      spoiler: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tasklist: true,
      vPre: true,

      // 在启用之前安装 chart.js
      // chart: true,

      // insert component easily

      // 在启用之前安装 echarts
      // echarts: true,

      // 在启用之前安装 flowchart.ts
      // flowchart: true,

      // gfm requires mathjax-full to provide tex support
      // gfm: true,

      // 在启用之前安装 mermaid
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // 在启用之前安装 @vue/repl
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },

    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },

    // 如果你需要幻灯片，安装 @vuepress/plugin-revealjs 并取消下方注释
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },
  },
});
