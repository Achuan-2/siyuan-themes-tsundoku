# 思源主题: mixture(light)
![preview](preview.png)
本主题主颜色为青色，主字体为阿里巴巴普惠体，代码字体为Fira Code，浅色主题主要从[Mixture Dark](https://github.com/Achuan-2/siyuan-themes-mixture)暗色主题修改而来，但感觉青出于蓝而胜于蓝，更好看哇！
希望能逐渐做出简洁美观的效果呀！
## v0.1.6
- 修正行内公式块有多余的代码，把CSS的`.vditor-reset code:not(.hljs){...}`改为`.vditor-reset code:not(.hljs):not([data-type="math-inline"]) {...}`
- 对已完成代办事项中的加粗、斜体、删除线、超链接进行优化，事项中含有的图片透明度设置为60%，鉴于原先默认设置的删除线可能不方便查看，暂时决定取消，可以自行添加删除(Ctrl+D)，或者自行修改主题,搜索"完成的代办事项下划线",`/* text-decoration: line-through; */`取消注释
- 更改h3标题与上下文的间距
  
## v0.1.5
- 修复从edge复制的超链接，形如[思源笔记更新日志(ld246.com)](https://ld246.com/tag/siyuan-announcement)，分多块hover高亮的问题
- 将表格颜色减淡
- 将图片阴影调小
## v0.1.4
- 去除选中标签页的背景色
- 仿照Lavender设置界面动效，更改设置的关闭按钮颜色和hover背景
- 仿照Passion设置选中项的圆角
- 去除代码块、引用块的阴影
- 更改代码块和引用块颜色
- 更改弹出菜单样式
- 更改编辑区上方工具栏阴影
## v0.1.0
- 将Mixture Dark 暗色主题的样式照搬并进行修改