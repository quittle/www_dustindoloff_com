<!--[if gte IE 9]>
  <style type="text/css">
    .gradient {
       filter: none;
    }
  </style>
<![endif]-->

<!-- Add close to scroll comments -->
<script type="text/javascript" src="js/dQuery.js"></script>
<link rel="stylesheet" href="css/main.css" />
<div id="wrapper">
	<div id="header">
		Youtube video url: <input id="videoid" placeholder="http://www.youtube.com/watch?v=..." type="text" onfocus="selectAll(this);" onclick="selectAll(this);" onkeypress="return checkEnter(event);" />
		<input id="submit" type="submit" onclick="getVideoPlayer()" value="Load video" /><br /><br />
	</div>
	<div id="playerSection" style="display: none;">
		<div id="playerWrapper">
			<div id="playerControls">
				<div id="progressBar">
					<span id="progress">
						<span id="progressIndicator">
							<span id="progressCursor"></span>
						</span>
					</span>
				</div>
			</div>
			<canvas id="commentCanvas" style="display: none;"></canvas>
			<div id="playerHolder">
				<div id="player"></div><!-- swapped for iframe player -->
			</div>
		</div>
		
		<div id="divider"></div>

		<div id="rollingComments">
			<div id="rollingComments-shadow-top" class="gradient"></div>
			<div id="rollingComments-holder"></div>
			<div id="rollingComments-shadow-bottom" class="gradient"></div>
		</div>
	</div>
	<div id="commentHolder" style="display:none;">
		<div id="commentHolder-left">
			<span id="commentTime"></span><br /><br /><br /><br />
			<div id="commentSent">Sending...</div>
		</div>	
		<textarea id="commentArea" onkeypress="return editComment(event);" placeholder="Leave a comment.."></textarea>
		<div class="clearfix"></div>
	</div>
	<div id="commentBox"></div>
</div>
	
<script type="text/javascript" src="//www.youtube.com/iframe_api"></script>
<script type="text/javascript" src="js/helper.js"></script>
<script type="text/javascript" src="js/main.js"></script>