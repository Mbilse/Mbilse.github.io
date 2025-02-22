fetch('./icons.json').then(r=>r.json()).then((r)=>{
  var str='';
  for(var k in r){
    var str2=`<li><div class="group-title">${k}</div><ul>`;
    for(var k2 in r[k]){
      str2+=`<li>
        <div class="icon">
          <span class="material-symbols-outlined">${k2}</span>
        </div>
        <div class="icon-title">${k2}</div>
      </li>`
    }
    str2+='</ul></li>';
    str+=str2;
  }
  document.querySelector(".iconlist").innerHTML=str;
})

var fill=document.querySelector("[name=fill]");
var wght=document.querySelector("[name=wght]");
var opzt=document.querySelector("[name=opzt]");
var grad=document.querySelector("[name=grad]");
fill.onclick=opzt.onchange=wght.onchange=grad.onchange=change;
function change(){
  document.getElementById("c").innerHTML=`.material-symbols-outlined{
    font-variation-settings: 'FILL' ${fill.checked?1:0}, 'wght' ${wght.value}, 'GRAD' ${grad.value}, 'opsz' ${opzt.value};
  }`;
  document.querySelector("label[for=wght] span").innerHTML=wght.value;
  document.querySelector("label[for=grad] span").innerHTML=grad.value;
  document.querySelector("label[for=opzt] span").innerHTML=opzt.value;
}

change();
// var w=new Worker('worker.js');

// w.onmessage=function(e){
//   document.querySelector(".iconlist").innerHTML=e.data;
// }