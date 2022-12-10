<h1 align="center">🌞Tsundoku(light): A Theme for SiYuan Note</h1>

<p align="center">          
           <a title="Hits" target="_blank" href="https://github.com/Achuan-2/siyuan-themes-tsundoku-light"><img src="https://hits.b3log.org/Achuan-2/siyuan-themes-tsundoku-light.svg" ></a>
           <a title="GitHub release (latest by date including pre-releases)" target="_blank" href="https://github.com/Achuan-2/siyuan-themes-tsundoku-light/releases/latest">
                 <img src="https://img.shields.io/github/v/release/Achuan-2/siyuan-themes-tsundoku-light?include_prereleases&style=flat-square" >
           </a>
           <img src="https://img.shields.io/github/stars/Achuan-2/siyuan-themes-tsundoku-light" alt="stars">
           <img src="https://img.shields.io/github/issues-raw/Achuan-2/siyuan-themes-tsundoku-light" alt="open-issues">
           <img src="https://img.shields.io/github/issues-closed-raw/Achuan-2/siyuan-themes-tsundoku-light" alt="closed-issues">
          <img src="https://img.shields.io/github/last-commit/Achuan-2/siyuan-themes-tsundoku-light" alt="GitHub last commit">
</p>

<p align="center">中文介绍 |<a href="README_EN.md"> English</a></p>

<p align="center"><a href="https://github.com/Achuan-2/siyuan-themes-tsundoku-dark"> 🌙Tsunoku Dark </a> |🌞Tsunoku Light |<a href="https://github.com/Achuan-2/siyuan-themes-tsundoku-green"> 🍃Tsunoku Green </a></p>

![](preview.png)

> 前排提示：复旦大学脑转化院研究生在读ing，研究生的生活比我想象的忙碌的多得多，现在更新主题很多时候只是为了放松下（摸鱼），所以主题今后只会以完善和修复缺陷适配新版本为主，思源社区目前也出现了很多优秀的主题，也欢迎大家使用其他主题。 
> ——Achuan-2于2022.12.10 


**简介**：[思源笔记(Siyuan)](https://github.com/siyuan-note/siyuan)是一款本地优先的个人知识管理系统，支持完全离线使用，同时也支持端到端加密同步。融合块、大纲和双向链接，构建你永恒的数字花园。本主题为个人原创主题，专为思源笔记设计。

## 🚀更新情况

见[📃Tsundoku 主题更新日志](https://www.yuque.com/achuan-2/siyuan/bkq4s2)


## 💌 缘起

🎉系列主题最早诞生于2021.02.22

Tsundoku “積 ん 読”是日语里的一个词，维基百科是这样解释的“Tsundoku is acquiring reading materials but letting them pile up in one's home without reading them. It is also used to refer to books ready for reading later when they are on a bookshelf.” 简单说就是买书成瘾却不读的行为。
> Any PKM approach that doesn't tie into execution tools is destined to languish on the back burner forever.

使用一个工具的最大障碍是「需求不清」，如果不清楚自己的记录需求是什么，那功能越多，可能造成的障碍越大，很容易就使人陷进去对功能的各种研究中去了。用完一堆笔记软件之后你会明白：最需要提升的并不是你所用的工具，**而是你自己**。

我借此名来警醒自己，希望能利用好思源笔记，帮助我养成每日记录、定期回顾复盘的习惯，更好地掌握知识和技能，争取做有意义的项目，变成更优秀的人，而不是为了记笔记而笔记，让笔记软件成为一个个缓解知识焦虑的积灰箱，满足变态的数字化囤积症。


## 💥主题特色功能
- **为超链接添加了icon**：区别不同的本地链接和网络链接，详见[超链接图标介绍](https://www.yuque.com/achuan-2/siyuan/gar358)
  ![20220131165215_2022-01-31](https://cdn.jsdelivr.net/gh/Achuan-2/PicBed@pic/assets/README/20220131165215_2022-01-31.png)
- **引入语雀提示区块**：给引述块blockquote添加块背景颜色，就会自动应用样式，详见[语雀提示区块样式](https://www.yuque.com/achuan-2/siyuan/obxpvr)
  ![20220131165233_2022-01-31](https://cdn.jsdelivr.net/gh/Achuan-2/PicBed@pic/assets/README/20220131165233_2022-01-31.png)
- 引入文本遮挡：暂时将高亮Ctrl+E,设置为文本遮挡效果：悬浮时才显示高亮的文字，默认隐藏文字 
- [Dark+](https://github.com/Zuoqiu-Yingyi/siyuan-theme-dark-plus)主题的功能（copy）
  - 打开一个新窗口并置顶
  - 复制当前文档大纲为无序列表
  - 复制文档内容
  - 剪切文档内容
  - 按alt+中键可以打开用monaco-editor以markdown样式打开当前块或文档（打开文档需要在文档题头图那块点击）
- [HBuilderX-Light](https://github.com/UFDXD/HBuilderX-Light)的功能（copy）
  - 左右面板收起
  - 高亮文本显示
- **添加了自定义块属性样式**
  - 使用方式：单击块标选择打开属性列表或Shift+Click打开，点击添加，输入属性名为f或function，并输入相应的属性值（hide或挖空）
  - 自定义块属性列表
    | 属性key | 属性值value     | 功能                                                   | 备注                                                                       |
    | --------- | ------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------- |
    | f       | hide/挖空<br /> | 挖空块                                                 |                                                                            |
    | f       | table       | 将列表转化为表格<br />                                     | 参考自[Zhang light主题](https://github.com/UserZYF/zhang-light)            |
    | f       | scroll      | 代码块和表格设置最大展示高度，超过则显示纵向滚动条，<br /> | 参考自[Dark+主题](https://github.com/Zuoqiu-Yingyi/siyuan-theme-dark-plus) |
    | code       | output      | 专门用来放输出结果的代码块 |  |
  
  - 自定义文档属性
    | 属性key  | 属性值value | 功能             |
    | ---------- | ------------- | ------------------ |
    | img      | center      | 文档全部图片居中 |
    | linkicon | no          | 超链接取消icon   |

## 致谢
借鉴了以下主题的功能
- https://github.com/Zuoqiu-Yingyi/siyuan-theme-dark-plus
- https://github.com/UFDXD/HBuilderX-Light
- https://github.com/royc01/notion-theme


## ☎️意见交流

若主题存在样式的问题，欢迎在Github提issue或是通过邮箱联系我(achuan-2@outlook.com)。在提issue之前建议先切换为默认主题，确定是本主题特有的问题。

