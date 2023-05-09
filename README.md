<h1 align="center">🌞Tsundoku: A Theme for SiYuan Note</h1>

<p align="center">          
           <a title="Hits" target="_blank" href="https://github.com/Achuan-2/siyuan-themes-tsundoku-light"><img src="https://hits.b3log.org/Achuan-2/siyuan-themes-tsundoku-light.svg" ></a>
           <a title="GitHub release (latest by date including pre-releases)" target="_blank" href="https://github.com/Achuan-2/siyuan-themes-tsundoku/releases/latest">
                 <img src="https://img.shields.io/github/v/release/Achuan-2/siyuan-themes-tsundoku?include_prereleases&style=flat-square" >
           </a>
           <img src="https://img.shields.io/github/stars/Achuan-2/siyuan-themes-tsundoku" alt="stars">
           <img src="https://img.shields.io/github/issues-raw/Achuan-2/siyuan-themes-tsundoku" alt="open-issues">
           <img src="https://img.shields.io/github/issues-closed-raw/Achuan-2/siyuan-themes-tsundoku" alt="closed-issues">
          <img src="https://img.shields.io/github/last-commit/Achuan-2/siyuan-themes-tsundoku" alt="GitHub last commit">
</p>

![中文](./README_zh_CN.md)  

![](preview.png)

> Tip in the front row: Postgraduates in Brain Transformation Institute of Fudan University are studying ing, and their life is much busier than I expected. Now, updating the theme is often just to relax (fishing), so the theme will only focus on perfecting and fixing defects and adapting to the new version in the future. There are also many excellent themes in Siyuan Community, and you are welcome to use other themes.  
> ——Achuan-2 was released on December 10, 2022.


**Introduction**: [Siyuan] (https://github.com/Siyuan-Note/Siyuan) is a local priority personal knowledge management system, which supports completely offline use and end-to-end encryption synchronization. Combine blocks, outlines and two-way links to build your eternal digital garden. This theme is a personal original theme, specially designed for Siyuan notes.

## 🚀 CHANGLOGS

See [📃Tsundoku 主题更新日志](https://www.yuque.com/achuan-2/siyuan/bkq4s2)


## 💌 Origin

🎉 The theme was first born on February 22, 2021.


Tsundoku “積 ん 読” is a word in Japanese. Wikipedia explains it like this: "tsundoku is acquiring reading materials but letting them pile up in one's home without reading them. It is also used to refer to books ready. For reading later when they are on a bookshelf. "Simply put, it is the behavior of buying books but not reading.

> Any PKM approach that doesn't tie into execution tools is destined to languish on the back burner forever.


The biggest obstacle to using a tool is "unclear requirements". If you don't know what your recording requirements are, the more functions there are, the greater the possible obstacles, and it is easy for people to get caught up in various research on functions. After using a pile of notebook software, you will understand that the most important thing to improve is not the tools you use, but yourself.

I use this name to wake myself up, hoping to make good use of Siyuan notes, help me form the habit of daily recording and reviewing the answers regularly, better master knowledge and skills, strive to do meaningful projects and become a better person, instead of taking notes for the sake of taking notes, so that the note-taking software can become a dust box to relieve knowledge anxiety and satisfy abnormal digital hoarding.


## 🐯 主题特色功能  

- ✨ **The theme is three-in-one, which supports both bright mode and dark mode.**（Tsundoku Light、Tsundoku Green、Tsundoku Dark）【Ref：[Savor](https://github.com/royc01/notion-theme) 】  
  - Siyuan note bright mode only supports the selection of light and green, while dark mode only supports the selection of dark theme.
  - **If both bright mode and dark mode are set to use Tsundoku theme**：Switch from dark mode to bright mode, and automatically change to green theme /light theme according to the previous bright mode selection; Switch from bright mode to dark mode and automatically change to dark theme.
- 📎**Added icon to hyperlink.**：See [Introduction to Hyperlink Icons](https://www.yuque.com/Achuan-2/siyuan/gar358) for the difference between different local links and network links.
  ![20220131165215_2022-01-31](https://cdn.jsdelivr.net/gh/Achuan-2/PicBed@pic/assets/README/20220131165215_2022-01-31.png)
- 🧊 **Introduction of finch cue block**：Add a block background color to the reference block blockquote, and the style will be automatically applied. See [Que Hint Block Style](https://www.yuque.com/achuan-2/siyuan/obxpvr) for details.
  ![20220131165233_2022-01-31](https://cdn.jsdelivr.net/gh/Achuan-2/PicBed@pic/assets/README/20220131165233_2022-01-31.png)

## 😺 借鉴功能

- [Dark+](https://github.com/Zuoqiu-Yingyi/siyuan-theme-dark-plus)主题的功能（copy）
  - 打开一个新窗口并置顶
  - 复制当前文档大纲为无序列表
  - 复制文档内容
  - 剪切文档内容
  - 按alt+中键可以打开用monaco-editor以markdown样式打开当前块或文档
    - 打开文档需要在文档题头图那块点击
    - Ctrl+S才能从manaco编辑器保存内容
- [HBuilderX-Light](https://github.com/UFDXD/HBuilderX-Light)的功能（copy）
  - 左右面板收起
  - 高亮文本隐藏按钮：将Ctrl+E，设置为文本遮挡效果：默认显示文字，当点击顶栏【开启隐藏高亮文本按钮】时，隐藏高亮文本。
主题的功能（copy）
  - 主题切换按钮
- [日历面板](https://github.com/HowcanoeWang/calendar)（copy）
  - 支持根据笔记本日记路径模板智能识别“2006.01.02”或“2006-01-02”格式（不支持更复杂的格式）
  - 支持点击查看已有日记以及提前新建未来日记


## 🐭自定义属性


- Usage: Click on the block tag to open the attribute list, or Shift + Click to open it. Click "Add", enter the attribute name "f" or "function", and enter the corresponding attribute value (hide or hollow).
- Custom block attribute list

   | Attribute Key | Attribute Value | Function                                             | Remarks           |
   | ------------- | --------------- | ---------------------------------------------------- | ----------------- |
   | f             | hide / 挖空   | Hollow block                                         |                   |
   | code          | output          | Code block specifically used to place output results |                   |
   | f             | kb              | Convert list to kanban board                         | Ref: Notion theme |
   | f             | dt              | Convert list to mind map                             | Ref: Notion theme |
   | f             | dg              | Convert list to table                                | Ref: Notion theme |
   | f             | full            | Set table width to page width                        | Ref: Notion theme |
   | f             | biaotou         | Remove bold formatting from table headers            | Ref: Notion theme |


- Custom document attributes
   | Attribute Key | Attribute Value | Function                                        |
   | ------------- | --------------- | ----------------------------------------------- |
   | img           | center          | Center all images in the document               |
   | linkicon      | no              | Remove icon from hyperlinks                     |
   | title-num     | true            | Automatically number the titles in the document |

## ❤ Acknowledge

- https://github.com/Zuoqiu-Yingyi/siyuan-theme-dark-plus
- https://github.com/UFDXD/HBuilderX-Light
- https://github.com/royc01/notion-theme
- https://github.com/HowcanoeWang/calendar


## ☎️ Contact


If the theme has style problems, please mention the issue in Github or contact me by email (achuan-2@outlook.com). Before raising issue, it is suggested to switch to the default theme, and make sure it is a unique problem of this theme.

