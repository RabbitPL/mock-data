// 创建一个http server返回假数据
// 使用node框架：express(集成化较高，直接使用)、koa(可塑性更好，但是需要中间件)
// 创建package.json: npm init -y
// npm i express


//  服务器入口文件
const express = require('express');
const dayjs = require('dayjs');
const cities = require('./api/cities.json');
const search = require('./api/search.json');
const query = require('./api/query.json');
const schedule = require('./api/schedule.json');

const app = express();

// app请求方法，第一个参数为路径，第二个参数是callback
app.get('/', (request, response) => {
    response.status(200);
    response.send('hello express');
    response.end();
});

app.get('/rest/cities', (request, response) => {
    response.json({
        result: cities,
        msg: '数据请求成功'
    });
});

app.get('/rest/order', (request, response) => {
    const { date } = request.query;  
    return response.json({
        departTimeStr: '07:15',
        arriveTimeStr: '11:47',
        arriveDate: dayjs(date).valueOf(),
        durationStr: '4小时32分',
        price: 483.5,
    });
});

app.get('/rest/search', (request, response) => {
    const searchKey = request.query.key;
    search.dataMap.userInput = searchKey;
    response.json(search);
});
app.get('/rest/query', (request, response) => {
    response.json(query);
});
app.get('/rest/schedule', (request, response) => {
    response.json(schedule);
});
app.get('/rest/ticket', (request, response) => {
    const { date } = request.query;
    response.json({
        detail: {
            departTimeStr: '07:15',
            arriveTimeStr: '11:47',
            arriveDate: new Date(date).getTime(),
            durationStr: '4小时32分'
        },
        candidates: [{
            type: '二等座',
            priceMsg: '443.5',
            ticketsLeft: '有票',
            channels: [{
                name: '快速预订',
                desc: '含40元出行保障 快速出票 迅捷无忧'
            }, {
                name: '普通预订',
                desc: '出票较慢，高峰期需要排队'
            }]
        }, {
            type: '一等座',
            priceMsg: '748.5',
            ticketsLeft: '有票',
            channels: [{
                name: '快速预订',
                desc: '含40元出行保障 快速出票 迅捷无忧'
            }, {
                name: '普通预订',
                desc: '出票较慢，高峰期需要排队'
            }]
        }, {
            type: '商务座',
            priceMsg: '1403.5',
            ticketsLeft: '5张',
            channels: [{
                name: '快速预订',
                desc: '含40元出行保障 快速出票 迅捷无忧'
            }, {
                name: '普通预订',
                desc: '出票较慢，高峰期需要排队'
            }]
        }]
    });
});

app.listen(3001);

// node index.js启动服务
