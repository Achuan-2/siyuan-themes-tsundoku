<a title="Hits" target="_blank" href="https://github.com/Achuan-2/siyuan-themes-tsundoku-light"><img src="https://hits.b3log.org/Achuan-2/siyuan-themes-tsundoku-light.svg" ></a>
[![Downloads](https://img.shields.io/github/downloads/Achuan-2/siyuan-themes-tsundoku-light/total?logo=github)](https://github.com/Achuan-2/siyuan-themes-tsundoku-light/releases/latest/download/siyuan-themes-tsundoku-light.zip)
[![Release](https://img.shields.io/github/release/Achuan-2/siyuan-themes-tsundoku-light.svg)](https://github.com/Achuan-2/siyuan-themes-tsundoku-light/releases)
![stars](https://badgen.net/github/stars/Achuan-2/siyuan-themes-tsundoku-light)
![open-issues](https://badgen.net/github/open-issues/Achuan-2/siyuan-themes-tsundoku-light)
![closed-issues](https://badgen.net/github/closed-issues/Achuan-2/siyuan-themes-tsundoku-light)
![GitHub last commit](https://img.shields.io/github/last-commit/Achuan-2/siyuan-themes-tsundoku-light)


# 思源主题: Tsundoku(light)

![preview](preview.png)

> 🌞 亮色主题见[Tsundoku Light](https://github.com/Achuan-2/siyuan-themes-tsundoku-light) | 🌛 深色主题见[Tsundoku Dark
> ](https://github.com/Achuan-2/siyuan-themes-mixture)
>
> 本人的思源订阅推荐码：B3XX0Y8，欢迎各位老板使用！

💌 缘起：Tsundoku “積 ん 読”是日语里的一个词，维基百科是这样解释的“Tsundoku is acquiring reading materials but letting them pile up in one's home without reading them. It is also used to refer to books ready for reading later when they are on a bookshelf.”我希望思源能帮助我成长，而不是又成为缓解知识焦虑的积灰箱。

🔱 这可能不会是最符合你审美的主题，但或许这会是一个最追求极致体验的主题（之一）！

❤ 特色

* 动效丰富：弹出窗口有左右展开动效，块引用预览页面展开动效、点开关闭窗口动效
* 对任务列表效果做了最多的优化，完成的任务列表内各个行内和块样式都做了一定处理
* 优化了对行内公式和公式块的大小问题
* 修改安卓端的默认 emoji 为 Win 10 emoji——Segoe UI Emoji，保证样式统一
* 代码字体为 Fira Code，支持连字

🗞由于思源重写编辑器，被覆盖掉（被官方抄了）的特色

* ~~代码块预览支持直接在右侧显示所用的主流语言~~
* ~~**隐藏了标签页的文件图标**~~
* ~~添加了多窗口区分当前和其他窗口~~

🗑取消的特色

* ~~增大了当前标签页的最大文字宽度~~（由于现在标签页只有一行横向排布，避免长标题占据太多空间只好暂时取消）

本主题详细改动帖子：#TODO#

---

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

* 调整<kbd> kbd </kbd>大小
* 有序列表悬浮高亮
* 解决<kbd>dark</kbd> 主题无序列表高亮悬浮样式圆圈位置偏移
* 多窗口区分，未激活窗口颜色只是编辑区，而不是整个区域！
*  <kbd>light</kbd> 主题引用计数块颜色调整
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
- 修复超链接锚文字出现行内代码出现链接高亮被分开的问题<br>
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

- 隐藏`<br>`标签,1 s自动消失
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

  * [X] iframe 适配电脑手机平板适配大小
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
