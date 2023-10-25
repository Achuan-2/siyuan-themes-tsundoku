window.theme = {
    element: {
        themeScript: document.getElementById('themeScript') ?? document.currentScript,
    },
};

/* 颜色配置文件列表 */
window.theme.lightColors = ['style/theme/Tsundoku_light.css', 'style/theme/Tsundoku_green.css'];
window.theme.darkColors = ['style/theme/Tsundoku_dark.css'];

/* DOM 节点 ID */
window.theme.IDs = {
    STYLE_COLOR: 'custom-id-style-theme-color',
    BUTTON_TOOLBAR_CHANGE_COLOR: 'custom-id-button-toolbar-change-color',
    LOCAL_STORAGE_COLOR_HREF: 'tsundoku-color-href',
};

/* 循环迭代器 */
window.theme.Iterator = function* (items) {
    // REF [ES6中的迭代器(Iterator)和生成器(Generator) - 小火柴的蓝色理想 - 博客园](https://www.cnblogs.com/xiaohuochai/p/7253466.html)
    for (let i = 0; true; i = (i + 1) % items.length) {
        yield items[i];
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
        // t: Date.now().toString(),
        v: window.siyuan.config.appearance.themeVer,
    }
) {
    let new_url;
    switch (true) {
        case url.startsWith('//'):
            new_url = new URL(`https:${url}`);
            break;
        case url.startsWith('http://'):
        case url.startsWith('https://'):
            new_url = new URL(url);
            break;
        case url.startsWith('/'):
            new_url = new URL(url, window.location.origin);
            break;
        default:
            new_url = new URL(url, window.location.origin + window.location.pathname);
            break;
    }
    for (let [key, value] of Object.entries(param)) {
        new_url.searchParams.set(key, value);
    }
    switch (true) {
        case url.startsWith('//'):
            return new_url.href.substring(new_url.protocol.length);
        case url.startsWith('http://'):
        case url.startsWith('https://'):
            return new_url.href;
        case url.startsWith('/'):
            return new_url.href.substring(new_url.origin.length);
        default:
            return new_url.href.substring(
                (window.location.origin + window.location.pathname).length
            );
    }
};

/**
 * 加载 meta 标签
 * @params {object} attributes 属性键值对
 * @params {string} position 节点插入位置
 * @params {HTMLElementNode} element 节点插入锚点
 */
window.theme.loadMeta = function (attributes, position = 'afterbegin', element = document.head) {
    let meta = document.createElement('meta');
    for (let [key, value] of Object.entries(attributes)) {
        meta.setAttribute(key, value);
    }
    // document.head.insertBefore(meta, document.head.firstChild);
    // [Element.insertAdjacentElement() - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentElement)
    element.insertAdjacentElement(position, meta);
};

/**
 * 加载脚本文件
 * @params {string} url 脚本地址
 * @params {string} type 脚本类型
 * @params {boolean} async 是否异步加载 & 非阻塞运行
 * @params {boolean} defer 是否异步加载 & 阻塞运行
 * @params {string} position 节点插入位置
 * @params {HTMLElementNode} element 节点插入锚点
 */
window.theme.loadScript = function (
    src,
    type = 'module',
    async = false,
    defer = false,
    position = 'beforebegin',
    element = window.theme.element.themeScript
) {
    const script = document.createElement('script');
    if (type) script.type = type;
    if (async) script.async = true;
    if (defer) script.defer = true;
    script.src = src;
    // document.head.appendChild(script);
    element.insertAdjacentElement(position, script);
};

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

function create_theme_button() {

    // light 主题下更新样式：为了新建窗口也能自动加载样式
    const drag = document.getElementById('drag'); // 标题栏
    const themeStyle = document.getElementById('themeStyle'); // 当前主题引用路径
    if (themeStyle) {
        const THEME_ROOT = new URL(themeStyle.href).pathname.replace('theme.css', ''); // 当前主题根目录
        const colors_href = [];

        // window.theme.themeMode 如果是dark就不要创建按钮了，直接用dark主题
        if (window.theme.themeMode === 'dark') {
            const color = window.theme.darkColors[0];
            window.theme.updateStyle(window.theme.IDs.STYLE_COLOR, `${THEME_ROOT}${color}`);
            return;
        }
        
        /* 通过颜色配置文件列表生成完整 URL 路径 */
        window.theme.lightColors.forEach(color => colors_href.push(`${THEME_ROOT}${color}`));
        window.theme.iter = window.theme.Iterator(colors_href);
        var color_href = window.siyuan?.storage[window.theme.IDs.LOCAL_STORAGE_COLOR_HREF];
        if (!color_href) {
            localStorage.getItem(window.theme.IDs.LOCAL_STORAGE_COLOR_HREF);
        }
        if (color_href) {
            // 将迭代器调整为当前配色
            for (let i = 0; i < window.theme.lightColors.length; ++i) {
                if (window.theme.iter.next().value === color_href) break;
            }
        } else {
            // 迭代器第一个为当前配色
            color_href = window.theme.iter.next().value;
            localStorage.setItem(window.theme.IDs.LOCAL_STORAGE_COLOR_HREF, color_href);
            setLocalStorageVal(window.theme.IDs.LOCAL_STORAGE_COLOR_HREF, color_href);
        }

        /* 加载配色文件 */
        window.theme.updateStyle(window.theme.IDs.STYLE_COLOR, color_href);
    }
    if (drag && themeStyle) {
        const button_change_color = document.createElement('button'); // 切换主题颜色按钮
        button_change_color.id = window.theme.IDs.BUTTON_TOOLBAR_CHANGE_COLOR;
        button_change_color.className = 'toolbar__item ariaLabel';
        button_change_color.ariaLabel = '切换主题颜色';
        button_change_color.innerHTML = `<svg><use xlink:href="#iconTheme"></use></svg>`;
        button_change_color.addEventListener('click', e => {
            color_href = window.theme.iter.next().value;
            localStorage.setItem(window.theme.IDs.LOCAL_STORAGE_COLOR_HREF, color_href);
            setLocalStorageVal(window.theme.IDs.LOCAL_STORAGE_COLOR_HREF, color_href);
            window.theme.updateStyle(window.theme.IDs.STYLE_COLOR, color_href);
        });
        // REF [JS DOM 编程复习笔记 -- insertAdjacentHTML（九） - 知乎](https://zhuanlan.zhihu.com/p/425616377)
        drag.insertAdjacentElement('afterend', button_change_color);
    }
}
setTimeout(() => {}, 0);

/**
 * 发送API请求
 * @param {*} data
 * @param {*} url
 * @returns
 */
async function postRequest(data, url) {
    let result;
    await fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            Authorization: 'Token ',
            'Content-Type': 'application/json',
        },
    }).then(response => {
        result = response.json();
    });
    return result;
}
/**
 * 设置LocalStorage
 * @param {*} ikey
 * @param {*} ival
 */
async function setLocalStorageVal(ikey, ival) {
    let url = '/api/storage/setLocalStorageVal';
    let response = await postRequest({ app: getAppId(), key: ikey, val: ival }, url);
    if (window.top.siyuan.storage != undefined) {
        window.top.siyuan.storage[ikey] = ival;
    }
    function getAppId() {
        let wsurl = window.top.siyuan.ws.ws.url;
        let appIdMatchResult = wsurl.match(new RegExp(`(\\?app=|&app=)[^&]+`, 'g'));
        if (appIdMatchResult.length == 1) {
            return appIdMatchResult[0].substring(5);
        } else if (appIdMatchResult.length > 1) {
            console.warn('正则获取appId错误', appIdMatchResult);
            return appIdMatchResult[0].substring(5);
        } else {
            console.error('正则获取appId错误', appIdMatchResult);
            return '';
        }
    }
}

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
 * 获取窗口宽高模式
 * @return {string} landscape 或 portrait
 */
window.theme.orientation = () => {
    /* 根据浏览器主题判断颜色模式 */
    switch (true) {
        case window.matchMedia('(orientation: landscape)').matches:
            /* 宽 > 高 */
            return 'landscape';
        case window.matchMedia('(orientation: portrait)').matches:
            /* 高 > 宽 */
            return 'portrait';
        default:
            return null;
    }
};

/**
 * 获取客户端模式
 * @return {string} 'app' 或 'desktop' 或 'mobile'
 */
window.theme.clientMode = (() => {
    const url = new URL(window.location.href);
    switch (true) {
        case url.pathname.startsWith('/stage/build/app/window.html'):
            return 'window';
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
window.theme.languageMode = window.siyuan.config.lang;

/**
 * 获取思源版本号
 * @return {string} 思源版本号
 */
window.theme.kernelVersion = window.siyuan.config.system.kernelVersion;

/**
 * 获取操作系统
 */
window.theme.OS = window.siyuan.config.system.os;

/**
 * 获得主题根目录
 */
window.theme.root = (() => {
    const src = document.currentScript.getAttribute('src');
    return src.substring(0, src.lastIndexOf('/'));
})();

/**
 * 获取一个 Lute 对象
 * @return {Lute} Lute 对象
 */
window.theme.lute = window.Lute.New();

/*HBuiderX主题功能*/
const HBuiderXToolbarID = 'HBuiderXToolbar';
const SiYuanToolbarID = 'toolbar';

const SidebarHoverButtonID = 'sidebarHoverButton';
const HighlightBecomesHiddenID = 'highlightBecomesHidden';

var siYuanToolbar = null;
var HBuiderXToolbar = null;
var sidebarHoverButton = null;
var highlightBecomesHiddenButton = null;

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
    let commonMenu = document.querySelector('.b3-menu__items');
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

/**---------------------------------------------------------主题-------------------------------------------------------------- */

/*----------------日历面板----------------*/
function initcalendar() {
    const drag = document.getElementById('drag'); // 标题栏
    if (drag) {
        // 把日历图标 放到  搜索图标前面
        var barSearch = document.getElementById('barSync');
        barSearch.insertAdjacentHTML(
            'afterend',
            '<div id="calendar"class="toolbar__item ariaLabel" aria-label="日历" ></div>'
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
    let commonMenu = document.querySelector('.b3-menu__items');
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

// setTimeout(() => ClickMonitor(), 1000);

(async () => {
    //各种列表转xx
    ClickMonitor();
    /*创建日历按钮 */
    initcalendar();
    /*创建主题按钮 */
    create_theme_button();
    bulletMain();
    console.log('加载子弹线成功');
})();

