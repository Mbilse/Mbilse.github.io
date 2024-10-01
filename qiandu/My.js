$(function(){
var btn = document.querySelector('.btn');
function yy(){
$.get('https://api.vvhan.com/api/rand.music?type=json&sort=热歌榜',function (res){
var ul = document.querySelector('ul');
var audio = new Audio();
audio.src = res.info.mp3url;
audio.controls = 'controls';
ul.appendChild(audio);
$('.mygq').html('歌曲:' + res.info.name);
$('.mygs').html('歌手:' + res.info.auther);
});
}
yy();
btn.onclick = function (){
    yy();
}
});