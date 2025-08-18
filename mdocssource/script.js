 // MdocsSource 核心脚本
(function() {
  document.addEventListener("DOMContentLoaded", function() {
    const config = window.$mdoc || {};

    // 插入基础结构
    const bodyContent = document.body.innerHTML;
    document.body.innerHTML = `
      <div id="mdocs-loading">加载中...</div>
      <div id="mdocs-container">
        <aside id="mdocs-sidebar"><h3>目录</h3><ul></ul></aside>
        <main id="mdocs-content">${bodyContent}</main>
      </div>
      <div id="mdocs-menu-btn"><span></span><span></span><span></span></div>
    `;

    const sidebar = document.querySelector("#mdocs-sidebar ul");
    const content = document.querySelector("#mdocs-content");
    const loading = document.getElementById("mdocs-loading");

    // 是否启用加载屏幕
    if(config.load) {
      setTimeout(()=> loading.style.display="none", 1000);
    } else {
      loading.style.display = "none";
    }

    // 构建侧栏
    if(config.sidebar) {
      let texts = (config.sidebartext || "").split(",");
      let urls = (config.sidebartexturl || "").split(",");
      texts.forEach((t, i)=>{
        if(t.trim() !== "") {
          let li = document.createElement("li");
          let a = document.createElement("a");
          a.textContent = t.trim();
          a.href = urls[i] ? urls[i].trim() : "#";
          li.appendChild(a);
          sidebar.appendChild(li);
        }
      });
    } else {
      document.getElementById("mdocs-sidebar").style.display = "none";
    }

    // 三条杠菜单
    const menuBtn = document.getElementById("mdocs-menu-btn");
    menuBtn.addEventListener("click", ()=>{
      document.getElementById("mdocs-sidebar").classList.toggle("active");
      document.getElementById("mdocs-content").classList.toggle("shifted");
    });
    
    // 设置页面标题
    if (config.title) {
      document.title = config.title;
    }

    // 设置正文文本对齐方式
    if (config.displays) {
      document.querySelector("#mdocs-content").style.textAlign = config.displays;
    }

    // sublevel（2级标题自动生成）
    if(config.subleveltitle) {
      const headers = content.querySelectorAll("h2");
      headers.forEach((h)=>{
        let li = document.createElement("li");
        li.style.marginLeft = "15px";
        let a = document.createElement("a");
        a.textContent = h.textContent;
        a.href = "#" + h.textContent.replace(/\s+/g,"-");
        h.id = h.textContent.replace(/\s+/g,"-");
        li.appendChild(a);
        sidebar.appendChild(li);
      });
    }

    // 设置主页
    
  });
})();
  
  
 