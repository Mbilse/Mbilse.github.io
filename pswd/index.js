document.querySelector("form").onsubmit=function(e){
  e.preventDefault();
  var file=document.getElementById("file").files[0];
  var password=document.getElementById("password").value;
  var tsc=document.getElementById("tsc").value;
  var reader=new FileReader();
  reader.onload=function(){
    var r=reader.result;
    var k=CryptoJS.AES.encrypt(r,password).toString();
    cl(k,password,tsc,cname(file.name));
  };
  reader.readAsText(file);
  console.log(file);
};
function cname(name){
  var l=name.lastIndexOf('.');
  if(l!=-1){
    name=name.substring(0,l);
  }
  return name;
}
function cl(k,password,tsc,name){
  var a='<!-- SIQUAN-UTIL HTML-ENCRYPT -->\
<script>\
var content="'+k+'";\
var hms="'+CryptoJS.AES.encrypt(password,'Hmv_d2q124casvfre').toString()+'";\
var tsc="'+tsc+'";\
</script>\
';
  var b='<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>网页已被加密</title><style>body{ position: absolute; inset: 0; margin:0; padding:0;} .container{ position: absolute; top:50%; left:50%; transform: translate(-50%,-50%); width: 300px; height: 200px; border-radius: 10px; padding: 10px; border: #ccc solid 1px;} .container h2{ font-weight: 300; line-height: 60px; margin: 0; padding: 0; text-align: center;} .container input{ display: block; width: calc(100% - 20px); height: 20px; padding: 5px 10px; font-size: 16px; border: #ddd solid 1px; color: #777; outline: 0; border-radius: 5px; box-sizing: content-box;} .container input:focus{ color: #000; border-color: #aaa;} .container input.wrong{ border-color: #f00;} .container p{ padding: 0; margin: 0; font-size: 12px; line-height: 15px; color: #888; padding: 5px 0;} .container button{ display: block; padding: 5px 20px; margin: 20px auto; background-color: #eee; border: #ccc solid 1px; border-radius: 4px; outline: 0; transition: all .3s;} .container button:active{ background-color: #aaa;} </style></head><body><div class="container"><h2>网页已被加密</h2><input type="password" placeholder="输入密码以继续" id="p"><p>提示：<span><script>document.write(tsc)</script></span></p><button onclick="check()">继续</button></div></body><script>function check(){ var p=document.getElementById("p").value; try{ var r=CryptoJS.AES.decrypt(content,p).toString(CryptoJS.enc.Utf8); document.write(r);}catch(e){ document.getElementById("p").className="wrong";}}</script></html>';
  var fileName =name+'.encrypted.html';
  var blob = new Blob([a+'<script>'+aesjs+'</script>'+b]);
  var ac = document.createElement('a');
  var href = window.URL.createObjectURL(blob); // 创建下载连接
  ac.href = href;
  ac.download = fileName;
  document.body.appendChild(ac);
  ac.click();
  document.body.removeChild(ac);
}
