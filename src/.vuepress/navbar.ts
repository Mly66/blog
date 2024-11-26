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
          { text: "代码4", icon: "pen-to-square", link: "4" },        ],
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
      { text: "npm", icon: "pen-to-square", link: "cherry" },
      { text: "Maven", icon: "pen-to-square", link: "dragonfruit" },
      { text: "pip", icon: "pen-to-square", link: "tomato" },
      { text: "blog", icon: "pen-to-square", link: "strawberry" },
    ],
  },
  {
    text: "主页",
    icon: "book",
    link: "https://github.com/Mly66",
  },
]);