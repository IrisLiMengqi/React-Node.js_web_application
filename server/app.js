const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const data = require('./data')
const cors = require('koa2-cors');

const app = new Koa();
const router = new Router();

router.get('/api/electricity', (ctx, next) => {
    // 排序 倒序
    let body = data.sort((a,b) => b.id - a.id)
    // 取出时间的值
    const time = body.map((item) => {
        return `${item.year}.${item.month}`
    })
    // 取出千瓦时的值
    const kwh = body.map((item) => item.kwh)
    ctx.body = {
        code:200,
        data:{
            time,
            kwh
        },
        message:''
    }
});

router.get('/api/main', (ctx, next) => {
    // 排序 倒序
    let body = data.sort((a,b) => b.id - a.id)
    // 取出时间的值
    const time = body.map((item) => {
        return `${item.year}.${item.month}`
    })
    const bill = body.map((item) => item.bill)
    const savings = body.map((item) => item.savings)
    ctx.body = {
        code:200,
        data:{
            time,
            savings,
            bill
        },
        message:''
    }
});

// 允许跨域访问
app
    .use(cors())

    // 注入路由
app
    .use(router.routes())
    .use(router.allowedMethods());


    // 启动服务器并监听
app.use(serve(process.cwd()  + '/build'));
app.listen(8080, '0.0.0.0', () => {
    console.log('Success! http://localhost:8080')
})

