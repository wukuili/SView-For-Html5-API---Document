/**
 * Created by liyongjie on 2017/5/4.
 */
$(function () {
    SetLeftMenu();
    SetInterFaceTable();
    SetDetailContent();
})
/**
 * 设置左侧导航栏数据
 * */
function SetLeftMenu() {
    var ulDom = '';
    var liDom = '';
    $.getJSON('./data/ULList.json', function (data) {
        $.each(data.li, function (i, item) {
            // console.log(item);
            //如果包含子类
            if (item.li) {

                $.each(item.li, function (i, item1) {
                    var temp = '';
                    if (item1.li) {
                        $.each(item1.li, function (i, item2) {
                            temp += '<li class=""><a href="' + item2.href + '">' + item2.name + '</a></li>'
                        })
                    }
                    liDom += '<li class=""> <a href="' + item1.href + '">' + item1.name + '</a> <ul class="nav">' + temp + ' </ul> </li>';
                })

            }
            ulDom += '<ul class="nav bs-doc-sidenav"> <li class=""><a href="' + item.href + '">' + item.name + '</a></li>' + liDom + ' </ul>';
            $("#leftList").html(ulDom);
        })
    })
}
/**
 * 设置接口列表表格内容
 * */
function SetInterFaceTable() {
    var table = '';
    var tr = '';
    $.getJSON('data/Table.json', function (data) {
        $.each(data.table, function (i, item) {
            var td = '';
            var tdarray = [];
            $.each(item.tr, function (i, item2) {
                tdarray.push(this);
            })
            console.log(tdarray);
            if (tdarray[0].rowspan > 0) {
                td += ' <td rowspan="' + tdarray[0].rowspan + '" style="vertical-align:middle">' + tdarray[0].name + '</td>	' + ' <td >' + tdarray[3].name + '</td><td>' + tdarray[1].name + '</td><td>' + tdarray[4].name + '</td>	';
            } else {
                td += '<td>' + tdarray[2].name + '</td><td>' + tdarray[0].name + '</td><td>' + tdarray[3].name + '</td>';
            }
            // }
            tr += '<tr> ' + td + '</tr>';
        })
        $('#tableContent').html(tr);
    })
}
/**
 * 设置详细内容页
 * */
function SetDetailContent() {
    var table = '';
    var tr = '';
    var DetailContent = '';
    $.getJSON('data/Table.json', function (data) {
        $.each(data.table, function (i, item) {
            var td = '';
            var tdarray = [];
//模块 接口  说明 备注
            $.each(item.tr, function (i, item2) {
                var deitail = '';
                tdarray.push(this);
            })
            if (tdarray[0].rowspan > 0) {
                DetailContent += ParseJson(tdarray, 3, 0);
            } else {
                DetailContent += ParseJson(tdarray, 2, 1);
            }
        })
        $('.bs-docs-section').append(DetailContent);
    })
}
/***
 *
 * @param tdarray 存放td和tr内容的数组
 * @param number api接口所在行
 * @param type 0为含有rowspan>0的td  ；1为其他普通表格
 * @returns {string} api详细描述内容
 * @constructor
 */
function ParseJson(tdarray, number, type) {
    var para_table = '';
    var para_tr = '';
    var api_return = '';
    var temp = '';
    //如果有参数
    if (tdarray[number].parament && tdarray[number].parament !== '') {
        $.each(tdarray[number].parament, function (i, tr) {
            para_tr += ('<tr><td>' + tr.name + '</td><td>' + tr.isNecessary + '</td><td>' + tr.des + ' </td> </tr>');
        })
    }
    //如果参数内容
    if (para_tr !== '') {
        para_table = '<table class="table table-bordered"><thead><tr><th style="width: 20%">参数</th><th style="width: 15%">是否必须</th> <th style="width: 65%">说明</th> </tr> </thead> <tbody> ' + para_tr + '</tbody> </table>	';

    }
    //如果含有返回值
    if (tdarray[number].return && tdarray[number].return !== '') {
        api_return = tdarray[number].return;
    }
    if (type = 0) {
        temp += '<div class="page-header"><div id="' + tdarray[0].href + '" class="first-title">' + tdarray[0].name + '</div></div><div id="' + GetHref(tdarray[number].name) + '" class="second-title">' + tdarray[number - 2].name + '</div><div class="inf-body col-md-10"> <div class="inf-title">接口 </div>' + GetContent(tdarray[number].name) + ' <div class="inf-title">说明 </div>' + tdarray[number - 2].name + ' <div class="inf-title">参数 </div>' + (para_table !== '' ? para_table : '无') + ' <div class="inf-title">返回值 </div>' + (api_return !== '' ? api_return : '无') + ' <div class="inf-title">备注 </div> ' + (tdarray[number + 1].name !== '' ? tdarray[number + 1].name : '无') + '</div>'

    } else {
        temp += '<div id="' + GetHref(tdarray[number].name) + '" class="second-title">' + tdarray[0].name + '</div><div class="inf-body col-md-10"> <div class="inf-title">接口 </div>' + GetContent(tdarray[number].name) + ' <div class="inf-title">说明 </div>' + tdarray[0].name + ' <div class="inf-title">参数 </div>' + (para_table !== '' ? para_table : '无') + ' <div class="inf-title">返回值 </div>' + (api_return !== '' ? api_return : '无') + ' <div class="inf-title">备注 </div> ' + (tdarray[number + 1].name !== '' ? tdarray[number + 1].name : '无') + '</div>'

    }
    return temp;
}
/**
 * 提取字符串里面的网址 作为后面的id使用
 * */
function GetHref(string) {
    if (string) {
        var reg = "<a href='(.*)'";
        return string.match(reg)[1].substring(1);
    }
}
/**
 * 提取字符串里面的文本内容，剔除超链接
 * */
function GetContent(string) {
    if (string) {
        var reg = ">(.*)<";
        return string.match(reg)[1];
    }
}