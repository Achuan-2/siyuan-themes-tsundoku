
(async () => {

    window.addEventListener('keydown', function (event) {
        // 检查是否按下了 Alt 键和数字 5 键
        if (event.altKey && event.key === '5') {
            // 模拟按钮点击
            console.log('Alt + 5 被按下了!');
            dailynoteAddDatabase();
        }
    });

    async function dailynoteAddDatabase() {
        //设置日记自动存放的数据库块id   
        dbBlockId = '20240911002857-lgav146';
        // 获取当前选择笔记本
        boxid = window.siyuan.storage["local-dailynoteid"]

        // 调用/api/filetree/createDailyNote获得日记id
        const create_dailynote_result = await fetchSyncPost('/api/filetree/createDailyNote', { notebook: boxid, app: siyuan.ws.app.appId })
        const docID = create_dailynote_result.data.id;

        // 添加日记到数据库中
        const db = await getDataBySql(`SELECT * FROM blocks where type ='av' and id='${dbBlockId}'`);
        if (db.length === 0) error("未找到数据库文档块，请检查数据库文档块id是否正确");
        const avId = db.map(av => getDataAvIdFromHtml(av.markdown))[0];


        // 组装文档数据参数
        const srcs = {
            "id": docID,
            "isDetached": false,
        };
        const input = {
            "avID": avId,
            "blockID": dbBlockId,
            'srcs': srcs

        }
        const result = await fetchSyncPost('/api/av/addAttributeViewBlocks', input)
        //console.log(result);




        function getDataAvIdFromHtml(htmlString) {
            // 使用正则表达式匹配data-av-id的值
            const match = htmlString.match(/data-av-id="([^"]+)"/);
            if (match && match[1]) {
                return match[1]; // 返回匹配的值
            }
            return ""; // 如果没有找到匹配项，则返回空
        }
        async function getDataBySql(sql) {
            const result = await fetchSyncPost('/api/query/sql', { "stmt": sql });
            if (result.code !== 0) {
                console.error("查询数据库出错", result.msg);
                return [];
            }
            return result.data;
        }
        async function fetchSyncPost(url, data, returnType = 'json') {
            const init = {
                method: "POST",
            };
            if (data) {
                if (data instanceof FormData) {
                    init.body = data;
                } else {
                    init.body = JSON.stringify(data);
                }
            }
            try {
                const res = await fetch(url, init);
                const res2 = returnType === 'json' ? await res.json() : await res.text();
                return res2;
            } catch (e) {
                console.log(e);
                return returnType === 'json' ? { code: e.code || 1, msg: e.message || "", data: null } : "";
            }
        }

    }

})();
