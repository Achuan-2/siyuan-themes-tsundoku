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
};
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
    let drag;
    console.log(window.theme.clientMode);
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

/**
 * 等待元素存在的通用函数
 * @param {string|function} selector 选择器或返回元素的函数
 * @param {Document|Element} node 查找的根节点
 * @param {number} timeout 超时时间（毫秒）
 * @returns {Promise<Element|null>} 返回找到的元素或null
 */
function whenElementExist(selector, node = document, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        function check() {
            let el;
            try {
                el = typeof selector === 'function'
                    ? selector()
                    : node.querySelector(selector);
            } catch (err) {
                return resolve(null);
            }
            if (el) {
                resolve(el);
            } else if (Date.now() - start >= timeout) {
                resolve(null);
            } else {
                requestAnimationFrame(check);
            }
        }
        check();
    });
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
                selecttype == 'NodeBlockquote' ||
                selecttype == 'NodeCodeBlock'
            ) {
                // 使用 whenElementExist 等待菜单完全渲染
                waitForMenuAndInsert(selectid, selecttype);
            }
        }
    }, 50);
}

/**
 * 等待菜单完全渲染后插入菜单项
 * @param {string} selectid 选中块的ID
 * @param {string} selecttype 选中块的类型
 */
async function waitForMenuAndInsert(selectid, selecttype) {
    // 使用 whenElementExist 等待菜单和分隔符出现
    const menu = await whenElementExist('.b3-menu__items', document, 2000);
    if (!menu) {
        console.log('未找到菜单容器');
        return;
    }

    const separator = await whenElementExist('.b3-menu__separator[data-id="separator_5"]', menu, 2000);
    if (!separator) {
        console.log('未找到菜单分隔符');
        return;
    }

    // 菜单已完全渲染，插入菜单项
    InsertMenuItem(selectid, selecttype);
}



setTimeout(() => ClickMonitor(), 1000);


/****各种列表转xx的UI****/
function ViewSelect(selectid, selecttype) {
    let button = document.createElement('button');
    button.id = 'viewselect';
    button.className = 'b3-menu__item';
    button.innerHTML =
        '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconGlobalGraph"></use></svg><span class="b3-menu__label" style="">主题块样式更改</span><svg class="b3-menu__icon b3-menu__icon--small" style="null"><use xlink:href="#iconRight"></use></svg></button>';
    button.appendChild(SubMenu(selectid, selecttype));
    return button;
}

function SubMenu(selectid, selecttype, className = 'b3-menu__submenu') {
    let node = document.createElement('div');
    node.className = className;
    console.log(selecttype);
    if (selecttype == 'NodeList') {
        node.appendChild(GraphView(selectid));
        node.appendChild(TableView(selectid));
        node.appendChild(kanbanView(selectid));
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
    }
    return node;
}
function setCodeOutput(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'code');
    button.setAttribute('custom-attr-value', 'output');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFiles"></use></svg><span class="b3-menu__label">设置为代码输出样式</span>`;
    button.onclick = ViewMonitor;
    return button;
}
function setBlockquoteQuote(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'blockquote-quote');
    button.setAttribute('custom-attr-value', 'true');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconQuote"></use></svg><span class="b3-menu__label">设置为引号样式</span>`;
    button.onclick = ViewMonitor;
    return button;
}

function cancelBlockquoteQuote(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'blockquote-quote');
    button.setAttribute('custom-attr-value', 'false');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconQuote"></use></svg><span class="b3-menu__label">取消引号样式</span>`;
    button.onclick = ViewMonitor;
    return button;
}
function cancelCodeOutput(selectid) {
    let button = document.createElement('button');
    button.className = 'b3-menu__item';
    button.setAttribute('data-node-id', selectid);
    button.setAttribute('custom-attr-name', 'code');
    button.setAttribute('custom-attr-value', '');

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFiles"></use></svg><span class="b3-menu__label">取消代码块输出样式</span>`;
    button.onclick = ViewMonitor;
    return button;
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


function InsertMenuItem(selectid, selecttype) {
    let commonMenu = document.querySelector('.b3-menu__items');
    let target = commonMenu?.querySelector('.b3-menu__separator[data-id="separator_5"]');
    let selectview = commonMenu?.querySelector('[id="viewselect"]');

    if (target && commonMenu) {
        console.log('插入主题菜单项');
        if (!selectview) {
            // 在 target 元素后插入 ViewSelect
            target.insertAdjacentElement('afterend', ViewSelect(selectid, selecttype));
        }
    } else {
        console.log('未找到菜单目标位置');
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


function link_icon_filter() {
    let spans = document.querySelectorAll('span[data-type="a"]');
    spans.forEach(span => {
        const textContent = span.textContent.trim();
        // 检查文本是否完全被方括号包裹或是否为纯数字
        const isFullyWrappedInBrackets = /^\[.*\]$/.test(textContent);
        const isNumber = /^\d+$/.test(textContent);

        if (textContent === '*' || isFullyWrappedInBrackets || isNumber) {
            span.setAttribute('custom-linkicon', 'false');
        } else {
            span.removeAttribute('custom-linkicon');
        }
    });
}

linkIconFilterInterval = setInterval(link_icon_filter, 100);


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
    // tabbarResizer添加<span class="item__text"></span><span class="item__icon"></span>
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

    // 修正选择器以获取正确的页签容器
    const tabContainer = document.querySelector('.layout__center .layout-tab-bar');
    window.theme.startWidth = tabContainer.offsetWidth;

    // 添加调整中的样式
    document.body.classList.add('tabbar-resizing');
}

/**
 * 调整页签宽度
 * @param {MouseEvent} e - 鼠标事件
 */
function resizeTabbar(e) {
    if (!window.theme.isResizing) return;

    // 修正选择器以获取正确的页签容器
    const tabContainer = document.querySelector('.layout__center .layout-tab-bar');
    if (!tabContainer) return;

    const deltaX = e.clientX - window.theme.startX;
    let newWidth = window.theme.startWidth + deltaX;

    // 限制宽度范围
    newWidth = Math.max(window.theme.MIN_WIDTH, Math.min(newWidth, window.theme.MAX_WIDTH));

    // 应用新宽度
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
    // 移除事件监听
    document.removeEventListener('mousemove', resizeTabbar);
    document.removeEventListener('mouseup', stopResize);

    // 恢复页签容器的原始宽度
    const tabContainer = document.querySelector('.layout__center .layout-tab-bar');
    if (tabContainer && window.theme.originalWidth !== null) {
        tabContainer.style.width = window.theme.originalWidth;
        // 如果原始宽度为空，则移除width样式
        if (window.theme.originalWidth === '') {
            tabContainer.style.removeProperty('width');
        }
        // 重置原始宽度存储
        window.theme.originalWidth = null;
    }

    // 移除调节器元素
    const existingResizer = document.getElementById('tabbar-resizer');
    if (existingResizer) {
        existingResizer.parentNode.removeChild(existingResizer);
    }

    // 移除调整中的样式
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
    if (window.theme.commonMenuObserver) {
        return;
    }

    window.theme.commonMenuObserver = new MutationObserver((mutations) => {
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
        window.theme.commonMenuObserver.observe(commonMenu, { attributes: true, attributeFilter: ['data-name'] });
        if (commonMenu.getAttribute('data-name') === 'barmode') {
            initThemeToolbar(commonMenu);
        }
    } else {
        if (!window.theme.menuWaitObserver) {
            window.theme.menuWaitObserver = new MutationObserver((mutations, obs) => {
                const commonMenu = document.getElementById('commonMenu');
                if (commonMenu) {
                    window.theme.commonMenuObserver.observe(commonMenu, { attributes: true, attributeFilter: ['data-name'] });
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

    // 检查是否已经存在我们的分割线（通过检查最后一个分割线后是否有我们的按钮）
    const existingSeparators = menuItems.querySelectorAll('.b3-menu__separator');
    if (existingSeparators.length > 0) {
        const lastSeparator = existingSeparators[existingSeparators.length - 1];
        const nextElement = lastSeparator.nextElementSibling;
        if (nextElement && (nextElement.id === 'tsundoku-theme-color-button' || nextElement.id === 'tsundoku-vertical-tab-button' || nextElement.id === 'tsundoku-h-reminder-button')) {
            return; // 已经添加过了
        }
    }

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
        <span class="b3-menu__label">切换主题颜色</span>
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
        <span class="b3-menu__label">垂直页签</span>
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
        <span class="b3-menu__label">标题小圆点</span>
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
        // 移除调节器并恢复宽度
        removeTabbarResizer();
        isActive = false;
    } else {
        loadStyle('/appearance/themes/Tsundoku/style/module/tab-bar-vertical.css', styleId);
        setTimeout(initTabbarResizer, 300);
        isActive = true;
    }

    // 保存状态到本地存储
    await setLocalStorageVal(window.theme.IDs.LOCAL_STORAGE_VERTICAL_TAB, isActive ? 'true' : 'false');

    return isActive;
}


/**
 * 初始化垂直页签状态
 */
async function initVerticalTabState() {
    // 从本地存储读取状态
    let storedState = window.siyuan?.storage[window.theme.IDs.LOCAL_STORAGE_VERTICAL_TAB];
    if (!storedState) {
        storedState = localStorage.getItem(window.theme.IDs.LOCAL_STORAGE_VERTICAL_TAB);
    }

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
    // 等待页面基本元素加载完成
    await whenElementExist('.layout__center .layout-tab-bar');

    // 从本地存储读取状态
    let storedState = window.siyuan?.storage[window.theme.IDs.LOCAL_STORAGE_VERTICAL_TAB];
    if (!storedState) {
        storedState = localStorage.getItem(window.theme.IDs.LOCAL_STORAGE_VERTICAL_TAB);
    }

    if (storedState === 'true') {
        const styleId = 'tsundoku-vertical-tab-css';
        if (!document.getElementById(styleId)) {
            console.log('自动启用垂直页签');
            loadStyle('/appearance/themes/Tsundoku/style/module/tab-bar-vertical.css', styleId);
            // 等待样式加载后初始化调节器
            setTimeout(initTabbarResizer, 500);
        }
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
        // 创建style标签并直接写入CSS内容
        const style = document.createElement('style');
        style.id = styleId;
        style.type = 'text/css';
        style.textContent = `
:root {
	--h1-list-graphic: var(--custom-h1-color, #0f4c81);
	--h2-list-graphic: var(--custom-h2-color, #083256);
	--h3-list-graphic: var(--custom-h3-color, #63a4c1);
	--h4-list-graphic: var(--custom-h4-color, #71a796);
	--h5-list-graphic: var(--custom-h5-color, #3b51a4);
	--h6-list-graphic: var(--custom-h6-color, #dda36a);
}

.protyle-wysiwyg .h1>[spellcheck]:not(:empty)::after {
	content: "";
	position: absolute;
	float: left;
	margin-left: 5px;
	height: 0.45em;
	width: 0.15em;
	bottom: 40%;
	border-radius: 3px;
	background-color: var(--h1-list-graphic);
	opacity: 0.5;
}

.protyle-wysiwyg [data-node-id].li>.protyle-action~.h1>[spellcheck]::after {
	bottom: 40%;
}

.protyle-wysiwyg .h2>[spellcheck]:not(:empty)::after {
	content: "";
	position: absolute;
	float: left;
	margin-left: 5px;
	height: 0.16em;
	width: 0.16em;
	bottom: 40%;
	border-radius: 3px;
	background-color: var(--h2-list-graphic);
	opacity: 0.5;
	box-shadow: 0.25em 0.25em 0 0 var(--h2-list-graphic);
}

.protyle-wysiwyg [data-node-id].li>.protyle-action~.h2>[spellcheck]::after {
	bottom: 40%;
}

.protyle-wysiwyg .h3>[spellcheck]:not(:empty)::after {
	content: "";
	position: absolute;
	float: left;
	margin-left: 5px;
	height: 0.16em;
	width: 0.16em;
	bottom: 40%;
	border-radius: 3px;
	background-color: var(--h3-list-graphic);
	opacity: 0.5;
	box-shadow: 0.25em 0.25em 0 0 var(--h3-list-graphic), 0 0.25em 0 0 var(--h3-list-graphic);
}

.protyle-wysiwyg .h4>[spellcheck]:not(:empty)::after {
	content: "";
	position: absolute;
	float: left;
	margin-left: 5px;
	height: 0.15em;
	width: 0.15em;
	bottom: 40%;
	border-radius: 3px;
	background-color: var(--h4-list-graphic);
	opacity: 0.5;
	box-shadow: 0.25em 0.25em 0 0 var(--h4-list-graphic), 0 0.25em 0 0 var(--h4-list-graphic), 0.25em 0 0 0 var(--h4-list-graphic);
}

.protyle-wysiwyg .h5>[spellcheck]:not(:empty)::after {
	content: "";
	position: absolute;
	float: left;
	margin-left: 5px;
	height: 0.15em;
	width: 0.15em;
	bottom: 40%;
	border-radius: 3px;
	background-color: var(--h5-list-graphic);
	opacity: 0.5;
	box-shadow: 0.25em 0.25em 0 0 var(--h5-list-graphic), 0 0.25em 0 0 var(--h5-list-graphic), 0.25em 0 0 0 var(--h5-list-graphic), 0 -0.25em 0 0 var(--h5-list-graphic);
}

.protyle-wysiwyg .h6>[spellcheck]:not(:empty)::after {
	content: "";
	position: absolute;
	float: left;
	margin-left: 5px;
	height: 0.15em;
	width: 0.15em;
	bottom: 40%;
	border-radius: 3px;
	background-color: var(--h6-list-graphic);
	opacity: 0.5;
	box-shadow: 0.25em 0.25em 0 0 var(--h6-list-graphic), 0 0.25em 0 0 var(--h6-list-graphic), 0.25em 0 0 0 var(--h6-list-graphic), 0 -0.25em 0 0 var(--h6-list-graphic), 0.25em -0.25em 0 0 var(--h6-list-graphic);
}

.h-reminder-disabled .protyle-wysiwyg .h1>[spellcheck]:not(:empty)::after,
.h-reminder-disabled .protyle-wysiwyg .h2>[spellcheck]:not(:empty)::after,
.h-reminder-disabled .protyle-wysiwyg .h3>[spellcheck]:not(:empty)::after,
.h-reminder-disabled .protyle-wysiwyg .h4>[spellcheck]:not(:empty)::after,
.h-reminder-disabled .protyle-wysiwyg .h5>[spellcheck]:not(:empty)::after,
.h-reminder-disabled .protyle-wysiwyg .h6>[spellcheck]:not(:empty)::after {
    display: none !important;
}
`;
        document.head.appendChild(style);
        isActive = true;
    }

    // 保存状态到本地存储
    await setLocalStorageVal(window.theme.IDs.LOCAL_STORAGE_H_REMINDER, isActive ? 'true' : 'false');

    return isActive;
}

/**
 * 初始化标题小圆点状态
 */
async function initHReminderState() {
    // 从本地存储读取状态
    let storedState = window.siyuan?.storage[window.theme.IDs.LOCAL_STORAGE_H_REMINDER];
    if (!storedState) {
        storedState = localStorage.getItem(window.theme.IDs.LOCAL_STORAGE_H_REMINDER);
    }

    if (storedState === 'true') {
        const styleId = 'snippetCSS-tsundoku-h-reminder';
        if (!document.getElementById(styleId)) {
            // 创建style标签并直接写入CSS内容
            const style = document.createElement('style');
            style.id = styleId;
            style.type = 'text/css';
            style.textContent = `
:root {
	--h1-list-graphic: var(--custom-h1-color, #0f4c81);
	--h2-list-graphic: var(--custom-h2-color, #083256);
	--h3-list-graphic: var(--custom-h3-color, #63a4c1);
	--h4-list-graphic: var(--custom-h4-color, #71a796);
	--h5-list-graphic: var(--custom-h5-color, #3b51a4);
	--h6-list-graphic: var(--custom-h6-color, #dda36a);
}

.protyle-wysiwyg .h1>[spellcheck]:not(:empty)::after {
	content: "";
	position: absolute;
	float: left;
	margin-left: 5px;
	height: 0.45em;
	width: 0.15em;
	bottom: 40%;
	border-radius: 3px;
	background-color: var(--h1-list-graphic);
	opacity: 0.5;
}

.protyle-wysiwyg [data-node-id].li>.protyle-action~.h1>[spellcheck]::after {
	bottom: 40%;
}

.protyle-wysiwyg .h2>[spellcheck]:not(:empty)::after {
	content: "";
	position: absolute;
	float: left;
	margin-left: 5px;
	height: 0.16em;
	width: 0.16em;
	bottom: 40%;
	border-radius: 3px;
	background-color: var(--h2-list-graphic);
	opacity: 0.5;
	box-shadow: 0.25em 0.25em 0 0 var(--h2-list-graphic);
}

.protyle-wysiwyg [data-node-id].li>.protyle-action~.h2>[spellcheck]::after {
	bottom: 40%;
}

.protyle-wysiwyg .h3>[spellcheck]:not(:empty)::after {
	content: "";
	position: absolute;
	float: left;
	margin-left: 5px;
	height: 0.16em;
	width: 0.16em;
	bottom: 40%;
	border-radius: 3px;
	background-color: var(--h3-list-graphic);
	opacity: 0.5;
	box-shadow: 0.25em 0.25em 0 0 var(--h3-list-graphic), 0 0.25em 0 0 var(--h3-list-graphic);
}

.protyle-wysiwyg .h4>[spellcheck]:not(:empty)::after {
	content: "";
	position: absolute;
	float: left;
	margin-left: 5px;
	height: 0.15em;
	width: 0.15em;
	bottom: 40%;
	border-radius: 3px;
	background-color: var(--h4-list-graphic);
	opacity: 0.5;
	box-shadow: 0.25em 0.25em 0 0 var(--h4-list-graphic), 0 0.25em 0 0 var(--h4-list-graphic), 0.25em 0 0 0 var(--h4-list-graphic);
}

.protyle-wysiwyg .h5>[spellcheck]:not(:empty)::after {
	content: "";
	position: absolute;
	float: left;
	margin-left: 5px;
	height: 0.15em;
	width: 0.15em;
	bottom: 40%;
	border-radius: 3px;
	background-color: var(--h5-list-graphic);
	opacity: 0.5;
	box-shadow: 0.25em 0.25em 0 0 var(--h5-list-graphic), 0 0.25em 0 0 var(--h5-list-graphic), 0.25em 0 0 0 var(--h5-list-graphic), 0 -0.25em 0 0 var(--h5-list-graphic);
}

.protyle-wysiwyg .h6>[spellcheck]:not(:empty)::after {
	content: "";
	position: absolute;
	float: left;
	margin-left: 5px;
	height: 0.15em;
	width: 0.15em;
	bottom: 40%;
	border-radius: 3px;
	background-color: var(--h6-list-graphic);
	opacity: 0.5;
	box-shadow: 0.25em 0.25em 0 0 var(--h6-list-graphic), 0 0.25em 0 0 var(--h6-list-graphic), 0.25em 0 0 0 var(--h6-list-graphic), 0 -0.25em 0 0 var(--h6-list-graphic), 0.25em -0.25em 0 0 var(--h6-list-graphic);
}

.h-reminder-disabled .protyle-wysiwyg .h1>[spellcheck]:not(:empty)::after,
.h-reminder-disabled .protyle-wysiwyg .h2>[spellcheck]:not(:empty)::after,
.h-reminder-disabled .protyle-wysiwyg .h3>[spellcheck]:not(:empty)::after,
.h-reminder-disabled .protyle-wysiwyg .h4>[spellcheck]:not(:empty)::after,
.h-reminder-disabled .protyle-wysiwyg .h5>[spellcheck]:not(:empty)::after,
.h-reminder-disabled .protyle-wysiwyg .h6>[spellcheck]:not(:empty)::after {
    display: none !important;
}
`;
            document.head.appendChild(style);
        }
        return true;
    }
    return false;
}

/**
 * 自动初始化标题小圆点（在主题启动时调用）
 */
async function autoInitHReminder() {
    // 从本地存储读取状态
    let storedState = window.siyuan?.storage[window.theme.IDs.LOCAL_STORAGE_H_REMINDER];
    if (!storedState) {
        storedState = localStorage.getItem(window.theme.IDs.LOCAL_STORAGE_H_REMINDER);
    }

    if (storedState === 'true') {
        const styleId = 'snippetCSS-tsundoku-h-reminder';
        if (!document.getElementById(styleId)) {
            console.log('自动启用标题小圆点');
            // 创建style标签并直接写入CSS内容
            const style = document.createElement('style');
            style.id = styleId;
            style.type = 'text/css';
            style.textContent = `
:root {
	--h1-list-graphic: var(--custom-h1-color, #0f4c81);
	--h2-list-graphic: var(--custom-h2-color, #083256);
	--h3-list-graphic: var(--custom-h3-color, #63a4c1);
	--h4-list-graphic: var(--custom-h4-color, #71a796);
	--h5-list-graphic: var(--custom-h5-color, #3b51a4);
	--h6-list-graphic: var(--custom-h6-color, #dda36a);
}

.protyle-wysiwyg .h1>[spellcheck]:not(:empty)::after {
	content: "";
	position: absolute;
	float: left;
	margin-left: 5px;
	height: 0.45em;
	width: 0.15em;
	bottom: 40%;
	border-radius: 3px;
	background-color: var(--h1-list-graphic);
	opacity: 0.5;
}

.protyle-wysiwyg [data-node-id].li>.protyle-action~.h1>[spellcheck]::after {
	bottom: 40%;
}

.protyle-wysiwyg .h2>[spellcheck]:not(:empty)::after {
	content: "";
	position: absolute;
	float: left;
	margin-left: 5px;
	height: 0.16em;
	width: 0.16em;
	bottom: 40%;
	border-radius: 3px;
	background-color: var(--h2-list-graphic);
	opacity: 0.5;
	box-shadow: 0.25em 0.25em 0 0 var(--h2-list-graphic);
}

.protyle-wysiwyg [data-node-id].li>.protyle-action~.h2>[spellcheck]::after {
	bottom: 40%;
}

.protyle-wysiwyg .h3>[spellcheck]:not(:empty)::after {
	content: "";
	position: absolute;
	float: left;
	margin-left: 5px;
	height: 0.16em;
	width: 0.16em;
	bottom: 40%;
	border-radius: 3px;
	background-color: var(--h3-list-graphic);
	opacity: 0.5;
	box-shadow: 0.25em 0.25em 0 0 var(--h3-list-graphic), 0 0.25em 0 0 var(--h3-list-graphic);
}

.protyle-wysiwyg .h4>[spellcheck]:not(:empty)::after {
	content: "";
	position: absolute;
	float: left;
	margin-left: 5px;
	height: 0.15em;
	width: 0.15em;
	bottom: 40%;
	border-radius: 3px;
	background-color: var(--h4-list-graphic);
	opacity: 0.5;
	box-shadow: 0.25em 0.25em 0 0 var(--h4-list-graphic), 0 0.25em 0 0 var(--h4-list-graphic), 0.25em 0 0 0 var(--h4-list-graphic);
}

.protyle-wysiwyg .h5>[spellcheck]:not(:empty)::after {
	content: "";
	position: absolute;
	float: left;
	margin-left: 5px;
	height: 0.15em;
	width: 0.15em;
	bottom: 40%;
	border-radius: 3px;
	background-color: var(--h5-list-graphic);
	opacity: 0.5;
	box-shadow: 0.25em 0.25em 0 0 var(--h5-list-graphic), 0 0.25em 0 0 var(--h5-list-graphic), 0.25em 0 0 0 var(--h5-list-graphic), 0 -0.25em 0 0 var(--h5-list-graphic);
}

.protyle-wysiwyg .h6>[spellcheck]:not(:empty)::after {
	content: "";
	position: absolute;
	float: left;
	margin-left: 5px;
	height: 0.15em;
	width: 0.15em;
	bottom: 40%;
	border-radius: 3px;
	background-color: var(--h6-list-graphic);
	opacity: 0.5;
	box-shadow: 0.25em 0.25em 0 0 var(--h6-list-graphic), 0 0.25em 0 0 var(--h6-list-graphic), 0.25em 0 0 0 var(--h6-list-graphic), 0 -0.25em 0 0 var(--h6-list-graphic), 0.25em -0.25em 0 0 var(--h6-list-graphic);
}

.h-reminder-disabled .protyle-wysiwyg .h1>[spellcheck]:not(:empty)::after,
.h-reminder-disabled .protyle-wysiwyg .h2>[spellcheck]:not(:empty)::after,
.h-reminder-disabled .protyle-wysiwyg .h3>[spellcheck]:not(:empty)::after,
.h-reminder-disabled .protyle-wysiwyg .h4>[spellcheck]:not(:empty)::after,
.h-reminder-disabled .protyle-wysiwyg .h5>[spellcheck]:not(:empty)::after,
.h-reminder-disabled .protyle-wysiwyg .h6>[spellcheck]:not(:empty)::after {
    display: none !important;
}
`;
            document.head.appendChild(style);
        }
    }
}

/**++++++++++++++++++++++++++++++++主题功能执行：按需调用+++++++++++++++++++++++++++ */
window.theme.timerIds = [];

(async () => {
    // 各种列表转 xx
    ClickMonitor();
    /* 创建主题按钮 */
    create_theme_button();
    create_theme_button2();

    // 自动初始化垂直页签状态
    await autoInitVerticalTab();

    // 自动初始化标题小圆点状态
    await autoInitHReminder();

    const linkIconFilterInterval = setInterval(link_icon_filter, 100);
    window.theme.timerIds.push(linkIconFilterInterval);

})();

function clearAllTimers() {
    window.theme.timerIds.forEach(timerId => {
        clearInterval(timerId);
    });
    // 清空数组
    window.theme.timerIds.length = 0;
}

window.destroyTheme = () => {
    // 删除主题切换按钮
    const themeButton = document.getElementById(window.theme.IDs.BUTTON_TOOLBAR_CHANGE_COLOR);
    if (themeButton) {
        themeButton.remove();
    }
    // 删除主题加载的额外配色 css
    let css_link = document.getElementById(window.theme.IDs.STYLE_COLOR);
    if (css_link) {
        css_link.remove();
    }

    // 删除新的主题功能按钮
    const themeColorButton = document.getElementById('tsundoku-theme-color-button');
    if (themeColorButton) {
        themeColorButton.remove();
    }

    const verticalTabButton = document.getElementById('tsundoku-vertical-tab-button');
    if (verticalTabButton) {
        verticalTabButton.remove();
    }

    // 删除标题小圆点按钮
    const hReminderButton = document.getElementById('tsundoku-h-reminder-button');
    if (hReminderButton) {
        hReminderButton.remove();
    }

    // 删除我们添加的分割线
    const themeSeparator = document.querySelector('.b3-menu__separator[data-tsundoku="theme-separator"]');
    if (themeSeparator) {
        themeSeparator.remove();
    }

    // 删除垂直页签相关元素并恢复宽度
    removeTabbarResizer();
    const verticalTabCSS = document.getElementById('tsundoku-vertical-tab-css');
    if (verticalTabCSS) {
        verticalTabCSS.remove();
    }

    // 删除标题小圆点CSS
    const hReminderCSS = document.getElementById('snippetCSS-tsundoku-h-reminder');
    if (hReminderCSS) {
        hReminderCSS.remove();
    }



    // 删除观察器
    if (window.theme.commonMenuObserver) {
        window.theme.commonMenuObserver.disconnect();
        window.theme.commonMenuObserver = null;
    }
    if (window.theme.menuWaitObserver) {
        window.theme.menuWaitObserver.disconnect();
        window.theme.menuWaitObserver = null;
    }

    // 删除列表转导图功能
    window.removeEventListener('mouseup', MenuShow);

    clearAllTimers();
};