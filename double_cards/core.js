(function() {
	var client = new Dropbox.Client({ key: 'e5iqhmprars9are' });
	client.authDriver(new Dropbox.AuthDriver.Popup({
		receiverUrl: window.location.origin + '/double_cards/oauth_receiver.html'
	}));

	var begin = 0;
	var count = 12;
	var loading = false;
	var ccc = 0;

	if(client.isAuthenticated()) {
		$(".auth").hide();
	} else {
		$(".auth").click(function() {
			client.authenticate(function(err, response) {
				if(client.isAuthenticated()) {
					showProgress();
					client.readdir("/", {}, function(err, stat) {
						if(err) {
							hideProgress();
							console.log(err);
							return;
						}
						$(".auth").hide();
						prepareFilesObject(stat);
					});
				} else {
					console.log(error);
				}
			});
		});
	}

	function showProgress() {
		$("#myFixedDiv").css('display', 'block');
	}

	function hideProgress() {
		$("#myFixedDiv").css('display', 'none');
	}

	$(window).scroll(function() {
		if((($(window).scrollTop()+$(window).height())+250)>=$(document).height()){
			if(loading == false && client.isAuthenticated()) {
				loading = true;
				showProgress();
				client.readdir("/", {}, function(err, stat) {
					if(err) {
						hideProgress();
						console.log(err);
						loading = false;
						return;
					}
					prepareFilesObject(stat);
				});
			}
		}
	});

	function prepareFilesObject(fileList) {
		var obj = {};
		fileList = fileList.slice(begin, begin + count);
		begin+=count;
		console.log(fileList);
		for(var key in fileList) {
			var fileName = fileList[key];
			var side = fileName.substring(fileName.lastIndexOf("_") + 1, fileName.lastIndexOf("."));
			var onlyFileName = fileName.substring(fileName.lastIndexOf("_"), 0);
			var temp = obj[onlyFileName] != undefined ? obj[onlyFileName] : {};
			temp[side] = fileName;
			obj[onlyFileName] = temp;
		}
		showListFiles(obj);
	}

	function showListFiles(files) {
		for(key in files) {
			var frontUrl = files[key]["front"];
			client.makeUrl("/" + frontUrl, {download: true}, function(err, frontResponse) {
				if(err) {
					hideProgress();
					console.log(err);
					return;
				}
				var url = frontResponse.url;
				var onlyFileName = url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("_"));
				var backUrl = files[onlyFileName]["back"];
				client.makeUrl("/" + backUrl, {download: true}, function(err2, backResponse) {
					if(err2) {
						hideProgress();
						console.log(err2);
						return;
					}
					makeCard(frontResponse['url'], backResponse['url']);
				});
			});
		}
		hideProgress();
	}

	function makeCard(firstPic, secondPic) {
		$('#content').append('<div class="card"><div class="front"><img src="'+firstPic+'" width="200" height="200" /></div><div class="back"><img src="'+secondPic+'" width="200" height="200"/></div></div>');
	 	$('#content .card').flip({
			trigger: 'hover',
			axis: 'y'
		});
	}

})();