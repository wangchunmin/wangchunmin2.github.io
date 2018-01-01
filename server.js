/**
 * Created by hp on 2017/12/26.
 */
const express=require("express");
const static=require("express-static");
const bodyParser=require("body-parser")
const mysql=require("mysql");
const cookieSession=require("cookie-session");
const cookieParser=require("cookie-parser");
const consolidate=require("consolidate");
const ejs=require("ejs");
var multer=require("multer");
const expressRoute=require("express-route");
var server=express();
const multerObj=multer({dest:"./static/upload"})//指明文件上传到那个路径
//1获取请求数据
//get自带
server.use(bodyParser())//解析数据
server.use(multerObj.any())//上传文件

//2 cookie session
server.use(cookieParser());//这里面的参数可以不指定
(function(){//为防止污染全局用一个函数包起来
var keys=[];
for(var i=0;i<10000;i++){
    keys[i]="a_"+Math.random()
}
server.use(cookieSession({//这里面最起码得指定名字
    name:"sess_id",
    keys:keys,
    maxAge:20*60*1000 //20分钟
}));
})()
//3 模板
server.engine("html",consolidate.ejs);//用那个引擎
server.set("views","template");//模板放在哪块
server.set("view engine","html");
//4 route // 小型的express   router只能用use
server.use("/",require("./template/web")());//普通用户
server.use("/admin",require("./route/admin")());//管理员


//5 default :static
server.use(static("./static/"));
server.listen(8082);
