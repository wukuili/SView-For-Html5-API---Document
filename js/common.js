/*
	Hoteamsoft Inc.
*/
function initheadroom() {
    var myElement = document.querySelector("#header");
    var headroom = new Headroom(myElement, {
        offset: 205,
        tolerance: 5,
        classes: {
            initial: "animated",
            pinned: "slideDown",
            unpinned: "slideUp"
        }
    });
    headroom.init();
}

function heredoc(fn) {
    return fn.toString().split('\n').slice(1, -1).join('\n') + '\n'
}


function loadSuportInfo() {
    var infoHtml = heredoc(function () {/*
		<!-- ------------------------------------------技术支持------------------------------------ -->
		<div class= "page-header">
			<h2 id="89">技术支持</h2>
		</div>
		<div class="row">
			<div class="col-md-4 col-md-offset-2">

				<p >
					<span >公司地址：济南市高新区新泺大街2008号银荷大厦E座三层</span>
				</p>
				<p >
					<span >公司网址：<a href="http://www.hoteamsoft.com/">www.hoteamsoft.com</a></span>
				</p>
				<p >
					<span >公司总机：0531-88879070，0531-88879088</span>
				</p>
				<p >
					<span >售后服务：400-005-2123</span>
				</p>
				<p >
					<span >传　　真：0531-88879060</span>
				</p>
				<p >
					<span >官方微博：@华天软件-工业软件</span>
				</p>
			</div>
			<div class="col-md-4">

				<p >
					<span>微信公众号：山东山大华天软件有限公司</span>
				</p>
				<p>
					<img width=127 height=127 src="img/hoteamsoftWX.png" class="img-responsive">
				</p>
				<p >
					<span>SView微信公众号：SView</span>
				</p>
				<p>
					<img width=127 height=127 src="img/SViewWX.jpg" class="img-responsive">
				</p>
			</div>
		</div>
*/});

    $("#supportinfo").html(infoHtml);
}


function loadFooter() {
    var footerHtml = heredoc(function () {/*
				<footer class="bs-footer bs-docs-footer" role="contentinfo">
					<div class="container">
					<p>Copyright &copy; 2017
                    <a href="http://www.hoteamsoft.com/"> 山东山大华天软件有限公司 </a>
					</p>
				    <ul class="footer-links list-unstyled">
                    <li>鲁ICP备13032030号-2</li>
                    <li>
                        <a href="http://sview.sv3d.cn" target="sview"></a>
                    </li>
			        </ul>
		        </div>	
		        </footer>
		*/});
    $("#footer").html(footerHtml);
}

function loadHeader() {
    var headerHtml = heredoc(function () {/*
		     <div class="container">
                <div class="navbar-header">
                    <a href="#" class="navbar-brand" >SView4.2</a>
                    <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbar-main">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <div class="navbar-collapse collapse" id="navbar-main" >
                    <ul class="nav navbar-nav">
						<li>
                            <a href="./Sview for HTML5 user document.html">Sview for HTML5 集成说明 </a>
                        </li>
						<li>
                            <a href="./Sview for HTML5 API.html">Sview for HTML5 API</a>
                        </li>
                    </ul>
                </div>
            </div>

	*/});
    $("#header").html(headerHtml);
}

function initMenu ($) {  //保证jquery不与其他类库或变量有冲突，可以自由的在(function($){})(jQuery)里写你的插件代码
	$(function () {  //用来在DOM加载完成之后运行下面预行定义好的插件代码
		//导航栏插件
		$(function () {
			$(window).scroll(function () { //只要窗口滚动,就触发下面代码
				var scrollt = document.documentElement.scrollTop + document.body.scrollTop; //获取滚动后的高度
				if (scrollt > 200) {  //判断滚动后高度超过200px,就显示
					$("#gotop").fadeIn(400); //淡出
				} else {
					$("#gotop").stop().fadeOut(400); //如果返回或者没有超过,就淡入.必须加上stop()停止之前动画,否则会出现闪动
				}
			});
			$("#gotop").click(function () { //当点击标签的时候,使用animate在200毫秒的时间内,滚到顶部
				$("html,body").animate({ scrollTop: "0px" }, 200);
			});
		});

		//affix 插件
		//通过JavaScript启动affix插件：
		var $window = $(window)
		var $body = $(document.body)
		var navHeight = $('.navbar').outerHeight(true) + 10  //获取.navbar元素外部高度（默认包括补白和边框）,设置为 true 时，计算边距在内。

		$body.scrollspy({  //Bootstrap 的 ScrollSpy 插件
			target: '.bs-sidebar',  //target:（服务的）对象； 目标
			offset: navHeight  //offset:偏移,
		})

		// back to top
		setTimeout(function () {
			var $sideBar = $('.bs-sidebar')

			$sideBar.affix({
				offset: {
					top: function () {
						var offsetTop = $sideBar.offset().top  //获取div.bs-sidebar元素在当前视口的相对偏移
						var sideBarMargin = parseInt($sideBar.children(0).css('margin-top'), 10)  //div.bs-sidebar元素的第一个子元素ul的 margin-top
						var navOuterHeight = $('.bs-docs-nav').height()  //获取header.bs-docs-nav元素的CSS中 'height' 的高度值

						return (this.top = offsetTop - navOuterHeight - sideBarMargin)
					}
				, bottom: function () {
					return (this.bottom = $('.bs-footer').outerHeight(true))
				}
				}
			})
		}, 100)

		setTimeout(function () {
			$('.bs-top').affix()
		}, 100)

	})
}

//文档加载事件
$(document).ready(function () {

	//设置菜单
	initMenu(jQuery);

	loadHeader();
	loadSuportInfo();
    loadFooter();

	//设置header自动隐藏，需放在loadHeader之后
	initheadroom();

});