"ui";

//这是最后一个测试版。

importClass(android.view.KeyEvent);
importClass(android.webkit.WebView);
importClass(android.webkit.WebChromeClient);
importClass(android.webkit.WebResourceResponse);
importClass(android.webkit.WebViewClient);

importClass(android.widget.EditText);
importClass(android.text.InputType);


var info_size = 35;
var pack_size = 2;
var color = "#009688";
var running = false;
var path = "/storage/emulated/0/HTMLcodeedit/";
var htmlcode, csscode, jscode, pj; //pj: project
var not_enabled = false;
var seted1 = false,
    seted2 = false;
var storage = storages.create("html_code_edit");
ui.statusBarColor(color);

var scroll_to_where = 0;

function mainui(html, css, js, pjname) {
    ui.layout(
        <frame bg="{{color}}">
            <vertical gravity="bottom" id="info">
                <linear bg="#000000" h="{{info_size}}" id="_info">
                    <text text="" id="info_text" color="#ffffff" h="{{info_size}}" textSize="20sp" gravity="center"/>
                </linear>
            </vertical>
            <scroll margin="8 {{info_size}}" id="scroll">
                <vertical bg="#ffffff" padding="8">
                    <linear>
                        <text text="项目名称：" id="pjname_text" textSize="20sp"/>
                        <input text="pj" id="pjname" w="*" singleLine="true"/>
                    </linear>
                    <linear>
                        <text text="HTML代码区：" textSize="20sp" color="{{color}}"/>
                    </linear>
                    <linear>
                        <EditText hint="HTML" w="*" id="htmlcode" layout_width="match_parent"/>
                    </linear>
                    <linear>
                        <text text="CSS代码区：" textSize="20sp" color="{{color}}"/>
                    </linear>
                    <linear>
                        <EditText hint="CSS" w="*" id="csscode"/>
                    </linear>
                    <linear>
                        <text text="JavaScript代码区：" textSize="20sp" color="{{color}}"/>
                    </linear>
                    <linear>
                        <EditText hint="JavaScript" w="*" id="jscode"/>
                    </linear>
                </vertical>
            </scroll>
            <vertical gravity="top" margin="8 0">
                <linear bg="{{color}}" gravity="right">
                    <img text="运行代码" bg="?selectableItemBackground" h="35" tint="#ffffff" src="@drawable/ic_play_arrow_black_48dp" id="runcode"/>
                    <img text="保存代码" bg="?selectableItemBackground" h="35" tint="#ffffff" src="@drawable/ic_save_black_48dp" id="savecode"/>
                    <img text="新建代码" bg="?selectableItemBackground" h="35" tint="#ffffff" src="@drawable/ic_note_add_black_48dp" id="newcode"/>
                    <img text="打开代码" bg="?selectableItemBackground" h="35" tint="#ffffff" src="@drawable/ic_folder_open_black_48dp" id="opencode"/>
                    <img text="字体" bg="?selectableItemBackground" h="35" tint="#ffffff" src="@drawable/ic_text_fields_black_48dp" id="ttf_set"/>
                    <img text="关于" h="35" bg="?selectableItemBackground" tint="#ffffff" src="@drawable/ic_help_outline_black_48dp" id="about"/>
                </linear>
            </vertical>
            <vertical gravity="top" margin="16 0">
                <linear gravity="left">
                    <text text="HTML Code Edit" h="35" gravity="center" color="#ffffff" textSize="20sp"/>
                </linear>
            </vertical>
        </frame>
    );

    function setFont_(i) {
        var tf;
        switch (i) {
            case 0:
                tf = android.graphics.Typeface.createFromFile(java.io.File(files.path("./consolas.ttf")));
                break;
            case 1:
                tf = android.graphics.Typeface.createFromFile(java.io.File(files.path("./intel-one-mono.ttf")));
                break;
        }
        if (tf == undefined) {
            return;
        }
        ui.htmlcode.setTypeface(tf);
        ui.jscode.setTypeface(tf);
        ui.csscode.setTypeface(tf);
        fontId = i;
        storage.put("fontId", i);
    }
    ui.info.visibility = 8;
    ui.htmlcode.setText(html);
    ui.csscode.setText(css);
    ui.jscode.setText(js);
    ui.pjname.setText(pjname);
    ui.pjname.setEnabled(!not_enabled);
    pj = pjname;
    //禁用底部横线
    ui.htmlcode.setBackgroundColor(android.graphics.Color.TRANSPARENT);
    ui.csscode.setBackgroundColor(android.graphics.Color.TRANSPARENT);
    ui.jscode.setBackgroundColor(android.graphics.Color.TRANSPARENT);
    ui.pjname.setBackgroundColor(android.graphics.Color.TRANSPARENT);
    //禁用自动换行
    ui.htmlcode.setHorizontallyScrolling(true);
    ui.jscode.setHorizontallyScrolling(true);
    ui.csscode.setHorizontallyScrolling(true);
    //设置字体
    var fontId = storage.get("fontId");
    if (fontId == null) {
        fontId = 0;
    }
    setFont_(fontId);
    //添加事件
    ui.runcode.on("click", () => {
        if (isValidFolderName(ui.pjname.getText())) {
            scroll_to_where = ui.scroll.getScrollY();
            log(scroll_to_where.toString());
            running = true;
            savecode(ui);
            not_enabled = true;
            ui.pjname.setEnabled(false);
            htmlcode = ui.htmlcode.getText() + "";
            csscode = ui.csscode.getText() + "";
            jscode = ui.jscode.getText() + "";
            pj = ui.pjname.getText() + "";
            view_html(htmlcode, csscode, jscode);
            show_info("开始运行（已保存代码）");
        } else {
            alert("项目名称不合法，不能保存并运行", "目前支持大小写字母、数字，下划线和汉字")
        }
    });
    ui.savecode.on("click", () => {
        if (isValidFolderName(ui.pjname.getText())) {
            savecode(ui);
            not_enabled = true;
            ui.pjname.setEnabled(false);
            toast("文件保存成功！\n\nHTML文件已保存到" + path + ui.pjname.getText() + "/main.html\n\nCSS文件已保存到" + path + ui.pjname.getText() + "/css.css\n\nJS文件已保存到" + path + ui.pjname.getText() + "/js.js");
            if (storage.get("do_not_show_save_dialog") == true) {
                return;
            }
            dialogs.build({
                title: "养成好习惯",
                content: "勤于手动保存代码，以避免意外导致代码丢失。\n\n虽然自动保存也能为您保存代码，但遇到非正常退出（被一键加速清理掉、没电关机、程序卡死等），那就无能为力了。",
                positive: "知道了",
                checkBoxPrompt: "不再提示"
            }).on("positive", (win) => {
                win.dismiss();
            }).on("check", (checked) => {
                storage.put("do_not_show_save_dialog", checked)
            }).show();
        } else {
            alert("保存失败：项目名称不合法", "目前支持大小写字母、数字，下划线和汉字")
        }
    });
    ui.newcode.on("click", () => {
        if (!is_save()) {
            dialogs.confirm("提示", "您的代码还未保存，确定创建新的项目？", function(b) {
                if (b) {
                    new_code();
                    not_enabled = false;
                    ui.pjname.setEnabled(true);
                    show_info("创建项目成功，但没有保存到本地")
                }
            });
        } else {
            new_code();
            not_enabled = false;
            ui.pjname.setEnabled(true);
            show_info("创建项目成功，但没有保存到本地");
        }
    });
    ui.opencode.on("click", () => {
        if (!is_save()) {
            dialogs.confirm("提示", "您的代码还未保存，确定打开以前的项目？", function(b) {
                if (!b) {
                    return;
                } else {
                    open_pj();
                }
            });
        } else {
            open_pj();
        }
    });
    ui.ttf_set.click(function() {
        var ttf_list = ["Consolas", "Inter One Mono"];
        dialogs.singleChoice("更改字体", ttf_list, fontId, setFont_)
    });
    if (!seted1) {
        seted1 = true;
        ui.emitter.on("back_pressed", (event) => {
            if (running || is_save()) {
                return;
            }
            event.consumed = true;
            confirm("HTML Code Edit", "提示：您的代码还未保存，确定要退出吗？", function(b) {
                if (b) {
                    ui.finish();
                }
            });
            //savecode(ui);
            //toast("即将退出。已经保存代码。");
        });
    }
    ui.about.on("click", () => {
        alert("关于", "HTML Code Edit\n    v0.1.0 beta（测试版）\n    基于Auto.js开发\n\n因为是测试版，bug也是有的。\n遇到bug请联系开发者。");
    });
    ui.pjname_text.on("click", () => {
        if (!ui.pjname.isEnabled()) {
            alert("提示", "为了您代码的安全，以及避免HTML Code Edit读取代码文件夹出问题，所以代码一经保存，不可修改项目名称。\n\n如要修改项目名称，请在创建项目后、第一次保存代码之前进行修改。\n\n为您带来不便，请谅解！")
        }
    });
    ui.pjname.addTextChangedListener({
        onTextChanged: function(text) {
            if (!isValidFolderName(text)) {
                ui.pjname.setError("项目名称不合法");
            }
        }
    });
    ui.scroll.setScrollY(scroll_to_where);
    return text;
}


function isValidFolderName(folderName) {
    // 判断文件夹名是否为空
    if (folderName + "" === "") {
        return false;
    }

    // 定义合法文件夹名的正则表达式
    var regex = /^[a-zA-Z0-9\u4E00-\u9FA5_-_]+$/;

    // 使用正则表达式进行匹配
    var isMatch = regex.test(folderName);

    // 返回匹配结果
    return isMatch;
}

function getpj(name) {
    let data = [];
    try {
        var p = files.join(path, name);
        var f = open(files.join(p, "data.json"), "r")
        var data = JSON.parse(f.read());
        f.close();
        var html = files.join(p, data.html);
        var css = files.join(p, data.css);
        var js = files.join(p, data.js);
        var name = data.name;
        var hc, cc, jc;
        f = open(html, "r");
        hc = f.read();
        f.close();
        f = open(css, "r");
        cc = f.read();
        f.close();
        f = open(js, "r");
        jc = f.read();
        f.close();
        data[0] = hc;
        data[1] = cc;
        data[2] = jc;
        data[3] = name;
        return data;
    } catch (err) {
        log(err);
        return null;
    }
}

function open_pj() {
    let alldir = files.listDir(path);
    let pjs = ["取消"];
    var j = 1;
    if (alldir.length == 0) {
        alert("还没有项目！请创建一个！");
        return;
    }
    for (var i = 0; i < alldir.length; i++) {
        var p = files.join(path, alldir[i]);
        if (files.isDir(p)) {
            if (files.exists(files.join(p, "data.json"))) {
                var f = open(files.join(p, "data.json"), "r")
                try {
                    var data = JSON.parse(f.read());
                    var html = files.join(p, data.html);
                    var css = files.join(p, data.css);
                    var js = files.join(p, data.js);
                    var name = data.name;
                } catch (err) {
                    f.close();
                    log(err);
                    continue;
                }
                //log(html);
                if (files.exists(html) && files.exists(css) && files.exists(css)) {
                    pjs[j] = name;
                    j++;
                }
            }
        }
    }
    if (pjs.length == 1) {
        alert("还没有项目！请创建一个！");
        return;
    }
    dialogs.singleChoice("打开项目", pjs).then(pjn => {
        if (pjn == 0 || pjn == -1) {
            return;
        }
        show_info("正在打开“" + pjs[pjn] + "”，请稍后……");
        threads.start(function() {
            let data = getpj(pjs[pjn]);
            if (data == null || pjs[pjn] != data[3]) {
                show_info("无法打开项目“" + pjs[pjn] + "”，项目配置文件损坏！");
                return;
            }
            htmlcode = data[0];
            csscode = data[1];
            jscode = data[2];
            pj = data[3];
            ui.run(() => {
                ui.htmlcode.setText(htmlcode);
                ui.csscode.setText(csscode);
                ui.jscode.setText(jscode);
                ui.pjname.setText(data[3]);
                ui.pjname.setEnabled(false);
            });
            storage.put("open_pj_name", data[3]);
            show_info("打开“" + pjs[pjn] + "”完成");
        });
    });
}

function new_code() {
    var t = new Date().getTime();
    htc = "<!--TODO：请在这里写上您的HTML代码。-->\n<!--这里提供了一些HTML的基本框架，您可以在此基础上加以修改。-->\n\n<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>hello</title>\n\t</head>\n\t<body>\n\t\t<p>hello</p>\n\t</body>\n</html>";
    csc = "/*TODO：请在这里写上您的CSS代码。*/\n\n";
    jsc = "/*TODO：请在这里写上您的JavaScript代码。*/\n\n";
    mainui(htc, csc, jsc, "html_project_" + t); //"HELLO_HTML_Code_Edit");
    htmlcode = htc, csscode = csc, jscode = jsc;
}

function is_save() {
    return (ui.htmlcode.getText() + "") == htmlcode && (ui.csscode.getText() + "") == csscode && (ui.jscode.getText() + "") == jscode && (ui.pjname.getText() + "") == pj;
}

function savemycode(html, css, js, name) {
    var p = path + name + "/";
    files.ensureDir(p);
    var f = open(p + "main.html", "w");
    f.write(html);
    f.close();
    f = open(p + "css.css", "w");
    f.write(css);
    f.close();
    f = open(p + "js.js", "w");
    f.write(js);
    f.close();
    f = open(p + "data.json", "w");
    data = {
        html: "main.html",
        css: "css.css",
        js: "js.js",
        name: name
    }
    f.write(JSON.stringify(data));
    f.close();
    storage.put("open_pj_name", name);
    htmlcode = html, csscode = css, jscode = js;
}

function savecode(ui) {
    try {
        savemycode(ui.htmlcode.getText() + "", ui.csscode.getText() + "", ui.jscode.getText() + "", ui.pjname.getText() + "");
    } catch (err) {
        log(err);
        savemycode(htmlcode, csscode, jscode, pj)
    }
}
//log(JSON.parse('{"hello":"6"}').hello);
//log(JSON.stringify({hello:"6"}));
function show_info(s) {
    threads.start(function() {
        ui.run(() => {
            ui.info_text.setText("  " + s);
            ui.info.visibility = 0;
        });
        sleep(1000);
        ui.run(() => {
            ui.info.visibility = 8;
        });
    });
}

var htc, csc, jsc;
var open_pj_name = storage.get("open_pj_name");
if (open_pj_name == null) {
    new_code();
} else {
    var data = getpj(open_pj_name);
    if (data == null) {
        new_code();
    } else {
        mainui(data[0], data[1], data[2], data[3]);
        ui.pjname.setEnabled(false);
    }
}


show_info("欢迎使用");

function view_html(h, c, j) { //h：html，c：css，j：JavaScript
    var code = "";
    //code = '<meta name="viewport" content="minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,initial-scale=1.0" /><script>document.documentElement.style.overflow=\'hidden\'; document.body.style.overflow=\'hidden\';</script><style>html{overflow-x:hidden;/* 隐藏滚动条 */}</style>';
    code = '<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">';
    //var s = code + h + '<style>' + c + '</style><script>' + j + '</script>';
    p = path + pj + "/run_temp.html";
    f = open(p, "w")
    f.writeline(code);
    f.writeline(h);
    f.writeline("<style>" + c + "</style>");
    f.writeline("<script>" + j + "</script>");
    f.close()
    runui(); //启动运行界面
    ui.run_view.loadUrl("file://" + p);
}

function runui() {
    ui.layout(
        <frame bg="{{color}}" id="f">
            <horizontal gravity="center">
                <webview id="run_view" h="*" margin="16 {{info_size}}"/>
            </horizontal>
            <vertical margin="16 {{info_size}}" layout_gravity="top" bg="#ffffff" w="*" h="*" id="ui_console_box">
                <ScrollView padding="8">
                    <text text="" id="ui_console" color="#000000" textSize="16sp"/>
                </ScrollView>
            </vertical>
            <vertical gravity="bottom" id="info">
                <linear bg="#000000" h="{{info_size}}">
                    <text text="" id="info_text" color="#ffffff" h="{{info_size}}" textSize="20sp" gravity="center"/>
                </linear>
            </vertical>
            <vertical margin="16 0">
                <linear>
                    <img text="返回" bg="?selectableItemBackground" margin="{{pack_size}} 0" id="back" tint="#ffffff" src="@drawable/ic_arrow_back_black_48dp" w="{{info_size}}" h="{{info_size}}"/>
                    <img text="刷新" bg="?selectableItemBackground" margin="{{pack_size}} 0" id="refresh" tint="#ffffff" src="@drawable/ic_replay_black_48dp" w="{{info_size}}" h="{{info_size}}"/>
                    <img text="清空" bg="?selectableItemBackground" margin="{{pack_size}} 0" id="del_all_msg" tint="#ffffff" src="@drawable/ic_delete_black_48dp" w="{{info_size}}" h="{{info_size}}"/>
                    <img text="复制" bg="?selectableItemBackground" margin="{{pack_size}} 0" id="copy_msg" tint="#ffffff" src="@drawable/ic_content_copy_black_48dp" w="{{info_size}}" h="{{info_size}}"/>
                </linear>
            </vertical>
            <vertical margin="16 0">
                <linear>
                    <text text="无标题" gravity="center" id="view_title" color="#ffffff" w="*" textSize="{{info_size-10}}sp" h="{{info_size}}"/>
                </linear>
            </vertical>
            <vertical margin="16 0">
                <linear gravity="right">
                    <img text="终端" bg="?selectableItemBackground" margin="{{pack_size}} 0" id="show_console" tint="#ffffff" src="@drawable/ic_personal_video_black_48dp" w="{{info_size}}" h="{{info_size}}"/>
                </linear>
            </vertical>
        </frame>
    );
    var console_mode = false;
    var web_title = "无标题";
    ui.info.visibility = 8;
    ui.ui_console_box.visibility = 8;
    ui.del_all_msg.visibility = 8;
    ui.copy_msg.visibility = 8;

    function show_console_func() {
        console_mode = !console_mode;
        ui.ui_console_box.visibility = 8 - ui.ui_console_box.visibility;
        ui.del_all_msg.visibility = ui.ui_console_box.visibility;
        ui.copy_msg.visibility = ui.del_all_msg.visibility;
        ui.run_view.visibility = 8 - ui.ui_console_box.visibility;
        ui.refresh.visibility = ui.run_view.visibility;
        ui.back.visibility = ui.run_view.visibility;
        if (console_mode) {
            ui.view_title.setText("终端");
            show_info("打开终端");
        } else {
            ui.view_title.setText("页面：" + web_title);
            show_info("关闭终端");
        }
    }
    var webcc = new JavaAdapter(WebChromeClient, {
        onConsoleMessage: function(consoleMessage) {
            function timestampToTime(timestamp) {
                var date = new Date(timestamp);
                var Y = date.getFullYear() + '/';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
                var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
                var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()) + ".";
                var ms = date.getMilliseconds() < 100 ? ((date.getMilliseconds() < 10) ? ('00' + date.getMilliseconds()) : ('0' + date.getMilliseconds())) : date.getMilliseconds();
                return Y + M + D + h + m + s + ms;
            }
            ui.ui_console.setText(ui.ui_console.getText() + timestampToTime(Date.parse(new Date()) + ((new Date().getTime()) % 1000)) + ":  " + consoleMessage.message() + "\n");
        },
        onReceivedTitle: function(view, title) {
            if (title != null) {
                web_title = title;
                if (!console_mode) {
                    ui.view_title.setText("页面：" + title);
                }
            } else {
                web_title = "无标题";
                if (!console_mode) {
                    ui.view_title.setText("无标题");
                }
            }
        },
    });
    ui.run_view.setWebChromeClient(webcc);
    ui.back.on("click", () => {
        running = false;
        mainui(htmlcode, csscode, jscode, pj);
        show_info("运行结束");
    });
    ui.refresh.on("click", () => {
        //dialogs.confirm("确认", "要刷新页面吗？", function(b) {
        //    if (b) {
        view_html(htmlcode, csscode, jscode);
        show_info("刷新页面");
        //    }
        //});
    });
    ui.del_all_msg.on("click", () => {
        ui.ui_console.setText("");
        show_info("清空终端");
    });
    ui.copy_msg.on("click", () => {
        setClip(ui.ui_console.getText() + "");
        show_info("已复制");
    });
    ui.show_console.on("click", show_console_func);
    if (!seted2) {
        seted2 = true;
        ui.emitter.on("back_pressed", (event) => {
            if (!running) {
                return;
            }
            event.consumed = true;
            if (ui.ui_console_box.visibility == 0) {
                show_console_func();
                return;
            }
            if (ui.run_view.canGoBack()) {
                ui.run_view.goBack()
                return;
            } else {
                running = false;
                mainui(htmlcode, csscode, jscode, pj);
                show_info("运行结束");
            }
        });
    }
}