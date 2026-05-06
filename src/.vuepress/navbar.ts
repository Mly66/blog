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
        text: "运维部署",
        icon: "pen-to-square",
        prefix: "运维部署/",
        children: [
          { text: "npm镜像加速", icon: "pen-to-square", link: "npm镜像加速" },
          { text: "Maven镜像加速", icon: "pen-to-square", link: "Maven镜像加速" },
          { text: "pip镜像加速", icon: "pen-to-square", link: "pip镜像加速" },
          { text: "CentOS7更改YUM源", icon: "pen-to-square", link: "CentOS7更改YUM源" },
        ],
      },
    ],
  },
  {
    text: "主页",
    icon: "book",
    link: "https://github.com/Mly66",
  },
]);
