/*
* @desc 获取url参数
* @param variable{String} 传入的url
* @return {Boolean,String} false：没有参数 String：URL参数
* @version 1.0.0
* */

export function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

/*
* @desc 去除Url参数空值
* @param variable{String} 传入的url
* @return {String} 返回没有空值的URL
* @version 1.0.0
* */

export function getUrl(variable) {
    var bases = variable.split('?')[0];
    var query = variable.split('?')[1];
    var obj = {};
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        window.console.log(pair)
        if (pair[1] != '') {
            obj[pair[0]] = pair[1];
        }
    }
    for(let key in obj){
        bases += '?'+key + '=' + obj[key];
    }
    return bases;
}

/*
* @desc 将日期转化为YYYY-mm-dd
* @param variable{String} 传入的date
* @return {String} 返回YYYY-mm-dd
* @version 1.0.0
* */
export function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [ year, month, day ].join('-');
}

/*
     * @desc string转换对象
     */
    export function strToJson(str) { 
      if (str === null || typeof str == "undefined") {
        return false;
      }
      var jsonName = 'Content type: application/json';
     var newStr = str.substring(jsonName.length).trim();
      return JSON.parse(newStr);
    }
