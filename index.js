// 创建一个http server返回假数据
// 使用node框架：express(集成化较高，直接使用)、koa(可塑性更好，但是需要中间件)
// 创建package.json: npm init -y
// npm i express


//  服务器入口文件
const express = require('express');
const cities = require('./api/cities.json');
const search = require('./api/search.json');
const query = require('./api/query.json');
const trainSeat = require('./api/trainSeat.json');

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

app.get('/rest/search', (request, response) => {
    const searchKey = request.query.key;
    search.dataMap.userInput = searchKey;
    response.json(search);
});
app.get('/rest/query', (request, response) => {
    response.json(query);
});
app.get('/rest/trainSeat', (request, response) => {
    response.json(trainSeat);
});

app.listen(3001);

// node index.js启动服务
