window.theme = {};

/**
 * 加载样式文件
 * @params {string} href 样式地址
 * @params {string} id 样式 ID
 */
window.theme.loadStyle = function (href, id = null) {
    let style = document.createElement('link');
    if (id) style.id = id;
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.href = href;
    document.head.appendChild(style);
};

/**
 * 更新样式文件
 * @params {string} id 样式文件 ID
 * @params {string} href 样式文件地址
 */
window.theme.updateStyle = function (id, href) {
    let style = document.getElementById(id);
    if (style) {
        style.setAttribute('href', href);
    } else {
        window.theme.loadStyle(href, id);
    }
};


/**
 * 静态资源请求 URL 添加参数
 * @params {string} url 资源请求 URL
 * @return {string} 返回添加参数后的 URL
 */
window.theme.addURLParam = function (
    url,
    param = {
        t: Date.now().toString(),
        v: window.siyuan.config.appearance.themeVer,
    }
) {
    switch (true) {
        case url.startsWith('//'):
            url = new URL(`https:${url}`);
            break;
        case url.startsWith('http://'):
        case url.startsWith('https://'):
            url = new URL(url);
            break;
        case url.startsWith('/'):
            url = new URL(url, window.location.origin);
            break;
        default:
            url = new URL(url, window.location.origin + window.location.pathname);
            break;
    }
    for (let [key, value] of Object.entries(param)) {
        url.searchParams.set(key, value);
    }
    return url.href.substring(url.origin.length);
};

/**
 * 加载 meta 标签
 * @params {object} attributes 属性键值对
 */
window.theme.loadMeta = function (attributes) {
    let meta = document.createElement('meta');
    for (let [key, value] of Object.entries(attributes)) {
        meta.setAttribute(key, value);
    }
    document.head.insertBefore(meta, document.head.firstChild);
};

/**
 * 加载脚本文件
 * @params {string} url 脚本地址
 * @params {string} type 脚本类型
 */
window.theme.loadScript = function (src, type = 'module', async = false, defer = false) {
    let script = document.createElement('script');
    if (type) script.setAttribute('type', type);
    if (async) script.setAttribute('async', true);
    if (defer) script.setAttribute('defer', true);
    script.setAttribute('src', src);
    document.head.appendChild(script);
};

/**
 * 获取客户端模式
 * @return {string} 'app' 或 'desktop' 或 'mobile'
 */
window.theme.clientMode = (() => {
    let url = new URL(window.location.href);
    switch (true) {
        case url.pathname.startsWith('/stage/build/app'):
            return 'app';
        case url.pathname.startsWith('/stage/build/desktop'):
            return 'desktop';
        case url.pathname.startsWith('/stage/build/mobile'):
            return 'mobile';
        default:
            return null;
    }
})();

/**
 * 获取语言模式
 * @return {string} 'zh_CN', 'zh_CNT', 'fr_FR', 'en_US'
 */
window.theme.languageMode = (() => window.siyuan.config.lang)();

/**
 * 获取操作系统
 */
window.theme.OS = (() => window.siyuan.config.system.os)();


window.theme.ID_COLOR_STYLE = 'theme-color-style';

/**
 * 获取主题模式
 * @return {string} light 或 dark
 */
window.theme.themeMode = (() => {
    /* 根据浏览器主题判断颜色模式 */
    // switch (true) {
    //     case window.matchMedia('(prefers-color-scheme: light)').matches:
    //         return 'light';
    //     case window.matchMedia('(prefers-color-scheme: dark)').matches:
    //         return 'dark';
    //     default:
    //         return null;
    // }
    /* 根据配置选项判断主题 */
    switch (window.siyuan.config.appearance.mode) {
        case 0:
            return 'light';
        case 1:
            return 'dark';
        default:
            return null;
    }
})();

/**
 * 更换主题模式
 * @params {string} lightStyle 浅色主题配置文件路径
 * @params {string} darkStyle 深色主题配置文件路径
 */
window.theme.changeThemeMode = function (lightStyle, darkStyle) {
    let href_color = null;
    switch (window.theme.themeMode) {
        case 'light':
            href_color = lightStyle;
            break;
        case 'dark':
        default:
            href_color = darkStyle;
            break;
    }
    window.theme.updateStyle(window.theme.ID_COLOR_STYLE, href_color);
};

/* 根据当前主题模式加载样式配置文件(TODO) */

window.theme.changeThemeMode(
    `/appearance/themes/Tsundoku/style/theme/light.css`,
    `/appearance/themes/Tsundoku/style/theme/dark.css`
);


/*HBuiderX主题功能*/

const HBuiderXToolbarID = 'HBuiderXToolbar';
const SiYuanToolbarID = 'toolbar';

const SidebarHoverButtonID = 'sidebarHoverButton';
const HighlightBecomesHiddenID = 'highlightBecomesHidden';
const QuickDropDownID = 'quickDropDown';
const FocusingOnAmplification = 'FocusingOnAmplification';

var siYuanToolbar = null;
var HBuiderXToolbar = null;
var sidebarHoverButton = null;
var highlightBecomesHiddenButton = null;
var quickDropDownButton = null;
var focusingOnAmplificationButton = null;

var layout__center_fn__flex_fn__flex_1 = null;

var LeftHoverBlock = null;
var RightHoverBlock = null;

var left_fn__flex_column = null;
var right_fn__flex_column = null;

var left_fn__flex_column_Width_Str = null;
var right_fn__flex_column_Width_Str = null;
var flag = true;
var bar = null;






/*----------------------------------创建notion主题工具栏区域----------------------------------
function createnotionToolbar() {
    var siYuanToolbar = getSiYuanToolbar();
    var notionToolbar = getnotionToolbar();
    var windowControls = document.getElementById("windowControls");
    if (notionToolbar) siYuanToolbar.removeChild(notionToolbar);
    notionToolbar = insertCreateBefore(windowControls, "div", "notionToolbar");
    notionToolbar.style.marginRight = "14px";
    notionToolbar.style.marginLeft = "11px";
}*/

/****************************思源API操作**************************/
async function 设置思源块属性(内容块id, 属性对象) {
    let url = '/api/attr/setBlockAttrs';
    return 解析响应体(
        向思源请求数据(url, {
            id: 内容块id,
            attrs: 属性对象,
        })
    );
}
async function 向思源请求数据(url, data) {
    let resData = null;
    await fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            Authorization: `Token ''`,
        },
    }).then(function (response) {
        resData = response.json();
    });
    return resData;
}
async function 解析响应体(response) {
    let r = await response;
    return r.code === 0 ? r.data : null;
}


/* 操作 */

/**
 * 获得所选择的块对应的块 ID
 * @returns {string} 块 ID
 * @returns {
 *     id: string, // 块 ID
 *     type: string, // 块类型
 *     subtype: string, // 块子类型(若没有则为 null)
 * }
 * @returns {null} 没有找到块 ID */
function getBlockSelected() {
    let node_list = document.querySelectorAll('.protyle-wysiwyg--select');
    if (node_list.length === 1 && node_list[0].dataset.nodeId != null)
        return {
            id: node_list[0].dataset.nodeId,
            type: node_list[0].dataset.type,
            subtype: node_list[0].dataset.subtype,
        };
    return null;
}

function ClickMonitor() {
    window.addEventListener('mouseup', MenuShow);
}

function MenuShow() {
    setTimeout(() => {
        let selectinfo = getBlockSelected();
        if (selectinfo) {
            let selecttype = selectinfo.type;
            let selectid = selectinfo.id;
            if (
                selecttype == 'NodeList' ||
                selecttype == 'NodeTable' ||
                selecttype == 'NodeBlockquote'
            ) {
                setTimeout(() => InsertMenuItem(selectid, selecttype), 0);
            }
        }
    }, 0);
}

function InsertMenuItem(selectid, selecttype) {
    let commonMenu = document.getElementById('commonMenu');
    let readonly = commonMenu.querySelector('.b3-menu__item--readonly');
    let selectview = commonMenu.querySelector('[id="viewselect"]');
    if (readonly) {
        if (!selectview) {
            commonMenu.insertBefore(ViewSelect(selectid, selecttype), readonly);
            commonMenu.insertBefore(MenuSeparator(), readonly);
        }
    }
}

function ViewMonitor(event) {
    let id = event.currentTarget.getAttribute('data-node-id');
    let attrName = 'custom-' + event.currentTarget.getAttribute('custom-attr-name');
    let attrValue = event.currentTarget.getAttribute('custom-attr-value');
    let blocks = document.querySelectorAll(`.protyle-wysiwyg [data-node-id="${id}"]`);
    if (blocks) {
        blocks.forEach(block => block.setAttribute(attrName, attrValue));
    }
    let attrs = {};
    attrs[attrName] = attrValue;
    设置思源块属性(id, attrs);
}

setTimeout(() => ClickMonitor(), 1000);

/**----------------------------------为文档标题创建动态下划线---------------------------------- */

function rundynamicUnderline() {
    setInterval(dynamicUnderline, 500);
}

function dynamicUnderline() {
    var AllDocumentTitleElement = getAllDocumentTitleElement();

    for (let index = 0; index < AllDocumentTitleElement.length; index++) {
        const element = AllDocumentTitleElement[index];

        var line = createLine(element);
        var txt = getTileTxt(element);
        var maxWidth = element.offsetWidth;

        var Style = getComputedStyle(element, null);
        var font = Style.font;
        var width = getTextWidth(txt, font) + 58;

        if (width < 288) {
            width = 288;
        }

        if (width > maxWidth) {
            width = maxWidth;
        }

        line.style.width = width + 'px';
    }
}

function createLine(TitleElement) {
    var item = TitleElement.parentElement.children;

    for (let index = 0; index < item.length; index++) {
        const element = item[index];

        if (element.getAttribute('Line') != null) {
            return element;
        }
    }

    var line = insertCreateAfter(TitleElement, 'div');
    line.setAttribute('Line', 'true');
    line.style.height = '1px';
    line.style.marginTop = '-2px';
    line.style.marginBottom = '7px';
    line.style.backgroundColor = 'var(--b3-border-color)';
    line.style.transition = 'all 400ms linear';
    return line;
}

function getTileTxt(TitleElement) {
    return TitleElement.innerText;
}

/**---------------------------------------------------------主题-------------------------------------------------------------- */

function themeButton() {
    notionThemeToolbarAddButton(
        'buttonlight',
        'toolbar__item b3-tooltips b3-tooltips__se',
        '🌞 Light',
        () => {
            loadStyle(
                '/appearance/themes/Tsundoku/style/theme/Tsundoku_light.css',
                'light主题'
            ).setAttribute('topicfilter', 'buttonlight');
            qucuFiiter();
        },
        () => {
            document.getElementById('light主题').remove();
        },
        true
    );
    notionThemeToolbarAddButton(
        'buttongreen',
        'toolbar__item b3-tooltips b3-tooltips__se',
        '🍃 Green',
        () => {
            loadStyle(
                '/appearance/themes/Tsundoku/style/theme/Tsundoku_green.css',
                'green主题'
            ).setAttribute('topicfilter', 'buttongreen');
            qucuFiiter();
        },
        () => {
            document.getElementById('green主题').remove();
        },
        true
    );
    notionThemeToolbarAddButton(
        'buttondark',
        'toolbar__item b3-tooltips b3-tooltips__se',
        '🔮 Dark',
        () => {
            loadStyle(
                '/appearance/themes/Tsundoku/style/theme/Tsundoku_dark.css',
                'dark主题'
            ).setAttribute('topicfilter', 'buttondark');
            qucuFiiter();
        },
        () => {
            document.getElementById('dark主题').remove();
        },
        true
    );
}



//去除主题所有滤镜还原按钮状态
function qucuFiiter() {
    var Topicfilters = document.querySelectorAll('head [topicfilter]');
    Topicfilters.forEach(element => {
        var offNo = getItem(element.getAttribute('topicfilter'));
        if (offNo == '1') {
            document.getElementById(element.getAttribute('topicfilter')).click();
            element.remove();
        }
    });
}




/*----------------日历面板----------------*/
function initcalendar() {
    // 把日历图标 放到  搜索图标前面
    var barSearch = document.getElementById('barSync');
    barSearch.insertAdjacentHTML(
        'afterend',
        '<div id="calendar"class="toolbar__item b3-tooltips b3-tooltips__se" aria-label="日历" ></div>'
    );
    let calendarIcon = document.getElementById('calendar');

    // 日历面板，这里是插入挂件
    barSearch.insertAdjacentHTML(
        'afterend',
        ` <div
    data-node-index="1"
    data-type="NodeWidget"
    class="iframe"
    data-subtype="widget"
  >
    <div class="iframe-content">
      <iframe id="calendarPanel" style="visibility:hidden;position: fixed; z-index: 1000; top: 225px; left: 200px;  width: 300px; height: 350px; background-color: var(--b3-theme-background);box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px;border:none; border-radius: 5px; transform: translate(-50%, -50%); overflow: auto;" src="/appearance/themes/Tsundoku/calendar" data-src="/appearance/themes/Tsundoku/calendar" data-subtype="widget" ></iframe>
    </div>
  </div>`
    );

    let calendarPanel = document.getElementById('calendarPanel');

    calendarIcon.innerHTML = `<svg t="1662957805816" class="icon" viewBox="-3 -3 38 38" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2374" width="30" height="30"><path d="M13.943 22.171h-0.914c-0.571 0-0.686 0.229-0.686 0.686v0.914c0 0.571 0.229 0.686 0.686 0.686h0.914c0.571 0 0.8-0.229 0.8-0.686v-0.914c-0.114-0.457-0.343-0.686-0.8-0.686zM19.086 22.171h-0.914c-0.571 0-0.8 0.229-0.8 0.686v0.914c0 0.571 0.229 0.686 0.8 0.686h0.914c0.571 0 0.8-0.229 0.8-0.686v-0.914c-0.114-0.457-0.229-0.686-0.8-0.686zM13.943 17.143h-0.914c-0.571 0-0.686 0.229-0.686 0.686v0.914c0 0.571 0.229 0.686 0.686 0.686h0.914c0.571 0 0.8-0.229 0.8-0.686v-0.914c-0.114-0.571-0.343-0.686-0.8-0.686zM8.686 22.171h-0.914c-0.571 0-0.686 0.229-0.686 0.686v0.914c0 0.571 0.229 0.686 0.686 0.686h0.914c0.571 0 0.8-0.229 0.8-0.686v-0.914c0-0.457-0.229-0.686-0.8-0.686zM8.686 17.143h-0.914c-0.571 0-0.686 0.229-0.686 0.686v0.914c0 0.571 0.229 0.686 0.686 0.686h0.914c0.571 0 0.8-0.229 0.8-0.686v-0.914c0-0.571-0.229-0.686-0.8-0.686zM13.943 12h-0.914c-0.571 0-0.686 0.229-0.686 0.686v1.029c0 0.571 0.229 0.686 0.686 0.686h0.914c0.571 0 0.8-0.229 0.8-0.686v-0.914c-0.114-0.571-0.343-0.8-0.8-0.8zM26.857 1.371h-21.714c-3.429 0-5.143 1.714-5.143 5.029v19.2c0 3.314 1.714 5.143 5.143 5.143h21.714c3.429 0 5.143-1.714 5.143-5.143v-19.2c0-3.314-1.714-5.029-5.143-5.029zM28.914 25.6c0 1.371-0.686 2.057-2.057 2.057h-21.714c-1.257 0-2.057-0.686-2.057-2.057v-14.514c0-1.371 0.686-2.057 2.057-2.057h21.714c1.371 0 2.057 0.686 2.057 2.057v14.514zM19.086 17.143h-0.914c-0.571 0-0.8 0.229-0.8 0.686v0.914c0 0.571 0.229 0.686 0.8 0.686h0.914c0.571 0 0.8-0.229 0.8-0.686v-0.914c-0.114-0.571-0.229-0.686-0.8-0.686zM24.229 12h-0.914c-0.571 0-0.8 0.229-0.8 0.686v1.029c0 0.571 0.229 0.686 0.8 0.686h0.914c0.571 0 0.8-0.229 0.8-0.686v-0.914c-0.114-0.571-0.229-0.8-0.8-0.8zM24.229 17.143h-0.914c-0.571 0-0.8 0.229-0.8 0.686v0.914c0 0.571 0.229 0.686 0.8 0.686h0.914c0.571 0 0.8-0.229 0.8-0.686v-0.914c-0.114-0.571-0.229-0.686-0.8-0.686zM19.086 12h-0.914c-0.571 0-0.8 0.229-0.8 0.686v1.029c0 0.571 0.229 0.686 0.8 0.686h0.914c0.571 0 0.8-0.229 0.8-0.686v-0.914c-0.114-0.571-0.229-0.8-0.8-0.8z"></path></svg>`;

    calendarIcon.addEventListener(
        'click',
        function (e) {
            e.stopPropagation();
            if (calendarPanel.style.visibility === 'hidden') {
                calendarPanel.style.visibility = 'visible';
            } else {
                calendarPanel.style.visibility = 'hidden';
            }
        },
        false
    );
    calendarPanel.addEventListener(
        'click',
        function (e) {
            e.stopPropagation();
        },
        false
    );

    // 隐藏历史面板
    function hideCalendarPanel() {
        if (calendarPanel.style.visibility === 'visible') {
            calendarPanel.style.visibility = 'hidden';
        }
    }
    // 点击其他区域时，隐藏日历面板
    window.addEventListener('click', hideCalendarPanel, false);
}

//+++++++++++++++++++++++++++++++++思源API++++++++++++++++++++++++++++++++++++
//思源官方API文档  https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md

/**
 *
 * @param {*} 内容块id
 * @param {*} 回调函数
 * @param {*} 传递对象
 */
async function 根据ID获取人类可读路径(内容块id, then, obj = null) {
    await 向思源请求数据('/api/filetree/getHPathByID', {
        id: 内容块id,
    }).then(v => then(v.data, obj));
}

async function 以id获取文档聚焦内容(id, then, obj = null) {
    await 向思源请求数据('/api/filetree/getDoc', {
        id: id,
        k: '',
        mode: 0,
        size: 36,
    }).then(v => then(v.data, obj));
}

async function 更新块(id, dataType, data, then = null, obj = null) {
    await 向思源请求数据('/api/block/updateBlock', {
        id: id,
        dataType: dataType,
        data: data,
    }).then(v => {
        if (then) then(v.data, obj);
    });
}

async function 设置思源块属性(内容块id, 属性对象) {
    let url = '/api/attr/setBlockAttrs';
    return 解析响应体(
        向思源请求数据(url, {
            id: 内容块id,
            attrs: 属性对象,
        })
    );
}

async function 获取块属性(内容块id, then = null, obj = null) {
    let url = '/api/attr/getBlockAttrs';
    return 向思源请求数据(url, {
        id: 内容块id,
    }).then(v => {
        if (then) then(v.data, obj);
    });
}

async function 向思源请求数据(url, data) {
    const response = await fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            Authorization: `Token ''`,
        },
    });
    if (response.status === 200) return await response.json();
    else return null;
}

async function 解析响应体(response) {
    let r = await response;
    return r.code === 0 ? r.data : null;
}

async function 获取文件(path, then = null, obj = null) {
    let url = '/api/file/getFile';
    await 向思源请求数据(url, {
        path: path,
    }).then(v => {
        if (then) then(v, obj);
    });
}

async function 写入文件(
    path,
    filedata,
    then = null,
    obj = null,
    isDir = false,
    modTime = Date.now()
) {
    let blob = new Blob([filedata]);
    let file = new File([blob], path.split('/').pop());
    let formdata = new FormData();
    formdata.append('path', path);
    formdata.append('file', file);
    formdata.append('isDir', isDir);
    formdata.append('modTime', modTime);
    await fetch('/api/file/putFile', {
        body: formdata,
        method: 'POST',
        headers: {
            Authorization: `Token ""`,
        },
    }).then(v => {
        setTimeout(() => {
            if (then) then(obj);
        }, 200);
    });
}

//+++++++++++++++++++++++++++++++++辅助API++++++++++++++++++++++++++++++++++++

/**
 * 方便为主题功能添加开关按钮，并选择是否拥有记忆状态
 * @param {*} ButtonID 按钮ID。
 * @param {*} ButtonTitle 按钮作用提示文字。
 * @param {*} NoButtonSvg 按钮激活Svg图标路径
 * @param {*} OffButtonSvg 按钮未激活Svg图标路径
 * @param {*} NoClickRunFun 按钮开启执行函数
 * @param {*} OffClickRunFun 按钮关闭执行函数
 * @param {*} Memory 是否设置记忆状态 true为是留空或false为不设置记忆状态。
 */
function notionThemeToolbarAddButton(
    ButtonID,
    ButtonTitle,
    ButtonLabel,
    NoClickRunFun,
    OffClickRunFun,
    Memory
) {
    var notionToolbar = document.getElementById('notionToolbar');
    if (notionToolbar == null) {
        var toolbarEdit = document.getElementById('toolbarEdit');
        var windowControls = document.getElementById('barSearch');

        if (toolbarEdit == null && windowControls != null) {
            notionToolbar = document.createElement('div');
            notionToolbar.id = 'notionToolbar';
            windowControls.parentElement.insertBefore(notionToolbar, barSearch);
        } else if (toolbarEdit != null) {
            notionToolbar = insertCreateBefore(toolbarEdit, 'div', 'notionToolbar');
            notionToolbar.style.position = 'relative';
        }
    }

    var addButton = addinsertCreateElement(notionToolbar, 'div');
    addButton.style.float = 'top';


    addButton.id = ButtonID;
    addButton.setAttribute('class', ButtonTitle);
    addButton.setAttribute('aria-label', ButtonLabel);

    var offNo = '0';

    if (Memory == true) {
        offNo = getItem(ButtonID);
        if (offNo == '1') {
            addButton.classList.add('active');
            setItem(ButtonID, '0');
            NoClickRunFun(addButton);
            setItem(ButtonID, '1');
        } else if (offNo != '0') {
            offNo = '0';
            setItem(ButtonID, '0');
        }
    }

    AddEvent(addButton, 'click', () => {
        if (offNo == '0') {
            addButton.classList.add('active');
            NoClickRunFun(addButton);
            if (Memory != null) setItem(ButtonID, '1');
            offNo = '1';
            return;
        }

        if (offNo == '1') {
            addButton.classList.remove('active');
            addButton.style.filter = 'none';
            OffClickRunFun(addButton);
            if (Memory != null) setItem(ButtonID, '0');
            offNo = '0';
            return;
        }
    });
}

function setItem(key, value) {
    window.theme.config[key] = value;
    写入文件('/data/snippets/Tsundoku.config.json', JSON.stringify(window.theme.config, undefined, 4));
}

function getItem(key) {
    return window.theme.config[key] === undefined ? null : window.theme.config[key];
}

function removeItem(key) {
    delete window.theme.config[key];
    写入文件('/data/snippets/Tsundoku.config.json', JSON.stringify(window.theme.config, undefined, 4));
}
/**
 * 在DIV光标位置插入内容
 * @param {*} content
 */
function insertContent(content) {
    if (content) {
        var sel = window.getSelection();
        if (sel.rangeCount > 0) {
            var range = sel.getRangeAt(0); //获取选择范围
            range.deleteContents(); //删除选中的内容
            var el = document.createElement('div'); //创建一个空的div外壳
            el.innerHTML = content; //设置div内容为我们想要插入的内容。
            var frag = document.createDocumentFragment(); //创建一个空白的文档片段，便于之后插入dom树
            var node = el.firstChild;
            var lastNode = frag.appendChild(node);
            range.insertNode(frag); //设置选择范围的内容为插入的内容
            var contentRange = range.cloneRange(); //克隆选区

            contentRange.setStartAfter(lastNode); //设置光标位置为插入内容的末尾
            contentRange.collapse(true); //移动光标位置到末尾
            sel.removeAllRanges(); //移出所有选区
            sel.addRange(contentRange); //添加修改后的选区
        }
    }
}

/**
 * 获取DIV文本光标位置
 * @param {*} element
 * @returns
 */
function getPosition(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != 'undefined') {
        //谷歌、火狐
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = sel.getRangeAt(0);
            var preCaretRange = range.cloneRange(); //克隆一个选区
            preCaretRange.selectNodeContents(element); //设置选区的节点内容为当前节点
            preCaretRange.setEnd(range.endContainer, range.endOffset); //重置选中区域的结束位置
            caretOffset = preCaretRange.toString().length;
        }
    } else if ((sel = doc.selection) && sel.type != 'Control') {
        //IE
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint('EndToEnd', textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}
/**
 * 在指定DIV索引位置设置光标
 * @param {*} element
 * @param {*} index
 */
function setCursor(element, index) {
    var codeEl = element.firstChild;
    var selection = window.getSelection();
    // 创建新的光标对象
    let range = selection.getRangeAt(0);
    // 光标对象的范围界定为新建的代码节点
    range.selectNodeContents(codeEl);
    // 光标位置定位在代码节点的最大长度
    // console.log(codeEl.length);
    range.setStart(codeEl, index);
    // 使光标开始和光标结束重叠
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
}

/**
 * 获得文本的占用的宽度
 * @param {*} text 字符串文班
 * @param {*} font 文本字体的样式
 * @returns
 */
function getTextWidth(text, font) {
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
    var context = canvas.getContext('2d');
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

/**
 * 触发元素的事件
 * @param {触发元素事件} type
 * @param {*} element
 * @param {*} detail
 */
function trigger(type, element) {
    var customEvent = new Event(type, { bubbles: false, cancelable: true });
    element.dispatchEvent(customEvent);
}

/**
 * 向body注入新style覆盖原本的css
 * @param {css文本字符串} csstxt
 */
function injectionCss(csstxt) {
    var styleElement = document.createElement('style');

    styleElement.innerText = t;

    document.body.appendChild(styleElement);
}

/**
 * 向指定父级创建追加一个子元素，并可选添加ID,
 * @param {Element} fatherElement
 * @param {string} addElementTxt 要创建添加的元素标签
 * @param {string} setId
 * @returns addElementObject
 */
function addinsertCreateElement(fatherElement, addElementTxt, setId = null) {
    if (!fatherElement) console.error('指定元素对象不存在！');
    if (!addElementTxt) console.error('未指定字符串！');

    var element = document.createElement(addElementTxt);

    if (setId) element.id = setId;

    fatherElement.appendChild(element);

    return element;
}

/**
 * 向指定元素后创建插入一个元素，可选添加ID
 * @param {*} targetElement 目标元素
 * @param {*} addElementTxt 要创建添加的元素标签
 * @param {*} setId 为创建元素设置ID
 */
function insertCreateAfter(targetElement, addElementTxt, setId = null) {
    if (!targetElement) console.error('指定元素对象不存在！');
    if (!addElementTxt) console.error('未指定字符串！');

    var element = document.createElement(addElementTxt);

    if (setId) element.id = setId;

    var parent = targetElement.parentNode; //得到父节点
    if (parent.lastChild === targetElement) {
        //如果最后一个子节点是当前元素那么直接添加即可
        parent.appendChild(element);
        return element;
    } else {
        parent.insertBefore(element, targetElement.nextSibling); //否则，当前节点的下一个节点之前添加
        return element;
    }
}

/**
 * 向指定元素前创建插入一个元素，可选添加ID
 * @param {*} targetElement 目标元素
 * @param {*} addElementTxt 要创建添加的元素标签
 * @param {*} setId 为创建元素设置ID
 */
function insertCreateBefore(targetElement, addElementTxt, setId = null) {
    if (!targetElement) console.error('指定元素对象不存在！');
    if (!addElementTxt) console.error('未指定字符串！');

    var element = document.createElement(addElementTxt);

    if (setId) element.id = setId;

    targetElement.parentElement.insertBefore(element, targetElement);

    return element;
}

/**
 * 为元素注册监听事件
 * @param {Element} element
 * @param {string} strType
 * @param {Fun} fun
 */
function AddEvent(element, strType, fun) {
    //判断浏览器有没有addEventListener方法
    if (element.addEventListener) {
        element.addEventListener(strType, fun, false);
        //判断浏览器有没 有attachEvent IE8的方法
    } else if (element.attachEvent) {
        element.attachEvent('on' + strType, fun);
        //如果都没有则使用 元素.事件属性这个基本方法
    } else {
        element['on' + strType] = fun;
    }
}

/**
 * 为元素解绑监听事件
 * @param {Element}  element ---注册事件元素对象
 * @param {String}   strType ---注册事件名(不加on 如"click")
 * @param {Function} fun	 ---回调函数
 *
 */
function myRemoveEvent(element, strType, fun) {
    //判断浏览器有没有addEventListener方法
    if (element.addEventListener) {
        // addEventListener方法专用删除方法
        element.removeEventListener(strType, fun, false);
        //判断浏览器有没有attachEvent IE8的方法
    } else if (element.attachEvent) {
        // attachEvent方法专用删除事件方法
        element.detachEvent('on' + strType, fun);
        //如果都没有则使用 元素.事件属性这个基本方法
    } else {
        //删除事件用null
        element['on' + strType] = null;
    }
}

/**
 * 加载脚本文件
 * @param {string} url 脚本地址
 * @param {string} type 脚本类型
 */
function loadScript(url, type = 'module') {
    let script = document.createElement('script');
    if (type) script.setAttribute('type', type);
    script.setAttribute('src', url);
    document.head.appendChild(script);
}

/**
 * 得到思源toolbar
 * @returns
 */
function getSiYuanToolbar() {
    return document.getElementById('toolbar');
}

/**
 * 得到notionToolbar
 * @returns
 */
function getnotionToolbar() {
    return document.getElementById('notionToolbar');
}

/**简单判断目前思源是否是手机模式 */
function isPhone() {
    return document.getElementById('toolbar') == null;
}

/**
 * 加载样式文件
 * @param {string} url 样式地址
 * @param {string} id 样式 ID
 */
function loadStyle(url, id, cssName) {
    var headElement = document.head;

    let style = document.getElementById(id);
    if (id != null) {
        if (style) headElement.removeChild(style);
    }

    style = document.createElement('link');
    if (id != null) style.id = id;

    style.setAttribute('type', 'text/css');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', url);
    if (cssName != null) style.setAttribute('class', cssName);
    headElement.appendChild(style);
    return style;
}

/**
 * 取出两个数组的不同元素
 * @param {*} arr1
 * @param {*} arr2
 * @returns
 */
function getArrDifference(arr1, arr2) {
    return arr1.concat(arr2).filter(function (v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
    });
}

/**
 * 取出两个数组的相同元素
 * @param {*} arr1
 * @param {*} arr2
 * @returns
 */
function getArrEqual(arr1, arr2) {
    let newArr = [];
    for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr1.length; j++) {
            if (arr1[j] === arr2[i]) {
                newArr.push(arr1[j]);
            }
        }
    }
    return newArr;
}

/**
 * 思源吭叽元素属性解析看是否包含那种行级元素类型
 * @param {} attributes
 * @param {*} attribute
 * @returns
 */
function attributesContains(attributes, attribute) {
    if (attribute == true) return;
    var arr = attributes.split(' ');
    if (arr.length != 0) {
        arr.forEach(v => {
            if (v == attribute) attribute = true;
        });
        return attribute == true ? true : false;
    } else {
        return attributes == attribute;
    }
}
/**
 * 间隔执行指定次数的函数(不立即执行)
 * @param {*} time 间隔时间s
 * @param {*} frequency 执行次数
 * @param {*} Fun 执行函数
 */
function IntervalFunTimes(time, frequency, Fun) {
    for (let i = 0; i < frequency; i++) {
        sleep(time * i).then(v => {
            Fun();
        });
    }

    function sleep(time2) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time2);
        });
    }
}

/**
 * 获得当前浏览器缩放系数 默认值为1
 * @returns
 */
function detectZoom() {
    var ratio = 0,
        screen = window.screen,
        ua = navigator.userAgent.toLowerCase();
    if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    } else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
    } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
    }
    if (ratio) {
        ratio = Math.round(ratio * 100);
    }
    return ratio * 0.01;
}
/**
 * 递归DOM元素查找深度子级的一批符合条件的元素返回数组
 * @param {*} element 要查找DOM元素
 * @param {*} judgeFun 查找函数 : fun(v) return true or false
 * @returns array
 */
function diguiTooALL(element, judgeFun) {
    var target = [];

    if (element == null) return null;
    if (judgeFun == null) return null;

    digui(element);
    return target;

    function digui(elem) {
        var child = elem.children;
        if (child.length == 0) return;

        for (let index = 0; index < child.length; index++) {
            const element2 = child[index];
            if (judgeFun(element2)) {
                target.push(element2);
                digui(element2);
            } else {
                digui(element2);
            }
        }
    }
}

/**
 * 递归DOM元素查找深度子级的第一个符合条件的元素 - 子级的子级深度搜索赶紧后在搜索下一个子级
 * @param {*} element 要查找DOM元素
 * @param {*} judgeFun 查找函数: fun(v) return true or false
 * @returns element
 */
function diguiTooONE_1(element, judgeFun, xianz = 999) {
    if (element == null) return null;
    if (judgeFun == null) return null;
    var i = xianz <= 0 ? 10 : xianz;

    return digui(element);

    function digui(elem) {
        if (i <= 0) return null;
        i--;

        var child = elem.children;
        if (child.length == 0) return null;

        for (let index = 0; index < child.length; index++) {
            const element2 = child[index];
            if (judgeFun(element2)) {
                return element2;
            } else {
                var item = digui(element2);
                if (item == null) continue;
                return item;
            }
        }
        return null;
    }
}

/**
 * 递归DOM元素查找深度子级的第一个符合条件的元素-同层全部筛选一遍在依次深度搜索。
 * @param {*} element 要查找DOM元素
 * @param {*} judgeFun 查找函数 : fun(v) return true or false
 * @param {*} xianz 限制递归最大次数
 * @returns element
 */
function diguiTooONE_2(element, judgeFun, xianz = 999) {
    if (element == null || element.firstElementChild == null) return null;
    if (judgeFun == null) return null;
    var i = xianz <= 0 ? 10 : xianz;
    return digui(element);

    function digui(elem) {
        if (i <= 0) return null;
        i--;

        var child = elem.children;
        var newchild = [];
        for (let index = 0; index < child.length; index++) {
            const element2 = child[index];
            if (judgeFun(element2)) {
                return element2;
            } else {
                if (newchild.firstElementChild != null) newchild.push(element2);
            }
        }

        for (let index = 0; index < newchild.length; index++) {
            const element2 = newchild[index];
            var item = digui(element2);
            if (item == null) continue;
            return item;
        }
        return null;
    }
}
/**
 * 不断查找元素父级的父级知道这个父级符合条件函数
 * @param {*} element 起始元素
 * @param {*} judgeFun 条件函数
 * @param {*} upTimes 限制向上查找父级次数
 * @returns 返回符合条件的父级，或null
 */
function isFatherFather(element, judgeFun, upTimes) {
    var i = 0;
    for (;;) {
        if (!element) return null;
        if (upTimes < 1 || i >= upTimes) return null;
        if (judgeFun(element)) return element;
        element = element.parentElement;
        i++;
    }
}

/**
 * 获得焦点所在的块
 * @return {HTMLElement} 光标所在块
 * @return {null} 光标不在块内
 */
function getFocusedBlock() {
    let block =
        window.getSelection() &&
        window.getSelection().focusNode &&
        window.getSelection().focusNode.parentElement; // 当前光标
    while (block != null && block.dataset.nodeId == null) block = block.parentElement;
    return block;
}

/**
 * 获得指定块位于的编辑区
 * @params {HTMLElement}
 * @return {HTMLElement} 光标所在块位于的编辑区
 * @return {null} 光标不在块内
 */
function getTargetEditor(block) {
    while (block != null && !block.classList.contains('protyle-content'))
        block = block.parentElement;
    return block;
}

/**
 * 清除选中文本
 */
function clearSelections() {
    if (window.getSelection) {
        var selection = window.getSelection();
        selection.removeAllRanges();
    } else if (document.selection && document.selection.empty) {
        document.selection.empty();
    }
}

/**
 * body全局事件频率优化执行
 * @param {*} eventStr 那种事件如 "mouseover"
 * @param {*} fun(e) 执行函数,e：事件对象
 * @param {*} accurate 精确度：每隔多少毫秒检测一次触发事件执行
 * @param {*} delay 检测到事件触发后延时执行的ms
 * @param {*} frequency 执行后再延时重复执行几次
 * @param {*} frequencydelay 执行后再延时重复执行之间的延时时间ms
 */
function BodyEventRunFun(
    eventStr,
    fun,
    accurate = 100,
    delay = 0,
    frequency = 1,
    frequencydelay = 16
) {
    var isMove = true;
    var _e = null;
    AddEvent(document.body, eventStr, e => {
        isMove = true;
        _e = e;
    });
    setInterval(() => {
        if (!isMove) return;
        isMove = false;
        setTimeout(() => {
            fun(_e);
            if (frequency == 1) return;
            if (frequencydelay < 16) frequencydelay = 16;

            var _frequencydelay = frequencydelay;
            for (let index = 0; index < frequency; index++) {
                setTimeout(() => {
                    fun(_e);
                }, frequencydelay);
                frequencydelay += _frequencydelay;
            }
        }, delay);
    }, accurate);
}

/**
 * 为元素添加思源悬浮打开指定ID块内容悬浮窗事件
 * @param {*} element 绑定的元素
 * @param {*} id 悬浮窗内打开的块的ID
 */
function suspensionToOpenSiyuanSuspensionWindow(element, id) {
    element.setAttribute('data-defids', '[""]');
    element.classList.add('popover__block');
    element.setAttribute('data-id', id);
}

/**
 * 为元素添加思源点击打开指定ID块内容悬浮窗事件
 * @param {*} element 绑定的元素
 * @param {*} id 悬浮窗内打开的块的ID
 */
function clickToOpenSiyuanFloatingWindow(element, id) {
    element.classList.add('protyle-wysiwyg__embed');
    element.setAttribute('data-id', id);
}

/**
 * 控制台打印输出
 * @param {*} obj
 */
function c(...data) {
    console.log(data);
}

/**
 * 安全While循环
 * frequency:限制循环次数
 * 返回值不等于null终止循环
 */
function WhileSafety(fun, frequency = 99999) {
    var i = 0;
    if (frequency <= 0) {
        console.log('安全循环次数小于等于0');
        return;
    }
    while (i < frequency) {
        var _return = fun();
        if (_return != null || _return != undefined) return _return;
        i++;
    }
}





/*创建HBuiderX主题工具栏区域*/
function createHBuiderXToolbar() {
    siYuanToolbar = getSiYuanToolbar();

    HBuiderXToolbar = getHBuiderXToolbar();
    var windowControls = document.getElementById('barMode');

    if (HBuiderXToolbar) siYuanToolbar.removeChild(HBuiderXToolbar);
    HBuiderXToolbar = insertCreateAfter(windowControls, 'div', HBuiderXToolbarID);
}


/**------------------边栏鼠标悬浮展开按钮-----------------*/
/*创建边栏鼠标悬浮展开按钮*/
function createSidebarMouseHoverExpandButton() {
    sidebarHoverButton = addinsertCreateElement(HBuiderXToolbar, 'div', SidebarHoverButtonID);
    sidebarHoverButton.setAttribute('title', '开启后左右面板自动关闭。');
    addSidebarHoverButtonEven(sidebarHoverButtonImplementEven); /*为此按钮注册点击事件 */
}

/*SidebarHoverButton按钮添加监听事件*/
function addSidebarHoverButtonEven(fun) {
    AddEvent(sidebarHoverButton, 'mousedown', fun);
}

/*SidebarHoverButton 按钮点击后执行事件*/
function sidebarHoverButtonImplementEven() {
    hx_loadStyle('/appearance/themes/Tsundoku/style/topbar.css', 'topbarCss');

    /**获取区域主体 */
    var column = document.querySelectorAll('#layouts>div.fn__flex.fn__flex-1')[0];

    /**左区域 */
    if (!left_fn__flex_column) left_fn__flex_column = column.firstElementChild;
    /**右区域 */
    if (!right_fn__flex_column) right_fn__flex_column = column.lastElementChild;

    sidebarHoverButton.onclick = function () {
        if (flag) {
            if (!LeftHoverBlock) createHoverBlock();

            if (
                '0px' != left_fn__flex_column.style.width &&
                '0px' != right_fn__flex_column.style.width
            ) {
                closeLeftPanel();
                closeRightPanel();
                bar = '11';
            } else if (
                '0px' != left_fn__flex_column.style.width &&
                '0px' == right_fn__flex_column.style.width
            ) {
                closeLeftPanel();
                bar = '10';
            } else if (
                '0px' == left_fn__flex_column.style.width &&
                '0px' != right_fn__flex_column.style.width
            ) {
                closeRightPanel();
                bar = '01';
            } else {
                bar = '00';
            }

            sidebarHoverButton.classList.add('active');
            flag = false;
            sidebarHoverButton.style.backgroundColor = 'var(--b3-theme-background-light)';
            sidebarHoverButton.style.backgroundImage =
                'url(/appearance/themes/Tsundoku/src/sidebar.svg)';
            // console.log(flag);
        } else {
            if (bar == '11') {
                openLeftPanel();
                openRightPanel();
            } else if (bar == '10') {
                openLeftPanel();
            } else if (bar == '01') {
                openRightPanel();
            }

            HBuiderXToolbar.removeChild(LeftHoverBlock);
            HBuiderXToolbar.removeChild(RightHoverBlock);

            LeftHoverBlock = null;
            RightHoverBlock = null;
            sidebarHoverButton.classList.remove('active');
            flag = true;
            sidebarHoverButton.style.backgroundColor = 'transparent';
            sidebarHoverButton.style.backgroundImage =
                'url(/appearance/themes/Tsundoku/src/sidebar.svg)';
            // console.log(flag);
        }
    };
}

/*在左右面板打开鼠标触发块*/
function createHoverBlock() {
    LeftHoverBlock = addinsertCreateElement(HBuiderXToolbar, 'div', 'LeftHoverBlock');
    LeftHoverBlock.setAttribute('display', 'block');

    RightHoverBlock = addinsertCreateElement(HBuiderXToolbar, 'div', 'RightHoverBlock');
    RightHoverBlock.setAttribute('display', 'block');
}

/*左面板关闭*/
function closeLeftPanel() {
    if ('0px' != left_fn__flex_column.style.width) {
        left_fn__flex_column_Width_Str = left_fn__flex_column.style.width;
        left_fn__flex_column.style.width = '0px';
        left_fn__flex_column.style.position = 'fixed';
        left_fn__flex_column.style.zIndex = '-11';

        /*解绑触发块鼠标进入，面板关闭事件 */
        myRemoveEvent(LeftHoverBlock, 'mouseover', closeLeftPanel);
        /*注册触发块鼠标进入，面板打开事件 */
        AddEvent(LeftHoverBlock, 'mouseover', openLeftPanel);

        /*移动触发块位置，等待触发面板打开 */
        LeftHoverBlock.style.width = '12px';
        LeftHoverBlock.style.left = '0px';
        LeftHoverBlock.style.right = 'auto';
        LeftHoverBlock.style.height = '100%';

        if (right_fn__flex_column.style.width == '0px') {
            RightHoverBlock.style.right = '0px';
            RightHoverBlock.style.left = 'auto';
        } else {
            RightHoverBlock.style.left = '0px';
        }
    }
}

/*左面板展开*/
function openLeftPanel() {
    if ('0px' != left_fn__flex_column_Width_Str) {
        left_fn__flex_column.style.width = left_fn__flex_column_Width_Str;
        left_fn__flex_column.style.position = 'static';
        left_fn__flex_column.style.zIndex = '2';

        /*解绑触发块鼠标进入，面板打开事件 */
        myRemoveEvent(LeftHoverBlock, 'mouseover', openLeftPanel);
        /*注册触发块鼠标进入，面板关闭事件 */
        AddEvent(LeftHoverBlock, 'mouseover', closeLeftPanel);

        /*移动触发块位置，等待触发面板关闭 */
        LeftHoverBlock.style.width = '400px';
        LeftHoverBlock.style.left = 'auto';
        LeftHoverBlock.style.right = parseFloat(right_fn__flex_column.style.width) + 25 + 'px';
        LeftHoverBlock.style.height = '200px';

        if (right_fn__flex_column.style.width != '0px') {
            RightHoverBlock.style.left = parseFloat(left_fn__flex_column_Width_Str) + 25 + 'px';
        }
    }
}

/*右面板关闭*/
function closeRightPanel() {
    if ('0px' != right_fn__flex_column.style.width) {
        right_fn__flex_column_Width_Str = right_fn__flex_column.style.width;
        right_fn__flex_column.style.width = '0px';
        right_fn__flex_column.style.position = 'fixed';
        right_fn__flex_column.style.zIndex = '-11';

        /*解绑触发块鼠标进入，面板关闭事件 */
        myRemoveEvent(RightHoverBlock, 'mouseover', closeRightPanel);
        /*注册触发块鼠标进入，面板打开事件 */
        AddEvent(RightHoverBlock, 'mouseover', openRightPanel);

        /*移动触发块位置，等待触发面板打开 */
        RightHoverBlock.style.width = '12px';
        RightHoverBlock.style.height = '100%';
        RightHoverBlock.style.right = '0px';
        RightHoverBlock.style.left = 'auto';

        if (left_fn__flex_column.style.width == '0px') {
            LeftHoverBlock.style.left = '0px';
            LeftHoverBlock.style.right = 'auto';
        } else {
            LeftHoverBlock.style.right = '0px';
        }
    }
}

/*右面板展开*/
function openRightPanel() {
    if ('0px' != right_fn__flex_column_Width_Str) {
        right_fn__flex_column.style.width = right_fn__flex_column_Width_Str;
        right_fn__flex_column.style.position = 'static';
        right_fn__flex_column.style.zIndex = '0';

        /*解绑触发块鼠标进入，面板打开事件 */
        myRemoveEvent(RightHoverBlock, 'mouseover', openRightPanel);
        /*注册触发块鼠标进入，面板关闭事件 */
        AddEvent(RightHoverBlock, 'mouseover', closeRightPanel);

        /*移动触发块位置，等待触发面板关闭 */
        RightHoverBlock.style.width = '400px';
        RightHoverBlock.style.right = 'auto';
        RightHoverBlock.style.left = parseFloat(left_fn__flex_column.style.width) + 25 + 'px';
        RightHoverBlock.style.height = '200px';

        if (left_fn__flex_column.style.width != '0px') {
            LeftHoverBlock.style.right = parseFloat(right_fn__flex_column_Width_Str) + 25 + 'px';
        }
    }
}

/**------------------高亮变隐藏按钮-----------------*/

function createHighlightBecomesHidden() {
    hx_loadStyle('/appearance/themes/Tsundoku/style/mark-display.css', 'markCss');

    highlightBecomesHiddenButton = addinsertCreateElement(
        HBuiderXToolbar,
        'div',
        HighlightBecomesHiddenID
    );
    highlightBecomesHiddenButton.setAttribute('title', '开启后隐藏高亮文本');

    AddEvent(
        highlightBecomesHiddenButton,
        'mousedown',
        highlightBecomesHiddenButtonClickEven
    ); /*为此按钮注册点击事件 */
}

/*切换mark标签外部css样式,以达到高亮变隐藏的效果 */
function highlightBecomesHiddenButtonClickEven() {
    var obj = document.getElementById('markCss');

    if (obj.getAttribute('href') != '/appearance/themes/Tsundoku/style/mark-display.css') {
        obj.setAttribute('href', '/appearance/themes/Tsundoku/style/mark-display.css');
        highlightBecomesHiddenButton.style.backgroundColor = 'transparent';
        highlightBecomesHiddenButton.style.backgroundImage =
            'url(/appearance/themes/Tsundoku/src/highlight.svg)';
    } else {
        obj.setAttribute('href', '/appearance/themes/Tsundoku/style/mark-hide.css');
        highlightBecomesHiddenButton.style.backgroundColor = 'var(--b3-theme-background-light)';
        highlightBecomesHiddenButton.style.backgroundImage =
            'url(/appearance/themes/Tsundoku/src/highlight.svg)';
    }
}

//  api
/**
 * 向body注入新style覆盖原本的css
 * @param {css文本字符串} csstxt
 */
function injectionCss(csstxt) {
    var styleElement = document.createElement('style');
    styleElement.innerText = t;
    document.body.appendChild(styleElement);
}

/**
 * 向指定父级创建追加一个子元素，并可选添加ID,
 * @param {Element} fatherElement
 * @param {string} addElementTxt 要创建添加的元素标签
 * @param {string} setId
 * @returns addElementObject
 */
function addinsertCreateElement(fatherElement, addElementTxt, setId = null) {
    if (!fatherElement) console.error('指定元素对象不存在！');
    if (!addElementTxt) console.error('未指定字符串！');

    var element = document.createElement(addElementTxt);

    if (setId) element.id = setId;

    fatherElement.appendChild(element);

    return element;
}

/**
 * 向指定元素后创建插入一个元素，可选添加ID
 * @param {*} targetElement 目标元素
 * @param {*} addElementTxt 要创建添加的元素标签
 * @param {*} setId 为创建元素设置ID
 */
function insertCreateAfter(targetElement, addElementTxt, setId = null) {
    if (!targetElement) console.error('指定元素对象不存在！');
    if (!addElementTxt) console.error('未指定字符串！');

    var element = document.createElement(addElementTxt);

    if (setId) element.id = setId;

    var parent = targetElement.parentNode; //得到父节点
    if (parent.lastChild === targetElement) {
        //如果最后一个子节点是当前元素那么直接添加即可
        parent.appendChild(element);

        return element;
    } else {
        parent.insertBefore(element, targetElement.nextSibling); //否则，当前节点的下一个节点之前添加

        return element;
    }
}

/**
 * 向指定元素前创建插入一个元素，可选添加ID
 * @param {*} targetElement 目标元素
 * @param {*} addElementTxt 要创建添加的元素标签
 * @param {*} setId 为创建元素设置ID
 */
function insertCreateBefore(targetElement, addElementTxt, setId = null) {
    if (!targetElement) console.error('指定元素对象不存在！');
    if (!addElementTxt) console.error('未指定字符串！');

    var element = document.createElement(addElementTxt);

    if (setId) element.id = setId;

    targetElement.parentElement.insertBefore(element, targetElement);

    return element;
}

/**
 * 为元素注册监听事件
 * @param {Element} element
 * @param {string} strType
 * @param {Fun} fun
 */
function AddEvent(element, strType, fun) {
    //判断浏览器有没有addEventListener方法
    if (element.addEventListener) {
        element.addEventListener(strType, fun, false);
        //判断浏览器有没 有attachEvent IE8的方法
    } else if (element.attachEvent) {
        element.attachEvent('on' + strType, fun);
        //如果都没有则使用 元素.事件属性这个基本方法
    } else {
        element['on' + strType] = fun;
    }
}

/**
 * 为元素解绑监听事件
 * @param {Element}  element ---注册事件元素对象
 * @param {String}   strType ---注册事件名(不加on 如"click")
 * @param {Function} fun	 ---回调函数
 *
 */
function myRemoveEvent(element, strType, fun) {
    //判断浏览器有没有addEventListener方法
    if (element.addEventListener) {
        // addEventListener方法专用删除方法
        element.removeEventListener(strType, fun, false);
        //判断浏览器有没有attachEvent IE8的方法
    } else if (element.attachEvent) {
        // attachEvent方法专用删除事件方法
        element.detachEvent('on' + strType, fun);
        //如果都没有则使用 元素.事件属性这个基本方法
    } else {
        //删除事件用null
        element['on' + strType] = null;
    }
}

/**
 * 加载脚本文件
 * @param {string} url 脚本地址
 * @param {string} type 脚本类型
 */
function loadScript(url, type = 'module') {
    let script = document.createElement('script');
    if (type) script.setAttribute('type', type);
    script.setAttribute('src', url);
    document.head.appendChild(script);
}

/**
 * 得到思源toolbar
 * @returns
 */
function getSiYuanToolbar() {
    return document.getElementById(SiYuanToolbarID);
}

/**
 * 得到HBuiderXToolbar
 * @returns
 */
function getHBuiderXToolbar() {
    return document.getElementById(HBuiderXToolbarID);
}

/**简单判断目前思源是否是手机模式 */
function isPhone() {
    if (document.getElementById(SiYuanToolbarID) == null) {
        return true;
    }
    return false;
}

/**
 * 加载样式文件
 * @param {string} url 样式地址
 * @param {string} id 样式 ID
 */
function hx_loadStyle(url, id) {
    var headElement = document.head;

    if (!id) console.error('未指定外部css文件引入ID');

    let style = document.getElementById(id);
    if (style) headElement.removeChild(style);

    style = document.createElement('link');

    style.id = id;
    style.setAttribute('type', 'text/css');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', url);
    headElement.appendChild(style);
}

/**
 *
 * @param {*} 内容块id
 * @param {*} 属性对象
 * @returns
 */
async function 设置思源块属性(内容块id, 属性对象) {
    let url = '/api/attr/setBlockAttrs';
    return 解析响应体(
        向思源请求数据(url, {
            id: 内容块id,
            attrs: 属性对象,
        })
    );
}
/**
 *
 * @param {*} url
 * @param {*} data
 * @returns
 */
async function 向思源请求数据(url, data) {
    let resData = null;
    await fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            Authorization: `Token ''`,
        },
    }).then(function (response) {
        resData = response.json();
    });
    return resData;
}
/**
 *
 * @param {*} response
 * @returns
 */
async function 解析响应体(response) {
    let r = await response;
    return r.code === 0 ? r.data : null;
}

/****各种列表转xx的UI****/
function ViewSelect(selectid, selecttype) {
    let button = document.createElement('button');
    button.id = 'viewselect';
    button.className = 'b3-menu__item';
    button.innerHTML =
        '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconGlobalGraph"></use></svg><span class="b3-menu__label" style="">视图选择</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="null"><use xlink:href="#iconRight"></use></svg></button>';
    button.appendChild(SubMenu(selectid, selecttype));
    return button;
}

function SubMenu(selectid, selecttype, className = 'b3-menu__submenu') {
    let node = document.createElement('div');
    node.className = className;
    if (selecttype == 'NodeList') {
        node.appendChild(GraphView(selectid));
        node.appendChild(TableView(selectid));
        node.appendChild(kanbanView(selectid));
        node.appendChild(DefaultView(selectid));
    }
    if (selecttype == 'NodeTable') {
        node.appendChild(FixWidth(selectid));
        node.appendChild(AutoWidth(selectid));
        node.appendChild(Removeth(selectid));
        node.appendChild(Defaultth(selectid));
    }
    return node;
}

function GraphView(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'f');
    button.setAttribute('custom-attr-value', 'dt');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFiles"></use></svg><span class="b3-menu__label">转换为导图</span>`;
    button.onclick = ViewMonitor;
    return button;
}
function TableView(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'f');
    button.setAttribute('custom-attr-value', 'bg');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">转换为表格</span>`;
    button.onclick = ViewMonitor;
    return button;
}
function kanbanView(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'f');
    button.setAttribute('custom-attr-value', 'kb');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconMenu"></use></svg><span class="b3-menu__label">转换为看板</span>`;
    button.onclick = ViewMonitor;
    return button;
}
function DefaultView(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.onclick = ViewMonitor;
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'f');
    button.setAttribute('custom-attr-value', '');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconList"></use></svg><span class="b3-menu__label">恢复为列表</span>`;
    return button;
}
function FixWidth(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.onclick = ViewMonitor;
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'f');
    button.setAttribute('custom-attr-value', '');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">默认宽度</span>`;
    return button;
}
function AutoWidth(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'f');
    button.setAttribute('custom-attr-value', 'full');
    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">页面宽度</span>`;
    button.onclick = ViewMonitor;
    return button;
}
function Removeth(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.onclick = ViewMonitor;
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 't');
    button.setAttribute('custom-attr-value', 'biaotou');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">取消表头</span>`;
    return button;
}
function Defaultth(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 't');
    button.setAttribute('custom-attr-value', '');
    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">默认表头</span>`;
    button.onclick = ViewMonitor;
    return button;
}
function MenuSeparator(className = 'b3-menu__separator') {
    let node = document.createElement('button');
    node.className = className;
    return node;
}

/* 操作 */

/**
 * 获得所选择的块对应的块 ID
 * @returns {string} 块 ID
 * @returns {
 *     id: string, // 块 ID
 *     type: string, // 块类型
 *     subtype: string, // 块子类型(若没有则为 null)
 * }
 * @returns {null} 没有找到块 ID */
function getBlockSelected() {
    let node_list = document.querySelectorAll('.protyle-wysiwyg--select');
    if (node_list.length === 1 && node_list[0].dataset.nodeId != null)
        return {
            id: node_list[0].dataset.nodeId,
            type: node_list[0].dataset.type,
            subtype: node_list[0].dataset.subtype,
        };
    return null;
}

function ClickMonitor() {
    window.addEventListener('mouseup', MenuShow);
}

function MenuShow() {
    setTimeout(() => {
        let selectinfo = getBlockSelected();
        if (selectinfo) {
            let selecttype = selectinfo.type;
            let selectid = selectinfo.id;
            if (selecttype == 'NodeList' || selecttype == 'NodeTable') {
                setTimeout(() => InsertMenuItem(selectid, selecttype), 0);
            }
        }
    }, 0);
}

function InsertMenuItem(selectid, selecttype) {
    let commonMenu = document.getElementById('commonMenu');
    let readonly = commonMenu.querySelector('.b3-menu__item--readonly');
    let selectview = commonMenu.querySelector('[id="viewselect"]');
    if (readonly) {
        if (!selectview) {
            commonMenu.insertBefore(ViewSelect(selectid, selecttype), readonly);
            commonMenu.insertBefore(MenuSeparator(), readonly);
        }
    }
}

function ViewMonitor(event) {
    let id = event.currentTarget.getAttribute('data-node-id');
    let attrName = 'custom-' + event.currentTarget.getAttribute('custom-attr-name');
    let attrValue = event.currentTarget.getAttribute('custom-attr-value');
    let blocks = document.querySelectorAll(`.protyle-wysiwyg [data-node-id="${id}"]`);
    if (blocks) {
        blocks.forEach(block => block.setAttribute(attrName, attrValue));
    }
    let attrs = {};
    attrs[attrName] = attrValue;
    设置思源块属性(id, attrs);
}






/**++++++++++++++++++++++++++++++++主题功能执行：按需调用++++++++++++++++++++++++++++++ */
获取文件('/data/snippets/Tsundoku.config.json', v => {
    let funs = () => {
        setTimeout(() => {
            // UFDXD/HBuilderX-Light：https://github.com/UFDXD/HBuilderX-Light
            createHBuiderXToolbar(); /*创建HBuiderXToolbar*/
            createSidebarMouseHoverExpandButton(); /*创建鼠标移动展开左右树面板按钮*/
            createHighlightBecomesHidden(); /*创建高亮变隐藏按钮 */

            //  HowcanoeWang/calendar： https://github.com/HowcanoeWang/calendar
            initcalendar(); /*创建日历按钮 */
            loadStyle('/appearance/themes/Tsundoku/style/topbar.css', 'topbarCss');

            //  royc01/notion-theme： https://github.com/royc01/notion-theme
            themeButton(); //主题
            setTimeout(() => ClickMonitor(), 3000); //各种列表转xx

            console.log('==============>附加CSS和特性JS_已经执行<==============');
        }, 1000);
    };
    if (v == null) {
        window.theme.config = { Tsundoku: 1 };
        写入文件(
            '/data/snippets/Tsundoku.config.json',
            JSON.stringify(window.theme.config, undefined, 4),
            a => {
                funs();
            }
        );
    } else {
        window.theme.config = v;
        funs();
    }
});


const config = {
    theme: {
        regs: {
            // 正则表达式
            fontsize:
                /(?<=\.b3-typography|protyle-wysiwyg|protyle-title\s*\{\s*font-size\s*:\s*)(\d+)(?=px(?:\s+\!important)?(?:\s*;|\}))/,
        },
        wheel: {
            enable: true, // 滚轮功能开关
            zoom: {
                enable: true, // 滚轮缩放功能开关
                threshold: 100, // 滚轮缩放阈值
                min: 9, // 最小字号(px)
                max: 72, // 最大字号(px)
            },
        },
        hotkeys: {
            wheel: {
                zoom: {
                    // 鼠标滚轮缩放(Ctrl + wheel)
                    enable: true,
                    CtrlCmd: true,
                    WinCtrl: false,
                    Shift: false,
                    Alt: false,
                    type: 'mousewheel',
                },
            },
        },
    },
};



/* 加载 Dark+ 主题功能 */
window.theme.loadScript(
    '/appearance/themes/Tsundoku/script/module/html.js',
    'text/javascript'
);

window.theme.loadScript('/appearance/themes/Tsundoku/script/module/window.js');
window.theme.loadScript('/appearance/themes/Tsundoku/script/module/doc.js');
window.theme.loadScript(
    window.theme.addURLParam('/appearance/themes/Tsundoku/script/module/goto.js'),
    undefined,
    true
);
window.theme.loadScript(
    window.theme.addURLParam('/appearance/themes/Tsundoku/script/module/menu.js'),
    undefined,
    true
);
