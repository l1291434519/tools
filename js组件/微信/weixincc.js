  var cookie = {
            get: function(name){
                if( name=='' ){
                    return '';
                }
                var reg = new RegExp(name+'=([^;]*)');
                var res = document.cookie.match(reg);
                return (res && res[1]) || '';
            },
            set: function(name, value){
                var now = new Date();
                    now.setDate(now.getDate() + 1);
                var exp = now.toGMTString();
                document.cookie = name + '=' + value + ';expires=' + exp;
                return true;
            }
        };

        function hash(str){
            var hash = 5381;
            for(var i=0; i<str.length; i++){
                hash = ((hash<<5) + hash) + str.charCodeAt(i);
                hash &= 0x7fffffff;
            }
            return hash;
        }

        function trim(str){
            return str.replace(/^\s*|\s*$/g,'');
        }

        function ajax(obj){
            var type  = (obj.type || 'GET').toUpperCase();
            var url   = obj.url;
            var async = typeof obj.async == 'undefined' ? true : obj.async;
            var data  = typeof obj.data  == 'string' ? obj.data : null;
            var xhr   = new XMLHttpRequest();
            var timer = null;
            xhr.open(type, url, async);
            xhr.onreadystatechange = function(){
                if( xhr.readyState == 3 ){
                    obj.received && obj.received(xhr);
                }
                if( xhr.readyState == 4 ){
                    if( xhr.status >= 200 && xhr.status < 400 ){
                        clearTimeout(timer);
                        obj.success && obj.success(xhr.responseText);
                    }
                    obj.complete && obj.complete();
                }
            };
            if( type == 'POST' ){
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            }
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.send(data);
            if( typeof obj.timeout != 'undefined' ){
                timer = setTimeout(function(){
                    xhr.abort("timeout");
                }, obj.timeout);
            }
        }

		var title     = trim('闲话Volvo概念车——Concept&nbsp;Coupe'      .replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
		var sourceurl = trim(''.replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
      



        function htmlDecode(str){
            return str
                  .replace(/&#39;/g, '\'')
                  .replace(/<br\s*(\/)?\s*>/g, '\n')
                  .replace(/&nbsp;/g, ' ')
                  .replace(/&lt;/g, '<')
                  .replace(/&gt;/g, '>')
                  .replace(/&quot;/g, '"')
                  .replace(/&amp;/g, '&');
        }
                  
        function report(link, fakeid, action_type){
            var queryStr = link.split('?').pop();
                queryStr = queryStr.split('#').shift();
            if( queryStr == '' ){
                return;
            }

            var param = [
                queryStr,
                'action_type=' + action_type,
                'uin=' + fakeid
            ].join('&');
            /*
            ajax({
                url : '/mp/appmsg/show',
                type: 'POST',
                timeout: 2000,
                data: param
            });*/
        }

        function reportTimeOnPage(){
            var link     = location.href;
            var fakeid   = "";
            var queryStr = link.split('?').pop();
                queryStr = queryStr.split('#').shift();
            if( queryStr == '' ){
                return;
            }

            var param = [
                queryStr,
                'start_time='+_wxao.begin,
                'end_time='+new Date().getTime(),
                'uin='+fakeid,
                'title='+encodeURIComponent(title),
                'action=pagetime'
            ].join('&');
/*
            ajax({
                url: '/mp/appmsg/show?'+param,
                //url: '/mp/comm_report?'+param,
                async : false,
                timeout: 2000
            });*/
            //var img = new Image(1,1);
            //img.src = '/mp/appmsg/show?'+param;
        }

        function share_scene(link, scene_type){
            var queryStr = link.split('?')[1] || '';
                queryStr = queryStr.split('#')[0];
            if( queryStr == '' ){
                return;
            }
            
            queryStr = [queryStr, 'scene='+scene_type].join('&');

            return link.split('?')[0] + '?' + queryStr + '#' + (link.split('#')[1]||'');
        }
          
      

      //以下为执行区间
      //分享等
		(function(){

        function onBridgeReady() {

            var appId  = '',
			    imgUrl = "http://www.midea.com/cn/promotion/app/2014/wish/thems/pic31.jpg",
			    link   = "http://www.midea.com/cn/promotion/app/2014/wish/wap/?a=11==&b=11&c=1&d=11#rd",
				title  = htmlDecode("cccccccccccc"),
                desc   = htmlDecode("aaaaaaaaaaaaaa"),
                fakeid = "";
                desc   = desc || link;	

        	if( "1" == "0" ){
	    	    WeixinJSBridge.call("hideOptionMenu");  
        	}

           

					// 发送给好友; 
            WeixinJSBridge.on('menu:share:appmessage', function(argv){
            
						WeixinJSBridge.invoke('sendAppMessage',{
											  "img_url"    : getImgUrl(),
                                              "img_width"  : "640",
                                              "img_height" : "640",
                                              "link"       : share_scene(getLink(), 2),
                                              "desc"       : getDesc(),
                                              "title"      : getTitle()
                        }, function(res) {report(link, fakeid, 1);
                        });
			});

					// 分享到朋友圈;
            WeixinJSBridge.on('menu:share:timeline', function(argv){
                        report(link, fakeid, 2);
						WeixinJSBridge.invoke('shareTimeline',{
											  "img_url"    : getImgUrl(),
											  "img_width"  : "640",
											  "img_height" : "640",
											  "link"       : share_scene(getLink(), 2),
											  "desc"       : getDesc(),
											  "title"      : getTitle()
						}, function(res) {
                        });
            
			});

					// 分享到微博;
			var weiboContent = '';
            WeixinJSBridge.on('menu:share:weibo', function(argv){
            
						WeixinJSBridge.invoke('shareWeibo',{
											  "content" : getTitle() + share_scene(getLink(), 3),
											  "url"     : share_scene(getLink(), 3) 
											  }, function(res) {report(link, fakeid, 3);
											  });
			});

					// 分享到Facebook
		    WeixinJSBridge.on('menu:share:facebook', function(argv){
			    report(link, fakeid, 4);
			    WeixinJSBridge.invoke('shareFB',{
                       "img_url"    : getImgUrl(),
                       "img_width"  : "640",
                       "img_height" : "640",
                       "link"       : share_scene(getLink(), 2),
                       "desc"       : getDesc(),
                       "title"      : getTitle()
			    }, function(res) {} );
		    });

                    // 新的接口
            WeixinJSBridge.on('menu:general:share', function(argv){
                var scene = 0;
                switch(argv.shareTo){
                    case 'friend'  : scene = 1; break;
                    case 'timeline': scene = 2; break;
                    case 'weibo'   : scene = 3; break;
                }
                    argv.generalShare({
                                        "appid"      : appId,
                                         "img_url"    : getImgUrl(),
                                          "img_width"  : "640",
                                          "img_height" : "640",
                                          "link"       : share_scene(getLink(), 2),
                                          "desc"       : getDesc(),
                                          "title"      : getTitle()
                    }, function(res){report(link, fakeid, scene);
                    });
            });

					
		}

        if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }
        }else{
            onBridgeReady();
        }
		
        })();

        // 记住阅读位置
		(function(){
			var timeout = null;
			var val = 0;
            var url = "http://mp.weixin.qq.com/s?__biz=MjM5NTIyNDgyMQ==&mid=10029238&idx=1&sn=86de874aa8cd117bae504a790818e277#rd".split('?').pop();
            var key = hash(url);
            /*
			var params = parseParams( url );
			var biz = params['__biz'].replace(/=/g, '#');
			var key = biz + params['appmsgid'] + params['itemidx'];
            */

            if( window.addEventListener ){
                window.addEventListener('load', function(){
                    val = cookie.get(key);
                    window.scrollTo(0, val);
                }, false);

                window.addEventListener('unload', function(){
                    cookie.set(key,val);

                }, false);

                window.addEventListener('scroll', function(){
                    clearTimeout(timeout);
                    timeout = setTimeout(function(){
                        val = window.pageYOffset;
                    },500);
                }, false);

                document.addEventListener('touchmove', function(){
                    clearTimeout(timeout);
                    timeout = setTimeout(function(){
                        val = window.pageYOffset;
                    },500);
                }, false);
            }

		})();

	
        

        // 图片延迟加载
        (function(){
            var timer  = null;
            var height = (window.innerHeight||document.documentElement.clientHeight) + 40;
            var images = [];
            function detect(){
                var scrollTop = (window.pageYOffset||document.documentElement.scrollTop) - 20;
                for( var i=0,l=images.length; i<l; i++ ){
                    var img = images[i];
                    var offsetTop = img.el.offsetTop;
                    if( !img.show && scrollTop < offsetTop+img.height && scrollTop+height > offsetTop ){
                        img.el.setAttribute('src', img.src);
                        img.show = true;
                    }
                }
            }
            function onScroll(){
                clearTimeout(timer);
                timer = setTimeout(detect, 100);
            }
            function onLoad(){
                var imageEls = document.getElementsByTagName('img');
                for( var i=0,l=imageEls.length; i<l; i++ ){
                    var img = imageEls.item(i);
                    if(!img.getAttribute('data-src') ) continue;
                    images.push({
                        el     : img,
                        src    : img.getAttribute('data-src'),
                        height : img.offsetHeight,
                        show   : false
                    });
                }
                detect();
            }

            if( window.addEventListener ){
                window.addEventListener('scroll', onScroll, false);
                window.addEventListener('load', onLoad, false);
                document.addEventListener('touchmove', onScroll, false);
            }
            else {
                window.attachEvent('onscroll', onScroll);
                window.attachEvent('onload', onLoad);
            }
        })();