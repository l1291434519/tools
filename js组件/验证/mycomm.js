/**
 *
 *
 *	常用函数
 * 
 */

var hailong = window["hailong"] || {};
hailong.comm = hailong.comm || {};
(function () {


var o = hailong.comm;


/**
 * ajax 提交表单
 * @param  {[id]} form [id名称]
 * @return {[type]}      [description]
 */

o._submitData = function (form,fun) {

    var url = $('#'+form).attr("action");
    $.ajax({
      type: 'POST',
      url: url,
      dataType: 'json',
      data: $("#"+form).serialize(),
      success: function(data){

             if(fun != '') {
                this.callback(fun);
             }else{
                hailong.comm.datahandel(data,form);
             }
           
      }
      error: function (msg) {
               
      }
      
    });


}

/**
 * [_submitData description]
 * @param  {[id]} form [id名称]
 * @return {[type]}      [description]
 */
o._ajaxpost = function (form) {
    var url = $('#'+form).attr("action");
    
    $("#"+form).submit(function () {   
        $("#"+form).ajaxSubmit({
            type: "post",
            url: url,
            dataType: 'json',
            success: function (data) {
               hailong.comm.datahandel(data,form);
            },
            error: function (msg) {
                //alert("文件上传失败");    
            }
        });

  });

}


/**
 * 重置表单
 * @param  {[string]} form [id]
 * @return {[type]}      [description]
 */
o.reset = function (form) {
    document.getElementById(form).reset(); 
}

/**
 * 获取当前域名
 * @return {[string]} [www.baidu.com]
 */
o.hostname = function () {
    var hostname=window.location.hostname;
    return hostname;
}

/**
 * 本页跳转
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
o.jumpurl = function (url) {
     window.location.href=url;
}

/**
 * 打开新页
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
o.new_page = function(url){
      window.open(url);
}

/**
 * need jquyer check mobile
 * 验证手机号码 params:control 选择器 例：#add params：allownull 是否允许空  例：false
 * @param {[type]} control   [description]
 * @param {[type]} allownull [description]
 */
o.IsMobile = function(control, allownull) { 
      var str = jQuery(control).val(); 
      return (allownull && str.length == 0) || (str.length && /^(13[0123456789]|14[57]|15[012356789]|18[0256789])\d{8}$/i.test(str));
}

/**
 * [IsPhoneOrIsMobile description]
 * 验证是电话号码或者手机号码 params:control 选择器 例：#add params：allownull 是否允许空  例：false
 * @param {[type]} control   [description]
 * @param {[type]} allownull [description]
 */
o.IsPhoneOrIsMobile = function(control, allownull) { 
      var str = jQuery(control).val(); 
      return (allownull && str.length == 0) || (str.length && /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{2,6}))?$/i.test(str) || /^(13[0123456789]|14[57]|15[012356789]|18[0256789])\d{8}$/i.test(str)) 
}

/**
 * [IsEmail description]
 * 验证是不是邮箱 params:control 选择器 例：#add params：allownull 是否允许空  例：false
 * @param {[type]} control   [description]
 * @param {[type]} allownull [description]
 */
o.IsEmail = function(control, allownull){ 
    var str = jQuery(control).val(); 
    return (allownull && str.length == 0) || (str.length && /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/i.test(str)) 
}
/**
 * check email need jquery
 * 验证是不是邮箱 params:control 选择器 例：#add params：allownull 是否允许空  例：false
 * @param {[type]} control   [description]
 * @param {[type]} allownull [description]
 */
o.IsEmail = function(control, allownull){ 
    var str = jQuery(control).val(); 
    return (allownull && str.length == 0) || (str.length && /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/i.test(str)); 
}


/**
 * [IsMSN description]
 * 验证是不是MSN params:control 选择器 例：#add params：allownull 是否允许空  例：false
 * @param {[type]} control   [description]
 * @param {[type]} allownull [description]
 */
o.IsMSN = function(control, allownull) { 
  var str = jQuery(control).val(); return (allownull && str.length == 0) || (str.length && /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/i.test(str)) 
}

/**
 * [CheckLength description]
 * 验证长度 params:control 选择器 例：#add params：len 不小于此长度
 * @param {[type]} control [description]
 * @param {[type]} len     [description]
 */
o.CheckLength =  function(control, len) { 
  var str = jQuery(control).val(); return str.length >= len 
}
    
/**
 * [CheckEqualsLeng description]
 * 验证长度等于多少
 * @param {[type]} control   [description]
 * @param {[type]} len       [description]
 * @param {[type]} allownull [description]
 */
o.CheckEqualsLeng = function(control, len, allownull) { 
  var str = jQuery(control).val(); 
  return (allownull && str.length == 0)|| (str.length == len); 
}
    
/**
 * [IsInt description]
 * 验证Int
 * @param {[type]} control   [description]
 * @param {[type]} min       [description]
 * @param {[type]} max       [description]
 * @param {[type]} allownull [description]
 */
o.IsInt =      function(control, min, max, allownull) { 
  var str = jQuery(control).val(); 
  return (allownull && str.length == 0) || ((/^\d*$/i.test(str)) && !isNaN(parseInt(str)) && parseInt(str) >= parseInt(min) && parseInt(str) <= parseInt(max)) 
}
    
/**
 * [IntLength description]
 * 验证数字位数
 * @param {[type]} control   [description]
 * @param {[type]} min       [description]
 * @param {[type]} max       [description]
 * @param {[type]} allownull [description]
 */
o.IntLength =    function(control,min,max, allownull) { 
  var str = jQuery(control).val(); 
  return (allownull && str.length == 0) || (str.length && (/^\d*$/i.test(str)) && str.length >= min && str.length <= max &&(/^\d*$/i.test(str)) && !isNaN(parseInt(str)) ) 
}
   
/**
 * [IsFloat description]
 * 验证float
 * @param {[type]} control   [description]
 * @param {[type]} allownull [description]
 */
o.IsFloat =    function(control, allownull) { 
  var str = jQuery(control).val(); 
  return (allownull && str.length == 0) || (str.length && (/^\d+(\.\d+)?$/i.test(str))) 
}
    
/**
 * [IsNumber description]
 * 验证是否是 正负整数
 * @param {[type]} control   [description]
 * @param {[type]} allownull [description]
 */
o.IsNumber =   function(control, allownull) { 
  var str = jQuery(control).val(); 
  return (allownull && str.length == 0) || (str.length && (/^-?\d+$/i.test(str))) 
}
    
/**
 * [IsCardName description]
 * 验证是否是中文
 * @param {[type]} s [description]
 */
o.IsCardName =   function(s){
  var patrn = /^\s*[\u4e00-\u9fa5]{1,}[\u4e00-\u9fa5.·]{0,15}[\u4e00-\u9fa5]{1,}\s*$/;
  if(!patrn.exec(s)){ return false;} return true;
}
    
/**
 * [IsvaliIdCard description]
 * 验证身份证号码
 * @param {[type]} idCard [description]
 */
o.IsvaliIdCard = function(idCard){
      var checkFlag = new clsIDCard(idCard);
      if (!checkFlag.IsValid()) {
       return false;
      }else{
       return true;
      }
    }
/**
 * 通用回调函数
 * @param  {[type]}   fun [description]
 * @return {Function}     [description]
 */
o.callback = function (fun) {
     eval(fun+"()");
}

/**
 * 处理数据
 * @param  {[type]} data [description]
 * @param  {[type]} form [description]
 * @return {[type]}      [description]
 */
o.datahandel = function (data,form) {

    if (data.status == '1') {

		    if(data.type == 'jump') {
       		hailong.comm.jumpurl(data.data.success_url);

      	}else if (data.type == 'fun') {
      		success_fun(data);

      	}else if (data.type == 'notshow') {
      		 hailong.comm.reset(form,form);
      		return false;

      	}else{
          alert(data.data.msg);
        }

         hailong.comm.reset(form,form);
      
     }

    if (data.status == '0') {

  	    if(data.type == 'jump') {
  	       		hailong.comm.jumpurl(data.data.success_url);

  	    }else if (data.type == 'fun') {
  	      		error_fun(data);

        }else if (data.type == 'notshow') {
            hailong.comm.reset(form,form);
            return false;

        }else{
            alert(data.data.msg);
        }

     }

}


o.mobiles = 0;
o.addmobile = function (id) {

  if (this.mobiles>2) {
    return false;
  };

  var str = '</tr>'+
    '<tr>'+
    '<td class="col_01">姓名 <input type="text" name="name[]" class="tex"></td>'+
    '<td class="col_01">电话 <input type="text" name="mobile[]" class="tex01"></td>'+
  '</tr>';
  $("#"+id).append(str);
  this.mobiles = this.mobiles+1;

}


})(hailong)



// 构造函数，变量为15位或者18位的身份证号码
function clsIDCard(CardNo) {
  this.Valid=false;
  this.ID15='';
  this.ID18='';
  this.Local='';
  if(CardNo!=null)this.SetCardNo(CardNo);
}

// 设置身份证号码，15位或者18位
clsIDCard.prototype.SetCardNo = function(CardNo) {
  this.ID15='';
  this.ID18='';
  this.Local='';
  CardNo=CardNo.replace(" ","");
  var strCardNo;
  if(CardNo.length==18) {
    pattern= /^\d{17}(\d|x|X)$/;
    if (pattern.exec(CardNo)==null)return;
    strCardNo=CardNo.toUpperCase();
  } else {
    pattern= /^\d{15}$/;
    if (pattern.exec(CardNo)==null)return;
    strCardNo=CardNo.substr(0,6)+'19'+CardNo.substr(6,9)
    strCardNo+=this.GetVCode(strCardNo);
  }
  this.Valid=this.CheckValid(strCardNo);
}

// 校验身份证有效性
clsIDCard.prototype.IsValid = function() {
  return this.Valid;
}

// 返回生日字符串，格式如下，1981-10-10
clsIDCard.prototype.GetBirthDate = function() {
  var BirthDate='';
  if(this.Valid)BirthDate=this.GetBirthYear()+'-'+this.GetBirthMonth()+'-'+this.GetBirthDay();
  return BirthDate;
}

// 返回生日中的年，格式如下，1981
clsIDCard.prototype.GetBirthYear = function() {
  var BirthYear='';
  if(this.Valid)BirthYear=this.ID18.substr(6,4);
  return BirthYear;
}

// 返回生日中的月，格式如下，10
clsIDCard.prototype.GetBirthMonth = function() {
  var BirthMonth='';
  if(this.Valid)BirthMonth=this.ID18.substr(10,2);
  if(BirthMonth.charAt(0)=='0')BirthMonth=BirthMonth.charAt(1);
  return BirthMonth;
}

// 返回生日中的日，格式如下，10
clsIDCard.prototype.GetBirthDay = function() {
  var BirthDay='';
  if(this.Valid)BirthDay=this.ID18.substr(12,2);
  return BirthDay;
}

// 返回性别，1：男，0：女
clsIDCard.prototype.GetSex = function() {
  var Sex='';
  if(this.Valid)Sex=this.ID18.charAt(16)%2;
  return Sex;
}

// 返回15位身份证号码
clsIDCard.prototype.Get15 = function() {
  var ID15='';
  if(this.Valid)ID15=this.ID15;
  return ID15;
}

// 返回18位身份证号码
clsIDCard.prototype.Get18 = function() {
  var ID18='';
  if(this.Valid)ID18=this.ID18;
  return ID18;
}

// 返回所在省，例如：上海市、浙江省
clsIDCard.prototype.GetLocal = function() {
  var Local='';
  if(this.Valid)Local=this.Local;
  return Local;
}

clsIDCard.prototype.GetVCode = function(CardNo17) {
  var Wi = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1);
  var Ai = new Array('1','0','X','9','8','7','6','5','4','3','2');
  var cardNoSum = 0;
  for (var i=0; i<CardNo17.length; i++)cardNoSum+=CardNo17.charAt(i)*Wi[i];
  var seq = cardNoSum%11;
  return Ai[seq];
}

clsIDCard.prototype.CheckValid = function(CardNo18) {
  if(this.GetVCode(CardNo18.substr(0,17))!=CardNo18.charAt(17))return false;
  if(!this.IsDate(CardNo18.substr(6,8)))return false;
  var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
  if(aCity[parseInt(CardNo18.substr(0,2))]==null)return false;
  this.ID18=CardNo18;
  this.ID15=CardNo18.substr(0,6)+CardNo18.substr(8,9);
  this.Local=aCity[parseInt(CardNo18.substr(0,2))];
  return true;
}

clsIDCard.prototype.IsDate = function(strDate) {
  var r = strDate.match(/^(\d{1,4})(\d{1,2})(\d{1,2})$/);
  if(r==null)return false;
  var d= new Date(r[1], r[2]-1, r[3]);
  return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[2]&&d.getDate()==r[3]);
}