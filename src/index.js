import kkb from "./kkb.js";
import txt from "../data/data.txt"
import img from "./static/img/fengjing.jpg";
import css from "./static/css/index.css";
console.log(kkb);
console.log(txt);
console.log(img);
console.log(css);
const imgEle = new Image();

imgEle.src = img;

document.body.append(imgEle);

//module.hot 是否开启了热替换
console.log(module.hot);

//module.hot.accept => 事件监听，监听模块的变化
if(module.hot){
    module.hot.accept("./kkb.js",()=>{
        //编写更新的代码逻辑
        console.log("kkb模块更新了！");
    })
}

const xhr = new XMLHttpRequest();
xhr.open("GET","/pusher/info?browser_id=eaf49cf1b1b23c458d27af553603ecfa&ent_id=96472&track_id=1cWDxBZr3g8hOPU2XnKfGGrNax3&visit_id=1csnr7GVzFrR5W0lnxzBEoVDuh8&t=1591326470449");
xhr.onload = function({target}){
    console.log(target.responseText);
}
xhr.send();