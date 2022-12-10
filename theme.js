/**目标：能跑就行 */

const HBuiderXToolbarID = "HBuiderXToolbar";
const SiYuanToolbarID = "toolbar";

const SidebarHoverButtonID = "sidebarHoverButton";
const HighlightBecomesHiddenID = "highlightBecomesHidden";
const QuickDropDownID = "quickDropDown";
const FocusingOnAmplification = "FocusingOnAmplification";

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
/*创建HBuiderX主题工具栏区域*/
function createHBuiderXToolbar() {
	siYuanToolbar = getSiYuanToolbar();

	HBuiderXToolbar = getHBuiderXToolbar();
	var windowControls = document.getElementById("barSetting");

	if (HBuiderXToolbar) siYuanToolbar.removeChild(HBuiderXToolbar);
	HBuiderXToolbar = insertCreateAfter(
		windowControls,
		"div",
		HBuiderXToolbarID
	);	
}

/**------------------边栏鼠标悬浮展开按钮-----------------*/
/*创建边栏鼠标悬浮展开按钮*/
function createSidebarMouseHoverExpandButton() {
	sidebarHoverButton = addinsertCreateElement(
		HBuiderXToolbar,
		"div",
		SidebarHoverButtonID
	);
	sidebarHoverButton.setAttribute("title", "开启后左右面板自动关闭。");
	addSidebarHoverButtonEven(
		sidebarHoverButtonImplementEven
	); /*为此按钮注册点击事件 */
}

/*SidebarHoverButton按钮添加监听事件*/
function addSidebarHoverButtonEven(fun) {
	AddEvent(sidebarHoverButton, "mousedown", fun);
}

/*SidebarHoverButton 按钮点击后执行事件*/
function sidebarHoverButtonImplementEven() {
	loadStyle(
		"/appearance/themes/Tsundoku Light/style/topbar.css",
		"topbarCss"
	);

	/**获取区域主体 */
	var column = document.querySelectorAll("#layouts>div.fn__flex.fn__flex-1")[0];

	/**左区域 */
	if (!left_fn__flex_column) left_fn__flex_column = column.firstElementChild;
	/**右区域 */
	if (!right_fn__flex_column) right_fn__flex_column = column.lastElementChild;

	sidebarHoverButton.onclick = function () {
		if (flag) {
			if (!LeftHoverBlock) createHoverBlock();

			if (
				"0px" != left_fn__flex_column.style.width &&
				"0px" != right_fn__flex_column.style.width
			) {
				closeLeftPanel();
				closeRightPanel();
				bar = "11";
			} else if (
				"0px" != left_fn__flex_column.style.width &&
				"0px" == right_fn__flex_column.style.width
			) {
				closeLeftPanel();
				bar = "10";
			} else if (
				"0px" == left_fn__flex_column.style.width &&
				"0px" != right_fn__flex_column.style.width
			) {
				closeRightPanel();
				bar = "01";
			} else {
				bar = "00";
			}

			sidebarHoverButton.classList.add("active");
			flag = false;
			sidebarHoverButton.style.backgroundColor =
				"var(--b3-theme-background-light)";
			sidebarHoverButton.style.backgroundImage =
				"url(/appearance/themes/Tsundoku Light/src/sidebar.svg)";
			// console.log(flag);
		} else {
			if (bar == "11") {
				openLeftPanel();
				openRightPanel();
			} else if (bar == "10") {
				openLeftPanel();
			} else if (bar == "01") {
				openRightPanel();
			}

			HBuiderXToolbar.removeChild(LeftHoverBlock);
			HBuiderXToolbar.removeChild(RightHoverBlock);

			LeftHoverBlock = null;
			RightHoverBlock = null;
			sidebarHoverButton.classList.remove("active");
			flag = true;
			sidebarHoverButton.style.backgroundColor = "transparent";
			sidebarHoverButton.style.backgroundImage =
				"url(/appearance/themes/Tsundoku Light/src/sidebar.svg)";
			// console.log(flag);
		}
	};
}

/*在左右面板打开鼠标触发块*/
function createHoverBlock() {
	LeftHoverBlock = addinsertCreateElement(
		HBuiderXToolbar,
		"div",
		"LeftHoverBlock"
	);
	LeftHoverBlock.setAttribute("display", "block");

	RightHoverBlock = addinsertCreateElement(
		HBuiderXToolbar,
		"div",
		"RightHoverBlock"
	);
	RightHoverBlock.setAttribute("display", "block");
}

/*左面板关闭*/
function closeLeftPanel() {
	if ("0px" != left_fn__flex_column.style.width) {
		left_fn__flex_column_Width_Str = left_fn__flex_column.style.width;
		left_fn__flex_column.style.width = "0px";
		left_fn__flex_column.style.position = "fixed";
		left_fn__flex_column.style.zIndex = "-11";

		/*解绑触发块鼠标进入，面板关闭事件 */
		myRemoveEvent(LeftHoverBlock, "mouseover", closeLeftPanel);
		/*注册触发块鼠标进入，面板打开事件 */
		AddEvent(LeftHoverBlock, "mouseover", openLeftPanel);

		/*移动触发块位置，等待触发面板打开 */
		LeftHoverBlock.style.width = "12px";
		LeftHoverBlock.style.left = "0px";
		LeftHoverBlock.style.right = "auto";
		LeftHoverBlock.style.height = "100%";

		if (right_fn__flex_column.style.width == "0px") {
			RightHoverBlock.style.right = "0px";
			RightHoverBlock.style.left = "auto";
		} else {
			RightHoverBlock.style.left = "0px";
		}
	}
}

/*左面板展开*/
function openLeftPanel() {
	if ("0px" != left_fn__flex_column_Width_Str) {
		left_fn__flex_column.style.width = left_fn__flex_column_Width_Str;
		left_fn__flex_column.style.position = "static";
		left_fn__flex_column.style.zIndex = "2";

		/*解绑触发块鼠标进入，面板打开事件 */
		myRemoveEvent(LeftHoverBlock, "mouseover", openLeftPanel);
		/*注册触发块鼠标进入，面板关闭事件 */
		AddEvent(LeftHoverBlock, "mouseover", closeLeftPanel);

		/*移动触发块位置，等待触发面板关闭 */
		LeftHoverBlock.style.width = "400px";
		LeftHoverBlock.style.left = "auto";
		LeftHoverBlock.style.right =
			parseFloat(right_fn__flex_column.style.width) + 25 + "px";
		LeftHoverBlock.style.height = "200px";

		if (right_fn__flex_column.style.width != "0px") {
			RightHoverBlock.style.left =
				parseFloat(left_fn__flex_column_Width_Str) + 25 + "px";
		}
	}
}

/*右面板关闭*/
function closeRightPanel() {
	if ("0px" != right_fn__flex_column.style.width) {
		right_fn__flex_column_Width_Str = right_fn__flex_column.style.width;
		right_fn__flex_column.style.width = "0px";
		right_fn__flex_column.style.position = "fixed";
		right_fn__flex_column.style.zIndex = "-11";

		/*解绑触发块鼠标进入，面板关闭事件 */
		myRemoveEvent(RightHoverBlock, "mouseover", closeRightPanel);
		/*注册触发块鼠标进入，面板打开事件 */
		AddEvent(RightHoverBlock, "mouseover", openRightPanel);

		/*移动触发块位置，等待触发面板打开 */
		RightHoverBlock.style.width = "12px";
		RightHoverBlock.style.height = "100%";
		RightHoverBlock.style.right = "0px";
		RightHoverBlock.style.left = "auto";

		if (left_fn__flex_column.style.width == "0px") {
			LeftHoverBlock.style.left = "0px";
			LeftHoverBlock.style.right = "auto";
		} else {
			LeftHoverBlock.style.right = "0px";
		}
	}
}

/*右面板展开*/
function openRightPanel() {
	if ("0px" != right_fn__flex_column_Width_Str) {
		right_fn__flex_column.style.width = right_fn__flex_column_Width_Str;
		right_fn__flex_column.style.position = "static";
		right_fn__flex_column.style.zIndex = "0";

		/*解绑触发块鼠标进入，面板打开事件 */
		myRemoveEvent(RightHoverBlock, "mouseover", openRightPanel);
		/*注册触发块鼠标进入，面板关闭事件 */
		AddEvent(RightHoverBlock, "mouseover", closeRightPanel);

		/*移动触发块位置，等待触发面板关闭 */
		RightHoverBlock.style.width = "400px";
		RightHoverBlock.style.right = "auto";
		RightHoverBlock.style.left =
			parseFloat(left_fn__flex_column.style.width) + 25 + "px";
		RightHoverBlock.style.height = "200px";

		if (left_fn__flex_column.style.width != "0px") {
			LeftHoverBlock.style.right =
				parseFloat(right_fn__flex_column_Width_Str) + 25 + "px";
		}
	}
}

/**------------------高亮变隐藏按钮-----------------*/

function createHighlightBecomesHidden() {
	loadStyle("/appearance/themes/Tsundoku Light/style/mark-display.css", "markCss");

	highlightBecomesHiddenButton = addinsertCreateElement(
		HBuiderXToolbar,
		"div",
		HighlightBecomesHiddenID
	);
	highlightBecomesHiddenButton.setAttribute('title', '开启后隐藏CTRL+E文本');

	AddEvent(
		highlightBecomesHiddenButton,
		"mousedown",
		highlightBecomesHiddenButtonClickEven
	); /*为此按钮注册点击事件 */
}

/*切换mark标签外部css样式,以达到高亮变隐藏的效果 */
function highlightBecomesHiddenButtonClickEven() {
	var obj = document.getElementById("markCss");

	if (
		obj.getAttribute("href") !=
		"/appearance/themes/Tsundoku Light/style/mark-display.css"
	) {
		obj.setAttribute(
			"href",
			"/appearance/themes/Tsundoku Light/style/mark-display.css"
		);
		highlightBecomesHiddenButton.style.backgroundColor = "transparent";
		highlightBecomesHiddenButton.style.backgroundImage =
			"url(/appearance/themes/Tsundoku Light/src/highlight.svg)";
	} else {
		obj.setAttribute(
			"href",
			"/appearance/themes/Tsundoku Light/style/mark-hide.css"
		);
		highlightBecomesHiddenButton.style.backgroundColor =
			"var(--b3-theme-background-light)";
		highlightBecomesHiddenButton.style.backgroundImage =
			"url(/appearance/themes/Tsundoku Light/src/highlight.svg)";
	}
}

/**------------------为打开文档的标题下显示文档创建日期------------- */

function showDocumentCreationDate() {
	setInterval(DocumentCreationDate, 300); /**块级计数 */
}

function DocumentCreationDate() {
	var allDocumentTitleElement = getAllDocumentTitleElement();

	for (let index = 0; index < allDocumentTitleElement.length; index++) {
		const element = allDocumentTitleElement[index];

		var documentCreatTimeElement = creatTimeSpanElement(element.parentElement);

		var spanTxt = documentCreatTimeElement.innerText;

		if (spanTxt == "" || spanTxt == "日期获取中……") {
			var documentCreatTimeTxt = getDocumentTime(element);
			documentCreatTimeElement.innerText = documentCreatTimeTxt;
		}
	}
}

/**获取所有打开文档的标题元素 */
function getAllDocumentTitleElement() {
	return document.querySelectorAll(".protyle-title__input");
}

/**为文档标题元素下创建时间容器元素 */
function creatTimeSpanElement(tilteElement) {
	var item = tilteElement.children;

	for (let index = 0; index < item.length; index++) {
		const element = item[index];

		if (element.getAttribute("documentCreatTimeElement") != null) {
			return element;
		}
	}

	var documentCreatTimeElement = addinsertCreateElement(tilteElement, "span");
	documentCreatTimeElement.setAttribute("documentCreatTimeElement", "true");
	documentCreatTimeElement.style.display = "block";

	documentCreatTimeElement.style.marginLeft = "7px";
	documentCreatTimeElement.style.marginBottom = "0px";

	documentCreatTimeElement.style.fontSize = "61%";
	documentCreatTimeElement.style.color = "#767676";

	return documentCreatTimeElement;
}

/**获得这个文档的创建时间 */
function getDocumentTime(tilteElement) {
	var tS =
		tilteElement.parentElement.previousElementSibling.getAttribute(
			"data-node-id"
		);

	if (tS == null) {
		return "日期获取中……";
	}
	var year = tS.substring(0, 4);
	var moon = tS.substring(4, 6);
	var day = tS.substring(6, 8);
	var hour = tS.substring(8, 10);
	var minute = tS.substring(10, 12);
	var second = tS.substring(12, 14);

	return (
		"Created at " +
		year +
		"-" +
		moon +
		"-" +
		day +
		"  " +
		hour +
		":" +
		minute +
		":" +
		second
	);
	/*return year+"年"+moon+"月"+day+"日"+hour+"时"+minute+"分"+second+"秒";*/
}
/**
 * 向body注入新style覆盖原本的css
 * @param {css文本字符串} csstxt
 */
function injectionCss(csstxt) {
	var styleElement = document.createElement("style");
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
	if (!fatherElement) console.error("指定元素对象不存在！");
	if (!addElementTxt) console.error("未指定字符串！");

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
	if (!targetElement) console.error("指定元素对象不存在！");
	if (!addElementTxt) console.error("未指定字符串！");

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
	if (!targetElement) console.error("指定元素对象不存在！");
	if (!addElementTxt) console.error("未指定字符串！");

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
		element.attachEvent("on" + strType, fun);
		//如果都没有则使用 元素.事件属性这个基本方法
	} else {
		element["on" + strType] = fun;
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
		element.detachEvent("on" + strType, fun);
		//如果都没有则使用 元素.事件属性这个基本方法
	} else {
		//删除事件用null
		element["on" + strType] = null;
	}
}

/**
 * 加载脚本文件
 * @param {string} url 脚本地址
 * @param {string} type 脚本类型
 */
function loadScript(url, type = "module") {
	let script = document.createElement("script");
	if (type) script.setAttribute("type", type);
	script.setAttribute("src", url);
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
function loadStyle(url, id) {
	var headElement = document.head;

	if (!id) console.error("未指定外部css文件引入ID");

	let style = document.getElementById(id);
	if (style) headElement.removeChild(style);

	style = document.createElement("link");

	style.id = id;
	style.setAttribute("type", "text/css");
	style.setAttribute("rel", "stylesheet");
	style.setAttribute("href", url);
	headElement.appendChild(style);
}

/**
 *
 * @param {*} 内容块id
 * @param {*} 属性对象
 * @returns
 */
async function 设置思源块属性(内容块id, 属性对象) {
	let url = "/api/attr/setBlockAttrs";
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
		method: "POST",
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
	let button = document.createElement("button");
	button.id = "viewselect";
	button.className = "b3-menu__item";
	button.innerHTML =
		'<svg class="b3-menu__icon" style="null"><use xlink:href="#iconGlobalGraph"></use></svg><span class="b3-menu__label" style="">视图选择</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="null"><use xlink:href="#iconRight"></use></svg></button>';
	button.appendChild(SubMenu(selectid, selecttype));
	return button;
}

function SubMenu(selectid, selecttype, className = "b3-menu__submenu") {
	let node = document.createElement("div");
	node.className = className;
	if (selecttype == "NodeList") {
		node.appendChild(GraphView(selectid));
		node.appendChild(TableView(selectid));
		node.appendChild(kanbanView(selectid));
		node.appendChild(DefaultView(selectid));
	}
	if (selecttype == "NodeTable") {
		node.appendChild(FixWidth(selectid));
		node.appendChild(AutoWidth(selectid));
		node.appendChild(Removeth(selectid));
		node.appendChild(Defaultth(selectid));
	}
	return node;
}

function GraphView(selectid) {
	let button = document.createElement("button");
	button.className = "b3-menu__item";
	button.setAttribute("data-node-id", selectid);
	button.setAttribute("custom-attr-name", "f");
	button.setAttribute("custom-attr-value", "dt");

	button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFiles"></use></svg><span class="b3-menu__label">转换为导图</span>`;
	button.onclick = ViewMonitor;
	return button;
}
function TableView(selectid) {
	let button = document.createElement("button");
	button.className = "b3-menu__item";
	button.setAttribute("data-node-id", selectid);
	button.setAttribute("custom-attr-name", "f");
	button.setAttribute("custom-attr-value", "bg");

	button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">转换为表格</span>`;
	button.onclick = ViewMonitor;
	return button;
}
function kanbanView(selectid) {
	let button = document.createElement("button");
	button.className = "b3-menu__item";
	button.setAttribute("data-node-id", selectid);
	button.setAttribute("custom-attr-name", "f");
	button.setAttribute("custom-attr-value", "kb");

	button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconMenu"></use></svg><span class="b3-menu__label">转换为看板</span>`;
	button.onclick = ViewMonitor;
	return button;
}
function DefaultView(selectid) {
	let button = document.createElement("button");
	button.className = "b3-menu__item";
	button.onclick = ViewMonitor;
	button.setAttribute("data-node-id", selectid);
	button.setAttribute("custom-attr-name", "f");
	button.setAttribute("custom-attr-value", "");

	button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconList"></use></svg><span class="b3-menu__label">恢复为列表</span>`;
	return button;
}
function FixWidth(selectid) {
	let button = document.createElement("button");
	button.className = "b3-menu__item";
	button.onclick = ViewMonitor;
	button.setAttribute("data-node-id", selectid);
	button.setAttribute("custom-attr-name", "f");
	button.setAttribute("custom-attr-value", "");

	button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">页面宽度</span>`;
	return button;
}
function AutoWidth(selectid) {
	let button = document.createElement("button");
	button.className = "b3-menu__item";
	button.setAttribute("data-node-id", selectid);
	button.setAttribute("custom-attr-name", "f");
	button.setAttribute("custom-attr-value", "auto");
	button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">自动宽度</span>`;
	button.onclick = ViewMonitor;
	return button;
}
function Removeth(selectid) {
	let button = document.createElement("button");
	button.className = "b3-menu__item";
	button.onclick = ViewMonitor;
	button.setAttribute("data-node-id", selectid);
	button.setAttribute("custom-attr-name", "t");
	button.setAttribute("custom-attr-value", "biaotou");

	button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">取消表头样式</span>`;
	return button;
}
function Defaultth(selectid) {
	let button = document.createElement("button");
	button.className = "b3-menu__item";
	button.setAttribute("data-node-id", selectid);
	button.setAttribute("custom-attr-name", "t");
	button.setAttribute("custom-attr-value", "");
	button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">默认表头样式</span>`;
	button.onclick = ViewMonitor;
	return button;
}
function MenuSeparator(className = "b3-menu__separator") {
	let node = document.createElement("button");
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
	let node_list = document.querySelectorAll(".protyle-wysiwyg--select");
	if (node_list.length === 1 && node_list[0].dataset.nodeId != null)
		return {
			id: node_list[0].dataset.nodeId,
			type: node_list[0].dataset.type,
			subtype: node_list[0].dataset.subtype,
		};
	return null;
}

function ClickMonitor() {
	window.addEventListener("mouseup", MenuShow);
}

function MenuShow() {
	setTimeout(() => {
		let selectinfo = getBlockSelected();
		if (selectinfo) {
			let selecttype = selectinfo.type;
			let selectid = selectinfo.id;
			if (selecttype == "NodeList" || selecttype == "NodeTable") {
				setTimeout(() => InsertMenuItem(selectid, selecttype), 0);
			}
		}
	}, 0);
}

function InsertMenuItem(selectid, selecttype) {
	let commonMenu = document.getElementById("commonMenu");
	let readonly = commonMenu.querySelector(".b3-menu__item--readonly");
	let selectview = commonMenu.querySelector('[id="viewselect"]');
	if (readonly) {
		if (!selectview) {
			commonMenu.insertBefore(ViewSelect(selectid, selecttype), readonly);
			commonMenu.insertBefore(MenuSeparator(), readonly);
		}
	}
}

function ViewMonitor(event) {
	let id = event.currentTarget.getAttribute("data-node-id");
	let attrName =
		"custom-" + event.currentTarget.getAttribute("custom-attr-name");
	let attrValue = event.currentTarget.getAttribute("custom-attr-value");
	let blocks = document.querySelectorAll(
		`.protyle-wysiwyg [data-node-id="${id}"]`
	);
	if (blocks) {
		blocks.forEach((block) => block.setAttribute(attrName, attrValue));
	}
	let attrs = {};
	attrs[attrName] = attrValue;
	设置思源块属性(id, attrs);
}

(function (w, und) {
	Refresh();
})(window, undefined);

function Refresh() {
	setTimeout(() => {
		createHBuiderXToolbar(); /*创建BuiderXToolbar*/

		createSidebarMouseHoverExpandButton(); /*创建鼠标移动展开左右树面板按钮*/
		createHighlightBecomesHidden(); /*创建高亮变隐藏按钮 */

		loadStyle(
			"/appearance/themes/Tsundoku Light/style/topbar.css",
			"topbarCss"
		);

		setTimeout(() => ClickMonitor(), 3000); /*各种列表转xx */

		showDocumentCreationDate(); /**为打开文档标题下面显示文档创建日期 */

		console.log(
			"==============>HBuilderX-Light:CSS,JS_已经执行<=============="
		);
	}, 500);
}

window.theme = {};

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
		case url.startsWith("//"):
			url = new URL(`https:${url}`);
			break;
		case url.startsWith("http://"):
		case url.startsWith("https://"):
			url = new URL(url);
			break;
		case url.startsWith("/"):
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
	let meta = document.createElement("meta");
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
window.theme.loadScript = function (
	src,
	type = "module",
	async = false,
	defer = false
) {
	let script = document.createElement("script");
	if (type) script.setAttribute("type", type);
	if (async) script.setAttribute("async", true);
	if (defer) script.setAttribute("defer", true);
	script.setAttribute("src", src);
	document.head.appendChild(script);
};

/**
 * 加载样式文件
 * @params {string} href 样式地址
 * @params {string} id 样式 ID
 */
window.theme.loadStyle = function (href, id = null) {
	let style = document.createElement("link");
	if (id) style.setAttribute("id", id);
	style.setAttribute("type", "text/css");
	style.setAttribute("rel", "stylesheet");
	style.setAttribute("href", href);
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
		style.setAttribute("href", href);
	} else {
		window.theme.loadStyle(href, id);
	}
};

window.theme.ID_COLOR_STYLE = "theme-color-style";
window.theme.ID_CUSTOM_STYLE = "custom-color-style";

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
			return "light";
		case 1:
			return "dark";
		default:
			return null;
	}
})();

/**
 * 获取客户端模式
 * @return {string} 'app' 或 'desktop' 或 'mobile'
 */
window.theme.clientMode = (() => {
	let url = new URL(window.location.href);
	switch (true) {
		case url.pathname.startsWith("/stage/build/app"):
			return "app";
		case url.pathname.startsWith("/stage/build/desktop"):
			return "desktop";
		case url.pathname.startsWith("/stage/build/mobile"):
			return "mobile";
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

/**
 * 更换主题模式
 * @params {string} lightStyle 浅色主题配置文件路径
 * @params {string} darkStyle 深色主题配置文件路径
 * @params {string} customLightStyle 浅色主题自定义配置文件路径
 * @params {string} customDarkStyle 深色主题自定义配置文件路径
 */
window.theme.changeThemeMode = function (
	lightStyle,
	darkStyle,
	customLightStyle,
	customDarkStyle
) {
	let href_color = null;
	let href_custom = null;
	switch (window.theme.themeMode) {
		case "light":
			href_color = lightStyle;
			href_custom = customLightStyle;
			break;
		case "dark":
		default:
			href_color = darkStyle;
			href_custom = customDarkStyle;
			break;
	}
	window.theme.updateStyle(window.theme.ID_COLOR_STYLE, href_color);
	window.theme.updateStyle(window.theme.ID_CUSTOM_STYLE, href_custom);
};

/* 加载 HTML 块中使用的小工具 */
window.theme.loadScript(
	"/appearance/themes/Tsundoku Light/script/module/html.js",
	"text/javascript"
);

window.theme.loadScript(
	"/appearance/themes/Tsundoku Light/script/module/window.js"
);
window.theme.loadScript(
	"/appearance/themes/Tsundoku Light/script/module/doc.js"
);
