### LP的h5比其他h5多一点东西

    1. LP的h5，添加渠道统计，使用`send-track-min.js`
    2. LP的地址不是使用“上海市”这样的文字，而是使用自己的一套编码。使用`province_city_dist.min.js` 配合 `lparea.min.js`，保存用户的地址信息到LP服务器。
    3. 和LP服务器通信，使用`cjapp.min.js`
