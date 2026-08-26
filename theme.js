(() => {
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
    commonMenuAttrObserver: null, // 菜单属性(class/style)及内容观察器
    commonMenuDataNameObserver: null, // 菜单 data-name 观察器（保持兼容）
    menuWaitObserver: null, // 菜单等待观察器
    menuReplaceObserver: null, // 监测 #commonMenu 被替换或重构的观察器
    mobileMenuObserver: null, // 移动端菜单观察器
    commonMenuMouseUpHandler: null, // 菜单相关事件监听器
    interactionTrackerHandler: null, // 交互目标跟踪事件监听器
    observedCommonMenuElement: null, // 当前正在观察的菜单 DOM 节点
    lastInteractedElement: null, // 最近交互的目标节点
    currentMenuBlock: null, // 当前菜单关联的块节点
    eventBusHandlers: null, // 思源事件总线监听器
    menuCheckTimers: [], // 菜单检查定时器队列
    list2TabObserver: null, // 列表转标签页观察器
    list2TabResizeObserver: null, // 列表转标签页尺寸观察器
    list2TabDebounceTimer: null, // 列表转标签页防抖定时器
    list2TabLoadedProtyleHandler: null, // 编辑器加载后同步标签页
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
        paperTexture: 'Paper Texture',
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
        paperTexture: '背景纹理',
        verticalTabs: '垂直页签',
        headingDots: '标题小圆点'
    }
};

let lang = (window.siyuan?.config?.lang || 'en').toLowerCase();
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
    LOCAL_STORAGE_GREEN_PAPER_TEXTURE: 'tsundoku-green-paper-texture',
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
            const color_href = `${THEME_ROOT}${color}`;
            window.theme.currentColorHref = color_href;
            window.theme.updateStyle(window.theme.IDs.STYLE_COLOR, color_href);
            applyGreenPaperTextureState(color_href);
            return;
        }

        /* 通过颜色配置文件列表生成完整 URL 路径 */
        window.theme.lightColors.forEach(color => colors_href.push(`${THEME_ROOT}${color}`));
        window.theme.iter = window.theme.Iterator(colors_href);
        var color_href = window.siyuan?.storage[window.theme.IDs.LOCAL_STORAGE_COLOR_HREF];
        if (!color_href) {
            color_href = localStorage.getItem(window.theme.IDs.LOCAL_STORAGE_COLOR_HREF);
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
        window.theme.currentColorHref = color_href;
        window.theme.updateStyle(window.theme.IDs.STYLE_COLOR, color_href);
        applyGreenPaperTextureState(color_href);
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

function isGreenThemeColorHref(colorHref = window.theme.currentColorHref) {
    return typeof colorHref === 'string' && colorHref.includes('Tsundoku_green.css');
}

function isGreenThemeActive(colorHref = window.theme.currentColorHref) {
    return window.theme.themeMode === 'light' && isGreenThemeColorHref(colorHref);
}

function isGreenPaperTextureEnabled() {
    const key = window.theme.IDs.LOCAL_STORAGE_GREEN_PAPER_TEXTURE;
    const storedState = window.siyuan?.storage?.[key] ?? localStorage.getItem(key);
    return storedState !== 'false';
}

function updateGreenPaperTextureButton(isGreenTheme = isGreenThemeActive(), isEnabled = isGreenPaperTextureEnabled()) {
    const buttons = document.querySelectorAll('#tsundoku-paper-texture-button, #tsundoku-mobile-paper-texture-button');
    const targetDisplay = isGreenTheme ? '' : 'none';
    const targetText = isEnabled ? 'ON' : 'OFF';

    buttons.forEach(paperTextureButton => {
        if (paperTextureButton.style.display !== targetDisplay) {
            paperTextureButton.style.display = targetDisplay;
        }
        const accelerator = paperTextureButton.querySelector('.b3-menu__accelerator');
        if (accelerator && accelerator.textContent !== targetText) {
            accelerator.textContent = targetText;
        }
    });
}

function applyGreenPaperTextureState(colorHref = window.theme.currentColorHref, isEnabled = isGreenPaperTextureEnabled()) {
    const isGreenTheme = isGreenThemeActive(colorHref);
    document.documentElement.classList.toggle('tsundoku-paper-texture-off', isGreenTheme && !isEnabled);
    updateGreenPaperTextureButton(isGreenTheme, isEnabled);
    return isEnabled;
}

async function toggleGreenPaperTexture() {
    const key = window.theme.IDs.LOCAL_STORAGE_GREEN_PAPER_TEXTURE;
    const isEnabled = !isGreenPaperTextureEnabled();
    const storedValue = isEnabled ? 'true' : 'false';

    localStorage.setItem(key, storedValue);
    if (window.siyuan?.storage != undefined) {
        window.siyuan.storage[key] = storedValue;
    }
    if (window.top.siyuan.storage != undefined) {
        window.top.siyuan.storage[key] = storedValue;
    }
    applyGreenPaperTextureState(window.theme.currentColorHref, isEnabled);
    await setLocalStorageVal(key, storedValue);
    return isEnabled;
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
 * 移除可能残留在任何菜单中的主题块样式菜单项
 */
function removeViewSelectMenuItem() {
    const existingButtons = document.querySelectorAll('#viewselect');
    existingButtons.forEach(btn => btn.remove());
}

/**
 * 判断当前 commonMenu 是否为思源明确标记的块级上下文菜单
 * @param {HTMLElement} commonMenu
 * @returns {boolean}
 */
function isBlockMainMenu(commonMenu) {
    if (!commonMenu || commonMenu.style.display === 'none' || commonMenu.classList.contains('fn__none')) {
        return false;
    }

    // 采用正向白名单：思源新增的其他菜单类型默认不会注入主题块样式菜单。
    return ['block-single', 'block-multi'].includes(commonMenu.getAttribute('data-name'));
}

/**
 * 尝试从指定 DOM 节点解析出目标可转换的块信息
 * @param {Element|Node} node
 * @returns {{id: string, type: string, subtype: string}|null}
 */
function resolveTargetBlock(node) {
    if (!node) return null;
    let el = node.nodeType === 1 ? node : node.parentElement;
    if (!el || !(el instanceof Element)) return null;

    // 如果是块标 gutter 内部元素，尝试根据关联属性查找编辑器内对应块
    if (el.closest('.protyle-gutters')) {
        const gutterNodeId = el.getAttribute('data-node-id') || el.closest('[data-node-id]')?.getAttribute('data-node-id');
        if (gutterNodeId) {
            const blockInEditor = document.querySelector(`.protyle-wysiwyg [data-node-id="${gutterNodeId}"]`);
            if (blockInEditor) {
                el = blockInEditor;
            }
        }
    }

    // 必须位于编辑器内容区 .protyle-wysiwyg 内
    if (!el.closest('.protyle-wysiwyg')) {
        return null;
    }

    const allowedNodeTypes = ['NodeList', 'NodeTable', 'NodeBlockquote', 'NodeCodeBlock'];

    // 1. 如果本身就是目标类型且有 data-node-id
    const selfType = el.getAttribute('data-type');
    const selfId = el.getAttribute('data-node-id');
    if (selfId && allowedNodeTypes.includes(selfType)) {
        return {
            id: selfId,
            type: selfType,
            subtype: el.getAttribute('data-subtype') || ''
        };
    }

    // 2. 如果是 NodeListItem 或在 NodeListItem 内部，优先获取所属的 NodeList
    const listItem = el.closest?.('[data-type="NodeListItem"]');
    if (listItem) {
        const list = listItem.closest?.('[data-type="NodeList"]');
        if (list && list.getAttribute('data-node-id')) {
            return {
                id: list.getAttribute('data-node-id'),
                type: 'NodeList',
                subtype: list.getAttribute('data-subtype') || ''
            };
        }
    }

    // 3. 向上查找最近的目标父级块容器（如 NodeBlockquote, NodeTable, NodeCodeBlock, NodeList）
    for (const targetType of allowedNodeTypes) {
        const parentBlock = el.closest?.(`[data-type="${targetType}"]`);
        if (parentBlock && parentBlock.getAttribute('data-node-id')) {
            return {
                id: parentBlock.getAttribute('data-node-id'),
                type: targetType,
                subtype: parentBlock.getAttribute('data-subtype') || ''
            };
        }
    }

    return null;
}

/**
 * 获得当前菜单所针对的有效块信息
 * @returns {{id: string, type: string, subtype: string}|null}
 */
function getBlockSelected() {
    // 1. 优先使用 open-menu-block 事件传递的精确块节点
    if (window.theme.currentMenuBlock && window.theme.currentMenuBlock.isConnected) {
        const target = resolveTargetBlock(window.theme.currentMenuBlock);
        if (target) return target;
    }

    // 2. 检查选块 .protyle-wysiwyg--select（点击块标或选块时思源添加）
    const selectedNodes = document.querySelectorAll('.protyle-wysiwyg .protyle-wysiwyg--select');
    if (selectedNodes.length > 0) {
        for (const node of selectedNodes) {
            const target = resolveTargetBlock(node);
            if (target) return target;
        }
        // 如果有显式选块但都不是允许的主题块类型（如段落、标题等），则直接返回 null，不进行错误回退
        return null;
    }

    // 3. 检查高亮选块 .protyle-wysiwyg--hl
    const hlNodes = document.querySelectorAll('.protyle-wysiwyg .protyle-wysiwyg--hl');
    if (hlNodes.length > 0) {
        for (const node of hlNodes) {
            const target = resolveTargetBlock(node);
            if (target) return target;
        }
        return null;
    }

    // 4. 检查最近交互目标（如直接右键点击块内容），仅当交互发生在编辑器内部或块标时有效
    if (window.theme.lastInteractedElement && window.theme.lastInteractedElement.isConnected) {
        const inWysiwyg = window.theme.lastInteractedElement.closest('.protyle-wysiwyg');
        const inGutters = window.theme.lastInteractedElement.closest('.protyle-gutters');
        if (inWysiwyg || inGutters) {
            const target = resolveTargetBlock(window.theme.lastInteractedElement);
            if (target) return target;
        }
    }

    return null;
}

/**
 * 处理通用菜单的显示和内容
 * @param {Element} menu_ele 通用菜单元素
 */
function handleCommonMenu(menu_ele) {
    handleCommonMenuShow();
}

/**
 * 初始化用户交互跟踪器（捕捉右键、点击、拖拽手柄的目标块）
 */
function initInteractionTracker() {
    if (window.theme.interactionTrackerHandler) return;

    window.theme.interactionTrackerHandler = (e) => {
        if (!e.target) return;
        // 如果交互发生在菜单内部，不覆盖之前记录的目标块
        if (e.target.closest?.('#commonMenu') || e.target.closest?.('.b3-menu')) {
            return;
        }
        window.theme.lastInteractedElement = e.target;
    };

    document.addEventListener('mousedown', window.theme.interactionTrackerHandler, true);
    document.addEventListener('contextmenu', window.theme.interactionTrackerHandler, true);
    document.addEventListener('pointerdown', window.theme.interactionTrackerHandler, true);
}

/**
 * 初始化通用菜单事件监听器
 */
function initCommonMenuEvents() {
    if (window.theme.commonMenuMouseUpHandler) return;

    window.theme.commonMenuMouseUpHandler = () => {
        scheduleCommonMenuCheck();
    };

    document.addEventListener('mouseup', window.theme.commonMenuMouseUpHandler, true);
    document.addEventListener('contextmenu', window.theme.commonMenuMouseUpHandler, true);
    document.addEventListener('keyup', (e) => {
        if (['Escape', 'F10', 'ContextMenu', '/'].includes(e.key)) {
            scheduleCommonMenuCheck();
        }
    }, true);
}

const handleCommonMenuShow = () => {
    const commonMenu = document.getElementById('commonMenu');
    if (!commonMenu || commonMenu.style.display === 'none' || commonMenu.classList.contains('fn__none')) {
        return;
    }

    if (commonMenu.getAttribute('data-name') === 'barmode') {
        removeViewSelectMenuItem();
        initThemeToolbar(commonMenu);
        return;
    }

    // 必须为合法的块级主菜单，非块菜单（如文档菜单、子菜单、添加到数据库菜单等）立即清理
    if (!isBlockMainMenu(commonMenu)) {
        removeViewSelectMenuItem();
        return;
    }

    const selectInfo = getBlockSelected();
    const allowedNodeTypes = ['NodeList', 'NodeTable', 'NodeBlockquote', 'NodeCodeBlock'];
    if (selectInfo && allowedNodeTypes.includes(selectInfo.type)) {
        InsertMenuItem(selectInfo.id, selectInfo.type);
    } else {
        removeViewSelectMenuItem();
    }
};

/**
 * 安排多次检查以应对思源异步渲染和块选择延迟
 */
function scheduleCommonMenuCheck() {
    if (window.theme.menuCheckTimers) {
        window.theme.menuCheckTimers.forEach(t => clearTimeout(t));
    }
    window.theme.menuCheckTimers = [];

    [0, 30, 80, 160, 300].forEach(delay => {
        const timer = setTimeout(() => {
            handleCommonMenuShow();
        }, delay);
        window.theme.menuCheckTimers.push(timer);
    });
}

let isInjectingMenu = false;

function setupCommonMenuObserver() {
    const commonMenuElement = document.querySelector("#commonMenu");
    if (!commonMenuElement) {
        return;
    }

    if (window.theme.observedCommonMenuElement === commonMenuElement) {
        return;
    }

    if (window.theme.commonMenuAttrObserver) {
        window.theme.commonMenuAttrObserver.disconnect();
        window.theme.commonMenuAttrObserver = null;
    }

    window.theme.observedCommonMenuElement = commonMenuElement;
    window.theme.commonMenuAttrObserver = new MutationObserver((mutations) => {
        if (isInjectingMenu) return;

        // 如果菜单隐藏或关闭，立即清理状态并移除自定义菜单项
        if (commonMenuElement.classList.contains('fn__none') || commonMenuElement.style.display === 'none') {
            window.theme.currentMenuBlock = null;
            removeViewSelectMenuItem();
            return;
        }

        let shouldCheck = false;
        let isBarMode = false;

        for (const mutation of mutations) {
            if (mutation.type === "attributes") {
                if (mutation.attributeName === "class" || mutation.attributeName === "style") {
                    shouldCheck = true;
                }
                if (mutation.attributeName === "data-name") {
                    if (commonMenuElement.getAttribute('data-name') === 'barmode') {
                        isBarMode = true;
                    } else {
                        shouldCheck = true;
                    }
                }
            } else if (mutation.type === "childList") {
                shouldCheck = true;
            }
        }

        if (isBarMode) {
            removeViewSelectMenuItem();
            initThemeToolbar(commonMenuElement);
        }

        if (shouldCheck) {
            scheduleCommonMenuCheck();
        }
    });

    window.theme.commonMenuAttrObserver.observe(commonMenuElement, {
        attributes: true,
        attributeFilter: ["class", "style", "data-name"],
        childList: true,
        subtree: true
    });

    if (!commonMenuElement.classList.contains('fn__none') && commonMenuElement.style.display !== 'none') {
        if (commonMenuElement.getAttribute('data-name') === 'barmode') {
            removeViewSelectMenuItem();
            initThemeToolbar(commonMenuElement);
        } else {
            scheduleCommonMenuCheck();
        }
    }
}

/**
 * 初始化通用菜单的观察器
 */
function initCommonMenuObserver() {
    initInteractionTracker();
    initCommonMenuEvents();

    const searchCommonMenu = () => {
        const commonMenuElement = document.querySelector("#commonMenu");
        if (commonMenuElement) {
            setupCommonMenuObserver();
        } else {
            setTimeout(searchCommonMenu, 100);
        }
    };

    searchCommonMenu();

    // 持续监听 document.body 变化，防止 #commonMenu 被重建或替换
    if (!window.theme.menuReplaceObserver) {
        window.theme.menuReplaceObserver = new MutationObserver(() => {
            const cm = document.querySelector('#commonMenu');
            if (cm && window.theme.observedCommonMenuElement !== cm) {
                setupCommonMenuObserver();
            }
        });
        window.theme.menuReplaceObserver.observe(document.body, { childList: true, subtree: true });
    }

    // 监听思源全局事件
    if (window.siyuan?.eventBus?.on) {
        window.theme.eventBusHandlers = {
            loadedProtyle: () => scheduleCommonMenuCheck(),
            openMenuBlock: ({ detail }) => {
                const blockEl = detail?.element || detail?.blockElements?.[0];
                if (blockEl) {
                    window.theme.currentMenuBlock = blockEl;
                }
                scheduleCommonMenuCheck();
            },
            openMenuDoc: () => {
                window.theme.currentMenuBlock = null;
                removeViewSelectMenuItem();
            },
            openMenuTree: () => {
                window.theme.currentMenuBlock = null;
                removeViewSelectMenuItem();
            },
            openMenuProtyle: ({ detail }) => {
                if (!detail?.element && !detail?.blockElements?.length) {
                    window.theme.currentMenuBlock = null;
                }
                scheduleCommonMenuCheck();
            },
            openMenuCommon: () => scheduleCommonMenuCheck(),
            clickEditorContent: () => scheduleCommonMenuCheck(),
        };

        window.siyuan.eventBus.on('loaded-protyle', window.theme.eventBusHandlers.loadedProtyle);
        window.siyuan.eventBus.on('open-menu-block', window.theme.eventBusHandlers.openMenuBlock);
        window.siyuan.eventBus.on('open-menu-doc', window.theme.eventBusHandlers.openMenuDoc);
        window.siyuan.eventBus.on('open-menu-tree', window.theme.eventBusHandlers.openMenuTree);
        window.siyuan.eventBus.on('open-menu-protyle', window.theme.eventBusHandlers.openMenuProtyle);
        window.siyuan.eventBus.on('open-menu-common', window.theme.eventBusHandlers.openMenuCommon);
        window.siyuan.eventBus.on('click-editorcontent', window.theme.eventBusHandlers.clickEditorContent);
    }
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
    const styleValue = 'background-color: var(--b3-card-error-background); color: var(--b3-card-error-color);';
    button.setAttribute('custom-style-value', styleValue);
    button.setAttribute('style', styleValue);

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconInfo"></use></svg><span class="b3-menu__label">Callout红色</span>`;
    button.onclick = ViewMonitor;
    return button;
}

function setCalloutBlue(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    const styleValue = 'background-color: var(--b3-card-info-background); color: var(--b3-card-info-color);';
    button.setAttribute('custom-style-value', styleValue);
    button.setAttribute('style', styleValue);

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconInfo"></use></svg><span class="b3-menu__label">Callout蓝色</span>`;
    button.onclick = ViewMonitor;
    return button;
}

function setCalloutGreen(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    const styleValue = 'background-color: var(--b3-card-success-background); color: var(--b3-card-success-color);';
    button.setAttribute('custom-style-value', styleValue);
    button.setAttribute('style', styleValue);

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconInfo"></use></svg><span class="b3-menu__label">Callout绿色</span>`;
    button.onclick = ViewMonitor;
    return button;
}

function setCalloutOrange(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    const styleValue = 'background-color: var(--b3-card-warning-background); color: var(--b3-card-warning-color);';
    button.setAttribute('custom-style-value', styleValue);
    button.setAttribute('style', styleValue);

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconInfo"></use></svg><span class="b3-menu__label">Callout橙色</span>`;
    button.onclick = ViewMonitor;
    return button;
}

function cancelCallout(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-style-value', '');

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
    button.setAttribute('custom-style-value', '');

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

function InsertMenuItem(selectid, selecttype) {
    const menuRoot = document.getElementById('commonMenu');
    if (!menuRoot || menuRoot.style.display === 'none' || menuRoot.classList.contains('fn__none')) {
        return false;
    }

    if (menuRoot.getAttribute('data-name') === 'barmode') {
        return false;
    }

    // 只插入到根菜单项容器中，绝不插入到子菜单中
    const commonMenu = menuRoot.querySelector(':scope > .b3-menu__items') || menuRoot.querySelector('.b3-menu__items');
    if (!commonMenu || commonMenu.closest('.b3-menu__submenu')) {
        return false;
    }

    // 移除已存在的自定义菜单项，若已匹配当前块则无需重新插入
    const oldViewSelect = commonMenu.querySelector('#viewselect');
    if (oldViewSelect) {
        if (oldViewSelect.dataset.nodeId === selectid && oldViewSelect.dataset.nodeType === selecttype) {
            return true;
        }
        oldViewSelect.remove();
    }

    const viewSelectButton = ViewSelect(selectid, selecttype);
    viewSelectButton.dataset.nodeId = selectid;
    viewSelectButton.dataset.nodeType = selecttype;

    isInjectingMenu = true;
    try {
        // 1. 优先插入到 "转换为" (button[data-id="type"]) 或其后的分割线之后
        const typeBtn = commonMenu.querySelector('button[data-id="type"]');
        if (typeBtn) {
            const nextElem = typeBtn.nextElementSibling;
            if (nextElem && nextElem.classList.contains('b3-menu__separator')) {
                nextElem.insertAdjacentElement('afterend', viewSelectButton);
            } else {
                typeBtn.insertAdjacentElement('afterend', viewSelectButton);
            }
            return true;
        }

        // 2. 查找已知标准分隔线 (如 separator_5, separator_4 等)
        const separators = ['separator_5', 'separator_4', 'separator_3', 'separator_2', 'separator_1', 'separator_0'];
        let target = null;
        for (const sep of separators) {
            target = commonMenu.querySelector(`.b3-menu__separator[data-id="${sep}"]`);
            if (target) break;
        }

        if (target) {
            target.insertAdjacentElement('afterend', viewSelectButton);
            return true;
        }

        // 3. 查找功能按钮锚点（attr/copy 等）
        const anchorBtn = commonMenu.querySelector('button[data-id="attr"]') ||
                          commonMenu.querySelector('button[data-id="copy"]');
        if (anchorBtn) {
            const nextElem = anchorBtn.nextElementSibling;
            if (nextElem && nextElem.classList.contains('b3-menu__separator')) {
                nextElem.insertAdjacentElement('afterend', viewSelectButton);
            } else {
                anchorBtn.insertAdjacentElement('afterend', viewSelectButton);
            }
            return true;
        }

        // 4. 查找 delete 按钮前插入
        const deleteBtn = commonMenu.querySelector('button[data-id="delete"]');
        if (deleteBtn) {
            commonMenu.insertBefore(viewSelectButton, deleteBtn);
            return true;
        }

        return false;
    } finally {
        setTimeout(() => {
            isInjectingMenu = false;
        }, 0);
    }
}


function ViewMonitor(event) {
    let id = event.currentTarget.getAttribute('data-node-id');
    const rawAttrName = event.currentTarget.getAttribute('custom-attr-name');
    const hasCustomAttr = rawAttrName != null;
    const attrName = hasCustomAttr ? ('custom-' + rawAttrName) : null;
    const attrValue = hasCustomAttr ? event.currentTarget.getAttribute('custom-attr-value') : null;
    // 仅使用显式声明的 custom-style-value，避免菜单系统临时 style（如 max-height）污染块属性
    const setStyle = event.currentTarget.hasAttribute('custom-style-value');
    let style = setStyle ? (event.currentTarget.getAttribute('custom-style-value') ?? '') : null;

    let blocks = document.querySelectorAll(`.protyle-wysiwyg [data-node-id="${id}"][data-type]`);
    if (blocks && hasCustomAttr) {
        blocks.forEach(block => {
            if (attrValue === '' || attrValue === null) {
                block.removeAttribute(attrName);
            } else {
                block.setAttribute(attrName, attrValue);
            }
        });
    }
    let attrs = {};
    if (hasCustomAttr) {
        attrs[attrName] = attrValue;
    }

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
        if (blocks) {
            blocks.forEach(block => {
                if (style) {
                    block.setAttribute('style', style);
                } else {
                    block.removeAttribute('style');
                }
            });
        }
    }
    if (!hasCustomAttr && !setStyle) return;
    console.log(attrName, attrValue, attrs);
    // 恢复为列表时，清理当前标签页实现加到原列表项上的临时 class。
    if (attrName === 'custom-list2' && attrValue === '') {
        blocks.forEach(block => {
            restoreTabToListDOM(block);
            block.setAttribute('custom-f', '');
            block.removeAttribute('custom-activetab');
        });
        attrs['custom-f'] = '';
        attrs['custom-activetab'] = null;
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
    const commonMenu = document.getElementById('commonMenu');
    if (commonMenu && commonMenu.getAttribute('data-name') === 'barmode') {
        initThemeToolbar(commonMenu);
    }
}

async function initThemeToolbar(commonMenu) {
    // 更严格的检查：确保按钮不存在且菜单是正确的barmode菜单
    const existingThemeButton = document.getElementById('tsundoku-theme-color-button');
    const existingPaperTextureButton = document.getElementById('tsundoku-paper-texture-button');
    const existingVerticalTabButton = document.getElementById('tsundoku-vertical-tab-button');
    const existingHReminderButton = document.getElementById('tsundoku-h-reminder-button');

    if ((existingThemeButton || existingPaperTextureButton || existingVerticalTabButton || existingHReminderButton) ||
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
            window.theme.currentColorHref = color_href;
            window.theme.updateStyle(window.theme.IDs.STYLE_COLOR, color_href);
            applyGreenPaperTextureState(color_href);
        };
    } else {
        themeColorButton.style.display = 'none';
    }

    // 创建绿色主题背景纹理开关，仅在绿色主题下显示
    const paperTextureButton = document.createElement('button');
    paperTextureButton.id = 'tsundoku-paper-texture-button';
    paperTextureButton.className = 'b3-menu__item';
    paperTextureButton.innerHTML = `
        <svg class="b3-menu__icon"><use xlink:href="#iconImage"></use></svg>
        <span class="b3-menu__label">${t('paperTexture')}</span>
        <span class="b3-menu__accelerator"></span>
    `;

    const isPaperTextureActive = isGreenPaperTextureEnabled();
    paperTextureButton.style.display = isGreenThemeActive() ? '' : 'none';
    paperTextureButton.querySelector('.b3-menu__accelerator').textContent = isPaperTextureActive ? 'ON' : 'OFF';

    paperTextureButton.onclick = async () => {
        const isActive = await toggleGreenPaperTexture();
        paperTextureButton.querySelector('.b3-menu__accelerator').textContent = isActive ? 'ON' : 'OFF';
    };

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
    menuItems.appendChild(paperTextureButton);
    menuItems.appendChild(verticalTabButton);
    menuItems.appendChild(hReminderButton);
    applyGreenPaperTextureState();
}

let isInjectingMobileMenu = false;

/**
 * 注入移动端菜单的主题配置按钮（放置于 mobileMenuSettingsAndHelp 分组顶部）
 */
function injectMobileThemeButtons() {
    if (isInjectingMobileMenu) return;

    // 仅在亮色模式下支持切换主题配色
    if (window.theme.themeMode !== 'light' || !window.theme.iter) {
        return;
    }

    const menuSettings = document.getElementById('menuSettings');
    if (!menuSettings) return;

    // 已注入则直接返回，避免重复操作与 observer 循环
    if (document.getElementById('tsundoku-mobile-theme-color-button')) {
        return;
    }

    isInjectingMobileMenu = true;
    try {
        const themeColorButton = document.createElement('div');
        themeColorButton.id = 'tsundoku-mobile-theme-color-button';
        themeColorButton.className = 'b3-menu__item';
        themeColorButton.innerHTML = `
        <svg class="b3-menu__icon"><use xlink:href="#iconTheme"></use></svg>
        <span class="b3-menu__label">${t('changeThemeColor')}</span>
    `;

        themeColorButton.onclick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (window.theme.themeMode === 'light' && window.theme.iter) {
                const color_href = window.theme.iter.next().value;
                localStorage.setItem(window.theme.IDs.LOCAL_STORAGE_COLOR_HREF, color_href);
                setLocalStorageVal(window.theme.IDs.LOCAL_STORAGE_COLOR_HREF, color_href);
                window.theme.currentColorHref = color_href;
                window.theme.updateStyle(window.theme.IDs.STYLE_COLOR, color_href);
                applyGreenPaperTextureState(color_href);
            }
        };

        const paperTextureButton = document.createElement('div');
        paperTextureButton.id = 'tsundoku-mobile-paper-texture-button';
        paperTextureButton.className = 'b3-menu__item';
        paperTextureButton.innerHTML = `
        <svg class="b3-menu__icon"><use xlink:href="#iconImage"></use></svg>
        <span class="b3-menu__label">${t('paperTexture')}</span>
        <span class="b3-menu__accelerator"></span>
    `;

        const isPaperTextureActive = isGreenPaperTextureEnabled();
        paperTextureButton.style.display = isGreenThemeActive() ? '' : 'none';
        const accelerator = paperTextureButton.querySelector('.b3-menu__accelerator');
        if (accelerator) {
            accelerator.textContent = isPaperTextureActive ? 'ON' : 'OFF';
        }

        paperTextureButton.onclick = async (e) => {
            e.stopPropagation();
            e.preventDefault();
            const isActive = await toggleGreenPaperTexture();
            const acc = paperTextureButton.querySelector('.b3-menu__accelerator');
            if (acc) {
                acc.textContent = isActive ? 'ON' : 'OFF';
            }
        };

        // 放在 mobileMenuSettingsAndHelp group 顶部（即 menuSettings 之前）
        menuSettings.insertAdjacentElement('beforebegin', themeColorButton);
        themeColorButton.insertAdjacentElement('afterend', paperTextureButton);
        applyGreenPaperTextureState();
    } finally {
        isInjectingMobileMenu = false;
    }
}

/**
 * 初始化移动端右侧菜单观察器
 */
function initMobileMenuObserver() {
    const setupMobileMenu = (menuElement) => {
        if (!menuElement) return;

        injectMobileThemeButtons();

        if (window.theme.mobileMenuObserver) {
            window.theme.mobileMenuObserver.disconnect();
            window.theme.mobileMenuObserver = null;
        }

        window.theme.mobileMenuObserver = new MutationObserver(() => {
            if (isInjectingMobileMenu) return;
            // 仅在 menuSettings 存在且自定义按钮缺失时注入
            if (document.getElementById('menuSettings') && !document.getElementById('tsundoku-mobile-theme-color-button')) {
                injectMobileThemeButtons();
            }
        });

        window.theme.mobileMenuObserver.observe(menuElement, {
            childList: true,
            subtree: true
        });
    };

    const menuElement = document.getElementById('menu');
    if (menuElement) {
        setupMobileMenu(menuElement);
    } else {
        whenElementExist('#menu', (el) => {
            setupMobileMenu(el);
        });
    }

    if (window.siyuan?.eventBus?.on) {
        window.siyuan.eventBus.on('loaded-protyle', () => {
            if (document.getElementById('menuSettings') && !document.getElementById('tsundoku-mobile-theme-color-button')) {
                injectMobileThemeButtons();
            }
        });
    }
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
    if (window.theme.clientMode === 'mobile') return;
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

const LIST2TAB_SELECTOR = '[data-type="NodeList"][custom-f~="list2tab"],[data-type="NodeList"][custom-f~="tab"],[data-type="NodeList"][custom-list2="tab"]';
const LIST2TAB_ATTR_CLASS = 'tsundoku-list2tab-attr';
const LIST2TAB_RESTORE_BADGE_CLASS = 'tsundoku-list2tab-restore';
const LIST2TAB_HEADER_CLASS = 'tsundoku-list2tab-header';
const LIST2TAB_CONTENT_CLASS = 'tsundoku-list2tab-content';
const LIST2TAB_PERSIST_DELAY = 800;

function isList2TabList(listElement) {
    return listElement?.matches?.(LIST2TAB_SELECTOR);
}

function getList2TabItems(listElement) {
    return Array.from(listElement.children).filter(child => {
        return child.getAttribute('data-type') === 'NodeListItem' &&
            !child.classList?.contains(LIST2TAB_HEADER_CLASS);
    });
}

function getList2TabInlineHeader(listItem) {
    return listItem.querySelector(`:scope > .${LIST2TAB_HEADER_CLASS}`);
}

function getList2TabAction(listItem) {
    return listItem.querySelector(':scope > .protyle-action');
}

function getList2TabTitleBlock(listItem) {
    return listItem.querySelector(':scope > .protyle-action + [data-node-id]');
}

function getList2TabContent(listItem) {
    return listItem.querySelector(`:scope > .${LIST2TAB_CONTENT_CLASS}`);
}

function getList2TabContentBlocks(listItem) {
    const action = getList2TabAction(listItem);
    const titleBlock = getList2TabTitleBlock(listItem);

    return Array.from(listItem.children).filter(child => {
        return child !== action &&
            child !== titleBlock &&
            !child.classList?.contains('protyle-attr') &&
            !child.classList?.contains(LIST2TAB_HEADER_CLASS) &&
            !child.classList?.contains(LIST2TAB_CONTENT_CLASS);
    });
}

function unwrapList2TabHeader(listItem) {
    const header = getList2TabInlineHeader(listItem);
    if (!header) return;

    const action = header.querySelector(':scope > .protyle-action');
    const titleBlock = getList2TabTitleBlock(listItem);
    if (action) {
        listItem.insertBefore(action, header);
    }
    if (titleBlock?.parentElement === header) {
        listItem.insertBefore(titleBlock, header);
    }

    while (header.firstChild) {
        listItem.insertBefore(header.firstChild, header);
    }
    header.remove();
}

function unwrapList2TabContent(listItem) {
    const content = getList2TabContent(listItem);
    if (!content) return;

    const attrElement = Array.from(listItem.children).find(child => child.classList?.contains('protyle-attr'));
    while (content.firstChild) {
        listItem.insertBefore(content.firstChild, attrElement || null);
    }
    content.remove();
}

function cleanupList2TabGeneratedDOM(listElement) {
    getList2TabItems(listElement).forEach(item => {
        unwrapList2TabHeader(item);
        unwrapList2TabContent(item);
    });

    Array.from(listElement.children).forEach(child => {
        if (child.classList?.contains(LIST2TAB_HEADER_CLASS)) {
            child.remove();
        }
    });

    Array.from(listElement.children).forEach(child => {
        if (!child.classList?.contains(LIST2TAB_CONTENT_CLASS)) return;

        const tabIndex = parseInt(child.dataset.tabIndex || '', 10);
        const targetItem = getList2TabItems(listElement)[tabIndex - 1];
        if (targetItem) {
            const attrElement = Array.from(targetItem.children).find(itemChild => itemChild.classList?.contains('protyle-attr'));
            while (child.firstChild) {
                targetItem.insertBefore(child.firstChild, attrElement || null);
            }
        }
        child.remove();
    });
}

function getList2TabHeaderAreaElements(listElement) {
    return getList2TabItems(listElement);
}

function getList2TabActiveContentElements(listElement) {
    const activeItem = getList2TabItems(listElement).find(item => item.classList.contains('active'));
    return activeItem ? Array.from(activeItem.children).filter(child => child.classList?.contains('tab-content')) : [];
}

function updateList2TabHeaderAreaHeight(listElement) {
    const update = () => {
        if (!isList2TabList(listElement) || !listElement.isConnected) return;

        const listRect = listElement.getBoundingClientRect();
        const headerAreaHeight = getList2TabHeaderAreaElements(listElement).reduce((height, element) => {
            const rect = element.getBoundingClientRect();
            if (!rect.height || !element.getClientRects().length) return height;
            return Math.max(height, rect.bottom - listRect.top);
        }, 0);

        if (headerAreaHeight > 0) {
            listElement.style.setProperty('--tsundoku-list2tab-header-area-height', `${Math.ceil(headerAreaHeight)}px`);
        } else {
            listElement.style.removeProperty('--tsundoku-list2tab-header-area-height');
        }

        const activeContentHeight = getList2TabActiveContentElements(listElement).reduce((height, element) => {
            const rect = element.getBoundingClientRect();
            if (!rect.height || !element.getClientRects().length) {
                element.style.transform = '';
                return height;
            }
            element.style.transform = `translateY(${height}px)`;
            // 添加 8px 的行距以模拟原生的段落间距
            return height + Math.ceil(rect.height) + 0;
        }, 0);

        // 如果有内容，减去最后一次多加的 8px
        const totalHeight = activeContentHeight > 0 ? activeContentHeight - 0 : 0;

        if (totalHeight > 0) {
            listElement.style.setProperty('--tsundoku-list2tab-active-content-height', `${totalHeight}px`);
        } else {
            listElement.style.removeProperty('--tsundoku-list2tab-active-content-height');
        }
    };

    if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(update);
    } else {
        setTimeout(update, 0);
    }
}

function observeList2TabResize(listElement) {
    if (typeof ResizeObserver !== 'function') return;

    if (!window.theme.list2TabResizeObserver) {
        window.theme.list2TabResizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                const target = entry.target;
                const listElement = isList2TabList(target)
                    ? target
                    : target.closest?.(LIST2TAB_SELECTOR);
                if (listElement) {
                    updateList2TabHeaderAreaHeight(listElement);
                }
            });
        });
    }

    window.theme.list2TabResizeObserver.observe(listElement);
    getList2TabHeaderAreaElements(listElement).forEach(element => {
        window.theme.list2TabResizeObserver.observe(element);
    });
    getList2TabActiveContentElements(listElement).forEach(element => {
        window.theme.list2TabResizeObserver.observe(element);
    });
}

function removeList2TabRestoreButton(listElement) {
    const attrElement = Array.from(listElement.children).find(child => {
        return child.classList?.contains('protyle-attr') &&
            child.querySelector(`:scope > .${LIST2TAB_RESTORE_BADGE_CLASS}`);
    });
    if (!attrElement) {
        const legacyAttrElement = listElement.querySelector(`:scope > .protyle-attr.${LIST2TAB_ATTR_CLASS}`);
        if (legacyAttrElement) {
            legacyAttrElement.classList.remove(LIST2TAB_ATTR_CLASS);
            if (legacyAttrElement.dataset.tsundokuList2tabAttr === 'true' && !legacyAttrElement.children.length) {
                legacyAttrElement.remove();
            } else {
                delete legacyAttrElement.dataset.tsundokuList2tabAttr;
            }
        }
        return;
    }

    attrElement.querySelector(`:scope > .${LIST2TAB_RESTORE_BADGE_CLASS}`)?.remove();
    attrElement.classList.remove(LIST2TAB_ATTR_CLASS);

    if ((attrElement._tsundokuList2TabAttrCreated || attrElement.dataset.tsundokuList2tabAttr === 'true') && !attrElement.children.length) {
        attrElement.remove();
    } else {
        delete attrElement.dataset.tsundokuList2tabAttr;
    }
}

function markList2TabActiveAttrChange(listElement, activeTab) {
    listElement._tsundokuSkipActiveTabSync = activeTab;
    if (listElement._tsundokuSkipActiveTabSyncTimer) {
        clearTimeout(listElement._tsundokuSkipActiveTabSyncTimer);
    }
    listElement._tsundokuSkipActiveTabSyncTimer = setTimeout(() => {
        delete listElement._tsundokuSkipActiveTabSync;
        delete listElement._tsundokuSkipActiveTabSyncTimer;
    }, 500);
}

function getList2TabStorageKey(listElement) {
    return listElement?.dataset?.nodeId ? `tsundoku-list2tab-active-${listElement.dataset.nodeId}` : '';
}

function getStoredList2TabActiveTab(listElement) {
    const storageKey = getList2TabStorageKey(listElement);
    if (!storageKey) return '';
    return localStorage.getItem(storageKey) || '';
}

function persistList2TabActiveTab(listElement, activeTab) {
    const storageKey = getList2TabStorageKey(listElement);
    if (storageKey) {
        localStorage.setItem(storageKey, activeTab);
    }

    if (!listElement.dataset.nodeId) return;

    markList2TabActiveAttrChange(listElement, activeTab);
    listElement.setAttribute('custom-activetab', activeTab);

    if (listElement._tsundokuList2TabPersistTimer) {
        clearTimeout(listElement._tsundokuList2TabPersistTimer);
    }

    listElement._tsundokuList2TabPersistTimer = setTimeout(async () => {
        if (!listElement.isConnected) return;

        await 设置思源块属性(listElement.dataset.nodeId, { 'custom-activetab': activeTab });
        scheduleList2TabInit(0);
    }, LIST2TAB_PERSIST_DELAY);
}

function shouldSkipList2TabMutation(mutation, target) {
    if (mutation.type !== 'attributes' || mutation.attributeName !== 'custom-activetab') {
        return false;
    }
    if (target?._tsundokuSkipActiveTabSync !== target.getAttribute('custom-activetab')) {
        return false;
    }

    if (target._tsundokuSkipActiveTabSyncTimer) {
        clearTimeout(target._tsundokuSkipActiveTabSyncTimer);
    }
    delete target._tsundokuSkipActiveTabSync;
    delete target._tsundokuSkipActiveTabSyncTimer;
    return true;
}

function activateList2Tab(listElement, targetIndex, persist = false) {
    const listItems = getList2TabItems(listElement);
    if (!listItems.length) return;

    const safeIndex = Math.max(0, Math.min(targetIndex, listItems.length - 1));

    listItems.forEach((item, index) => {
        item.classList.add('tab-panel');
        item.classList.toggle('active', index === safeIndex);
    });

    listElement._tsundokuActiveTab = safeIndex;
    observeList2TabResize(listElement);
    updateList2TabHeaderAreaHeight(listElement);

    if (persist && listElement.dataset.nodeId) {
        const activeTab = (safeIndex + 1).toString();
        persistList2TabActiveTab(listElement, activeTab);
    }
}

function bindList2TabEvents(listElement) {
    if (listElement._tsundokuTabBound) return;

    listElement.addEventListener('click', (event) => {
        if (!isList2TabList(listElement)) return;

        const item = event.target.closest('[data-type="NodeListItem"]');
        if (!item || item.parentElement !== listElement) return;

        const titleBlock = getList2TabTitleBlock(item);
        const action = getList2TabAction(item);
        const isTabTrigger = (titleBlock && (event.target === titleBlock || titleBlock.contains(event.target))) ||
            (action && (event.target === action || action.contains(event.target)));
        if (!isTabTrigger) return;

        const listItems = getList2TabItems(listElement);
        const tabIndex = listItems.indexOf(item);
        if (tabIndex >= 0) {
            activateList2Tab(listElement, tabIndex, true);
        }
    }, true);

    listElement._tsundokuTabBound = true;
}

function markList2TabItemClasses(item) {
    unwrapList2TabHeader(item);
    unwrapList2TabContent(item);

    const action = getList2TabAction(item);
    const titleBlock = getList2TabTitleBlock(item);

    Array.from(item.children).forEach(child => {
        child.classList.remove('tab-content');
        if (child !== action) {
            child.classList.remove('tab-action');
        }
        if (child !== titleBlock) {
            child.classList.remove('tab-title');
        }
    });

    if (action) {
        action.classList.add('tab-action');
    }
    if (titleBlock) {
        titleBlock.classList.add('tab-title');
    }

    getList2TabContentBlocks(item).forEach(child => {
        child.classList.add('tab-content');
        child.style.marginTop = ''; // Reset on mark
    });

    item.classList.toggle('tab-panel--empty-title', !titleBlock);
}

function syncList2Tab(listElement) {
    cleanupList2TabGeneratedDOM(listElement);

    const listItems = getList2TabItems(listElement);
    if (!listItems.length) return;

    removeList2TabRestoreButton(listElement);
    bindList2TabEvents(listElement);

    listItems.forEach((item, index) => {
        item.classList.add('tab-panel');
        markList2TabItemClasses(item);
    });

    const storedActiveTab = parseInt(getStoredList2TabActiveTab(listElement) || '', 10);
    const activeTabAttr = parseInt(listElement.getAttribute('custom-activetab') || '', 10);
    const activeIndex = Number.isNaN(storedActiveTab)
        ? (Number.isNaN(activeTabAttr) ? (listElement._tsundokuActiveTab || 0) : activeTabAttr - 1)
        : storedActiveTab - 1;

    activateList2Tab(listElement, activeIndex, false);
    observeList2TabResize(listElement);
    updateList2TabHeaderAreaHeight(listElement);
}

/**
 * 恢复标签页为原始列表DOM结构
 */
function restoreTabToListDOM(listElement) {
    removeList2TabRestoreButton(listElement);
    window.theme.list2TabResizeObserver?.unobserve?.(listElement);
    listElement.style.removeProperty('--tsundoku-list2tab-header-area-height');
    listElement.style.removeProperty('--tsundoku-list2tab-active-content-height');
    cleanupList2TabGeneratedDOM(listElement);

    const directListItems = getList2TabItems(listElement);

    if (!directListItems.length) {
        return;
    }

    directListItems.forEach(item => {
        item.classList.remove('tab-panel', 'tab-panel--empty-title', 'active');

        const action = getList2TabAction(item);
        if (action) {
            action.classList.remove('tab-action');
        }

        item.querySelectorAll(':scope > .tab-title, :scope > .tab-content').forEach(block => {
            block.classList.remove('tab-title', 'tab-content');
        });
        unwrapList2TabContent(item);
        unwrapList2TabHeader(item);
    });

    delete listElement._tsundokuActiveTab;
}

/**
 * 初始化列表转标签页功能
 */
function initList2Tab() {
    document.querySelectorAll(`.protyle-wysiwyg [data-type="NodeList"] > .protyle-attr > .${LIST2TAB_RESTORE_BADGE_CLASS}, .protyle-wysiwyg [data-type="NodeList"] > .protyle-attr.${LIST2TAB_ATTR_CLASS}`).forEach(element => {
        const attrElement = element.classList.contains('protyle-attr') ? element : element.parentElement;
        const listElement = attrElement.parentElement;
        if (listElement && !isList2TabList(listElement)) {
            removeList2TabRestoreButton(listElement);
        }
    });

    document.querySelectorAll('.protyle-wysiwyg [data-type="NodeList"]>.tab-panel').forEach(item => {
        const listElement = item.parentElement;
        if (listElement && !isList2TabList(listElement)) {
            restoreTabToListDOM(listElement);
        }
    });

    document.querySelectorAll(LIST2TAB_SELECTOR).forEach(syncList2Tab);
}

function scheduleList2TabInit(delay = 120) {
    if (window.theme.list2TabDebounceTimer) {
        clearTimeout(window.theme.list2TabDebounceTimer);
    }

    window.theme.list2TabDebounceTimer = setTimeout(() => {
        window.theme.list2TabDebounceTimer = null;
        initList2Tab();
    }, delay);
}

function initList2TabObserver() {
    if (window.theme.list2TabObserver) return;

    window.theme.list2TabObserver = new MutationObserver((mutations) => {
        const shouldSync = mutations.some(mutation => {
            const target = mutation.target.nodeType === 3 ? mutation.target.parentElement : mutation.target;
            if (!target?.closest?.('.protyle-wysiwyg')) return false;
            if (shouldSkipList2TabMutation(mutation, target)) return false;
            if (mutation.type === 'childList' || mutation.type === 'characterData') return true;
            return ['custom-f', 'custom-list2', 'custom-activetab', 'updated'].includes(mutation.attributeName);
        });

        if (shouldSync) {
            scheduleList2TabInit(0);
        }
    });

    window.theme.list2TabObserver.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['custom-f', 'custom-list2', 'custom-activetab', 'updated']
    });

    if (window.siyuan?.eventBus?.on) {
        window.theme.list2TabLoadedProtyleHandler = () => scheduleList2TabInit(50);
        window.siyuan.eventBus.on('loaded-protyle', window.theme.list2TabLoadedProtyleHandler);
    }
}

/**++++++++++++++++++++++++++++++++主题功能执行：按需调用+++++++++++++++++++++++++++ */
window.theme.timerIds = [];

(async () => {
    // 初始化自定义块菜单功能
    initCommonMenuObserver();
    initMobileMenuObserver();

    /* 创建主题按钮 */
    create_theme_button();
    create_theme_button2();

    // 自动初始化垂直页签状态
    await autoInitVerticalTab();

    // 自动初始化标题小圆点状态
    await autoInitHReminder();

    // 初始化列表转标签页功能
    initList2Tab();
    initList2TabObserver();

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

    // 删除移动端主题功能按钮
    const mobileThemeColorButton = document.getElementById('tsundoku-mobile-theme-color-button');
    if (mobileThemeColorButton) mobileThemeColorButton.remove();

    const mobilePaperTextureButton = document.getElementById('tsundoku-mobile-paper-texture-button');
    if (mobilePaperTextureButton) mobilePaperTextureButton.remove();

    // 删除主题加载的额外配色 css
    let css_link = document.getElementById(window.theme.IDs.STYLE_COLOR);
    if (css_link) css_link.remove();

    // 删除新的主题功能按钮
    const themeColorButton = document.getElementById('tsundoku-theme-color-button');
    if (themeColorButton) themeColorButton.remove();

    const paperTextureButton = document.getElementById('tsundoku-paper-texture-button');
    if (paperTextureButton) paperTextureButton.remove();
    document.documentElement.classList.remove('tsundoku-paper-texture-off');

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
    if (window.theme.mobileMenuObserver) {
        window.theme.mobileMenuObserver.disconnect();
        window.theme.mobileMenuObserver = null;
    }
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
    window.theme.observedCommonMenuElement = null;

    if (window.theme.list2TabObserver) {
        window.theme.list2TabObserver.disconnect();
        window.theme.list2TabObserver = null;
    }
    if (window.theme.list2TabResizeObserver) {
        window.theme.list2TabResizeObserver.disconnect();
        window.theme.list2TabResizeObserver = null;
    }
    if (window.theme.list2TabDebounceTimer) {
        clearTimeout(window.theme.list2TabDebounceTimer);
        window.theme.list2TabDebounceTimer = null;
    }
    if (window.theme.list2TabLoadedProtyleHandler && window.siyuan?.eventBus?.off) {
        window.siyuan.eventBus.off('loaded-protyle', window.theme.list2TabLoadedProtyleHandler);
        window.theme.list2TabLoadedProtyleHandler = null;
    }
    if (window.siyuan?.eventBus?.off && window.theme.eventBusHandlers) {
        window.siyuan.eventBus.off('loaded-protyle', window.theme.eventBusHandlers.loadedProtyle);
        window.siyuan.eventBus.off('open-menu-block', window.theme.eventBusHandlers.openMenuBlock);
        window.siyuan.eventBus.off('open-menu-doc', window.theme.eventBusHandlers.openMenuDoc);
        window.siyuan.eventBus.off('open-menu-tree', window.theme.eventBusHandlers.openMenuTree);
        window.siyuan.eventBus.off('open-menu-protyle', window.theme.eventBusHandlers.openMenuProtyle);
        window.siyuan.eventBus.off('open-menu-common', window.theme.eventBusHandlers.openMenuCommon);
        window.siyuan.eventBus.off('click-editorcontent', window.theme.eventBusHandlers.clickEditorContent);
        window.theme.eventBusHandlers = null;
    }
    window.theme.currentMenuBlock = null;
    if (window.theme.menuCheckTimers) {
        window.theme.menuCheckTimers.forEach(t => clearTimeout(t));
        window.theme.menuCheckTimers = [];
    }
    document.querySelectorAll(`.protyle-wysiwyg [data-type="NodeList"] > .protyle-attr > .${LIST2TAB_RESTORE_BADGE_CLASS}, .protyle-wysiwyg [data-type="NodeList"] > .protyle-attr.${LIST2TAB_ATTR_CLASS}`).forEach(element => {
        const attrElement = element.classList.contains('protyle-attr') ? element : element.parentElement;
        const listElement = attrElement.parentElement;
        if (listElement) {
            removeList2TabRestoreButton(listElement);
        }
    });
    // 删除自定义菜单观察器
    if (window.theme.customMenuObserver) {
        window.theme.customMenuObserver.disconnect();
        window.theme.customMenuObserver = null;
    }

    // 清理定时器
    clearAllTimers();

    // 清理事件监听器
    if (window.theme.commonMenuMouseUpHandler) {
        document.removeEventListener('mouseup', window.theme.commonMenuMouseUpHandler, true);
        document.removeEventListener('contextmenu', window.theme.commonMenuMouseUpHandler, true);
        window.theme.commonMenuMouseUpHandler = null;
    }
    if (window.theme.interactionTrackerHandler) {
        document.removeEventListener('mousedown', window.theme.interactionTrackerHandler, true);
        document.removeEventListener('contextmenu', window.theme.interactionTrackerHandler, true);
        document.removeEventListener('pointerdown', window.theme.interactionTrackerHandler, true);
        window.theme.interactionTrackerHandler = null;
    }
};
})();
