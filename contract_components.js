$(document).ready(function(){
  get_Data()
})
function get_Data() {
  $('body').append(`<div id="warn" style="display: none;opacity: 0.5;width: 100%;height: 100%;z-index: 999;position: fixed;top: 0;left: 0;background: black"></div>`)
  $('body').append(`<div id="warns" style="z-index: 10000;border-radius:6px;top:65px;left:50%;display: none;position: fixed;color: #000;height: 45px;width:200px;text-align: center;background: #eccfcf;opacity: 1;">
                            <span style="line-height: 45px"></span>                 
                        </div>`)
  if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    $("#warns").css({'width':'70%','marginLeft':'-35%'})
    $("#warns").next().css('width','70%')
  }else{
    $("#warns").css({'width':'300px','marginLeft':'-150px'})
    $("#warns").next().css('width','300px')
  }
  var webArr = []
  $('custom-form').each((item,domEle)=>{
    webArr.push(JSON.parse($(domEle).text()))
  })
  var box = $('custom-form-metadata')[0].getAttribute('type')
  webArr.forEach((item)=>{
    switch (item.type) {
      case 'input_text':
        creat_input(item)
        break;
      case 'date_select':
        creat_date(item)
        break;
      case 'single_choice':
        creat_single(item)
        break;
      case 'multi_choice':
        creat_multi(item)
        break;
      case 'list':
        creat_list(item)
        break;
      case 'container':
        creat_box(item)
        break;
      case 'combine_name_with_widget':
        creat_name(item)
        break;
      case 'html_input_text':
        creat_html(item)
        break;
    }
  })
  if($('custom-form-metadata').text()){
    var fill_data = JSON.parse($('custom-form-metadata').text())
  }
  if(box == 'edit'){
    if(fill_data){
      fill_Data(fill_data)
    }
  }else{
    if(fill_data){
      fill_Data(fill_data)
      show_text(fill_data,webArr)
    }
  }
}
function show_text(data,web) {
  $.each(web,(item,res)=>{
    if(res.id == data[item].id){
      switch (res.type) {
        case 'input_text':
          show_input(data[item])
          break;
        case 'date_select':
          show_date(data[item])
          break;
        case 'single_choice':
          show_single(data[item])
          break;
        case 'multi_choice':
          show_mulit(data[item])
          break;
        case 'list':
          show_list(data[item])
          break;
        case 'container':
          show_box(data[item])
          break;
        case 'combine_name_with_widget':
          show_name(data[item])
          break;
        case 'html_input_text':
          show_html(data[item])
          break;
      }
    }
  })
}
function show_html(data) {
  $(`#${data.id}`).parent().css('display','none')
  var box = document.createElement('pre')
  box.innerHTML = data.result
  $(`#${data.id}`).parent().before(box)
}
function show_box(data,ver) {
  if(ver){
    var query = $(ver).children()
  }else{
    var query = `#${data.id}`
  }
  $(query).children().each((item,ele)=>{
    var type = $(ele)[0].getAttribute('type')
    switch (type) {
      case 'input_text':
        show_input(data.result[item],query)
        break;
      case 'date_select':
        show_date(data.result[item],query)
        break;
      case 'single_choice':
        show_single(data.result[item],query)
        break;
      case 'multi_choice':
        show_mulit(data.result[item],query)
        break;
    }
  })
}
function show_name(data) {
  $(`#${data.id}`).children().each((item,ele)=>{
    show_box(data.result[item],ele)
  })
}
function show_list(data) {
  $(`#${data.id}`).children(':last').css('display','none')
  $(`#${data.id} li`).each((item,ele)=>{
    show_lists(ele,data.result[item])
  })
}
function show_lists(res,ver) {
  $.each(ver,(item,ele)=>{
    var type = $(res).find(`.${ele.id}`)[0].getAttribute('type')
    $(res).children(':last').css('display','none')
    switch (type) {
      case 'input_text':
        show_input(ele,res)
        break;
      case 'date_select':
        show_date(ele,res)
        break;
      case 'single_choice':
        show_single(ele,res)
        break;
      case 'multi_choice':
        show_mulit(ele,res)
        break;
    }
  })
}
function show_mulit(data,ver) {
  if(ver){
    var own = $(ver).find(`.${data.id}`)
  }else{
    var own = $(`#${data.id}`)
  }
  var mode = own[0].getAttribute('mode')
  if(mode == 'undefined' || mode == 'result_show_only_selected '){
    own.children().css("padding","0px 10px").find('input:checkbox').not('input:checked').parent().css('display','none')
    own.children().find('input:checked').css('display','none').before(`<span>√</span>`)
    if(ver){
      own.children().eq(0).css('padding','0')
      own.children().eq(1).css({'padding':'10px 20px 0px','border-bottom':'1px solid black'})
      own.children().eq(1).children().css('margin','0 10px 0 0')
    }
  }else{
    own.children().css("padding","0px 10px").find('input:checked').css('display','none').before(`<span>√</span>`)
    own.children().find('input:checkbox').css('display','none')
    if(ver){
      own.children().eq(0).css('padding','0')
      own.children().eq(1).css({'padding':'10px 20px 0px','border-bottom':'1px solid black'})
      own.children().eq(1).children().css('margin','0 10px 0 0')
    }
  }
}
function show_single(data,ver) {
  if(ver){
    var own = $(ver).find(`.${data.id}`)
  }else{
    var own = $(`#${data.id}`)
  }
  var mode = own[0].getAttribute('mode')
  if(mode == 'undefined' || mode == 'result_show_only_selected '){
    own.children().css("padding","0px 10px").find('input:checkbox').not('input:checked').parent().css('display','none')
    own.children().find('input:checked').css('display','none').before(`<span>√</span>`)
    if(ver){
      own.children().eq(0).css('padding','0')
      own.children().eq(1).css({'padding':'10px 20px 0px','border-bottom':'1px solid black'})
    }
  }else{
    own.children().css("padding","0px 10px").find('input:checked').css('display','none').before(`<span>√</span>`)
    own.children().find('input:checkbox').css('display','none')
    if(ver){
      own.children().eq(0).css('padding','0')
      own.children().eq(1).css({'padding':'10px 20px 0px','border-bottom':'1px solid black'})
    }
  }
}
function show_input(data,res) {
  if(res){
    var own = $(res).find(`.${data.id}`).children().eq(1)
    own.before(`<span style="display: block;padding: 10px 20px 0px;border-bottom: 1px solid black">${data.result}</span>`)
  }else{
    var own = $(`#${data.id}`).children().eq(0)
    $(`#${data.id}`).append(`<span>${data.result}</span>`)
  }
  own.css('display','none')
}
function show_date(data,res) {
  if(res){
    var own = $(res).find(`.${data.id}`)
    own.children().eq(1).css('display','none')
  }else{
    var own = $(`#${data.id}`)
    own.children().eq(0).css('display','none')
  }
  if(!data.result || data.result == "null"){
    own.append(`<span></span>`)
  }else{
    var date = new Date(data.result * 1000)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()
    var ss = y + '年' + m + '月' + d + '日'
    if(res){
      own.append(`<span style="display: block;padding: 10px 20px 0px;border-bottom: 1px solid black">${ss}</span>`)
    }else{
      own.append(`<span>${ss}</span>`)
    }
  }
}
function fill_Data(data) {
  $.each(data,(item,dom)=>{
    var type = $(`#${dom.id}`)[0].getAttribute('type')
    switch (type) {
      case 'input_text':
        fill_input(dom)
        break;
      case 'date_select':
        fill_date(dom)
        break;
      case 'single_choice':
        fill_single(dom)
        break;
      case 'multi_choice':
        fill_multi(dom)
        break;
      case 'list':
        fill_list(dom)
        break;
      case 'container':
        fill_box(dom)
        break;
      case 'combine_name_with_widget':
        fill_name(dom)
        break;
      case 'html_input_text':
        fill_html(dom)
        break;
    }
  })
}
function fill_html(res) {
  $(`#${res.id}`).wysiwyg('shell').setHTML(res.result)
}
function fill_input(res,ver) {
  if(ver){
    var own_fir = $(ver).find(`.${res.id}`).children().eq(1)
  }else{
    var own_fir = $(`#${res.id}`).children()
  }
  own_fir.val(res.result)
}
function fill_date(res,ver) {
  if(ver){
    var own_fir = $(ver).find(`.${res.id}`).children().eq(1)
  }else{
    var own_fir = $(`#${res.id}`).children()
  }
  if(res.result){
    var date = new Date(res.result * 1000)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()
    var ss = y + '/' + m + '/' + d
    own_fir.val(ss)
  }else{
    own_fir.val("")
  }
}
function fill_single(res,ver) {
  if(ver){
    var own_fir = $(ver).find(`.${res.id}`).children().eq(1).find('input:checkbox')
  }else{
    var own_fir = $(`#${res.id}`).children().find('input:checkbox')
  }
  own_fir.val([res.result])
}
function fill_multi(res,ver){
  if(ver){
    var own_fir = $(ver).find(`.${res.id}`).children().eq(1).find('input:checkbox')
  }else{
    var own_fir = $(`#${res.id}`).children().find('input:checkbox')
  }
  own_fir.val(res.result)
}
function fill_list(res,ver) {
  var webArr = []
  $('custom-form').each((item,domEle)=>{
    webArr.push(JSON.parse($(domEle).html()))
  })
  var meta = {}
  webArr.forEach((item)=>{
    if(item.id == res.id){
      meta = item
    }
  })
  var btn = $(`#${res.id} button`)[0]
  $.each(res.result,(item,ele)=>{
    creat_lists(btn,meta)
  })
  $(`#${res.id} li`).each((item,ele)=>{
    fill_lists(ele,res.result[item])
  })
}
function fill_lists(res,data) {
  $.each(data,(item,ele)=>{
    var type = $(res).find(`.${ele.id}`)[0].getAttribute('type')
    switch (type) {
      case 'input_text':
        fill_input(ele,res)
        break;
      case 'date_select':
        fill_date(ele,res)
        break;
      case 'single_choice':
        fill_single(ele,res)
        break;
      case 'multi_choice':
        fill_multi(ele,res)
        break;
    }
  })
}
function fill_box(res,ele) {
  if(ele){
    var query = $(ele).children()
  }else{
    var query = `#${res.id}`
  }
  $(query).children().each((item,ele)=>{
    var type = $(ele)[0].getAttribute('type')
    switch (type) {
      case 'input_text':
        fill_input(res.result[item],query)
        break;
      case 'date_select':
        fill_date(res.result[item],query)
        break;
      case 'single_choice':
        fill_single(res.result[item],query)
        break;
      case 'multi_choice':
        fill_multi(res.result[item],query)
        break;
    }
  })
}
function fill_name(res) {
  $(`#${res.id}`).children().each((item,ele)=>{
    fill_box(res.result[item],ele)
  })
}
function creat_input(res,ver) {
  if(ver){
    var obj = res.meta_data
    if(obj.input_type == 'number' || obj.input_type == 'number_decimal' || obj.input_type == 'number_signed' || obj.input_type == 'text_password' || obj.input_type == 'number_password'){
      if(obj.hint == "" || obj.hint == undefined){
        obj.hint = ''
      }
      if(obj.text == "" || obj.text == undefined){
        obj.text = ''
      }
      if(obj.verify){
        obj.verify = JSON.stringify(obj.verify)
        $(ver).append(`<span class="${res.id}" type="${res.type}" style="display: block;margin: 10px" title="${res.title}"><span style="display: block">${res.title}</span><input version="${res.version}" value="${obj.text}" maxlength="${obj.max_length}" name="${obj.input_type}" max_lines="${obj.max_lines}" onfocus="check(this)" onkeyup="test(this)" placeholder="${obj.hint}" class="shuru" type="text"  verify='${obj.verify}'/><span>`)
      }else{
        $(ver).append(`<span class='${res.id}' type='${res.type}' style="display: block;margin: 10px" title='${res.title}'><span style="display: block">${res.title}</span><input version='${res.version}' value="${obj.text}" maxlength='${obj.max_length}' name="${obj.input_type}" max_lines='${obj.max_lines}' onfocus='check(this)' onkeyup='test(this)' placeholder='${obj.hint}' class="shuru" type="text"/></span>`)
      }
    }else{
      if(obj.hint == "" || obj.hint == undefined){
        obj.hint = ''
      }
      if(obj.text == "" || obj.text == undefined){
        obj.text = ''
      }
      if(obj.verify){
        obj.verify = JSON.stringify(obj.verify)
        if(obj.max_lines > 2 || obj.max_lines == undefined){
          $(ver).append(`<span class="${res.id}" type="${res.type}" style="display: block;margin: 10px" title="${res.title}"><span style="display: block">${res.title}</span><textarea  version="${res.version}" maxlength="${obj.max_length}" name="${obj.input_type}" max_lines="${obj.max_lines}" onfocus='check(this)' onblur='test(this)' class='test_box' rows='1' verify='${obj.verify}' placeholder="${obj.hint}">${obj.text}</textarea></span>`)
        }else{
          $(ver).append(`<span class="${res.id}" type="${res.type}" style="display: block;margin: 10px" title="${res.title}"><span style="display: block">${res.title}</span><input version="${res.version}" value="${obj.text}" maxlength="${obj.max_length}" name="${obj.input_type}" max_lines="${obj.max_lines}" verify='${obj.verify}' onfocus='check(this)' onblur='test(this)' placeholder="${obj.hint}" class="shuru" /></span>`)
        }
      }else{
        if(obj.max_lines > 2 || obj.max_lines == undefined) {
          $(ver).append(`<span class="${res.id}" type="${res.type}" style="display: block;margin: 10px" title="${res.title}"><span style="display: block">${res.title}</span><textarea version="${res.version}" maxlength="${obj.max_length}" name="${obj.input_type}" max_lines="${obj.max_lines}" rows='1' onfocus='check(this)' onblur='test(this)' class='test_box' placeholder="${obj.hint}">${obj.text}</textarea ></span>`)
        }else{
          $(ver).append(`<span class="${res.id}" type="${res.type}" style="display: block;margin: 10px" title="${res.title}"><span style="display: block">${res.title}</span><input version="${res.version}" value="${obj.text}" maxlength="${obj.max_length}" name="${obj.input_type}" max_lines="${obj.max_lines}" onfocus='check(this)' onblur='test(this)' placeholder="${obj.hint}" class="shuru" /></span>`)
        }
      }
    }
  }else{
    $('custom-form').each((item,domEle)=>{
      if(res.id == JSON.parse($(domEle).html()).id){
        var obj = res.meta_data
        if(obj.hint == "" || obj.hint == undefined){
          obj.hint = ''
        }
        if(obj.text == "" || obj.text == undefined){
          obj.text = ''
        }
        if(obj.input_type == 'number' || obj.input_type == 'number_decimal' || obj.input_type == 'number_signed' || obj.input_type == 'text_password' || obj.input_type == 'number_password'){
          if(obj.verify){
            obj.verify = JSON.stringify(obj.verify)
            $(domEle).parent().append(`<span id="${res.id}" type="${res.type}" title="${res.title}"><input version="${res.version}" value="${obj.text}" minlength="${obj.min_length}" maxlength="${obj.max_length}" name="${obj.input_type}" max_lines="${obj.max_lines}" onfocus="check(this)" onkeyup="test(this)" placeholder="${obj.hint}" class="shuru" type="text"  verify='${obj.verify}'/></span>`)
          }else{
            $(domEle).parent().append(`<span id='${res.id}' type='${res.type}' title='${res.title}'><input version='${res.version}' value="${obj.text}" minlength="${obj.min_length}" maxlength='${obj.max_length}' name="${obj.input_type}" max_lines='${obj.max_lines}' onfocus='check(this)' onkeyup='test(this)' placeholder='${obj.hint}' class="shuru" type="text"/></span>`)
          }
        }else{
          if(obj.verify){
            obj.verify = JSON.stringify(obj.verify)
            if(obj.max_lines > 2 || obj.max_lines == undefined){
              $(domEle).parent().append(`<span id="${res.id}" type="${res.type}" title="${res.title}"><textarea  version="${res.version}" minlength="${obj.min_length}" maxlength="${obj.max_length}" name="${obj.input_type}" max_lines="${obj.max_lines}" onfocus='check(this)' onblur='test(this)' class='test_box' rows='1' verify='${obj.verify}' placeholder="${obj.hint}">${obj.text}</textarea></span>`)
            }else{
              $(domEle).parent().append(`<span id="${res.id}" type="${res.type}" title="${res.title}"><input version="${res.version}" value="${obj.text}" minlength="${obj.min_length}" maxlength="${obj.max_length}" name="${obj.input_type}" max_lines="${obj.max_lines}" verify='${obj.verify}' onfocus='check(this)' onblur='test(this)' placeholder="${obj.hint}" class="shuru" /></span>`)
            }
          }else{
            if(obj.max_lines > 2 || obj.max_lines == undefined) {
              $(domEle).parent().append(`<span id="${res.id}" type="${res.type}" title="${res.title}"><textarea version="${res.version}" minlength="${obj.min_length}" maxlength="${obj.max_length}" name="${obj.input_type}" max_lines="${obj.max_lines}" rows='1' onfocus='check(this)' onblur='test(this)' class='test_box' placeholder="${obj.hint}">${obj.text}</textarea ></span>`)
            }else{
              $(domEle).parent().append(`<span id="${res.id}" type="${res.type}" title="${res.title}"><input version="${res.version}" value="${obj.text}" minlength="${obj.min_length}" maxlength="${obj.max_length}" name="${obj.input_type}" max_lines="${obj.max_lines}" onfocus='check(this)' onblur='test(this)' placeholder="${obj.hint}" class="shuru" /></span>`)
            }
          }
        }
      }
    })
  }
}
function check(res) {
  var title = $(res).parent().title
  if(res.className == 'test_box') {
    res.onkeyup = function() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + "px";
    }
  }
  if($(res).prop('name')){
    var name = $(res).prop('name')
    switch (name) {
      case 'text':
        $(res).attr("type","text")
        break;
      case 'number':
        $(res).attr({type:"number",earn:"nofu"})
        break;
      case 'number_decimal':
        $(res).attr({type:"number",earn:"float"})
        break;
      case 'number_signed':
        $(res).attr({type:"number",earn:"all"})
        break;
      case 'text_password':
        $(res).attr("type","password")
        break;
      case 'number_password':
        $(res).attr({type:"password",earn:"num"})
        break;
    }
  }
}
function test(res) {
  var max_lines = res.getAttribute('max_lines')
  var verify = JSON.parse(res.getAttribute('verify'))
  var type = res.getAttribute('type')
  var earn = res.getAttribute('earn')
  var title = $(res).parent()[0].getAttribute('title')
  try{
    if(type == 'number' && earn == 'nofu'){
      var re = /^\d+$/
      if(!re.test($(res).val())){
        $(res).val("")
        title = `${title}请输入正整数`
        throw new myErr(res,title)
      }
    }
    if(type == 'number' && earn == 'float') {
      var re = /^\d+\.{0,1}\d{0,}$/
      if (!re.test($(res).val())) {
        $(res).val("")
        title = `${title}请输入整数`
        throw new myErr(res,title)
      }
    }
    if(type == 'number' && earn == 'all') {
      var re = /^-{0,1}\d+$/
      if(!re.test($(res).val())) {
        $(res).val("")
        title = `${title}请输入整数`
        throw new myErr(res,title)
      }
    }
    if(type == 'password' && earn == 'num') {
      var re = /^\d+$/
      if(!re.test($(res).val())) {
        $(res).val("")
        title = `${title}密码只能为数字`
        throw new myErr(res,title)
      }
    }
    if(verify) {
      for (var i = 0; i < verify.length; i++) {
        var re = new RegExp("(" + verify[i].regular_expression + ")")
        if (!re.test($(res).val())) {
          $(res).val("")
          title = `${title}${verify[i].error_tip}`
          throw new myErr(res,title)
        }
      }
    }
    if(max_lines) {
      var reg = new RegExp("(.{0,}\\n.{0,}){" + max_lines + ",}")
      if(reg.test($(res).val())) {
        $(res).val("")
        title = `${title}超出限制`
        throw new myErr(res,title)
      }
    }
  }
  catch (err) {
    show_tip(err)
    return false
  }
}
function myErr(name,title) {
  this.name = name
  this.title = title
}
function creat_date(res,ver) {
  if(ver){
    var obj = res.meta_data
    if(obj.more_than_check){
      if(obj.more_than_check && obj.more_than_check != 'undefined'){
        obj.more_than_check = JSON.stringify(obj.more_than_check)
      }
    }
    if(obj.less_than_check){
      if(obj.less_than_check && obj.less_than_check != 'undefined'){
        obj.less_than_check = JSON.stringify(obj.less_than_check)
      }
    }
    if(obj){
      if(obj.default_time){
        $(ver).append(`<span style="display: block;margin: 10px" class='${res.id}' type='${res.type}' title='${res.title}'><b style="display: block;font-weight: normal">${res.title}</b><input onfocus='due(this)' more='${obj.more_than_check}' less='${obj.less_than_check}' value='${res.default_time}' /></span>`)
      }else if(obj.default_time || obj.is_fill_local_time){
        $(domEle).parent().append(`<span style="display: block;margin: 10px" id='${res.id}' type='${res.type}' title='${res.title}'><b style="display: block;font-weight: normal">${res.title}</b><input onfocus='due(this)' more='${obj.more_than_check}' less='${obj.less_than_check}' value='${res.default_time}' /></span>`)
      }else if(obj.is_fill_local_time){
        var date = new Date()
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m;
        var d = date.getDate()
        d = d < 10 ? '0' + d : d;
        var str = y + '/' + m + '/' + d
        $(ver).append(`<span style="display: block;margin: 10px" class='${res.id}' type='${res.type}' title='${res.title}'><b style="display: block;font-weight: normal">${res.title}</b><input onfocus='due(this)' more='${obj.more_than_check}' less='${obj.less_than_check}' value='${str}' /></span>`)
      }else{
        $(ver).append(`<span style="display: block;margin: 10px" class='${res.id}' type='${res.type}' title='${res.title}'><b style="display: block;font-weight: normal">${res.title}</b><input onfocus='due(this)' more='${obj.more_than_check}' less='${obj.less_than_check}' /></span>`)
      }
    }else{
      $(ver).append(`<span style="display: block;margin: 10px" class='${res.id}' type='${res.type}' title='${res.title}'><b style="display: block;font-weight: normal">${res.title}</b><input onfocus='due(this)' more='${obj.more_than_check}' less='${obj.less_than_check}' /></span>`)
    }
  }else{
    $('custom-form').each((item,domEle)=>{
      if(res.id == JSON.parse($(domEle).html()).id){
        var obj = res.meta_data
        obj.more_than_check = JSON.stringify(obj.more_than_check)
        obj.less_than_check = JSON.stringify(obj.less_than_check)
        if(obj){
          if(obj.default_time){
            $(domEle).parent().append(`<span id='${res.id}' type='${res.type}' title='${res.title}'><input onfocus='due(this)' more='${obj.more_than_check}' less='${obj.less_than_check}' value='${res.default_time}' /></span>`)
          }else if(obj.default_time || obj.is_fill_local_time){
            $(domEle).parent().append(`<span id='${res.id}' type='${res.type}' title='${res.title}'><input onfocus='due(this)' more='${obj.more_than_check}' less='${obj.less_than_check}' /></span>`)
          }else if(obj.is_fill_local_time){
            var date = new Date()
            var y = date.getFullYear()
            var m = date.getMonth() + 1
            m = m < 10 ? '0' + m : m;
            var d = date.getDate()
            d = d < 10 ? '0' + d : d;
            var str = y + '/' + m + '/' + d
            $(domEle).parent().append(`<span id='${res.id}' type='${res.type}' title='${res.title}'><input onfocus='due(this)' more='${obj.more_than_check}' less='${obj.less_than_check}' value='${str}' /></span>`)
          }else{
            $(domEle).parent().append(`<span id='${res.id}' type='${res.type}' title='${res.title}'><input onfocus='due(this)' more='${obj.more_than_check}' less='${obj.less_than_check}' /></span>`)
          }
        }else{
          $(domEle).parent().append(`<span id='${res.id}' type='${res.type}' title='${res.title}'><input onfocus='due(this)' more='${obj.more_than_check}' less='${obj.less_than_check}' /></span>`)
        }
      }
    })
  }
}
function due(res) {
  $(res).mobiscroll().date({
    theme: 'mobiscroll',
    lang: 'zh',
    display: 'bubble',
    select: 'multiple',
    width: 60,
    height: 35,
    controls: ['calendar']
  })
  if($(res).val()){
    var more = $(res)[0].getAttribute('more')
    var less = $(res)[0].getAttribute('less')
    var str = parseInt(new Date($(res).val()).getTime() / 1000)
    try{
      if(more && more != 'undefined'){
        more = JSON.parse(more)
        $.each(more,(item,ele)=>{
          if(str < ele.timestamp){
            throw new myErr(res,ele.error_tips)
          }
        })
      }
      if(less && less != 'undefined'){
        less = JSON.parse(less)
        $.each(less,(item,ele)=>{
          if(str < ele.timestamp){
            throw new myErr(res,ele.error_tips)
          }
        })
      }
    }
    catch (err) {
      show_tip(err)
      return false
    }
  }
}
function creat_single(res,ver) {
  if(ver){
    var obj = res.meta_data
    var box = document.createElement('div')
    box.className = res.id
    box.style.margin = '10px'
    $(ver).append(box)
    var p = document.createElement('b')
    p.style.display = 'block'
    p.style.fontWeight = 'normal'
    p.innerText = res.title
    var inset = document.createElement('div')
    $(box).append(p)
    $(box).append(inset)
    box.setAttribute('type', res.type)
    box.setAttribute('title', res.title)
    box.setAttribute('mode', res.show_mode)
    obj.options.forEach((item)=>{
      if(obj.default_select){
        if(item.choice_id == obj.default_select){
          $(inset).append(`<span><input type="checkbox" class='danxu' name="${res.id}" onclick='checkod(event,this)'  checked value="${item.choice_id}"><span>${item.choice_title}</span></span>`)
        }else{
          $(inset).append(`<span><input type="checkbox" class='danxu' name="${res.id}" onclick='checkod(event,this)'  value="${item.choice_id}"><span>${item.choice_title}</span></span>`)
        }
      }else{
        $(inset).append(`<span><input type="checkbox"  class='danxu' onclick='checkod(event,this)' name="${res.id}" value="${item.choice_id}"><span>${item.choice_title}</span></span>`)
      }
    })
  }else{
    $('custom-form').each((item,domEle)=>{
      if(res.id == JSON.parse($(domEle).html()).id){
        var obj = res.meta_data
        $(domEle).parent().append(`<div id="${res.id}" title="${res.title}" mode="${res.show_mode}" type="${res.type}"></div>`)
        obj.options.forEach((item)=>{
          if(obj.default_select){
            if(item.choice_id == obj.default_select){
              $(domEle).next().append(`<span><input type="checkbox" class='danxu' name="${res.id}" onclick='checkod(event,this)'  checked value="${item.choice_id}"><span>${item.choice_title}</span></span>`)
            }else{
              $(domEle).next().append(`<span><input type="checkbox" class='danxu' name="${res.id}" onclick='checkod(event,this)'  value="${item.choice_id}"><span>${item.choice_title}</span></span>`)
            }
          }else{
            $(domEle).next().append(`<span><input type="checkbox"  class='danxu' onclick='checkod(event,this)' name="${res.id}" value="${item.choice_id}"><span>${item.choice_title}</span></span>`)
          }
        })
      }
    })
  }
}
function checkod(ev,es) {
  if(ev.target.checked == true){
    $(es.parentNode).siblings().children('input').each((i,ele)=>{
      ele.checked = false
    })
  }
}
function creat_multi(res,ver) {
  if(ver){
    var obj = res.meta_data
    var box = document.createElement('div')
    box.className = res.id
    box.style.width = '80%'
    box.style.margin = '10px'
    $(ver).append(box)
    var p = document.createElement('b')
    p.style.display = 'block'
    p.style.fontWeight = 'normal'
    p.innerText = res.title
    var inset = document.createElement('div')
    $(box).append(p)
    $(box).append(inset)
    box.setAttribute('type', res.type)
    box.setAttribute('title', res.title)
    box.setAttribute('min', res.min_select_num)
    box.setAttribute('max', res.max_select_num)
    box.setAttribute('mode', res.show_mode)
    var down = (fn) =>{
      obj.options.forEach((item)=>{
        fn(item)
      })
    }
    down((res)=>{
      var moren = obj.default_select
      if(moren){
        for(var l = 0; l < moren.length; l++) {
          if(moren[l] == res.choice_id){
            var str = `<span><input type="checkbox" onclick='checko(event,this)' class='fuxu' name='${res.id}' checked value='${res.choice_id}'><span>${res.choice_title}</span></span>`
            break
          }else{
            var str = `<span><input type="checkbox" onclick='checko(event,this)' class='fuxu' name='${res.id}' value='${res.choice_id}'><span>${res.choice_title}</span></span>`
          }
        }
      }else{
        var str = `<span><input type="checkbox" onclick='checko(event,this)' class='fuxu' name='${res.id}' value='${res.choice_id}'><span>${res.choice_title}</span></span>`
      }
      $(inset).append(str)
    })
  }else{
    $('custom-form').each((item,domEle)=>{
      if(res.id == JSON.parse($(domEle).html()).id){
        var obj = res.meta_data
        $(domEle).parent().append(`<div id="${res.id}" title="${res.title}" type="${res.type}" mode="${res.show_mode}" min="${res.min_select_num}" max="${res.max_select_num}"></div>`)
        var down = (fn) =>{
          obj.options.forEach((item)=>{
            fn(item)
          })
        }
        down((res)=>{
          var moren = obj.default_select
          if(moren){
            for(var l = 0; l < moren.length; l++) {
              if(moren[l] == res.choice_id){
                var str = `<span><input type="checkbox" onclick='checko(event,this)' class='fuxu' name='${res.id}' checked value='${res.choice_id}'><span>${res.choice_title}</span></span>`
                break
              }else{
                var str = `<span><input type="checkbox" onclick='checko(event,this)' class='fuxu' name='${res.id}' value='${res.choice_id}'><span>${res.choice_title}</span></span>`
              }
            }
          }else{
            var str = `<span><input type="checkbox" onclick='checko(event,this)' class='fuxu' name='${res.id}' value='${res.choice_id}'><span>${res.choice_title}</span></span>`
          }
          $(domEle).next().append(str)
        })
      }
    })
  }
}
function checko(res) {

}
function creat_list(res,ver) {
  var obj = res.meta_data
  if(ver){
    var btn = document.createElement('button')
    btn.style.display = 'block'
    btn.style.margin = 'margin: 10px auto 5px'
    btn.innerText = '添加'
    $(domEle).parent().append(`<div type="${res.type}" min="${obj.min_item_num}" max="${obj.max_item_num}" id="${res.id}" style="width: 96%;margin: 0 auto;min-height: 33px; border: 1px solid black;">${btn}</div>`)
    $(btn).addEventListener('click',function () {
      creat_lists(this,res)
    })
  }else{
    $('custom-form').each((item,domEle)=>{
      if(res.id == JSON.parse($(domEle).html()).id){
        $(domEle).parent().append(`<div type="${res.type}" min="${obj.min_item_num}" max="${obj.max_item_num}" id="${res.id}" style="width: 96%;margin: 0 auto;min-height: 33px; border: 1px solid black;"><button style="display: block;margin: 10px auto 5px;" id="btn">添加</button></div>`)
        $('#btn')[0].addEventListener('click',function () {
          creat_lists(this,res)
        })
      }
    })
  }
}
function creat_lists(ev,res) {
  var obj =  res.meta_data
  var li = document.createElement('li')
  li.style.width = '96%'
  li.style.listStyle = 'none'
  li.style.margin = '10px auto 10px'
  li.style.border = '1px solid black'
  $(ev).before(li)
  obj.item_elements.forEach((item)=>{
    switch (item.type) {
      case 'input_text':
        creat_input(item,li)
        break;
      case 'date_select':
        creat_date(item,li)
        break;
      case 'single_choice':
        creat_single(item,li)
        break;
      case 'multi_choice':
        creat_multi(item,li)
        break;
      case 'list':
        creat_list(item,li)
        break;
    }
  })
  var btn2 = document.createElement('button')
  btn2.innerText = '删除'
  btn2.style.display = 'block'
  btn2.style.margin = '10px auto 5px'
  btn2.addEventListener('click', delet)
  li.appendChild(btn2)
}
function delet() {
  this.parentElement.parentElement.removeChild(this.parentElement)
}
function creat_box(res) {
  $('custom-form').each((item,domEle)=>{
    if(res.id == JSON.parse($(domEle).html()).id){
      var box = document.createElement('div')
      box.id = res.id
      box.setAttribute('type', res.type)
      $(domEle).parent().append(box)
      res.meta_data.forEach((item)=>{
        switch (item.type) {
          case 'input_text':
            creat_input(item,box)
            break;
          case 'date_select':
            creat_date(item,box)
            break;
          case 'single_choice':
            creat_single(item,box)
            break;
          case 'multi_choice':
            creat_multi(item,box)
            break;
          case 'list':
            creat_list(item,box)
            break;
        }
      })
    }
  })
}
function creat_name(res) {
  $('custom-form').each((item,domEle)=>{
    if(res.id == JSON.parse($(domEle).html()).id){
      var box = document.createElement('div')
      box.id = res.id
      box.setAttribute('type', res.type)
      box.style.width = '96%'
      box.style.margin = '0 auto'
      box.style.minHeight = '33px'
      box.style.border = '1px solid black'
      var obj = res.meta_data
      obj.names.forEach((item)=>{
        var li = document.createElement('li')
        var ox = document.createElement('div')
        ox.className =  obj.widget.id
        ox.setAttribute('type', obj.widget.type)
        creat_beat(obj.widget.meta_data,ox)
        li.style.width = '98%'
        li.style.margin = '5px auto'
        li.style.border = '1px solid black'
        box.appendChild(li)
        li.innerText = item
        li.appendChild(ox)
      })
      $(domEle).parent().append(box)
    }
  })
}
function creat_beat(res,ele) {
  res.forEach((item)=>{
    switch (item.type) {
      case 'input_text':
        creat_input(item,ele)
        break;
      case 'date_select':
        creat_date(item,ele)
        break;
      case 'single_choice':
        creat_single(item,ele)
        break;
      case 'multi_choice':
        creat_multi(item,ele)
        break;
      case 'list':
        creat_list(item,ele)
        break;
    }
  })
}
function creat_html(res) {
  $('custom-form').each((item,domEle)=>{
    if(res.id == JSON.parse($(domEle).html()).id){
      var obj = res.meta_data
      if(obj.hint){
        $(domEle).parent().append(`<div class="wysiwyg-wrapper">
                                    <div class="wysiwyg-placeholder">${obj.hint}</div>
                                    <div class="wysiwyg-editor" style="padding:5px;border:1px dashed black"></div>
                                    <textarea id="${res.id}" style="display:none;" name="editor"></textarea>
                                </div>`)
      }else{
        $(domEle).parent().append(`<div id="${res.id}" type="${res.type}" style="padding:5px;border:1px dashed black"></div>`)
      }

      $(`#${res.id}`).wysiwyg({class:'some-more-classes'})
      if(obj.content){
        $(`#${res.id}`).wysiwyg('shell').setHTML(obj.content)
      }
    }
  })
}
function getCustomFormResult(){
  var webArr = []
  $('custom-form').each((item,domEle)=>{
    webArr.push(JSON.parse($(domEle).html()))
  })
  var result = []
  try {
    $.each(webArr,(dom,item)=>{
      var type = $(`#${item.id}`)[0].getAttribute('type')
      switch (type) {
        case 'input_text':
          get_input(item,result)
          break;
        case 'date_select':
          get_date(item,result)
          break;
        case 'single_choice':
          get_single(item,result)
          break;
        case 'multi_choice':
          get_multi(item,result)
          break;
        case 'list':
          get_list(item,result)
          break;
        case 'container':
          get_box(item,result)
          break;
        case 'combine_name_with_widget':
          get_name(item,result)
          break;
        case 'html_input_text':
          get_html(item,result)
          break;
      }
    })
  }
  catch (err) {
    show_tip(err,'asd')
    return false
  }
  var tt = JSON.stringify(result)
  if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    FindworkersHtmlCustomform.onGetedWithErrorWithResult(true, null, tt)
  }else{
    console.log(1)
    console.log(tt)
    return tt
  }
}
function show_tip(err,ver) {
  var target
  if(document.documentElement.scrollTop){
    target = $('html')
  }else{
    target = $('body')
  }
  if(ver){
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      FindworkersHtmlCustomform.onGetedWithErrorWithResult(false, err.title, [])
    }
  }
  target.animate({scrollTop:$(err.name).offset().top})
  $('#warns').children().eq(0).html(err.title)
  $('#warns').css('display','block')
  $(err.name).addClass('color')
  setTimeout(()=>{
    $('#warns').css('display','none')
    $('#warns').children().eq(0).html("")
    $(err.name).removeClass('color')
  },3000)
}
function get_html(item,arr) {
  if(item.required){
    var str = $(`#${item.id}`).wysiwyg('shell').getHTML()
    if(str.length < 1){
      var src = $(`#${item.id}`)
      var tit = `${item.title}不可为空`
      throw new myErr(src,tit)
    }else{
      var value = {}
      value.id = item.id
      value.result = str
      arr.push(value)
    }
  }else{
    var value = {}
    value.id = item.id
    value.result = $(`#${item.id}`).wysiwyg('shell').getHTML()
    arr.push(value)
  }

}
function get_input(item,arr,res) {
  if(res){
    var own_fir = $(res).find(`.${item.id}`).children()[1]
    var own_sec = $(res).find(`.${item.id}`).children().eq(1)
  }else{
    var own_fir = $(`#${item.id}`).children()[0]
    var own_sec = $(`#${item.id}`).children()
  }
  var value = {}
  var min = own_fir.getAttribute('minlength')
  if(item.required){
    if(min == 'undefined' || !min){
      if(own_sec.val().length < 1){
        var str = `${item.title}不可为空`
        throw new myErr(own_sec,str)
      }else{
        value.id = item.id
        value.result = own_sec.val()
        arr.push(value)
      }
    }else{
      if(own_sec.val().length < min){
        var str = `${item.title}字数不可少于${min}`
        throw new myErr(own_sec,str)
      }else{
        value.id = item.id
        value.result = own_sec.val()
        arr.push(value)
      }
    }
  }else{
    if(min == 'undefined' || !min){
      value.id = item.id
      value.result = own_sec.val()
      arr.push(value)
    }else{
      if(own_sec.val().length < min){
        var str = `${item.title}字数不可少于${min}`
        throw new myErr(own_sec,str)
      }else{
        value.id = item.id
        value.result = own_sec.val()
        arr.push(value)
      }
    }
  }
}
function get_date(item,arr,id) {
  if(id){
    var own_fir = $(id).find(`.${item.id}`).children().eq(1)
  }else{
    var own_fir = $(`#${item.id}`).children()
  }
  var value  = {}
  if(own_fir.val()){
    var more = own_fir[0].getAttribute('more')
    var less = own_fir[0].getAttribute('less')
    var str = parseInt(new Date(own_fir.val()).getTime() / 1000)
    if(more && more != 'undefined'){
      more = JSON.parse(more)
      $.each(more,(item,ele)=>{
        if(str < ele.timestamp){
          throw new myErr(own_fir,ele.error_tips)
        }
      })
    }
    if(less && less != 'undefined'){
      less = JSON.parse(less)
      $.each(less,(item,ele)=>{
        if(str < ele.timestamp){
          throw new myErr(own_fir,ele.error_tips)
        }
      })
    }
  }
  if(item.required){
    if(own_fir.val()){
      value.id = item.id
      value.result = parseInt(new Date(own_fir.val()).getTime() / 1000)
      arr.push(value)
    }else{
      var str = `${item.title}必填`
      throw new myErr(own_fir,str)
    }
  }else{
    if(own_fir.val()){
      value.id = item.id
      value.result = parseInt(new Date(own_fir.val()).getTime() / 1000)
      arr.push(value)
    }else{
      value.id = item.id
      value.result = null
      arr.push(value)
    }
  }
}
function get_single(item,arr,id) {
  if(id){
    var own_fir = $(id).find(`.${item.id}`).children().eq(1).find('input:checked')
  }else{
    var own_fir = $(`#${item.id} input:checked`)
  }
  var value = {}
  if(item.required){
    if(own_fir.length > 0){
      value.id = item.id
      value.result = own_fir.val()
      arr.push(value)
    }else{
      var str = `${item.title}必填一项`
      throw new myErr(own_fir,str)
    }
  }else{
    if(own_fir.length > 0){
      value.id = item.id
      value.result = own_fir.val()
      arr.push(value)
    }else {
      value.id = item.id
      value.result = ''
      arr.push(value)
    }
  }
}
function get_multi(item,arr,id) {
  if(id){
    var own_fir = $(id).find(`.${item.id}`).children().eq(1).find('input:checked')
  }else{
    var own_fir = $(`#${item.id} input:checked`)
  }
  var value = {}
  if(item.required){
    if(own_fir.length > 0){
      value.id = item.id
      value.result = []
      own_fir.each((item,ele)=>{
        value.result.push($(ele).val())
      })
      arr.push(value)
    }else{
      var str = `${item.title}至少选择一项`
      throw new myErr(own_fir,str)
    }
  }else{
    if(own_fir.length > 0){
      value.id = item.id
      value.result = []
      own_fir.each((item,ele)=>{
        value.result.push($(ele).val())
      })
      arr.push(value)
    }else{
      value.id = item.id
      value.result = []
      arr.push(value)
    }
  }
}
function get_list(item,jet){
  var value = {}
  var min = $(`#${item.id}`)[0].getAttribute('min')
  var len = $(`#${item.id}`).children().length - 1
  if(item.required){
    if(len == 'undefined'){len = 1}
    if(len >= min){
      value.id = item.id
      value.result = []
      var data = item.meta_data.item_elements
      $(`#${item.id} li`).each((item,ele)=>{
        var arr = []
        data.forEach((dom)=>{
          switch (dom.type) {
            case 'input_text':
              get_input(dom,arr,ele)
              break;
            case 'date_select':
              get_date(dom,arr,ele)
              break;
            case 'single_choice':
              get_single(dom,arr,ele)
              break;
            case 'multi_choice':
              get_multi(dom,arr,ele)
              break;
          }
        })
        value.result.push(arr)
      })
      jet.push(value)
    }else{
      var str = `${item.title}至少填写${min}项`
      var ele = $(`#${item.id}`)
      throw new myErr(ele,str)
    }
  }else{
    if(len >= min){
      value.id = item.id
      value.result = []
      var data = item.meta_data.item_elements
      $(`#${item.id} li`).each((item,ele)=>{
        var arr = []
        data.forEach((dom)=>{
          switch (dom.type) {
            case 'input_text':
              get_input(dom,arr,ele)
              break;
            case 'date_select':
              get_date(dom,arr,ele)
              break;
            case 'single_choice':
              get_single(dom,arr,ele)
              break;
            case 'multi_choice':
              get_multi(dom,arr,ele)
              break;
          }
        })
        value.result.push(arr)
      })
      jet.push(value)
    }else{
      value.id = item.id
      value.result = []
      jet.push(value)
    }
  }
}
function get_box(item,jet,val){
  if(val){
    var ele = val
  }else{
    var ele = `#${item.id}`
  }
  var value = {}
  value.id = item.id
  value.result = []
  item.meta_data.forEach((dom)=>{
    switch (dom.type) {
      case 'input_text':
        get_input(dom,value.result,ele)
        break;
      case 'date_select':
        get_date(dom,value.result,ele)
        break;
      case 'single_choice':
        get_single(dom,value.result,ele)
        break;
      case 'multi_choice':
        get_multi(dom,value.result,ele)
        break;
      // case 'list':
      //   get_list(dom,arr,ele)
      //   break;
      // case 'container':
      //   get_box(dom,arr,ele)
      //   break;
      // case 'combine_name_with_widget':
      //   get_name(dom,arr,ele)
      //   break;
    }
  })
  jet.push(value)
}
function get_name(item,jet) {
  var value = {}
  value.id = item.id
  value.result = []
  var data = item.meta_data.widget
  $(`#${item.id} li`).each((item,ele)=>{
    get_box(data,value.result,ele)
  })
  jet.push(value)
}