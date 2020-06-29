const Koa = require("koa");
const KoaRouter = require("koa-router");

const app = new Koa();
const router = new KoaRouter();

app.use(router.routes());

router.get("/home",(ctx)=>{
    ctx.body = {
        statue:0,
        data:{
            "date":new Date(),
            "path":"/home"
        },
        message:"数据请求成功"
    }
})

app.listen(3000,()=>{
    console.log("localhost:3000服务器启动成功！");
})