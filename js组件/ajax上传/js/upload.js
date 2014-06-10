

document.write('<script src="js/jquery.ui.widget.js"><\/script>');

document.write('<script src="js/jquery.iframe-transport.js"><\/script>');
document.write('<script src="js/jquery.fileupload.js"><\/script>');

$(function () {
    //'use strict';
    // Change this to the location of your server-side upload handler:

    $('#fileupload').fileupload({
        url: '/mistra/index.php/upload',
        dataType: 'json',
    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        maxFileSize: 1000000, // 1 MB
        loadImageMaxFileSize: 1000000, // 1MB
        disableImageResize: false,
    success: function (json) { 
        //$('#files').html(json);
                //$('#MemType_zmt_pic').attr('value',json.upfile.file); 
                //alert(111);
        if(json.status == "1"){
          $("#upimg").attr('src','uploads/'+json.data.upload_data.file_name); 
          $("#imgurl").val(json.data.upload_data.file_name); 
          //$('#image_url').attr('value',json.msg);  
        }else{
          alert(json.msg);
        }
                //$("#images").attr('src','upload/'+json);  
        //$('#image_url').attr('value',json); 
        
        
        },
    done: function (e, data) {
      //alert(222);
      $('.loading').hide();
      $('.upload_btn').show();
        },
    progressall: function (e, data) {
            //$('#fileupload').attr("class","loading");
           // alert(3333);
      $('.upload_btn').hide();
      $('.loading').show();
        },

    });
});

