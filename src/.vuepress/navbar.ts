import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/demo/",
  {
    text: "博文",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "代码",
        icon: "pen-to-square",
        prefix: "code/",
        children: [
          { text: "PowerShell ", icon: "pen-to-square", link: "1" },
          { text: "gcc", icon: "pen-to-square", link: "2" },
          { text: "Chrome", icon: "pen-to-square", link: "3" },
          { text: "jQuery", icon: "pen-to-square", link: "4" },        ],
      },
      {
        text: "工具",
        icon: "pen-to-square",
        prefix: "tool/",
        children: [
          {
            text: "CHFS",
            icon: "pen-to-square",
            link: "1",
          },
          {
            text: "GitHub Desktop",
            icon: "pen-to-square",
            link: "2",
          },
          {
            text: "DNS优选",
            icon: "pen-to-square",
            link: "3",
          },
          {
            text: "ARDC",
            icon: "pen-to-square",
            link: "4",
          },
        ],
      },
      { text: "npm", icon: "pen-to-square", link: "npm" },
      { text: "Maven", icon: "pen-to-square", link: "Maven" },
      { text: "pip", icon: "pen-to-square", link: "pip" },
      { text: "blog", icon: "pen-to-square", link: "VuePress" },
    ],
  },
  {
    text: "主页",
    icon: "book",
    link: "https://github.com/Mly66",
  },
]);
