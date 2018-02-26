var express = require('express')
var router = express.Router()
var fs = require('fs')
var PATH = './public/data/'
//配置文件路径

//读取数据模块
// data/red?type=it
// data/red?type=it.json
router.get('/read', function (req, res, next) {
    var type = req.param('type') || ''
    //获取url传递参数，如果用户没有传默认为空
    fs.readFile(PATH + type + '.json', function (err, data) {
        if (err) {
            return res.send({
                status: 0,
                info: '读取文件异常'
            })
        }
        var COUNT = 50;
        //最多返回50行数据
        var obj = []
        try {
            obj = JSON.parse(data.toString())
        } catch (e) {
            obj = []
        }
        //异常处理，如果文件存储不是json格式字符串(比如空)，会抛出异常

        if (obj.length > COUNT) {
            obj = obj.slice(0, COUNT)
            //返回前50行数据
        }
        return res.send({
            status: 1,
            data: obj
        })
    })

})

module.exports = router