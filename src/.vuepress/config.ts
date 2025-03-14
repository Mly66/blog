import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  head: [
    // 设置 favor.ico，.vuepress/public 下
    [
        'link', { rel: 'icon', href: 'icon.png' }
    ]
],
  base: "/blog/",

  lang: "zh-CN",
  title: "马瑶瑶瑶瑶瑶",
  description: "马瑶瑶瑶瑶瑶的博客演示",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
