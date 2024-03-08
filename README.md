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


English  | [中文](./README_zh_CN.md)  

![](preview.png)

>If you like this topic, welcome to [AFDIAN]（ https://afdian.net/a/achuan-2 ）to sponsor me, it will motivate me to update and improve this theme


**Introduction**: [Siyuan](https://github.com/Siyuan-Note/Siyuan)  is a privacy-first personal knowledge management system, support fine-grained block-level reference and Markdown WYSIWYG. This theme is a personal original theme, specially designed for Siyuan notes.

![Light](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed@pic/assets/1704370183771Clip_2024-01-04_20-09-39.png)
<center>Light</center>

![Green](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed@pic/assets/1704370137769Clip_2024-01-04_20-07-57.png)
<center>Green</center>

![Dark](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed@pic/assets/1704370028776Clip_2024-01-04_20-07-02.png)
<center>Dark</center>

## 🚀 CHANGLOGS

v2.0.0 / 2024.03.08

- 🐛 Tables are now default to center, cannot be aligned to the left according to the block menu's layout setting

 v1.9.9 / 2024.02.25
- 📝 docs: center the h1 theme by default, how to align it to the left
- 💄 ui(database): Set the background color of the custom attribute window to match the editor background
- 🐛 fix(export): Split export image tags into individual words [#101](https://github.com/Achuan-2/siyuan-themes-tsundoku/issues/101)

v1.9.8 / 2024.02.16

- 🐛 fix (adapting to theme switching): Fixed the issue of incorrect switching between light and dark themes.

v1.9.7 / 2024.02.03

- ✨ feat(JS): Adapted theme switching without refreshing 
- 📝 docs(README): Add some introduction to theme settings
- 💄 ui(database): Optimze Green Theme style
- 💄 ui(database): checkbox column distinguish between checked and unchecked states


 v1.9.6 / 2024.01.24

- 💄  UI (Light Theme): Custom font style optimization: Adjust the four font colors of red, green, blue, and orange
- 💄  UI (Green Theme): Set Style Beautification
- 🔥  Considering that the calendar plugin has been improved, remove the theme calendar function


v1.9.4 / 2024.01.16

- 🐛 fix (appearance): change of the list vertical line, there are issues with the list conversion diagram style.


 v1.9.3 / 2023.01.16
- 🐛 fix (font customization): Fixed the issue where the Green and Dark themes did not support font customization in code snippets. Now, the themes can support global font settings by placing the font in the plugins folder and using the following code snippet, allowing the font to be used on mobile devices as well:
  ```css
  @font-face {
    font-family: "HanYiKongShanKai";
    font-style: normal;
    src: url("plugins/custom-fonts/HanYiKongShanKai.ttf");
  }

  :root {
    --b3-font-family: "HanYiKongShanKai", "Helvetica Neue", "Luxi Sans", "DejaVu Sans", "Hiragino Sans GB", "Microsoft Yahei", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", "EmojiSymbols";
  }
  ```
- 🐛 fix (database): Fixed the issue where the selected cell in the database did not display the background color.
- 🐛 fix (Dark theme): Fixed the issue where specific link icons and code block styles were not loaded.
- 💄 ui (appearance): Modified the color of `b3-theme-primary-lightest`.

v1.9.2 / 2023.01.14
* 💄 Adjusted the color of the vertical lines in the list to adapt for PDF export.
* 🎨 Placed export styles in print.css
* 💄 Optimized blockquote style
* 📝 Starting from this version, the English README and CHANGELOG.md will be updated.
* 🔥Cancel th adjustment of table width.


Please see [CHANGELOG](./CHANGELOG.md) for the full update log.



## 💌 Origin

🎉 The theme was first born on February 22, 2021.


Tsundoku “積 ん 読” is a word in Japanese. Wikipedia explains it like this: "tsundoku is acquiring reading materials but letting them pile up in one's home without reading them. It is also used to refer to books ready. For reading later when they are on a bookshelf. "Simply put, it is the behavior of buying books but not reading.

> Any PKM approach that doesn't tie into execution tools is destined to languish on the back burner forever.


The biggest obstacle to using a tool is "unclear requirements". If you don't know what your recording requirements are, the more functions there are, the greater the possible obstacles, and it is easy for people to get caught up in various research on functions. After using a pile of notebook software, you will understand that the most important thing to improve is not the tools you use, but yourself.

I use this name to wake myself up, hoping to make good use of Siyuan notes, help me form the habit of daily recording and reviewing the answers regularly, better master knowledge and skills, strive to do meaningful projects and become a better person, instead of taking notes for the sake of taking notes, so that the note-taking software can become a dust box to relieve knowledge anxiety and satisfy abnormal digital hoarding.


## 🐯 Features

- ✨ **The theme is three-in-one, which supports both bright mode and dark mode.**（Tsundoku Light、Tsundoku Green、Tsundoku Dark）
  - Siyuan note bright mode only supports the selection of light and green, while dark mode only supports the selection of dark theme.
  - **If both bright mode and dark mode are set to use Tsundoku theme**：Switch from dark mode to bright mode, and automatically change to green theme /light theme according to the previous bright mode selection; Switch from bright mode to dark mode and automatically change to dark theme.
- 📎**Added icon to hyperlink.**：See [Introduction to Hyperlink Icons](https://www.yuque.com/Achuan-2/siyuan/gar358) for the difference between different local links and network links.
  ![20220131165215_2022-01-31](https://cdn.jsdelivr.net/gh/Achuan-2/PicBed@pic/assets/README/20220131165215_2022-01-31.png)
- 🧊 **Introduction of finch cue block**：Add a block background color to the reference block blockquote, and the style will be automatically applied. 
  ![1704370779797Clip_2024-01-04_20-15-14.png](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed@pic/assets/1704370779797Clip_2024-01-04_20-15-14.png)

    Recommend using a template to add emojis and adjust the title font size and boldness. Here is an example.
  ```markdown
  > **💡  标题**{: style="font-size: 24px;"}
  >
  > 内容
  {: id="20231019114031-5bqqmpr" style="background-color: var(--b3-card-error-background); color: var(--b3-card-error-color);"}
  ```

## 😺 Referenced features

- [HBuilderX-Light Theme](https://github.com/UFDXD/HBuilderX-Light)
  - Convert a list to mind map, table
  - Table settings including the display of table headers
- [Savor Theme](https://github.com/royc01/notion-theme)
  - Theme switch button



## 🐭Custom attributes


- Usage: Click on the block tag to open the attribute list, or Shift + Click to open it. Click "Add", enter the attribute name "f" or "function", and enter the corresponding attribute value (hide or hollow).
- Custom block attribute list

   | Attribute Key | Attribute Value | Function                                             | Remarks           |
   | ------------- | --------------- | ---------------------------------------------------- | ----------------- |
   | f             | hide / 挖空   | Hollow block                                         |                   |
   | code          | output          | Code block specifically used to place output results |                   |
   | f             | kb              | Convert list to kanban board                         | Ref: Notion theme |
   | f             | dt              | Convert list to mind map                             | Ref: Notion theme |
   | f             | dg              | Convert list to table                                | Ref: Notion theme |
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

