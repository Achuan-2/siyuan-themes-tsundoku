window.theme = {
    element: {
        themeScript: document.getElementById('themeScript') ?? document.currentScript,
    },
    // 垂直页签宽度调节相关变量
    tabbarResizer: null,
    isResizing: false,
    startX: 0,
    startWidth: 0,
    originalWidth: null, // 添加原始宽度存储
    MIN_WIDTH: 150, // 最小宽度
    MAX_WIDTH: 400, // 最大宽度
    linkIconFilterInterval: null, // 链接图标过滤定时器
    commonMenuAttrObserver: null, // 菜单属性(class/style)观察器
    commonMenuDataNameObserver: null, // 菜单 data-name 观察器（用于工具栏按钮）
    menuWaitObserver: null, // 菜单等待观察器
    menuReplaceObserver: null, // 监测 #commonMenu 被替换的观察器
    commonMenuMouseUpHandler: null, // 鼠标抬起事件处理器
};

// i18n
window.theme.i18n = {
    en: {
        themeStyle: 'Change Block Style',
        toMindmap: 'Convert to Mindmap',
        toTable: 'Convert to Table',
        toKanban: 'Convert to Kanban',
        toTimeline: 'Convert to Timeline',
        toList: 'Restore to List',
        toTab: 'Convert to Tabs',
        removeHeader: 'Remove Table Header',
        defaultHeader: 'Default Table Header',
        asCodeOutput: 'Set as Code Output',
        cancelCodeOutput: 'Cancel Code Output Style',
        asQuote: 'Set as Quote Style',
        cancelQuote: 'Cancel Quote Style',
        changeThemeColor: 'Change Theme Color',
        verticalTabs: 'Vertical Tabs',
        headingDots: 'Heading Dots'
    },
    zh: {
        themeStyle: '主题块样式更改',
        toMindmap: '转换为导图',
        toTable: '转换为表格',
        toKanban: '转换为看板',
        toTimeline: '转换为时间线',
        toList: '恢复为列表',
        toTab: '转换为标签页',
        removeHeader: '取消表头',
        defaultHeader: '默认表头',
        asCodeOutput: '设置为代码输出样式',
        cancelCodeOutput: '取消代码块输出样式',
        asQuote: '设置为引号样式',
        cancelQuote: '取消引号样式',
        changeThemeColor: '切换主题颜色',
        verticalTabs: '垂直页签',
        headingDots: '标题小圆点'
    }
};

lang = (window.siyuan?.config?.lang || 'en').toLowerCase();
if (lang.startsWith('zh')) {
    lang = 'zh';
} else {
    lang = 'en';
}

function t(key) {
    return window.theme.i18n[lang][key] || window.theme.i18n['en'][key];
}


/* 颜色配置文件列表 */
window.theme.lightColors = ['style/theme/Tsundoku_light.css', 'style/theme/Tsundoku_green.css'];
window.theme.darkColors = ['style/theme/Tsundoku_dark.css'];

/* DOM 节点 ID */
window.theme.IDs = {
    STYLE_COLOR: 'Tsundoku-theme-css',
    BUTTON_TOOLBAR_CHANGE_COLOR: 'Tsundoku-theme-button',
    LOCAL_STORAGE_COLOR_HREF: 'tsundoku-color-href',
    LOCAL_STORAGE_VERTICAL_TAB: 'tsundoku-vertical-tab', // 添加垂直页签状态存储key
    LOCAL_STORAGE_H_REMINDER: 'tsundoku-h-reminder', // 添加标题小圆点状态存储key
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
    let drag;
    if (window.theme.clientMode == 'mobile') {
        drag = document.getElementsByClassName('.toolbar--border'); // 标题栏
    } else {

        drag = document.getElementById('barMode'); // 标题栏
    }
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

}
setTimeout(() => { }, 0);
/**
 * 设置思源块属性
 * @param {string} blockId 块ID
 * @param {object} attrs 属性对象
 */
async function 设置思源块属性(blockId, attrs) {
    let url = '/api/attr/setBlockAttrs';
    let data = {
        id: blockId,
        attrs: attrs
    };
    try {
        await postRequest(data, url);
    } catch (error) {
        console.error('设置块属性失败:', error);
    }
}
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
        if (appIdMatchResult && appIdMatchResult.length >= 1) {
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

/**
 * 获得所选择的块对应的块 ID
 * @returns {{id: string, type: string, subtype: string}|null}
 */
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

/**
 * 处理通用菜单的显示和内容
 * @param {Element} menu_ele 通用菜单元素
 */
function handleCommonMenu(menu_ele) {
    // 菜单不可见时，不执行任何操作
    if (menu_ele.style.display === 'none' || menu_ele.classList.contains('fn__none')) {
        return;
    }

    // 获取当前选中的块信息
    const selectInfo = getBlockSelected();

    // 定义允许显示自定义菜单的块类型
    const allowedNodeTypes = ['NodeList', 'NodeTable', 'NodeBlockquote', 'NodeCodeBlock'];

    // 如果有选中的块，并且块类型在允许列表中
    if (selectInfo && allowedNodeTypes.includes(selectInfo.type)) {
        InsertMenuItem(selectInfo.id, selectInfo.type);
    }
}


/**
 * 初始化通用菜单的观察器
 */
function initCommonMenuObserver() {
    // 避免重复初始化
    if (window.theme.commonMenuAttrObserver) {
        return;
    }

    const startCommonMenuMonitor = () => {
        if (window.theme.commonMenuAttrObserver) {
            return;
        }
        searchCommonMenu();
    };

    const searchCommonMenu = () => {
        const commonMenuElement = document.querySelector("#commonMenu");
        if (commonMenuElement) {
            setupCommonMenuObserver();
        } else {
            setTimeout(searchCommonMenu, 100);
        }
    };

    const setupCommonMenuObserver = () => {
        const commonMenuElement = document.querySelector("#commonMenu");
        if (!commonMenuElement) {
            return;
        }
        if (window.theme.commonMenuAttrObserver) {
            window.theme.commonMenuAttrObserver.disconnect();
        }
        window.theme.commonMenuAttrObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "attributes" && (mutation.attributeName === "class" || mutation.attributeName === "style")) {
                    const target = mutation.target;
                    const oldValue = mutation.oldValue ?? "";
                    const newValue = target.className;
                    const hadFnNone = oldValue.includes("fn__none");
                    const hasFnNone = newValue.includes("fn__none");
                    if (hadFnNone && !hasFnNone) {
                        handleCommonMenuShow();
                    }
                }
            });
        });
        // 观察class变化，捕捉菜单显示/隐藏
        window.theme.commonMenuAttrObserver.observe(commonMenuElement, {
            attributes: true,
            attributeFilter: ["class"],
            attributeOldValue: true
        });

        // 监测 #commonMenu 被替换的情况（比如菜单整元素被重建）
        if (!window.theme.menuReplaceObserver) {
            window.theme.menuReplaceObserver = new MutationObserver((mutations) => {
                for (const m of mutations) {
                    if (m.type === 'childList') {
                        // 当 #commonMenu 被新增或移除时，重新查找并setup
                        const cm = document.querySelector('#commonMenu');
                        if (cm && !window.theme.commonMenuAttrObserver) {
                            setupCommonMenuObserver();
                        }
                    }
                }
            });
            window.theme.menuReplaceObserver.observe(document.body, { childList: true, subtree: true });
        }
    };

    const handleCommonMenuShow = () => {
        const selectInfo = getBlockSelected();
        if (selectInfo) {
            const selectType = selectInfo.type;
            const selectId = selectInfo.id;

            // 检查是否为允许的块类型
            const allowedNodeTypes = ['NodeList', 'NodeTable', 'NodeBlockquote', 'NodeCodeBlock'];
            if (allowedNodeTypes.includes(selectType)) {
                InsertMenuItem(selectId, selectType);
            }
        }
    };

    // 添加鼠标抬起监听器，以便在菜单已打开时刷新菜单内容（比如选择变更）
    if (!window.theme.commonMenuMouseUpHandler) {
        window.theme.commonMenuMouseUpHandler = () => {
            setTimeout(() => {
                const cm = document.querySelector('#commonMenu');
                if (!cm) return;
                const computed = window.getComputedStyle(cm);
                if (computed && computed.display !== 'none' && !cm.classList.contains('fn__none')) {
                    const si = getBlockSelected();
                    if (si) {
                        const allowed = ['NodeList', 'NodeTable', 'NodeBlockquote', 'NodeCodeBlock'];
                        if (allowed.includes(si.type)) {
                            InsertMenuItem(si.id, si.type);
                        }
                    }
                }
            }, 10);
        };
        document.addEventListener('mouseup', window.theme.commonMenuMouseUpHandler);
    }

    startCommonMenuMonitor();
}


/**
 * 等待元素存在的通用函数
 * @param {string|function} selector 选择器或返回元素的函数
 * @param {Document|Element} node 查找的根节点
 * @param {number} timeout 超时时间（毫秒）
 * @returns {Promise<Element|null>} 返回找到的元素或null
 */
function whenElementExist(selector, callback, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        function check() {
            let el;
            try {
                el = typeof selector === 'function'
                    ? selector()
                    : document.querySelector(selector);
            } catch (err) {
                resolve(null);
            }
            if (el) {
                if (callback) callback(el);
                resolve(el);
            } else if (Date.now() - start >= timeout) {
                console.log(selector, "whenExist timeout");
                resolve(null);
            } else {
                requestAnimationFrame(check);
            }
        }
        check();
    });
}


/****各种列表转xx的UI****/
function ViewSelect(selectid, selecttype) {
    let button = document.createElement('button');
    button.id = 'viewselect';
    button.className = 'b3-menu__item';
    button.innerHTML =
        `<svg class="b3-menu__icon" style="null"><use xlink:href="#iconGlobalGraph"></use></svg><span class="b3-menu__label" style="">${t('themeStyle')}</span><svg class="b3-menu__icon b3-menu__icon--small" style="null"><use xlink:href="#iconRight"></use></svg>`;
    button.appendChild(SubMenu(selectid, selecttype));
    return button;
}

function SubMenu(selectid, selecttype, className = 'b3-menu__submenu') {
    let node = document.createElement('div');
    node.className = className;
    if (selecttype == 'NodeList') {
        node.appendChild(GraphView(selectid));
        node.appendChild(TableView(selectid));
        node.appendChild(ListTimelineView(selectid));
        node.appendChild(kanbanView(selectid));
        node.appendChild(listTabView(selectid));
        node.appendChild(DefaultView(selectid));
    }
    if (selecttype == 'NodeTable') {
        node.appendChild(Removeth(selectid));
        node.appendChild(Defaultth(selectid));
    }
    if (selecttype == 'NodeCodeBlock') {
        node.appendChild(setCodeOutput(selectid));
        node.appendChild(cancelCodeOutput(selectid));
    }
    if (selecttype == 'NodeBlockquote') {
        node.appendChild(setBlockquoteQuote(selectid));
        node.appendChild(cancelBlockquoteQuote(selectid));
        node.appendChild(setCalloutRed(selectid));
        node.appendChild(setCalloutBlue(selectid));
        node.appendChild(setCalloutGreen(selectid));
        node.appendChild(setCalloutOrange(selectid));
        node.appendChild(cancelCallout(selectid));
        node.appendChild(cancelAllStyles(selectid));
    }
    return node;
}
function setCodeOutput(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'code');
    button.setAttribute('custom-attr-value', 'output');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFiles"></use></svg><span class="b3-menu__label">${t('asCodeOutput')}</span>`;
    button.onclick = ViewMonitor;
    return button;
}
function setBlockquoteQuote(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'blockquote-quote');
    button.setAttribute('custom-attr-value', 'true');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconQuote"></use></svg><span class="b3-menu__label">${t('asQuote')}</span>`;
    button.onclick = ViewMonitor;
    return button;
}

function cancelBlockquoteQuote(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'blockquote-quote');
    button.setAttribute('custom-attr-value', 'false');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconQuote"></use></svg><span class="b3-menu__label">${t('cancelQuote')}</span>`;
    button.onclick = ViewMonitor;
    return button;
}

function setCalloutRed(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('style', 'background-color: var(--b3-card-error-background); color: var(--b3-card-error-color);');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconInfo"></use></svg><span class="b3-menu__label">Callout红色</span>`;
    button.onclick = ViewMonitor;
    return button;
}

function setCalloutBlue(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('style', 'background-color: var(--b3-card-info-background); color: var(--b3-card-info-color);');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconInfo"></use></svg><span class="b3-menu__label">Callout蓝色</span>`;
    button.onclick = ViewMonitor;
    return button;
}

function setCalloutGreen(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('style', 'background-color: var(--b3-card-success-background); color: var(--b3-card-success-color);');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconInfo"></use></svg><span class="b3-menu__label">Callout绿色</span>`;
    button.onclick = ViewMonitor;
    return button;
}

function setCalloutOrange(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('style', 'background-color: var(--b3-card-warning-background); color: var(--b3-card-warning-color);');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconInfo"></use></svg><span class="b3-menu__label">Callout橙色</span>`;
    button.onclick = ViewMonitor;
    return button;
}

function cancelCallout(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('style', '');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconInfo"></use></svg><span class="b3-menu__label">取消Callout样式</span>`;
    button.onclick = ViewMonitor;
    return button;
}

function cancelAllStyles(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'blockquote-quote');
    button.setAttribute('custom-attr-value', 'false');
    button.setAttribute('style', '');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTrashcan"></use></svg><span class="b3-menu__label">取消全部样式</span>`;
    button.onclick = ViewMonitor;
    return button;
}
function cancelCodeOutput(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'code');
    button.setAttribute('custom-attr-value', '');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFiles"></use></svg><span class="b3-menu__label">${t('cancelCodeOutput')}</span>`;
    button.onclick = ViewMonitor;
    return button;
}



function GraphView(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'list2');
    button.setAttribute('custom-attr-value', 'mindmap');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFiles"></use></svg><span class="b3-menu__label">${t('toMindmap')}</span>`;
    button.onclick = ViewMonitor;
    return button;
}
function TableView(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'list2');
    button.setAttribute('custom-attr-value', 'table');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">${t('toTable')}</span>`;
    button.onclick = ViewMonitor;
    return button;
}
function ListTimelineView(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'list2');
    button.setAttribute('custom-attr-value', 'timeline');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconMore"></use></svg><span class="b3-menu__label">${t('toTimeline')}</span>`;
    button.onclick = ViewMonitor;
    return button;
}
function kanbanView(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'list2');
    button.setAttribute('custom-attr-value', 'kanban');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconMenu"></use></svg><span class="b3-menu__label">${t('toKanban')}</span>`;
    button.onclick = ViewMonitor;
    return button;
}

function listTabView(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'list2');
    button.setAttribute('custom-attr-value', 'tab');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconLayout"></use></svg><span class="b3-menu__label">${t('toTab')}</span>`;
    button.onclick = ViewMonitor;
    return button;
}

function DefaultView(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.onclick = ViewMonitor;
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'list2');
    button.setAttribute('custom-attr-value', '');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconList"></use></svg><span class="b3-menu__label">${t('toList')}</span>`;
    return button;
}

function Removeth(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.onclick = ViewMonitor;
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 't');
    button.setAttribute('custom-attr-value', 'biaotou');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">${t('removeHeader')}</span>`;
    return button;
}
function Defaultth(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 't');
    button.setAttribute('custom-attr-value', '');
    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">${t('defaultHeader')}</span>`;
    button.onclick = ViewMonitor;
    return button;
}

function InsertMenuItem(selectid, selecttype, attempts = 3) {
    let commonMenu = document.querySelector('#commonMenu .b3-menu__items');
    if (!commonMenu) {
        console.log('未找到菜单容器');
        return;
    }

    // 移除已存在的自定义菜单项，避免重复插入
    const oldViewSelect = commonMenu.querySelector('#viewselect');
    if (oldViewSelect) {
        oldViewSelect.remove();
    }

    // 查找目标分割线
    let target = commonMenu.querySelector('.b3-menu__separator[data-id="separator_5"]');

    // 如果找到目标，就在其后插入菜单
    if (target) {
        target.insertAdjacentElement('afterend', ViewSelect(selectid, selecttype));
    } else {
        console.log('未找到菜单目标位置');
    }
}


function ViewMonitor(event) {
    let id = event.currentTarget.getAttribute('data-node-id');
    let attrName = 'custom-' + event.currentTarget.getAttribute('custom-attr-name');
    let attrValue = event.currentTarget.getAttribute('custom-attr-value');
    // 获取style属性
    let style = event.currentTarget.getAttribute('style');
    let setStyle = true;
    if (style == null) {
        setStyle = false;
    }

    let blocks = document.querySelectorAll(`.protyle-wysiwyg [data-node-id="${id}"]`);
    if (blocks) {
        blocks.forEach(block => block.setAttribute(attrName, attrValue));
    }
    let attrs = {};
    attrs[attrName] = attrValue;

    // 当blockquote-quote为true时，检查并设置默认样式
    if (attrName === 'custom-blockquote-quote' && attrValue === 'true') {
        // 检查当前块是否有style属性
        let hasStyle = false;
        blocks.forEach(block => {
            if (block.hasAttribute('style') && block.getAttribute('style').trim() !== '') {
                hasStyle = true;
            }
        });

        // 如果没有style属性，设置默认样式
        if (!hasStyle && !style) {
            style = 'background-color: var(--b3-card-info-background); color: var(--b3-card-info-color);';
        }
    }

    if (setStyle || style) {
        attrs['style'] = style;
    }
    console.log(attrName, attrValue, attrs);
    // 特殊处理：当恢复为列表时（custom-f为空），检查是否存在标签页DOM结构
    if (attrName === 'custom-list2' && attrValue === '') {
        const currentElement = document.querySelector(`[data-node-id="${id}"]`);
        // 直接检查是否存在标签页DOM结构，而不依赖属性判断
        if (currentElement && currentElement.querySelector('.tab-headers')) {
            console.log('发现标签页DOM结构，开始恢复为列表');
            // 先执行DOM恢复，保留标签页结构以便恢复
            restoreTabToListDOM(currentElement, id);
            // 等待DOM恢复完成后再清除属性
            setTimeout(() => {
                设置思源块属性(id, { 'custom-f': '', 'custom-list2': '' });
            }, 10);
            return; // 提前返回，避免重复调用设置属性
        } else {
            设置思源块属性(id, { 'custom-f': '' });  // 历史兼容
        }
    }

    设置思源块属性(id, attrs);
}


/**---------------------------------------------------------垂直页签宽度调节-------------------------------------------------------------- */

/**
 * 初始化垂直页签宽度调节器
 */
function initTabbarResizer() {
    // 如果已经存在调节器，先移除
    removeTabbarResizer();

    // 获取垂直页签容器 - 修正选择器以获取正确的页签容器
    const tabContainer = document.querySelector('.layout__center .layout-tab-bar');
    if (!tabContainer) return;

    // 保存原始宽度（如果还没有保存）
    if (window.theme.originalWidth === null) {
        window.theme.originalWidth = tabContainer.style.width || '';
    }

    // 创建调节器元素
    window.theme.tabbarResizer = document.createElement('div');
    window.theme.tabbarResizer.id = 'tabbar-resizer';
    window.theme.tabbarResizer.className = 'tabbar-resizer';
    window.theme.tabbarResizer.style.cssText = `
        position: absolute;
        top: 0;
        right: -5px;
        width: 10px;
        height: 100%;
        cursor: col-resize;
        z-index: 100;
    `;
    // 添加调节器到页签容器
    tabContainer.style.position = 'relative';
    window.theme.tabbarResizer.innerHTML = `
        <span class="item__text"></span>
        <span class="item__icon"></span>
    `;
    tabContainer.appendChild(window.theme.tabbarResizer);

    // 添加事件监听
    window.theme.tabbarResizer.addEventListener('mousedown', startResize);
    document.addEventListener('mousemove', resizeTabbar);
    document.addEventListener('mouseup', stopResize);
}

/**
 * 开始调整大小
 * @param {MouseEvent} e - 鼠标事件
 */
function startResize(e) {
    e.preventDefault();
    window.theme.isResizing = true;
    window.theme.startX = e.clientX;

    const tabContainer = document.querySelector('.layout__center .layout-tab-bar');
    window.theme.startWidth = tabContainer.offsetWidth;
    document.body.classList.add('tabbar-resizing');
}

/**
 * 调整页签宽度
 * @param {MouseEvent} e - 鼠标事件
 */
function resizeTabbar(e) {
    if (!window.theme.isResizing) return;

    const tabContainer = document.querySelector('.layout__center .layout-tab-bar');
    if (!tabContainer) return;

    const deltaX = e.clientX - window.theme.startX;
    let newWidth = window.theme.startWidth + deltaX;

    newWidth = Math.max(window.theme.MIN_WIDTH, Math.min(newWidth, window.theme.MAX_WIDTH));
    tabContainer.style.width = `${newWidth}px`;
}

/**
 * 停止调整大小
 */
function stopResize() {
    if (!window.theme.isResizing) return;
    window.theme.isResizing = false;
    document.body.classList.remove('tabbar-resizing');
}

/**
 * 移除垂直页签宽度调节器
 */
function removeTabbarResizer() {
    document.removeEventListener('mousemove', resizeTabbar);
    document.removeEventListener('mouseup', stopResize);

    const tabContainer = document.querySelector('.layout__center .layout-tab-bar');
    if (tabContainer && window.theme.originalWidth !== null) {
        tabContainer.style.width = window.theme.originalWidth;
        if (window.theme.originalWidth === '') {
            tabContainer.style.removeProperty('width');
        }
        window.theme.originalWidth = null;
    }

    const existingResizer = document.getElementById('tabbar-resizer');
    if (existingResizer) {
        existingResizer.parentNode.removeChild(existingResizer);
    }

    document.body.classList.remove('tabbar-resizing');
    window.theme.tabbarResizer = null;
    window.theme.isResizing = false;
}

function loadStyle(href, id = null) {
    let style = document.getElementById(id);
    if (style) {
        return style;
    }
    style = document.createElement('link');
    if (id) style.id = id;
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.href = href;
    document.head.appendChild(style);
    return style;
}


function create_theme_button2() {
    // 避免重复创建观察器
    if (window.theme.commonMenuDataNameObserver) {
        return;
    }

    window.theme.commonMenuDataNameObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-name') {
                const commonMenu = document.getElementById('commonMenu');
                if (commonMenu && commonMenu.getAttribute('data-name') === 'barmode') {
                    initThemeToolbar(commonMenu);
                }
            }
        });
    });

    const commonMenu = document.getElementById('commonMenu');
    if (commonMenu) {
        window.theme.commonMenuDataNameObserver.observe(commonMenu, { attributes: true, attributeFilter: ['data-name'] });
        if (commonMenu.getAttribute('data-name') === 'barmode') {
            initThemeToolbar(commonMenu);
        }
    } else {
        if (!window.theme.menuWaitObserver) {
            window.theme.menuWaitObserver = new MutationObserver((mutations, obs) => {
                const commonMenu = document.getElementById('commonMenu');
                if (commonMenu) {
                    window.theme.commonMenuDataNameObserver.observe(commonMenu, { attributes: true, attributeFilter: ['data-name'] });
                    if (commonMenu.getAttribute('data-name') === 'barmode') {
                        initThemeToolbar(commonMenu);
                    }
                    obs.disconnect();
                    window.theme.menuWaitObserver = null;
                }
            });
            window.theme.menuWaitObserver.observe(document.body, { childList: true, subtree: true });
        }
    }
}

async function initThemeToolbar(commonMenu) {
    // 更严格的检查：确保按钮不存在且菜单是正确的barmode菜单
    const existingThemeButton = document.getElementById('tsundoku-theme-color-button');
    const existingVerticalTabButton = document.getElementById('tsundoku-vertical-tab-button');
    const existingHReminderButton = document.getElementById('tsundoku-h-reminder-button');

    if ((existingThemeButton || existingVerticalTabButton || existingHReminderButton) ||
        !commonMenu ||
        commonMenu.getAttribute('data-name') !== 'barmode') {
        return;
    }

    const menuItems = commonMenu.querySelector('.b3-menu__items');
    if (!menuItems) return;

    // 检查是否已经存在我们的分割线
    const existingSeparators = menuItems.querySelectorAll('.b3-menu__separator[data-tsundoku="theme-separator"]');
    if (existingSeparators.length > 0) return; // 已经添加过了


    // 创建分割线
    const separator = document.createElement('div');
    separator.className = 'b3-menu__separator';
    separator.setAttribute('data-tsundoku', 'theme-separator'); // 添加标识

    // 创建主题切换按钮
    const themeColorButton = document.createElement('button');
    themeColorButton.id = 'tsundoku-theme-color-button';
    themeColorButton.className = 'b3-menu__item';
    themeColorButton.innerHTML = `
        <svg class="b3-menu__icon"><use xlink:href="#iconTheme"></use></svg>
        <span class="b3-menu__label">${t('changeThemeColor')}</span>
    `;

    // 只在light模式下显示主题切换按钮
    if (window.theme.themeMode === 'light' && window.theme.iter) {
        themeColorButton.onclick = () => {
            const color_href = window.theme.iter.next().value;
            localStorage.setItem(window.theme.IDs.LOCAL_STORAGE_COLOR_HREF, color_href);
            setLocalStorageVal(window.theme.IDs.LOCAL_STORAGE_COLOR_HREF, color_href);
            window.theme.updateStyle(window.theme.IDs.STYLE_COLOR, color_href);
        };
    } else {
        themeColorButton.style.display = 'none';
    }

    // 创建垂直页签按钮
    const verticalTabButton = document.createElement('button');
    verticalTabButton.id = 'tsundoku-vertical-tab-button';
    verticalTabButton.className = 'b3-menu__item';
    verticalTabButton.innerHTML = `
        <svg class="b3-menu__icon"><use xlink:href="#iconLayout"></use></svg>
        <span class="b3-menu__label">${t('verticalTabs')}</span>
        <span class="b3-menu__accelerator"></span>
    `;

    // 初始化垂直页签状态
    const isVerticalTabActive = await initVerticalTabState();
    verticalTabButton.querySelector('.b3-menu__accelerator').textContent = isVerticalTabActive ? 'ON' : 'OFF';

    verticalTabButton.onclick = async () => {
        const isActive = await toggleVerticalTab();
        verticalTabButton.querySelector('.b3-menu__accelerator').textContent = isActive ? 'ON' : 'OFF';
    };

    // 创建标题小圆点按钮
    const hReminderButton = document.createElement('button');
    hReminderButton.id = 'tsundoku-h-reminder-button';
    hReminderButton.className = 'b3-menu__item';
    hReminderButton.innerHTML = `
        <svg class="b3-menu__icon"><use xlink:href="#iconDot"></use></svg>
        <span class="b3-menu__label">${t('headingDots')}</span>
        <span class="b3-menu__accelerator"></span>
    `;

    // 初始化标题小圆点状态
    const isHReminderActive = await initHReminderState();
    hReminderButton.querySelector('.b3-menu__accelerator').textContent = isHReminderActive ? 'ON' : 'OFF';

    hReminderButton.onclick = async () => {
        const isActive = await toggleHReminder();
        hReminderButton.querySelector('.b3-menu__accelerator').textContent = isActive ? 'ON' : 'OFF';
    };

    // 添加到菜单末尾
    menuItems.appendChild(separator);
    menuItems.appendChild(themeColorButton);
    menuItems.appendChild(verticalTabButton);
    menuItems.appendChild(hReminderButton);
}

/**
 * 切换垂直页签状态
 */
async function toggleVerticalTab() {
    const styleId = 'tsundoku-vertical-tab-css';
    const styleElement = document.getElementById(styleId);
    let isActive = false;

    if (styleElement) {
        styleElement.remove();
        removeTabbarResizer();
        isActive = false;
    } else {
        loadStyle('/appearance/themes/Tsundoku/style/module/tab-bar-vertical.css', styleId);
        setTimeout(initTabbarResizer, 300);
        isActive = true;
    }

    await setLocalStorageVal(window.theme.IDs.LOCAL_STORAGE_VERTICAL_TAB, isActive ? 'true' : 'false');
    return isActive;
}


/**
 * 初始化垂直页签状态
 */
async function initVerticalTabState() {
    let storedState = window.siyuan?.storage[window.theme.IDs.LOCAL_STORAGE_VERTICAL_TAB] || localStorage.getItem(window.theme.IDs.LOCAL_STORAGE_VERTICAL_TAB);

    if (storedState === 'true') {
        const styleId = 'tsundoku-vertical-tab-css';
        if (!document.getElementById(styleId)) {
            loadStyle('/appearance/themes/Tsundoku/style/module/tab-bar-vertical.css', styleId);
            setTimeout(initTabbarResizer, 300);
        }
        return true;
    }
    return false;
}

/**
 * 自动初始化垂直页签（在主题启动时调用）
 */
async function autoInitVerticalTab() {
    await whenElementExist('.layout__center .layout-tab-bar');
    let storedState = window.siyuan?.storage[window.theme.IDs.LOCAL_STORAGE_VERTICAL_TAB] || localStorage.getItem(window.theme.IDs.LOCAL_STORAGE_VERTICAL_TAB);
    if (storedState === 'true') {
        const styleId = 'tsundoku-vertical-tab-css';
        if (!document.getElementById(styleId)) {
            console.log('自动启用垂直页签');
            loadStyle('/appearance/themes/Tsundoku/style/module/tab-bar-vertical.css', styleId);
            setTimeout(initTabbarResizer, 500);
        }
    }
}

H_REMINDER_CSS = `
:root {
	--h1-list-graphic: var(--custom-h1-color, #0f4c81);
	--h2-list-graphic: var(--custom-h2-color, #083256);
	--h3-list-graphic: var(--custom-h3-color, #63a4c1);
	--h4-list-graphic: var(--custom-h4-color, #71a796);
	--h5-list-graphic: var(--custom-h5-color, #3b51a4);
	--h6-list-graphic: var(--custom-h6-color, #dda36a);
}
.protyle-wysiwyg .h1>[spellcheck]:not(:empty)::after { content: ""; position: absolute; float: left; margin-left: 5px; height: 0.45em; width: 0.15em; bottom: 40%; border-radius: 3px; background-color: var(--h1-list-graphic); opacity: 0.5; }
.protyle-wysiwyg [data-node-id].li>.protyle-action~.h1>[spellcheck]::after { bottom: 40%; }
.protyle-wysiwyg .h2>[spellcheck]:not(:empty)::after { content: ""; position: absolute; float: left; margin-left: 5px; height: 0.16em; width: 0.16em; bottom: 40%; border-radius: 3px; background-color: var(--h2-list-graphic); opacity: 0.5; box-shadow: 0.25em 0.25em 0 0 var(--h2-list-graphic); }
.protyle-wysiwyg [data-node-id].li>.protyle-action~.h2>[spellcheck]::after { bottom: 40%; }
.protyle-wysiwyg .h3>[spellcheck]:not(:empty)::after { content: ""; position: absolute; float: left; margin-left: 5px; height: 0.16em; width: 0.16em; bottom: 40%; border-radius: 3px; background-color: var(--h3-list-graphic); opacity: 0.5; box-shadow: 0.25em 0.25em 0 0 var(--h3-list-graphic), 0 0.25em 0 0 var(--h3-list-graphic); }
.protyle-wysiwyg .h4>[spellcheck]:not(:empty)::after { content: ""; position: absolute; float: left; margin-left: 5px; height: 0.15em; width: 0.15em; bottom: 40%; border-radius: 3px; background-color: var(--h4-list-graphic); opacity: 0.5; box-shadow: 0.25em 0.25em 0 0 var(--h4-list-graphic), 0 0.25em 0 0 var(--h4-list-graphic), 0.25em 0 0 0 var(--h4-list-graphic); }
.protyle-wysiwyg .h5>[spellcheck]:not(:empty)::after { content: ""; position: absolute; float: left; margin-left: 5px; height: 0.15em; width: 0.15em; bottom: 40%; border-radius: 3px; background-color: var(--h5-list-graphic); opacity: 0.5; box-shadow: 0.25em 0.25em 0 0 var(--h5-list-graphic), 0 0.25em 0 0 var(--h5-list-graphic), 0.25em 0 0 0 var(--h5-list-graphic), 0 -0.25em 0 0 var(--h5-list-graphic); }
.protyle-wysiwyg .h6>[spellcheck]:not(:empty)::after { content: ""; position: absolute; float: left; margin-left: 5px; height: 0.15em; width: 0.15em; bottom: 40%; border-radius: 3px; background-color: var(--h6-list-graphic); opacity: 0.5; box-shadow: 0.25em 0.25em 0 0 var(--h6-list-graphic), 0 0.25em 0 0 var(--h6-list-graphic), 0.25em 0 0 0 var(--h6-list-graphic), 0 -0.25em 0 0 var(--h6-list-graphic), 0.25em -0.25em 0 0 var(--h6-list-graphic); }
.h-reminder-disabled .protyle-wysiwyg .h1>[spellcheck]:not(:empty)::after, .h-reminder-disabled .protyle-wysiwyg .h2>[spellcheck]:not(:empty)::after, .h-reminder-disabled .protyle-wysiwyg .h3>[spellcheck]:not(:empty)::after, .h-reminder-disabled .protyle-wysiwyg .h4>[spellcheck]:not(:empty)::after, .h-reminder-disabled .protyle-wysiwyg .h5>[spellcheck]:not(:empty)::after, .h-reminder-disabled .protyle-wysiwyg .h6>[spellcheck]:not(:empty)::after { display: none !important; }
`;

function applyHReminderStyle() {
    const styleId = 'snippetCSS-tsundoku-h-reminder';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.type = 'text/css';
        style.textContent = H_REMINDER_CSS;
        document.head.appendChild(style);
    }
}

/**
 * 切换标题小圆点状态
 */
async function toggleHReminder() {
    const styleId = 'snippetCSS-tsundoku-h-reminder';
    const styleElement = document.getElementById(styleId);
    let isActive = false;

    if (styleElement) {
        styleElement.remove();
        isActive = false;
    } else {
        applyHReminderStyle();
        isActive = true;
    }

    await setLocalStorageVal(window.theme.IDs.LOCAL_STORAGE_H_REMINDER, isActive ? 'true' : 'false');
    return isActive;
}

/**
 * 初始化标题小圆点状态
 */
async function initHReminderState() {
    let storedState = window.siyuan?.storage[window.theme.IDs.LOCAL_STORAGE_H_REMINDER] || localStorage.getItem(window.theme.IDs.LOCAL_STORAGE_H_REMINDER);
    if (storedState === 'true') {
        applyHReminderStyle();
        return true;
    }
    return false;
}

/**
 * 自动初始化标题小圆点（在主题启动时调用）
 */
async function autoInitHReminder() {
    let storedState = window.siyuan?.storage[window.theme.IDs.LOCAL_STORAGE_H_REMINDER] || localStorage.getItem(window.theme.IDs.LOCAL_STORAGE_H_REMINDER);
    if (storedState === 'true') {
        console.log('自动启用标题小圆点');
        applyHReminderStyle();
    }
}

/**
 * 恢复标签页为原始列表DOM结构
 * 逆向执行initList2Tab的转换过程
 */
function restoreTabToListDOM(listElement, listId) {

    const listSubtype = listElement.getAttribute('data-subtype') || 'u';
    const tabHeaders = listElement.querySelectorAll('.tab-header');
    const tabContents = listElement.querySelectorAll('.tab-content');

    if (!tabHeaders.length || !tabContents.length) {
        console.log('未找到标签页结构，退出恢复');
        return;
    }


    // 收集需要恢复的数据
    const listItemsData = [];

    tabHeaders.forEach((header, index) => {
        const tabContent = tabContents[index];
        if (!tabContent) return;

        // 从tab-header中恢复第一个内容块（标题）
        const headerFirstChild = header.firstElementChild;
        if (!headerFirstChild) return;


        // 克隆标题内容
        const firstContent = headerFirstChild.cloneNode(true);

        // 从tab-content中收集其余子元素
        const otherChildren = Array.from(tabContent.children).filter(child => {
            // 排除protyle-attr中只有零宽空格的元素
            return !(child.classList.contains('protyle-attr') && child.textContent.trim() === '\u200B');
        });


        listItemsData.push({
            firstContent: firstContent,
            otherChildren: otherChildren
        });
    });

    // 保存原始的列表属性
    const originalAttributes = {};
    Array.from(listElement.attributes).forEach(attr => {
        originalAttributes[attr.name] = attr.value;
    });

    // 清空列表并重建
    listElement.innerHTML = '';

    // 恢复列表的原始属性
    Object.keys(originalAttributes).forEach(name => {
        listElement.setAttribute(name, originalAttributes[name]);
    });


    // 重建每个ListItem
    listItemsData.forEach((itemData, index) => {
        // 创建ListItem容器
        const listItem = document.createElement('div');
        listItem.setAttribute('data-marker', '*');
        listItem.setAttribute('data-subtype', listSubtype);
        listItem.setAttribute('data-type', 'NodeListItem');
        listItem.className = 'li';

        // 为ListItem设置node-id和updated属性
        // 生成符合思源格式的ID
        const now = new Date();
        const timestamp = now.toISOString().replace(/[-:]/g, '').split('.')[0].replace('T', '').substring(0, 14);
        const randomPart = Math.random().toString(36).substr(2, 7);
        const listItemId = timestamp + '-' + randomPart;
        listItem.setAttribute('data-node-id', listItemId);
        listItem.setAttribute('updated', timestamp);

        // 1. 添加protyle-action（原始结构中的第一个元素）
        const protolyeAction = document.createElement('div');
        protolyeAction.className = 'protyle-action';
        protolyeAction.setAttribute('draggable', 'true');
        protolyeAction.innerHTML = '<svg><use xlink:href="#iconDot"></use></svg>';
        listItem.appendChild(protolyeAction);

        // 2. 添加第一个内容块（从tab-header恢复）
        const firstContent = itemData.firstContent;
        // 确保有data-node-index（如果没有的话）
        if (!firstContent.getAttribute('data-node-index')) {
            firstContent.setAttribute('data-node-index', '1');
        }
        listItem.appendChild(firstContent);

        // 3. 添加其余子元素（从tab-content恢复）
        itemData.otherChildren.forEach(child => {
            // 直接移动节点而不是克隆，保持原有的所有属性和状态
            listItem.appendChild(child);
        });

        // 4. 添加ListItem的protyle-attr
        const listItemAttr = document.createElement('div');
        listItemAttr.className = 'protyle-attr';
        listItemAttr.setAttribute('contenteditable', 'false');
        if (index === listItemsData.length - 1) {
            listItemAttr.innerHTML = '\u200B'; // 最后一个项目添加零宽空格
        }
        listItem.appendChild(listItemAttr);

        listElement.appendChild(listItem);

    });

    // 添加列表的protyle-attr
    const listAttr = document.createElement('div');
    listAttr.className = 'protyle-attr';
    listAttr.setAttribute('contenteditable', 'false');
    listAttr.innerHTML = '\u200B';
    listElement.appendChild(listAttr);

}

/**
 * 初始化列表转标签页功能
 */
function initList2Tab() {
    const lists = document.querySelectorAll('[data-type="NodeList"][custom-f="list2tab"],[data-type="NodeList"][custom-list2="tab"');

    lists.forEach(list => {
        if (list.querySelector('.tab-headers')) return;

        const listId = list.dataset.nodeId;
        const activeTabAttr = parseInt(list.getAttribute('custom-activetab') || '1', 10);
        const desiredActiveIndex = Number.isNaN(activeTabAttr) ? 0 : activeTabAttr - 1;

        const listItems = Array.from(list.querySelectorAll(':scope > [data-type="NodeListItem"]'));
        if (!listItems.length) return;

        const firstBlocks = listItems.map(item => item.querySelector(':scope > .protyle-action + [data-node-id]'));
        if (firstBlocks.some(block => !block)) return;

        const tabHeaders = document.createElement('div');
        tabHeaders.className = 'tab-headers';

        const tabContents = document.createElement('div');
        tabContents.className = 'tab-contents';

        const tabHeaderItems = [];
        const tabContentItems = [];

        const activateTab = (targetIndex, persist = false) => {
            if (!tabHeaderItems.length) return;
            const safeIndex = Math.max(0, Math.min(targetIndex, tabHeaderItems.length - 1));
            tabHeaderItems.forEach((header, idx) => header.classList.toggle('active', idx === safeIndex));
            tabContentItems.forEach((content, idx) => content.classList.toggle('active', idx === safeIndex));
            if (persist) {
                设置思源块属性(listId, { 'custom-activetab': (safeIndex + 1).toString() });
            }
        };

        listItems.forEach((item, index) => {
            const firstContent = firstBlocks[index];
            const tabHeader = document.createElement('div');
            tabHeader.className = 'tab-header';

            const titleClone = firstContent.cloneNode(true);
            // 保留data-node-id以便在恢复时能正确还原
            tabHeader.appendChild(titleClone);

            const tabContent = document.createElement('div');
            tabContent.className = 'tab-content';

            Array.from(item.children).forEach(child => {
                if (child !== firstContent && !(child.classList && child.classList.contains('protyle-action'))) {
                    tabContent.appendChild(child);
                }
            });

            const tabIndex = tabHeaderItems.length;
            tabHeader.addEventListener('click', () => activateTab(tabIndex, true));

            tabHeaderItems.push(tabHeader);
            tabContentItems.push(tabContent);
            tabHeaders.appendChild(tabHeader);
            tabContents.appendChild(tabContent);
        });

        if (!tabHeaderItems.length) return;

        activateTab(desiredActiveIndex, false);

        const tabHeaderContainer = document.createElement('div');
        tabHeaderContainer.className = 'tab-header-container';
        tabHeaderContainer.appendChild(tabHeaders);

        // 只在非手机端显示恢复列表按钮
        if (window.theme.clientMode !== 'mobile') {
            // 创建恢复列表按钮
            const restoreButton = document.createElement('div');
            restoreButton.className = 'tab-restore-button';
            restoreButton.innerHTML = `<svg class="b3-menu__icon" style="height: 1.2em; width: 1.2em;"><use xlink:href="#iconList"></use></svg>`;
            restoreButton.onclick = async () => {
                // 先清除属性，让思源停止将此视为标签页
                await 设置思源块属性(listId, { 'custom-f': '', 'custom-list2': '', 'custom-activetab': null });
                // 等待属性更新完成后再恢复DOM结构
                setTimeout(() => {
                    const currentList = document.querySelector(`[data-node-id="${listId}"]`);
                    if (currentList) {
                        restoreTabToListDOM(currentList, listId);
                    }
                }, 50);
            };
            tabHeaderContainer.appendChild(restoreButton);
        }

        list.innerHTML = '';
        list.appendChild(tabHeaderContainer);
        list.appendChild(tabContents);
    });
}

/**++++++++++++++++++++++++++++++++主题功能执行：按需调用+++++++++++++++++++++++++++ */
window.theme.timerIds = [];

(async () => {
    // 初始化自定义块菜单功能
    initCommonMenuObserver();

    /* 创建主题按钮 */
    create_theme_button();
    create_theme_button2();

    // 自动初始化垂直页签状态
    await autoInitVerticalTab();

    // 自动初始化标题小圆点状态
    await autoInitHReminder();

    // 初始化列表转标签页功能
    initList2Tab();

    // 添加定时器来检测新的list2tab列表
    const list2TabInterval = setInterval(initList2Tab, 100);
    window.theme.timerIds.push(list2TabInterval);

})();

function clearAllTimers() {
    window.theme.timerIds.forEach(timerId => {
        clearInterval(timerId);
    });
    window.theme.timerIds.length = 0;
}

window.destroyTheme = () => {
    // 删除主题切换按钮
    const themeButton = document.getElementById(window.theme.IDs.BUTTON_TOOLBAR_CHANGE_COLOR);
    if (themeButton) themeButton.remove();

    // 删除主题加载的额外配色 css
    let css_link = document.getElementById(window.theme.IDs.STYLE_COLOR);
    if (css_link) css_link.remove();

    // 删除新的主题功能按钮
    const themeColorButton = document.getElementById('tsundoku-theme-color-button');
    if (themeColorButton) themeColorButton.remove();

    const verticalTabButton = document.getElementById('tsundoku-vertical-tab-button');
    if (verticalTabButton) verticalTabButton.remove();

    const hReminderButton = document.getElementById('tsundoku-h-reminder-button');
    if (hReminderButton) hReminderButton.remove();

    // 删除我们添加的分割线
    const themeSeparator = document.querySelector('.b3-menu__separator[data-tsundoku="theme-separator"]');
    if (themeSeparator) themeSeparator.remove();

    // 删除我们插入的自定义菜单项（主题块样式更改）
    const viewSelect = document.getElementById('viewselect');
    if (viewSelect) viewSelect.remove();
    const insertedItems = document.querySelectorAll('.b3-menu__item[data-tsundoku-inserted="true"]');
    insertedItems.forEach(item => item.remove());

    // 删除垂直页签相关元素并恢复宽度
    removeTabbarResizer();
    const verticalTabCSS = document.getElementById('tsundoku-vertical-tab-css');
    if (verticalTabCSS) verticalTabCSS.remove();

    // 删除标题小圆点CSS
    const hReminderCSS = document.getElementById('snippetCSS-tsundoku-h-reminder');
    if (hReminderCSS) hReminderCSS.remove();

    // 删除观察器
    if (window.theme.commonMenuAttrObserver) {
        window.theme.commonMenuAttrObserver.disconnect();
        window.theme.commonMenuAttrObserver = null;
    }
    if (window.theme.commonMenuDataNameObserver) {
        window.theme.commonMenuDataNameObserver.disconnect();
        window.theme.commonMenuDataNameObserver = null;
    }
    if (window.theme.menuWaitObserver) {
        window.theme.menuWaitObserver.disconnect();
        window.theme.menuWaitObserver = null;
    }
    if (window.theme.menuReplaceObserver) {
        window.theme.menuReplaceObserver.disconnect();
        window.theme.menuReplaceObserver = null;
    }
    // 删除自定义菜单观察器
    if (window.theme.customMenuObserver) {
        window.theme.customMenuObserver.disconnect();
        window.theme.customMenuObserver = null;
    }


    // 清理定时器
    clearAllTimers();

    // 清理事件监听器
    if (window.theme.commonMenuMouseUpHandler) {
        document.removeEventListener('mouseup', window.theme.commonMenuMouseUpHandler);
        window.theme.commonMenuMouseUpHandler = null;
    }
};