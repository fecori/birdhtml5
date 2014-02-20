<?php header('Access-Control-Allow-Origin: *'); ?>
<!DOCTYPE html>
<!--[if lt IE 7]>
<html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>
<html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>
<html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Flappy Bird</title>
	<!-- <meta name="viewport" content="width=768"> -->
	<meta name="description" content="Juega Flappy Bird en Facebook!">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="css/normalize.min.css">
	<link rel="stylesheet" href="css/style.css">
	<script src="js/preloadjs-NEXT.min.js"></script>
	<script src="js/soundjs-NEXT.min.js"></script>
	<script src="js/createjs-2013.09.25.min.js"></script>
	<script src="js/ndgmr.Collision.js"></script>
	<script src="js/jquery.min.js"></script>
	<script src="js/init.js?v=2"></script>
	<meta name="apple-mobile-web-app-capable" content="yes"/>
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
	<link rel="apple-touch-icon-precomposed" href="img/apple-icon.png"/>
	<script type="text/javascript">
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-47994868-1']);
		_gaq.push(['_trackPageview', 'Flappy-Home']);

		(function () {
			var ga = document.createElement('script');
			ga.type = 'text/javascript';
			ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(ga, s);
		})();
	</script>
</head>
<body>
<div class="top filler">
	<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
	<ins class="adsbygoogle"
	     style="display:inline-block;width:728px;height:90px"
	     data-ad-client="ca-pub-1925273469404278"
	     data-ad-slot="5449058545"></ins>
	<script>
		(adsbygoogle = window.adsbygoogle || []).push({});
	</script>
</div>
<canvas id="flappygame" width="768" height="768"></canvas>
<div class="bottom filler">
	<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
	<ins class="adsbygoogle"
	     style="display:inline-block;width:728px;height:90px"
	     data-ad-client="ca-pub-1925273469404278"
	     data-ad-slot="5449058545"></ins>
	<script>
		(adsbygoogle = window.adsbygoogle || []).push({});
	</script>
</div>

<!--<a href="javascript:void(0);" id="fbshare">compartir</a>
<a href="javascript:void(0);" id="fbinvitar">invitar amigos</a>-->

<div id="fb-root"></div>
<script>
	window.fbAsyncInit = function () {
		FB.init({
			appId: '723619977669232', //produc
			//appId : '208335002643370', //localhost
			status: true,
			xfbml: true,
			channelUrl: '//friki.pe/channel.html'
		});
	};
	(function (d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement(s);
		js.id = id;
		js.src = "//connect.facebook.net/en_US/all.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
</script>
</body>
</html>