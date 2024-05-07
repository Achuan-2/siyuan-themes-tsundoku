## v2.1.0 / 2024.05.08
- 📝  README 添加标题小圆点层级提示和无序列表层级样式的代码片段
- 💄 调整代码块样式
- 💄 导出预览模式复制到微信公众号，加粗文字颜色设置为蓝色

## v2.0.9 / 2024.05.07
- 💄 修改卡片字体和背景色样式

## v2.0.8 / 2024.05.06
- ✨ 代码块设置最大高度优化：适配行号


## v2.0.7 / 2024.05.03

- ⏪ 还是加回链接图标功能吧，集市的[链接图标]插件好像没有怎么更新维护了
- 💄 分割线设置不要占满编辑器宽度

## v2.0.6 / 2024.04.30
- ✨ 思源笔记预览模式直接复制到微信公众号适配
- 🔥 取消link icon,需要的可用集市的[链接图标]插件
- 💄 超链接样式调整
- 💄 备注样式调整，取消背景色，变为橙色下划线
- 💄 适配思源v3.0.12的图标样式
- 💄 代码块样式修改
  - 调整代码行号宽度
  - 调整代码语言位置
  - 调整代码内容与左侧的间隔
- 💄 标题样式修改
  - h3 标题样式：左边添加竖线
  - h1 标题样式：居中加下划线
- 💄优化导出pdf的超链接下划线样式

## v2.0.5 / 2024.04.26
- 💄 高亮样式优化，参考Asri主题

## v2.0.4 / 2024.04.22
- 💄 优化块右上角所属数据库的样式：添加padding
- 💄 修改标题颜色
- 💄 blockquote样式修改，参考Github样式


## v2.0.3 / 2024.04.16
- 🐛  修复Dark主题link icon 失效
- 💄 块右上方的数据库角标样式优化：模仿标签样式，添加背景颜色和文字颜色，隐藏数据库图标
- 🐛 Dark主题行内代码每个文字被间隔开

## v2.0.2 / 2024.04.15
- 🔥 取消表格默认居中
- 🔥 取消集市样式调整
- 💄 标题样式修改

## v2.0.1 / 2024.04.10

- 💄 引述块样式调整
- 💄 集市readme左侧栏信息居中，已下载tab优化

## v2.0.0 / 2024.03.08

- 🐛 表格现在默认居中，无法根据块标菜单的布局设置居左

---

- 🐛 Tables are now default to center, cannot be aligned to the left according to the block menu's layout setting

## v1.9.9 / 2024.02.25
- 📝 docs: h1 主题默认居中，如何改为居左
- 💄 ui(database): 自定义属性窗口背景色设置为编辑器背景
- 🐛 fix(导出): 导出图片标签拆分为一个个文字 [#101](https://github.com/Achuan-2/siyuan-themes-tsundoku/issues/101)

---

- 📝 docs: center the h1 theme by default, how to align it to the left
- 💄 ui(database): Set the background color of the custom attribute window to match the editor background
- 🐛 fix(export): Split export image tags into individual words [#101](https://github.com/Achuan-2/siyuan-themes-tsundoku/issues/101)

## v1.9.8 / 2024.02.16
- 🐛 fix(适配思源主题切换): 修复亮暗主题切换错误问题
---
- 🐛 fix (adapting to theme switching): Fixed the issue of incorrect switching between light and dark themes.

## v1.9.7 / 2024.02.02

- ✨ feat(JS): 适配思源笔记推出的主题切换不刷新
- 📝 docs(README): 添加一些主题设置介绍
- 💄 ui(database): 优化Green主题的数据库样式
- 💄 ui(database): 勾选框区分勾选和未勾选状态

---
- ✨ feat(JS): Adapted theme switching without refreshing 
- 📝 docs(README): Add some introduction to theme settings
- 💄 ui(database): Optimze Green Theme style
- 💄 ui(database): checkbox column distinguish between checked and unchecked states

## v1.9.6 / 2024.01.24
- 💄 ui(Light Theme): 自定义字体样式优化：调整红绿蓝橙四个字体颜色
- 💄 ui(Green Theme): 设置样式美化
- 🔥 鉴于日历插件已经完善，删除主题日历功能

---

- 💄  UI (Light Theme): Custom font style optimization: Adjust the four font colors of red, green, blue, and orange
- 💄  UI (Green Theme): Set Style Beautification
- 🔥  Considering that the calendar plugin has been improved, remove the theme calendar function


## v1.9.4 / 2024.01.16

- 🐛 fix(外观)：修复更改列表竖线border color之后，列表转导图样式问题

---

- 🐛 fix (appearance): change of the list vertical line, there are issues with the list conversion diagram style.

## v1.9.3 / 2024.01.16
- 🐛 fix(字体自定义): 修复Green主题和Dark主题不支持代码片段中的字体自定义
  现在主题可以通过把字体放在plugins文件夹下，并在代码片段如下片段，设置全局字体，并且手机端也能使用该字体了
   ```css
   @font-face {
  font-family: "汉仪空山楷";
  font-style: normal;
  src: url("plugins/custom-fonts/汉仪空山楷.ttf");
  }

  :root {
  --b3-font-family: "汉仪空山楷", "Helvetica Neue", "Luxi Sans", "DejaVu Sans", "Hiragino Sans GB", "Microsoft Yahei", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", "EmojiSymbols";

  }
   ```
- 🐛 fix(数据库): 数据库选中单元格不显示背景色
- 🐛 fix(Dark主题): 修复没有加载特定link icon和代码块样式
- 💄 ui(外观): 修改 b3-theme-primary-lightest 颜色

---

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


## v1.9.2 / 2024.01.14

* 💄列表竖线颜色调整，适配导出pdf
* 🎨 导出样式放在print.css
* 💄blockquote样式优化
* 📝 从这一版开始会开始更新英文README和CHANGELOG.md
* 🔥取消表格宽度调整
---
* 💄 Adjusted the color of the vertical lines in the list to adapt for PDF export.
* 🎨 Placed export styles in print.css
* 💄 Optimized blockquote style
* 📝 Starting from this version, the English README and CHANGELOG.md will be updated.
* 🔥Cancel th adjustment of table width.

## v1.9.1 / 2024.01.07

- 📝 修复README最近更新错位
---
- 📝 Fixing typos in the README file
## v1.9.0 / 2024.01.07

- 💄 ui(自定义颜色): 调整配色
- 💄 ui(标题): 更改样式，改了下背景色、添加了一点阴影、添加了savor的标题提示
---
- 💄 ui(custom colors): Adjusted color matching
- 💄 ui(title): Changed the style, modified the background color, added some shadows, and included a title prompt for savor

## v1.8.9 / 2024.01.04

- 💄 ui(标题): 上下增加间距
- 💄 ui(blockquote): 字体颜色调粗
- 💄 ui(数据库): 默认不隐藏按钮
---
- 💄 ui(title): Increased spacing above and below
- 💄 ui(blockquote): Made font color bolder
- 💄 ui(database): Default buttons are not hidden

## v1.8.8 / 2024.01.02
- 💄 ui(database): database 右上方新建添加背景色
- 💄 ui(blockquote): 美化引述块样式
  - ![1704267070002Snipaste_2024-01-03_15-30-39.png](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed@pic/assets/1704267070002Snipaste_2024-01-03_15-30-39.png)
  - ![1704266965998Snipaste_2024-01-03_15-29-22.png](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed@pic/assets/1704266965998Snipaste_2024-01-03_15-29-22.png)
  - ![1704267082034Snipaste_2024-01-03_15-31-20.png](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed@pic/assets/1704267082034Snipaste_2024-01-03_15-31-20.png)
- 🐛 fix(js): 去除子弹线残余代码
- 💄 ui(css): 提取块样式和行内样式到style/editor.css
- ✨ feat(calendar): 日历支持解析dailynote模板
    > 本来想已经有插件[顶栏日历](https://github.com/svchord/siyuan-arco-calendar)了，主题要不就把内置的日历功能去除了，可惜这个插件每次点击日历都要重新检索，不是很好用，所以还是继续保留内置日历了，并且把日历功能进行了完善，目前已经可以解析更复杂的dailynote路径模板了，比如 `/diary/{{now | date "2006/2006.01"}}/{{now | date "2006.01.02 Mon"}}`
- ✨ feat(link_icon): 完善link icon


## v1.8.7 / 2023.12.17
- 🐛 fix(list2map): 列表转思维导图错位
- 💄 ui(font): 代码字体首选Monaspace Neon
- 💄 ui: 优化h3-h6样式、数据库资源链接样式
- 💄 ui(link_icon): 适配数据库资源和链接列
- 💄 ui: search panel优化样式 [#92](https://github.com/Achuan-2/siyuan-themes-tsundoku/issues/92)
- 💄 ui(link_icon): 结尾为.html 的网页错误显示html图标


## v1.8.6 / 2023.11.3
- 💄 ui(Admonition): fix 行内代码颜色


## v1.8.5 / 2023.10.31

- 💄 ui(字体颜色): 为数据库调整字体颜色
- 💄 ui(代码块): 行号显示优化


## v1.8.4/ 2023.10.25

- 🔥 移除子弹线JS和CSS，需要可以参考这篇文章https://ld246.com/article/1693238082034，添加代码片段以启用


## v1.8.3 / 2023.10.19

-  ✨ 参考[Rem-Craft](https://github.com/svchord/Rem-Craft)主题，添加列表子弹线
- 💄 优化 Green 主题的Database框线
-  🐛 调整代码块导出pdf时代码块语言与主体太近的问题
-  🐛  图片导出没有代码块语言
-  🐛  Admonition 块文字加粗为黑色
-  🐛 修复切换主题按钮和日历按钮的aria-label不显示的问题
-  🐛 优化列表转表格样式


## v1.8.2 / 2023.09.18

- 💄 优化 Dark 主题的配色
- 💄 优化link icon中的知乎图标，使其导出图片正常显示
- 💄 dark 主题图片背景设置为白色，防止透明图片难以看清内容


## v1.8.1 / 2023.08.29

-💄 适配思源v2.1.0，调整反链面板颜色
- 💄 退出聚焦按钮添加背景色


## v1.8.0 / 2023.08.24

-🐛 Fix  绿色主题选项卡透明 (https://github.com/Achuan-2/siyuan-themes-tsundoku/issues/84 )


## v1.7.9 / 2023.08.21

- 🔥 鉴于思源笔记插件丰富，移除Dark+主题功能
- 🐛 修复Green主题图片调整大小drag按钮消失的问题

## v1.7.8 / 2023.07.30 

- 💄 优化代码块复制按钮：更改回默认
- 💄优化消息提示背景色

## v1.7.7 / 2023.07.11 重构主题切换按钮

-  ✨ 参考pinkroom主题，改善主题按钮 ( Fix https://github.com/Achuan-2/siyuan-themes-tsundoku/issues/81)
-  💄 修改tooltips color和background (adapt to https://github.com/siyuan-note/siyuan/issues/8686)
-  💄分割线样式修复 (Fix https://github.com/Achuan-2/siyuan-themes-tsundoku/issues/80)

## v1.7.6 / 2023.06.22
- 💄 图片导出代码块优化：颜色适配light、green、dark主题；图片导出代码块样式跟随编辑样式，pdf导出代码块模仿latex样式
- 📝  Readme添加三个主图的预览图

## v1.7.5 / 2023.06.15
- 💄 加粗优化
- 🐛 去除 toolbar 分割线
- 📝 [doc] 去除个人信息

## v1.7.4 / 2023.05.30
- ✨ 修复editor无法打开markdown的问题

## v1.7.3 / 2023.05.29
- ✨ 鉴于目前插件不完善，先添加回日历按钮
- 🔥 取消高亮变隐藏按钮
- 💄 取消右上方的主题扩展功能


## v1.7.2 / 2023.05.23

* 🐛 fix 大纲focus时图标显示为文件树focus颜色
* 🐛 fix 反链面板显示被折叠的段落块异常
* 📝 docs: 英文Readme完善

## v1.7.1 / 2023.05.11

- 🐛 Fix 因为集市name与display name不一致，导致绝对路径的css和js无法加载问题


## v1.7.0 / 2023.05.10

- 更改打赏地址为：https://afdian.net/a/achuan-2

## v1.6.9 / 2023.05.09

- 删除 package.zip 文件


## v1.6.7 适配思源2.8.7 / 2023.05.09

- ✨ 适配思源2.8.7，更改theme.json, 新增icon.png(使用文心一格AI生成) 


## v1.6.6 扩展菜单修复 / 2023.04.18

- 🐛 siyuan v2.8.4 菜单 DOM 结构变更, 新增 .b3-menu__items 层, 修复扩展菜单样式
- 🐛 表格扩展功能失效

## v1.6.5 修复缺陷 / 2023.04.09
- 🐛 开启【高亮隐藏】后悬浮不显示文本


## v1.6.4 修复缺陷 / 2023.04.03

- 🐛 [适配新版的关闭按钮](https://github.com/Achuan-2/siyuan-themes-tsundoku/issues/73)
-  🐛 [挖空模式下，带有颜色属性的文字不会被遮挡](https://github.com/Achuan-2/siyuan-themes-tsundoku/issues/72)
-  🐛 [悬浮窗口退出聚焦时，块进度条位置异常 bug](https://github.com/Achuan-2/siyuan-themes-tsundoku/issues/71)
-  💄 【Dark】优化链接a标签导出
-  💄 【Dark】折叠的有序列表调亮
-  💄 【Dark主题】调亮未选中的待办列表框颜色

## v1.6.3 新窗口打开支持 Green 主题 / 2023.03.24

- ✨ [新窗口打开支持Green主题](https://github.com/Achuan-2/siyuan-themes-tsundoku/issues/69)
- 🐛 dark 主题 select 按钮修复
- 🐛 修复思源新功能【新窗口打开】console会报错的问题
- 🐛 link icon 修复asset 文件样式
- 💄 列表中不显示三级标题、一级标题不居中
- 🔥 取消鼠标滚轮缩小功能
- 🔥:继续杀掉默认主题的待办列表完成样式

## v1.6.2 Green主题完善 / 2023.03.06
- 🐛 Green 主题字体大小选项栏背景色修复
-  💄 搜索面板预览不显示link icon

## v1.6.1 完善样式 / 2023.03.05

- 💄 Update pdf 双链样式
- 💄 超链接太长break all 换行
- ⚡️ 取消2.7.7 更新的待办列表完成样式
- 📝 添加FAQ
- 🐛 Dark主题字体大小选项栏背景色修复
- 🐛 fix :标签样式被字体样式覆盖 [#66](https://github.com/Achuan-2/siyuan-themes-tsundoku/issues/66)
  


## v1.6.0 修复缺陷/ 2023.02.23

- 🐛 文件类型的link icon修复错误
- ✨ link icon 支持显示file协议文件icon
- 🐛 [修复无更新时间的块菜单不显示更多选项问题](https://github.com/Zuoqiu-Yingyi/siyuan-theme-dark-plus/issues/183)
- 🐛 fix [选中高亮效果](https://github.com/Achuan-2/siyuan-themes-tsundoku/issues/64)

## v1.5.9 导出代码块优化 /  2023.02.21

- 🐛 [悬浮面板时块标符号不消失](https://github.com/Achuan-2/siyuan-themes-tsundoku/issues/63)
-  ✨ 导出代码块优化


## v1.5.8 / 2023.02.18

* 🐛 Fix 后缀为html的网页link icon显示为html文件icon
* 🐛 Dark 主题嵌入块颜色错误
* 💄 修改color1和color3颜色
* ✨ Ctrl+滚轮单独调整页面大小（使用开发者工具清除缓存可以复位）

## v1.5.7 修复缺陷 / 2023.02.13

- :fire: 思源2.7.5更新了悬浮面板，因此去掉了【展开左右树面板】按钮
- :fire: 思源2.7.5更新了【新窗口置顶】，去除了块菜单增强中的【在新窗口打开】
- :lipstick: 高亮文本导出样式调整为只有绿色下划线
- :bug: fix 导出时使用的是Dark主题的link icon
- :bug: fix 不能用编辑Markdown源码
- :bug: fix 列表转脑图导出pdf 列表偏移

## v1.5.6 / 2023.02.12

* 🐛日历面板样式适应主题
* 🎨重构src图标文件夹，根据使用放置在不同文件夹。
* 💄主题按钮完善

  * 思源明亮模式只支持选择light和green，暗黑模式只支持选择dark主题
  * 从暗黑模式切换为明亮模式，根据之前的明亮模式选择自动更改为green主题/light主题（需要将明亮模式和暗黑模式都设置为使用Tsundoku主题）
  * 从明亮模式切换为暗黑模式，自动更改为dark主题
  * :memo: README补充完善，重绘preview.png


## v1.5.5 / 2023.02.07

- :lipstick: 页签右侧空白的hover背景色错误
- :bug: 适配思源v2.7.3，去除文档下的创建时间，否则不会文档菜单显示【转移引用】
- :art: 主题重构：主题三合一

## v1.5.4 / 2023.02.01

- :lipstick: 适配顶栏Siyuan文字颜色
- ✨ 更新 calendar【see https://github.com/HowcanoeWang/calendar/releases/tag/230201 】
  - 使用/data/widgets/Calendar.config.json代替localstorage存储用户默认日记本配置
  - 修复顶栏星期显示错误

## v1.5.3 / 2023.01.29

- ✨ 日历功能完善，支持选择笔记本，支持根据dailynote路径模板自动检测日记，fork https://github.com/HowcanoeWang/calendar  


## v1.5.2 / 2023.01.17

* 💄 [对聚焦模式按钮的突出显示](https://github.com/Achuan-2/siyuan-themes-tsundoku-light/commit/93c240055a6066d4092d3a32dd4f526b94d3278f#diff-dff3ae40ade5d29630f230c063582d795566bbc4d4d9bace844e205e65325abb)
* ✨ [加日历功能](https://github.com/Achuan-2/siyuan-themes-tsundoku-light/commit/93c240055a6066d4092d3a32dd4f526b94d3278f#diff-f4bfeae2710f9783955eea97fb11de8ecafde25eaedbaddde9d2122c24bf20d8)（注意：只支持“2023.01.17”类似的格式的检索）
* 💄 [列表转导图对列表折叠的优化](https://github.com/Achuan-2/siyuan-themes-tsundoku-light/commit/9065998dfbe64d800ab323d19d86c44a11a288ca)
* ✨ 支持[添加表格表头和宽度设置](https://github.com/Achuan-2/siyuan-themes-tsundoku-light/commit/6d7857e5eb8c2352c3d91f4256ae46fdcae5cdda)

## v.1.5.1/2023.01.13

​
* 💄待办折叠背景样式位置调整：之前有点偏移，现在调正

  ​![image](https://assets.b3logfile.com/siyuan/1610205759005/assets/image-20230113110218-wmmlk4f.png)​
* 💄添加块圆角 4px：这样标题添加背景色会更好看点

  ​![image](https://assets.b3logfile.com/siyuan/1610205759005/assets/image-20230113113734-eumueyr.png)​
* 💄表格样式修改：去除默认主题表头和第一行的背景，之前设计的样式是隔行有个背景色，现在改为不设置表格背景色。

  ​![image](https://assets.b3logfile.com/siyuan/1610205759005/assets/image-20230113104501-azlqy69.png)​
* 💄代码块样式修改：现在代码语言的显示可以跟随是否显示代码行号自适应了。

  ​![image](https://assets.b3logfile.com/siyuan/1610205759005/assets/image-20230113113650-ghw1g3y.png)​
* 📝块增强菜单文案修改：将【查看Markdown 源代码】修改为【编辑 Markdown 源代码】，去除了右侧快捷键的显示。此处感谢Dark+主题，这三个功能实在太好用，直接抄了过来，让思源也有了VSCode的批量编辑能力！

  ​![image](https://assets.b3logfile.com/siyuan/1610205759005/assets/image-20230113113559-hvcs2nu.png)​

‍


## v1.5.0/2022.12.20
- :bug:修复文档属性title-num打错为titile-num的问题


## v1.4.9/2022.12.17

* ✨新增文档属性-标题自动编号：`title-num:true`
* ✨块菜单增强：添加用monaco编辑器打开、在新窗口打开



## v1.4.8/2022.12.10

- :bug: [Green主题导出图片与导出pdf冲突](https://github.com/Achuan-2/siyuan-themes-tsundoku-light/issues/53)
- :sparkles: [Ctrl+E高亮修改为不自动隐藏，需要点击隐藏按钮才会隐藏](https://github.com/Achuan-2/siyuan-themes-tsundoku-light/issues/51)
- :lipstick: [Light 主题页签搜索背景色修正](https://github.com/Achuan-2/siyuan-themes-tsundoku-light/issues/50)
- :lipstick: [优化标题样式](https://github.com/Achuan-2/siyuan-themes-tsundoku-light/issues/42)
- :lipstick: [PDF引用与普通引用不容易区分](https://github.com/Achuan-2/siyuan-themes-tsundoku-light/issues/41)

## v1.4.7/2022.12.08

* :sparkles: [钉住的页签添加pushpin图标](https://github.com/Achuan-2/siyuan-themes-tsundoku-light/issues/49)


## v1.4.6/2022.12.07

* :sparkles[自定义属性 code:output improvement](https://github.com/Achuan-2/siyuan-themes-tsundoku-light/issues/48)
* :bug: [导出长图，无序列表符号错乱 ](https://github.com/Achuan-2/siyuan-themes-tsundoku-light/issues/43)
* :fire: [去除Ctr+P搜索窗自定义样式](https://github.com/Achuan-2/siyuan-themes-tsundoku-light/issues/44)



## v1.4.5/2022.11.16

* :bug: 待办列表折叠问题
* :bug: 修复列表转导图、列表转表格、列表转看板出现错位、列表竖线遮挡的问题

## v1.4.4/2022.10.24
- :fire: 舍弃待办列表完成后的删除线样式（个人喜好，这样能对待办列表进行更多处理，不然打了一个勾之后，就很难再添加内容）

## v1.4.3/2022.10.23
- :lipstick:备注添加icon和备注专属tooltip
- :bug: 适配思源2.4

## v1.4.2/2022.10.03
- 继续完善行内样式
- 挖空效果修复悬浮显示、导出不显示的功能

## v1.4.1/2022.09.25 适配思源2.2.0

- 🐛行内样式（加粗、行内代码、高亮、kbd）适配
- 💄2.2.0自带备注与之前主题加的链接备注样式统一
- 💄优化Green主题的导出样式
- ✨完善从Dark+那里copy打开新窗口并置顶功能
  > ❗突然发现从Dark+主题copy的js代码，可以通过alt+鼠标中键用monaco-editor以markdown样式打开当前块或文档（打开文档需要在文档题头图那块按）


## v1.4.0/2022.08.21
- 🐛如果未安装Dark+主题，不能成功加载js


## v1.3.9/2022.08.20

* ✨link icon：添加 mp4、mkv、flv视频格式
* ✨代码语言显示大写：css->CSS
* ✨ Copy Dark+主题的js功能
* 💄代码块样式调整，去除mac圆点样式
  ![20220820114308](https://cdn.jsdelivr.net/gh/Achuan-2/PicBed@pic/assets/CHANGE_LOGS/20220820114308.png)
* 💄任务列表样式：调整为圆形
    ![20220806094505_2022-08-06](https://cdn.jsdelivr.net/gh/Achuan-2/PicBed@pic/assets/CHANGE_LOGS/20220806094505_2022-08-06.png)
* 💄文字背景色11从青绿色调整紫色
* 🐛导出优化：Tsundoku Green和Stone主题不导出背景图片，加快导出速度，减小pdf大小


## v1.3.7/2022.07.16 
- :bug: fix聚焦面包屑文字高亮
- :lipstick: 导出优化：导出支持使用root下的font-family 变量，导出开头连续两个h1不分页
- :lipstick: Tsundoku Light引述块样式调整

## v1.3.6/2022.07.02 安卓端适配
- :bug: 安卓端代码块行号位置错乱
- :bug: 安卓端菜单过宽，取消主题的加框,原加宽代码如下
  ```css
  /* 左上方菜单栏加宽 */
  @media screen and (min-width: 1500px) {

      .b3-menu,
      .b3-menu .b3-menu__submenu {
          border-radius: 6px;
          padding: 6px 6px 6px;
          min-width: 200px;
      }

      .b3-menu .b3-menu__submenu {
          margin-left: 10px;
          margin-right: 10px;
          padding: 5px 6px 5px;
      }
      /* 调整菜单 */
      .b3-menu .b3-menu__item {
          padding: 4px 16px 0 8px;
          border-radius: 4px !important;

      }

      .b3-menu {
          padding: 0px 0;
      }
  }
  ```

## v1.3.5/2022.06.29
- :fire:取消主题选中计数功能
- :fire:取消主题默认字体思源黑体，并删除字体文件
- :sparkles: 改进了关闭左右侧栏的功能，只开一边侧栏也可以关闭
- :bento: 添加了几个link icon
- :bug: 修复手机端主题导出菜单过宽显示不全的问题

## v1.3.4/2022.06.28
- 搬运HBuilderX-Light主题theme.js的关闭左右侧栏、隐藏文本显示功能
- fix https://github.com/Achuan-2/siyuan-themes-tsundoku-dark/issues/27


## v1.3.3/2022.06.27
- 文件树emoji位置调整
- 取消斜杆菜单横排样式

## v1.3.2/2022.06.14
- :bug:对搜索结果页面进行全屏展示的 bughttps://github.com/Achuan-2/siyuan-themes-tsundoku-stone/issues/7
- :bug:【外观】无序列表中的三级标题左边的竖线，以前是居中的，现在靠上显示了https://github.com/Achuan-2/siyuan-themes-tsundoku-dark/issues/30

## v1.3.1/2022.06.09

1. 折叠标题小三角丢失
2. 按钮悬浮高亮

    ```css
    /* 思源官方2.0.x起样式添加了新变量*/
    --b3-theme-background-light: #c4d2db;
    ```
3. 代码块颜色丢失、优化dark主题的代码样式

    ```css
    .protyle-wysiwyg .hljs{
    background改为background-color，并添加!important;
    }
    ```
4. 横版斜杠菜单

    ```css
    /* 横版斜杠菜单 */
    .b3-menu.b3-list.b3-list--background.hint--menu {
        column-count: 4;
        column-width: 160px !important;
        column-gap: 10px;
        column-rule: 1px solid #13c2c240;
        min-width: 50vw !important;
        max-height: 480px !important;
    }
    ```
5. 块标移动增加过渡 

    ```css
    .protyle-gutters {
        z-index: 3;
        /* 块标移动增加过渡 */
            transition: all 200ms ease-out;
    }
    ```
6. 页签样式修正：去掉`.layout-tab-bar .item`样式
7. 修复嵌入块和浮窗中列表下的引述块左边的列表竖线错位

    ```css
    .block__popover .protyle-wysiwyg  [data-node-id].li>.bq,
    .protyle-wysiwyg .protyle-wysiwyg__embed [data-node-id].li>.bq {
        left: 0.1em;
        top: -1px;
    }
    ```
8. 嵌入块分割

    ```css
    /* 嵌入块分割 */
    .protyle-wysiwyg [data-node-id].render-node[data-type=NodeBlockQueryEmbed]>.protyle-wysiwyg__embed {
        border-top: 3px dashed #0e5d12d6;
        position: relative;
    }
    ```


## v1.3.0/2022.05.04
- :bug: 适配思源v2.0.4 alpha1

## v1.2.9/2022.05.02
- :bug: 修复代码块样式
- :bug: 列表下的语雀区块列表竖线错误
- :lipstick:挖空样式修改为下划线隐藏
- :lipstick: 内容中的引用计数样式调整
## v1.2.8/2022.04.27
- :bug: 修复字体设置不应用于编辑器外部问题
- :lipstick: h1除第一个标题才分页（同时发现目前思源导出pdf不支持让h1居中）
- :lipstick: 取消钉住页签的宽度设置，改成默认主题的样式
- :lipstick: 调整待办列表大小
- :art: 重构h3竖线样式

## v1.2.7/2022.04.22
- :sparkles: 搬运notion themes的theme.js
- :sparkles: 搬运notion themes的列表转脑图、列表转看板

## v1.2.6/2022.04.18
- :bug: Crtl+P 搜索右上方设置按钮错位问题

## v1.2.5/2022.04.12

- :bug: green 主题渲染彩色字体为白色
- :lipstick: 调整pdf标注样式

## v1.2.4/2022.04.08

- :bug: 标题不能加颜色

## v1.2.3/2022.04.06
- :lipstick: ctrlP.css完善

## v1.2.2/2022.04.05
- 🎨 重构无序列表层级样式代码

## v1.2.1/2022.04.04

* ✨ [调整搜索窗口大小](https://ld246.com/article/1648269766832)
* 🎨 重构页签样式代码
* 💄 思源块超链接配色调整：和引用块样式一致
* 💄 调整自定义无序列表层级样式，修复导出圆点过小问题
* 💄 更换主题字体为思源黑体（之前的鸿蒙字体加粗实在太黑了）
* 💄 调整自定义演示：灰色不加粗
* 💄 调整滚动条


## v1.2.0/2022-03-31
- ✨siyuan1.9.6更新后主题折叠样式调整
- 🐛siyuan1.9.6更新后的窗口分割区分适配
- 🐛siyuan1.9.6更新后h3标题样式: 由h3:before改成.h3>div:first-child::before
## v1.1.9 /2022-03-26
- 💄调整自定义属性f:table样式
- 💄调整green主题和stone主题代码块样式

## v1.1.8 /2022-03-25
- 💄light主题配色修改：主题色修改为白色，因为light主题就是我用来导出的，之前的灰色会导致思源看着还可以但导出很丑的问题
- ✨完善自定义有序列表层级样式：取消第一层级的自定义，这样可以从任意序号开始计数，而不是固定为1
- 🐛待办列表下的有序和无序列表样式修复

## v1.1.7 /2022-03-24
- 🐛 调整列表下引述块小竖线
- 💄 f:table取消背景色
- 💄 列表h1居左
- ✨ 尝试给h2标题加上border-bottom
- 🐛 fix 新建文档按钮鼠标悬停时的阴影衬底不对称
- ✨ 参考Dark+ 添加f:scroll，如果表格和代码高度过高，将产生滚动条。（目前只适用于块属性，文档属性等我有需求了再加）

## v1.1.6/2022-03-18
* :bug:修复标签页白边问题
* :sparkles:无序列表自定义层级样式
* :sparkles: 有序列表自定义层级样式
* :memo: 列表自定义层级主要参考了siyuan-notion主题，目前的样式如果有序和无序列表混着用，会各自继承之前的层级而不是重新开始，不知道这种设计好不好得适用一段时间

## v1.1.5/2022-03-17
- :bug: h3标题折叠跳动
- :bento: change qq qun svg
- :bento: [link icon]update default link icon 
- :bug: 包含ncbi 关键词的link都会被解析为ncbi网站

## v1.1.4/2022-03-14
- :bug: 修复代码块新样式在引述块中的padding问题
- :sparkles: 语雀提示区块的表格样式匹配


## v1.1.3/2022-03-10
- :lipstick: 完善代码块样式
- :lipstick: 完善引述块样式

## v1.1.2/2022-03-09
- :lipstick: 再次修改引述块样式
- :sparkles: 参考Zhang light主题，添加自定义属性 f:table,可将列表转化为表格

## v1.1.1/2022-03-05
- :sparkles: 自定义有序列表层级样式
- :bug: 取消主题自定义的标题折叠小三角样式
- :sparkles: 页签钉住增加宽度
- :lipstick:取消页签动画


## v1.1.0/2022-02-18
- :memo: [docs]添加行内备注信息
- :sparkles: [feature] win10emoji替换为win11emoji
- :bug: [feature]修复标题加粗文字丢失颜色的问题
- :bug: [style]修复列表下的引述块使列表竖线产生间距问题
- :bug: [feature]修复dark主题备注样式
- :bug: [feature]修复代码块行数超过100数字重叠问题


## v1.0.9/2022-02-05
- 🐛部分缺陷修复
- 💄调整标签页

## v1.0.8/2022-01-31

- 🎨重构css：把语雀提示区块、超链接图标、折叠样式的相关css单独提取出来放在style文件夹下，其他样式待以后整理
- ✨更换编辑器内的字体同时也会改变文件树、大纲字体（暂时无法动态修改菜单字体）
- 🍱link icon完善assets文件类型（没有把思源当网盘的意思（*゜ー゜*））
- 💄[已关闭的笔记本]样式
- 💄借鉴BearLight_for_SiYuan主题，增加滚动条动效
- 🐛修复light主题导出pdf、html，列表无竖线划分层次
- 🐛修复导出pdf、html不显示link icon的问题
- 🐛修复某些字体下代码块行数会错乱的问题
- 🐛修复因为思源v1.7.6 **元素无法focus导致**的：h3空标题光标错位问题、空块提示隐藏失败问题、主题特有挖空块无法翻转问题
- 🌐统一四个主题的版本号

## v1.0.7/2022-01-13
- 💄调整标签页样式

## v1.0.6/2022-01-11
- 💄调整叶子文档的图标
- 💄修复新建文档的图标
- 🐛修复文档图标在笔记内的位置问题

## v1.0.5/2021-12-26
- 🐛修复代码块显示行号不换行时，横向滚动代码，代码会与行号重叠
- 💄滚动条加圆角

## v1.0.4/2021-12-19
- 适配思源1.5.5 alpha9

## v1.0.3/2021-12-16

- 💄引述块优化
- 💄pdf标注框右边距过大问题
- ✨语雀提示区块的kbd样式 
- ✨link icon:添加b站缩写 
- 💄行内公式字体优化: 由KaTeX_Main改为KaTeX_Math明显字小且正常许多
- ✨更改默认字体为HarmonyOS_Sans_SC
- ✨替换文档树一级文档的图标为"U+26AC"
- ✨分割线样式完善

## v1.0.2/2021-12-04
- 🐛修复面板高亮颜色的问题
- 🐛修复emoji面板选中颜色
- 💄修改引用块:改成豆瓣或者哔哩哔哩那种样式
- 💄页签修改

## v1.0.1/2021-11-28
- :sparkles: add note style

## v1.0.0/2021-11-28
- 💄语雀提示区块样式优化：对行内代码和代码块进行优化
- 🐛适应目前的索引画面

## v0.9.9/2021-11-23
- 🐛黑色主题警告颜色修改！
- 💄区分警告和正常提示色！
- 💄菜单栏加宽

## v0.9.8/2021-11-13

* 🔥取消标签hover放大效果，因为有点影响修改，改为hover更改背景色
* 🍱添加link icon
  * [科学网—NBT：牛瘤胃微生物组的 4941 个宏基因组组装基因组(MAG) - 刘永鑫的博文 (sciencenet.cn)](http://blog.sciencenet.cn/blog-3334560-1290999.html)
  * [电脑软件 - 果核剥壳 (ghxi.com)](https://www.ghxi.com/category/pcsoft)
  * [DeepL 翻译：全世界最准确的翻译](https://www.deepl.com/translator)
  * [flomo](https://flomoapp.com/mine/?memo_id=OTQ5OTcwMQ)
  * [腾讯文档 (qq.com)](https://docs.qq.com/sheet/DRXpTREZzVFlibXVY?tab=plbdhd)
  * [微信读书-正版书籍小说免费阅读 (qq.com)](https://weread.qq.com/)
* 💄把默认的超链link icon替换了，之前的icon我自己看着有点会让我忍不住补全没有添加的网站icon

## v0.9.7/2021-11-05

- 🐛 bug when collapsing quote blocks https://github.com/Achuan-2/siyuan-themes-tsundoku-light/issues/7
- 🐛 inline code block part deletes unpleasant https://github.com/Achuan-2/siyuan-themes-tsundoku-light/issues/8
- 🍱link icon add [RCSB PDB](https://www.rcsb.org/)
- optimize export style: h1,page-break-before: always

## v0.9.6/2021-10-27

* 🐛 块嵌入里的待办列表不能显示删除线
* 💄 块引悬浮固定按钮激活时改变角度

## v0.9.5/2021-10-20
- 🍱link icon添加
    - [w3school](https://www.w3school.com.cn/h.asp)
    - [张鑫旭](https://www.zhangxinxu.com/)
- 🐛修复开启代码块行号后，折叠代码后行号依然显示
- 💄行内下划线样式加粗
- 💄修复表格框线粗线不均（不知道是系统的问题还是什么问题，D大说他自己没问题）
- 💄 修复语雀提示区块不能导出

## v0.9.4/2021-10-15
* 🐛 V 姐又改列表竖线颜色变量了，造成 green 主题竖线不清楚，补下
* 💄 修改引述块 blockquote 样式，原来的边框是包裹四周的，和绝大多数的网站和软件渲染样式不一样，所以还是随大流吧。但依然保留引述块加背景色的语雀样式，毕竟我之前给引述块加四周边框也只是为了方便加背景色。这样也让引述块有引述和卡片两种功能
* 💄 引述块语雀样式加粗样式配置
* 💄 分割线优化
* 💄 列表竖线调细

## v0.9.3/2021-10-13
- 🐛border取消透明度
- 🐛文件树背景色又没了，补一下
- 🐛 前进后退disable颜色更改
- 🐛列表下代码块样式修复：1.4.2的列表竖线和我代码块冲突了，就把三个点也变成竖线了；并且列表下代码块左边的列表竖线位置也不对
- 🐛修复特殊块在列表下折叠的问题

## v0.9.2/2021-10-11
* 🐛 块引固定高度为70%改为最小高度为30
* 🐛 修复挂件折叠和其他特殊块折叠的问题
* 💄  调整标题大纲样式：各级标题固定颜色
* ✨ 优化超级块折叠
## v0.9.1/2021-10-10

* 🐛 修复引述块中列表缩进问题
* 🐛 修复面板收缩的留白问题
* 🐛提及面板向上按钮悬浮会发生抖动
* 🐛 修复列表内的引述块在嵌套列表缩进问题
* ✨ 优化超链接换行
* 💄 取消light主题引述块的box-shadow

## v0.9.0 引入语雀提示块样式/2021-10-08

* ✨ 块折叠显示优化，引入语雀提示块, [使用介绍](https://www.yuque.com/achuan-2/siyuan/obxpvr)
* 🐛 修复对二级标题折叠的问题
* 🐛 完善点击图片块显示阴影的逻辑
* ✨ 块折叠显示优化
  * 段落块折叠只显示Text
  * 引述块折叠只显示Blockquote
## v0.8.9 块折叠显示优化/2021-10-06
* ✨ 块折叠显示优化，折叠块前添加icon
  * 表格折叠优化：只显示表头
  * 代码折叠优化，不显示内容，只显示语言和复制按钮
  * 标题折叠优化：字体大小不变
  * 嵌入块折叠：隐藏全部内容
  * 图片折叠优化：只显示 Image
  * 公式块、脑图、视频、音频、Iframe、Mermaid、Flowchart等块折叠优化：显示对应名字
  * 🐛已知问题：超级块折叠没有优化，因为技术有限，搞不动
* 🔥表格取消默认居中
* ✨块引固定高度为70%
## v0.8.8/2021-10-04
* 💄 调低空行提示透明度
* 🐛 修复嵌入块的问题

## v0.8.7/2021-10-02

* 区分大纲下各级标题，添加大纲标题图标悬浮放大效果提醒用户图标可以预览标题
* 笔记本样式强调
* 嵌入块上下块间距调整

## v0.8.6/2021-09-30

* 💄 pdf矩形选框增加border宽度
* 🐛修复空列表提示嵌套问题

## v0.8.5/2021-09-27

* ✨ distinguish parent doc and no-child doc, canel the hidden effect of arrow and dot before doc 
* 🍱add vscode link icon
* 💄adjust opacity for link icon in completed task list
* 💄add background color when mouse hovering new file icon
* 💄add placeholder text "To-do" for empty task list, placeholder text"List" for empty ordered or unordered list like notion
* 📝 readme
  * change to English
  * add Yuque link

## v0.8.4/2021-09-26
* ✨ change new file icon
* 🍱 add new link icons
* 💄 optimize the size of file icons

## v0.8.3/2021-09-25
* ✨ net hyperlink default icon
* 🍱 add new link icons
* 💄 区分侧栏聚焦和未聚焦状态颜色调整
* 💄 add border for inline-code
* 💄 increase kbd font size

## v0.8.2/2021-09-24

* ✨ add link icon!
* ✨ add local protocol icon!
* 🐛 fix deleting problem of tag 

## v0.8.1/2021-09-23

* 💄 pdf标注微调：调整光标选中文本样式
* 💄 pdf标注微调：减小pdf标注时弹窗阴影
* 💄 pdf标注微调：调整pdf颜色批注配色
* 💄 tag 取消后面的#号标识


## v0.8.0/2021-09-21

* 💄图片 hover 加阴影
* 🔥pdf 双链取消 🔖前缀

## v0.7.9/2021-09-20

* 🔥 取消嵌入块负margin
* 💄 更改设置链接颜色


## v0.7.8/2021-09-19

* 💄 调整块嵌入内边距和外边距
* 🐛 修复行内代码设置为inline-flex的问题

## v0.7.7/2021-09-18

* 💄更改双链和pdf双链样式
* 📸 update preview.png
* 💄修改卡片样式

## v0.7.6/2021-09-17

* 🎨完善自定义属性，添加key为f的简写
* ✏完善Readme
* 🐛 区分侧栏聚焦和未聚焦状态

## v0.7.5/2021-09-15

* 🐛 修复块引用文字是inline-block的问题：过长会整个另起一行
* 🐛再次修修复h3标题鼠标选中有问题
* 🐛再次修复h3空行提示光标位置错位问题
* 💄 更改pdf双链标注配色，参考了BookxNote Pro
* 💄 调整编辑器标注颜色样式
* 💄 调整pdf双链标注颜色弹窗样式
* 💄 调整pdf双链样式与块引用区别

## v0.7.4 / 2021-09-11

* 💄 标签页样式调整：去掉标签页的border-bottom，去掉第一个标签页的左上border-radius

## v0.7.3 / 2021-09-07
* 🐛 修复编辑时大纲标题闪烁
* 💄 文档图标标题上方针对win10 emoji进行大小调整
* 🐛 修复blockquote内标题的左间距过大问题
* 💄 标题加粗样式优化

## v0.7.2 / 2021-09-05

* 💄 Change the label style: wrap both sides with # marks
* 💄 Make the bold style of the blockquote obvious

## v0.7.1 / 2021-8-30

* 💄 调整自定义emoji大小，适配 win10emoji大小
* 💄 隐藏 twemoji 中一些啰嗦的 emoji，适配 win10 emoji

## v0.7.0 / 2021-8-28

* 🐛 Fix h3 mouse click problem
* 🐛 Fix table location in preview mode

## v0.6.9 / 2021-8-27

* 🐛 Fix h3 display in Embeded Block

## v0.6.8 / 2021-8-26

* 💄 Optimize custom-emoji display
* 💄 Cancel img shadow

## v0.6.7 / 2021-8-25

* 💄 Optimize the style of closed notebooks
* 💄 Optimize blockquote style
* 🐛 Fix 挖空 style can't not hide inline elements


## v0.6.6/2021-08-22

* 💄 光标选中文本样式
* 💄 文档标签样式调整
* 💄 菜单样式增高
* 💄 菜单增加圆角

## v0.6.5/2021-08-21

* 💄去掉h2标题下划线
* 💄鼠标悬浮文档名、文档图标等其他图标放大动效
* 📸更新preview.png
* 🐛修复对设置、搜索弹窗的动画效果造成的块标移动

## v0.6.4/2021-08-18

* 💄调整kbd位置
* 💄调整行内代码位置


## v0.6.3/2021-08-16

* ✨ 折叠不改变标题大小
* 🐛 修复预览模式待办列表icon位置错误

## v0.6.2/2021-08-15

* 💄 超级块与超级块之间添加间距，修复之前对竖排超级块也添加间距的错误
* 💄 预览页面居中，设置宽度限制
* 🎨 修改 h3 标题的竖线实现：从 border 改为"|"文字

## v0.6.1/2021-08-14

* 📝 改写主题 Readme
* 🎉 将更新日志移动至 CHANGE_LOGS
* 🎨 更改自定义字体颜色和背景颜色（累死，调了两天，每次改都是大调特调，以后再也不调色了）
* 🎨 调整鼠标框选文字背景色为淡绿色
* 🎨 调整列表项 icon 与文字的间距
* 🎨 去掉面包屑背景色
* 🎨 去掉文档标题下划线
* 🎨 添加每个块圆角样式（不知道我是不是最晚加的一个主题）
* 🎨 h2 添加 padding-left
* 🐛 修复由于思源更新 1.2.5 造成文件树列表 hover 和 focus 样式丢失
* 🐛 修复空代码块也显示空块字符提示
* 🐛 修复二级标题和三级标题横向排列的样式错误问题
* 白折腾

  * ~~🎨 调整编辑器内部两侧宽度（放弃，无法调整全屏后的文档图标和分屏样式）~~
  * ~~🐛 修复调整内容两侧宽度造成的标题引用数位置错误~~


## v0.6.0/2021-08-09

* 修复引述块嵌套间距问题
* 调小列表项图标与文字的间距
* 修复空代码块也显示空块字符提示

## v0.5.9/2021-08-04

* 修复sql查询挖空块无法翻转的问题

## v0.5.8/2021-08-03

* 修复设置窗口中当鼠标悬浮图标时背景色的问题
* 调整块引用样式
* 鉴于思源目前更新文字会导致重新加载动画，再度调整挖空效果

  * 高亮挖空效果更改默认隐藏文字，当悬浮高亮文字时才显示高亮的文字
  * 挖空块忍痛取消翻转效果

## v0.5.7/2021-08-02

* 调整挖空效果

  * 高亮挖空效果更改默认隐藏文字，当点击一个块时显示全部高亮的文字
  * 修改自定义属性的「挖空块」：属性名设置为 function，属性值设置为“挖空”，即可实现挖空块效果（注意 ⚠：目前挖空块更新文字，动画会重新加载，建议是先打完文字再设定为挖空块）

## v0.5.6/2021-08-01

* 修复 0.5.5 调整超级块间距使得超级块中的列表和文字重叠的问题
* dark 主题调整文本选中背景色
* 调整自定义主题颜色

  light 主题：

  | 状态     | 配色情况                                                                                        |
  | -------- | ----------------------------------------------------------------------------------------------- |
  | 修改前   | ![Pl图片注释](https://b3logfile.com/siyuan/1610205759005/assets/image-20210801154103-b72ek74.png) |
  | 修改后： | ![Pl图片注释](https://b3logfile.com/siyuan/1610205759005/assets/image-20210801192810-mf90ey5.png) |

  dark 主题：

  | 状态   | 配色情况                                                                                        |
  | ------ | ----------------------------------------------------------------------------------------------- |
  | 修改前 | ![Pl图片注释](https://b3logfile.com/siyuan/1610205759005/assets/image-20210801154046-7bhhio4.png) |
  | 修改后 | ![Pl图片注释](https://b3logfile.com/siyuan/1610205759005/assets/image-20210801192205-rw7usxd.png) |
* 添加自定义块属性样式

  * 属性 key 都为 function
  * value 可为

    * zy ——代表重要
    * ing ——代表进行中
    * done ——代表事项已完成
    * 50 ——代表完成 50%
    * kaiti ——字体为楷体
    * 挖空——挖空效果
    * 黄——黄背景色
    * 蓝——蓝色背景色
    * 红——红色背景色
  * 预览图：![Pl图片注释](https://b3logfile.com/siyuan/1610205759005/assets/image-20210801200405-zy5kgxz.png)

## v0.5.5/2021-07-28

* 优化超级块的间距：超级块最后一个不设置间距，保持超级块与普通块间距一致

## v0.5.4/2021-07-25

* 亮色主题减淡列表折叠背景颜色
* 延长高亮挖空时显示文字时间

## v0.5.3 / 2021-07-18

* 修正 h3 标题的行距
* light 主题修改分栏多窗口的分割线
* 完成的待办列表中的 strike 样式修改：从“更改颜色”到“减淡透明度”
* 表格默认居中，表格字体减小
* 修改 mark 样式为挖空效果

  ```css
  .protyle-wysiwyg mark{
      color: transparent;
  }
  .protyle-wysiwyg mark:hover{
      color: var(--b3-protyle-inline-mark-color);
      transition: all 0.5s ease-in-out;
  }
  ```
* 更改空行提示为："To the time to life, rather than to life in time"，可通过以下代码修改 content 内容进行修改，删除这段代码则恢复默认。

  ```css
  .protyle-wysiwyg [data-node-id] [spellcheck="false"]:focus:empty:after {  
      content: "To the time to life, rather than to life in time.";  
      color: #9fa5a6;
  }
  ```

## v0.5.2 / 2021-07-12

* 取消多窗口区别样式

## v0.5.1 / 2021-07-06

* 取消链接 icon
* 块嵌入的查询结果之间增强区别

## v0.5.0 /2021-07-03

* 修复列表list 缩进不对的问题

## v0.4.9 /2021-07-01

* 修复代码块字体大小固定的问题
* 取消主题对无序列表的自定义
* 修复 blockquote 中缩进角标也会缩进的问题
* 调长图片缩放的调整手柄长度
* 调整列表与文字的间距,修复待办列表在极端字号情况下的样式错乱问题
* 稍微调小主题待办列表的列表样式复选框大小

## v0.4.8 /2021-06-28

* 添加笔记标题下划线样式
* 大改进：blockquote 改变样式！🌸
* 调整 dark 主题文字选择高亮样式
* 完成待办列表

  * `<kbd>`kbd `</kbd>` 样式优化
  * 悬浮图片恢复透明度

## v0.4.7/2021-06-28

* 标题内如果文字加粗，样式不显示
* light 主题行内代码样式调整：添加阴影 `css`
* 再次调整无序列表样式（V 姐老是动来动去的）
* light 主题调整链接前 icon 样式，与 dark 保持一致
* 引述块中的列表样式间距调整

## v0.4.6/2021-06-25

* 取消之前对 latex 公式的自定义
* 调整 dark 主题的选中文本高亮效果
* 调整 dark 主题 h1 颜色

## v0.4.5/2021-06-17

* 超链接前添加icon
* 修复导出列表颜色问题

## v0.4.4/2021-06-07

* 修复 1.2.0 beta3 列表悬浮的大圆点位置错位问题
* 代码块行号不能改颜色
* 修改菜单背景颜色，取消悬浮加粗效果
* 调整有序列表和数字列表样式

  * 修改折叠列表项颜色
  * 调整数字列表位置

## v0.4.3/2021-06-06

* 调整 `<kbd>` kbd `</kbd>`大小
* 有序列表悬浮高亮
* 解决 `<kbd>`dark `</kbd>` 主题无序列表高亮悬浮样式圆圈位置偏移
* 多窗口区分，未激活窗口颜色只是编辑区，而不是整个区域！
* `<kbd>`light `</kbd>` 主题引用计数块颜色调整
* 报错弹窗颜色调整
* dark 主题待办列表超[链]()接颜色取消另设颜色？
* dark 主题 h2 下划线改淡
* 调整代码块字体使行号对齐
* 完成的待办列表有序列表和无序列表颜色修改
* 调整标签悬浮样式，修复标签悬浮颜色错误
* 更改主题preview图片
* 由于siyuan 1.2.0 beta2已经支持修改字体，故去掉附带的思源黑体

## v0.4.2/2021-06-03

* 修复只有一个嵌入块也会有下边框的问题，更改嵌入样式
* 工具栏颜色
* 待办列表的删除线颜色区别
* 由于思源1.2设置标签页横线不换行排列，故取消之前版本对当前标签页的最大宽度调整
* 修复设置字体颜色不显示颜色的问题

## v0.4.1 fix bugs/2021-05-31

* 公式块大小调整
* 列表缩进调整，修复导出列表样式于段落居中的问题
* 修复图片缩放延迟的问题

## v0.4.0 Rename to Tsundoku& Adapt to new Siyuan/2021-05-06

* [X] 外观

  * [X] dock 栏背景色
  * [X] 面包屑背景
  * [X] 标签页样式
  * [X] 文件列表点击高亮和悬浮样式
  * [X] 区分文件夹里的文件数和引用数
  * [X] toc 字体偏大
  * [X] 设置面板动画和样式
  * [X] 内容中的引用效果
  * [X] 报错颜色
  * [X] 大纲标题加粗字体如何解决？高亮不能高亮加粗的字？
* [X] 行内样式

  * [X] 高亮 mark
  * [X] 超链接

    * [X] 悬浮样式
    * [X] 超链接 下划线 减淡
    * [X] 超链接的下划线是在 span 还是文字下
  * [X] 标签 tag 样式
  * [X] 行内公式
  * [X] 行内代码
  * [X] 块引用
  * [X] 标题样式
* [X] 块样式

  * [X] 图片
  * [X] 待办列表

    * [X] 复选框样式更改
    * [X] 待办列表如果父级勾选了，子级会继承透明度
    * [X] 要不要点击父级待办，然后就自动勾选子级？——还是不要这样吧
    * [X] ~~能不能输入文字恢复透明度？~~（可能实现不了）
  * [X] 无序列表样式更改
  * [X] 代码块样式

    * [X] 字体又改回 Fira Code
    * [X] 添加代码块阴影
    * [X] 更改背景
  * [X] 公式块 margin 改小，分式字体改大
  * [ ] 块嵌入

    * [X] sql 查询错误样式显示红色
    * [X] 块嵌入块添加阴影
    * [ ] 块嵌入区别各文件位置（目前动态查询不像以前一样显示笔记位置？等完善了再添加样式）
  * [ ] 块命名
* [ ] 琐碎

  * [ ] iframe 适配电脑手机平板适配大小(得手机端出来再检验)

## 0.3.9/2021-4-7

* 更改 code 字体为 `JetBrainsMono` 字体
* 安卓端黑色主题图片透明度不变
* 黑色主题行内代码样式更改
* 借鉴了 notion 主题，终于让代码块能真正原地编辑了，代码语言类型也可以在右上方固定不会随着滚动条而移动了，而且还可以直接编辑！了了一大梦啊。不过目前 markdown 图表可能有点小问题，自己不用就不管了，也办法单独调整。
* 增大两个列表块 ul、ol、待办列表的间距

  ```css
  .vditor .vditor-reset ul+ul,
  .vditor .vditor-reset ol+ol, 
  .vditor .vditor-reset ol+ul,
  .vditor .vditor-reset ul+ol{
      margin-top: 1em;
  }
  ```
* 优化表格 br显示

  ```css
  .vditor-ir__br {
      /* transition: opacity 0.5s ease 1s; */
      opacity: 0;
  }
  /* .vditor-ir__br:hover {
      transition: opacity 400ms ease 0s;`
      opacity: 1;
  } */

  table td:hover .vditor-ir__br{
      opacity: 1;
  }
  ```

## v0.3.8/2021-4-4

1. 修复 light 主题无序列表变灰导致任务列表、表格也变灰、引用样式字体变黑的问题

   ```css
   /* 列表样式 */

   .vditor-reset ul {
       color: grey;

   }
   .vditor-reset ul > li:not(.vditor-task) {

       list-style-type: disc;
   }
   .vditor-preview li {
       color: var(--b3-theme-on-background); 
   }
   .vditor-reset ul li p {
       color: var(--b3-theme-on-background); 
   }
   .vditor-reset table {
       color: var(--b3-theme-on-background);
   }
   ```
2. 对手机和平板针对 iframe 中的视频进行样式调整

   ```css
   @media screen and (min-width: 320px) and (max-width: 420px){
       iframe {
       height: 150px;
       }
       .fn__flex-column .vditor-ir {
           /* 多窗口非活动窗口变暗 */
           background-color: var(--b3-theme-background);
       }
   }
   @media screen and (min-width: 421px)and (max-width: 1023px) {
       /* 保证手机端和平板端的窗口背景不为电脑端非活动背景 */
       .fn__flex-column .vditor-ir {
           background-color: var(--b3-theme-background);
       }
       iframe {
       height: 320px;
       }
   }
   ```
3. 对代码块复制按钮的复制样式进行旋转，避免遮盖旁边主题自定义的代码语言类型提示

   ```css
   .vditor-copy span:hover::before {
       transform: rotate(90deg) translateX(-11.5px) translateY(-4px);
       border-left-color: #727273;

   }
   .vditor-copy span:hover::after {

       transform: translateX(27px) translateY(-16px);
       background-color: #727273;
   }
   ```
4. 更改提示框背景色 `aria-label `

   ```css
   .b3-tooltips__s::before, .b3-tooltips__se::before, .b3-tooltips__sw::before {
       border-bottom-color: #07899d9f;
   }
   .b3-tooltips::after {
       background: #07899d9f;
   }
   ```
5. 关于类名.vditor-ir 是即时编辑，.vditor-preview 是预览模式，鉴于大纲也有.vditor-reset，想要预览和即时编辑样式保持一致最好用.vditor .vditor-reset

   - 修复预览样式中 Katex 公式行内公式太大的问题，MathJax 暂时无法修复
   - 修复二级标题样式错误问题

## v0.3.7/2021-4-3

* 表格框线在十字交叉处会叠加颜色，框线颜色透明度的锅
* 鉴于手机端点击工具栏不方便，干脆取消工具栏隐藏效果
* 调整黑色主题工具栏颜色
  ![image.png](https://b3logfile.com/siyuan/1610205759005/assets/image-20210403202610-swoo8t3.png)
* 修复由于重设代码块样式造成的 html code 块也出现 padding-top 的问题
* 保证 light 主题手机端和平板端的窗口背景不为电脑端非活动背景
* 发现自己的字体虽然是思源黑体 SourceHan 但是和 notion 主题的字体 NotoSansSC 有差别，于是我的列表样式就显得格外的小……这次干脆 copy 了 notion 的字体，light 主题的无序列表颜色调整为灰色, 统一无序列表样式为小圆点![image.png](https://b3logfile.com/siyuan/1610205759005/assets/image-20210403204713-opwzwz7.png)

  ```css
  .vditor-ir ul > li:not(.vditor-task) {
      list-style-type: disc;
  }
  .vditor-ir ul > li:not(.vditor-task) p{
      color:var(--b3-theme-on-background);
  }
  .vditor-ir ul{
      color:grey;
  }

  ```

## v0.3.6/2021-4-2

尝试修复手机端 emoji 设置失效问题

目前的手机端样式

![image.png](https://b3logfile.com/siyuan/1610205759005/assets/image-20210402185216-m81xbq4.png)

## v0.3.5/2021-4-1

- 安卓端字体使用微软 emoji 字体 Segoe UI Emoji，保证样式统一
- 修复标题块命名的问题
- 代码块行高缩小
- R 语言代码语言显示
- 引用加粗样式调整
- 更改代码块样式，仿MAC
- 减淡未激活窗口背景色

## v0.3.4/2021-3-28

- 修复字体颜色和背景色重复的问题
- 针对 1.1.6 代码块的改动修改代码

## v0.3.3/2021-3-21

- 调整完成的代表列表字体减淡颜色
- light 主题修正设置窗口的关闭按钮高亮样式，模仿 watermelon 添加关闭按钮旋转动画
- 再次更改黑色主题色……
- 这个月除非重大 bug，否则都不会再发布新版本了

## v0.3.2/2021-3-20

- 主题添加思源v1.1.4添加的自定义颜色样式
- 修复思源1.1.3之后公式块与正文间距变大的问题
- 再次更改黑色主题色……
- 修复行内公式中分式大小较小的问题，稍微调大了公式块中矩阵、方程组等字体，但还是较小，暂时无法彻底解决，将就的用吧
- 修复自定义颜色造成的滚动条失灵情况

## v0.2.9/2021-3-19

- 修复黑色主题由于表格命名样式造成表格下方出现多余的间距
- 修复超链接锚文字出现行内代码出现链接高亮被分开的问题 `<br>`
- 添加多窗口时区分目前窗口与非激活窗口的动效
- 目前点击侧栏的名称处或侧栏空白处，dark 主题会进入暗黑模式，而 light 主题会进入护眼模式
- 添加文件未保存时标签页的样式，当前标签页的底框会变暗
- 更改工具栏高亮样式
- 修复 Ctrl+P 搜索弹窗高亮和 focus 样式不正确，修改搜索弹窗打开的名称和页面的背景色
- 修改块引用背景色，与正文区分，修复块嵌入中块引用样式为 hover 样式的问题
- 鼠标不在侧栏文件树、标签、书签、大纲隐藏滑块
- 修正代码块命名的位置
- 黑色主题更改 h1 标题样式
- 黑色主题更改文本高亮样式
- 黑色主题更改界面颜色：正文内容背景，侧边栏，tab 栏，工具栏
- 黑色主题将菜单 hover 和 focus 颜色合并，白色主题暂时保留两种颜色
- 白色主题微调代码块背景颜色

## v0.2.8/2021-3-15

- 修复亮色主题工具栏透明度问题
- 代码语言添加 Matlab、R 语言显示
- 调整内容中的块引用计数块样式
- 修复笔记历史内容出现的边框和背景
- 修正代码块像素颜色不同的问题
- 试图使用 sticky 固定代码块右侧代码语言的显示，然而失败，会占据预览区第一行左侧的位置，哪怕 float

## v0.2.7/2021-3-13

- 调整标签页和文件树高亮颜色
- 修复文件夹选中的颜色错误
- 修复Katex公式换行间距过小问题

## v0.2.6/2021-3-12

- 亮色主题更改dock栏配色
- 更改文件树列表hover高亮颜色，标签页和文件树点击添加动画
- 完成事项添加悬浮恢复正常透明度动画
- 修正加粗、删除线、下划线固定颜色的问题
- 仿照 quiet 主题的标签、集市悬浮样式
- 调整块引用、块命名数块颜色
- 去掉文件树块引用计数块的背景

## v0.2.5/2021-3-11

- 隐藏 `<br>`标签,1 s自动消失
- 修正h3由于修改代码而造成若文字太长，左边框长度不变的问题，修改h3标题代码
- 修正表格命名位置错乱问题，表格命名会在表格左下角出现

## v0.2.4/2021-3-10

- 修正标签文字不垂直居中的问题,调整标签颜色样式
- 修正块嵌入超链接样式总为hover样式
- 默认设置 iframe 标签高度为 500px
- 取消代码编辑区的 padding-left
- 修改块命名、别名的样式，修正标题使用块命名计数块不在左上方的问题
- 工具栏 10s 不使用将自动隐藏，添加出现动画
- 代码块渲染区显示 test、markdown 语言
- 块嵌入和块引用颜色区分
- 块引用和文件树数字颜色区分
- 更改亮色主题的设置的关闭按钮样式

## v0.2.3/2021-3-9

- 调整嵌入块与上方块名的间距,以防止块名的下划线被遮挡
- 修正待办列表与有序、无序列表不再同一个垂直位置的错误
- 亮色主题给列表加框线
- 修正sql查询和代码编辑区的代码语言显示为粉色的问题
- 修正暗色主题和亮色主题对数学公式大小差别
- 修正设置弹出窗口的列表选项变小的问题
- 去掉设置、搜索、斜杠菜单的hover背景色，保留搜索、斜杠选中背景色，去掉设置的选中背景色
- 修改标签页和设置页关闭按钮

## v0.2.2/2021-3-8

- 调整引用块边框颜色
- 块旁边显示的数字加边框
- 一级标题去掉下边框保持居中，二级横线颜色调整，三级竖线调细
- 列表间距调整
- 超链接添加下划线
- 调整数学公式块大小
- 修复预览模式的行内代码左侧凸出的问题
- 调整块引用卡片的阴影
- 添加块引用悬浮动画

## v0.2.1/2021-3-8

- 多窗口当前页面标签页添加底框
- 对待办列表中的代码块复制按钮进行透明度调整
- 调近代办样式的距离
- 调整标签与普通文字距离
- 块引用下划线间距调整
- 对完成的待办事项内容全部调整透明度

## v0.2.0/2021-3-7

又双叒叕更新了，这是一次大刀阔斧的更新，提出追求极致的口号！😏

- 鉴于原先阿里巴巴普惠体版权问题，**更改中文主字体为思源黑体**
- 修复因为标签页与上方选项栏的间距导致主题会出现**两个滑块的问题**
- **修正调整字号后主题待办列表checkbox无法完全覆盖checkbox基本样式的bug**
- 代码块渲染目前**支持显示部分语言名称**，但语言名称显示会随着滑块移动，待完善
- 修复将body设置了perspective造成的**字体模糊**，**修改窗口弹出动效**为Y轴翻转
- 调整标签页字体放大效果，**调整选中的标签页最大文字宽度**
- **减小文件树列表间距**
- 对标题样式代码、标签等样式进行重写，使得其能**适配不同字号大小**
- **减小阴影**：图片、嵌入卡片
- 再次调整**表格颜色**
- 调整==高亮==样式, 对完成的待办列表中的高亮样式进行调整
- 调整块引用下划线与文字的间距
- 调整完成的待办列表中的代码样式透明度
- 调整多窗口的边框颜色
- 修改标签样式，将标签样式调淡，圆角增大
- 分别针对MathJax行内公式和公式块大小进行优化（之前只设置KaTex的）
- 初步对主题css即时渲染行内元素样式的颜色代码进行优化，部分使用变量
- 标签页margin-left改为margin-right

## v0.1.8/2021-3-4

好了，我改不动了，要是没什么大问题近期就不改主题了，毕竟自己笔记都没咋写，光弄花架子了

- 分别更改行内公式和公式块大小
- 代码块和公式块编辑缩进，同时考虑到有行号时代码块的缩进。（摸索半天，太折腾了，这边改完那边变）
- 减小图片阴影
- 标签页样式更改，未选中标签页与选中标签页有背景颜色和字体大小及颜色区别，增大标签页之间的距离

## v0.1.7/2021-3-4

- 改进行内代码的css代码，避免其影响代码块编辑区
- 对代码块编辑区样式进行修改
- 对行内公式编辑样式进行修改
- 去掉表格阴影

## v0.1.6/2021-3-4

- 修正行内公式块有多余空间的问题
- 对已完成代办事项中的加粗、斜体、删除线、超链接进行优化，事项中含有的图片透明度设置为60%，鉴于原先默认设置的删除线可能不方便查看，暂时决定取消，可以自行添加删除(Ctrl+D)，或者自行修改主题,搜索"完成的代办事项下划线",`/* text-decoration: line-through; */`取消注释
- 更改h3标题与上下文的间距

## v0.1.5/2021-3-3

- 修复从edge复制的超链接，形如[思源笔记更新日志(ld246.com)](https://ld246.com/tag/siyuan-announcement)，分多块hover高亮的问题
- 将表格颜色减淡
- 将图片阴影调小

## v0.1.4/2021-3-3

- 去除选中标签页的背景色
- 仿照Lavender设置界面动效，更改设置的关闭按钮颜色和hover背景
- 仿照Passion设置选中项的圆角
- 去除代码块、引用块的阴影
- 更改代码块和引用块颜色
- 更改弹出菜单样式
- 更改编辑区上方工具栏阴影

## v0.1.0/2021-3-2

- 将Mixture Dark 暗色主题的样式照搬并进行修改
