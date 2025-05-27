(function() {
	function showAsyncGame() {
		var elements, tempElements;
		var gameShortName, language, width, height, memberID, settingID, hideMoreGamesButton, timeLimitScale, playerID, playerUsername, playerName, playerPictureURL, playerHash, gameFormat;
		var parameters;
		var i;
		
		try {
			elements = document.getElementsByClassName('novelgames_cloudgame');
		} catch(e) {
			elements = [];
			
			tempElements = document.getElementsByTagName('ins');
			
			for(i=0;i<tempElements.length;i++) {
				if(!/\bnovelgames_cloudgame\b/.test(tempElements[i].className)) continue;
				
				elements.push(tempElements[i]);
			}
		}
		
		if(elements == null || elements.length == 0) {
			setTimeout(function() { novelgames.showAsyncGame(); }, 1000);
			return;
		}
		
		for(i=0;i<elements.length;i++) {
			if(elements[i].firstChild != null) continue;
			
			try {
				gameShortName = elements[i].dataset.gameShortName;
				language = elements[i].dataset.language;
				width = elements[i].dataset.width;
				height = elements[i].dataset.height;
				memberID = elements[i].dataset.memberId;
				settingID = elements[i].dataset.settingId;
				hideMoreGamesButton = elements[i].dataset.hideMoreGamesButton;
				timeLimitScale = elements[i].dataset.timeLimitScale;
				playerID = elements[i].dataset.playerId;
				playerUsername = elements[i].dataset.playerUsername;
				playerName = elements[i].dataset.playerName;
				playerPictureURL = elements[i].dataset.playerPictureUrl;
				playerHash = elements[i].dataset.playerHash;
				gameFormat = elements[i].dataset.gameFormat;
			} catch(e) {
				gameShortName = elements[i].getAttribute('data-game-short-name');
				language = elements[i].getAttribute('data-language');
				width = elements[i].getAttribute('data-width');
				height = elements[i].getAttribute('data-height');
				memberID = elements[i].getAttribute('data-member-id');
				settingID = elements[i].getAttribute('data-setting-id');
				hideMoreGamesButton = elements[i].getAttribute('data-hide-more-games-button');
				timeLimitScale = elements[i].getAttribute('data-time-limit-scale');
				playerID = elements[i].getAttribute('data-player-id');
				playerUsername = elements[i].getAttribute('data-player-username');
				playerName = elements[i].getAttribute('data-player-name');
				playerPictureURL = elements[i].getAttribute('data-player-picture-url');
				playerHash = elements[i].getAttribute('data-player-hash');
				gameFormat = elements[i].getAttribute('data-game-format');
			}
			
			parameters = {};
			parameters.gameShortName = gameShortName;
			parameters.language = language;
			parameters.width = width == null || width == '' ? 600 : width;
			parameters.height = height == null || height == '' ? 400 : height;
			
			if(memberID != null && memberID != '') parameters.memberID = memberID;
			if(settingID != null && settingID != '') parameters.settingID = settingID;
			if(hideMoreGamesButton != null && hideMoreGamesButton != '') parameters.hideMoreGamesButton = hideMoreGamesButton;
			if(timeLimitScale != null && timeLimitScale != '') parameters.timeLimitScale = timeLimitScale;
			if(playerID != null && playerID != '') parameters.playerID = playerID;
			if(playerUsername != null && playerUsername != '') parameters.playerUsername = playerUsername;
			if(playerName != null && playerName != '') parameters.playerName = playerName;
			if(playerPictureURL != null && playerPictureURL != '') parameters.playerPictureURL = playerPictureURL;
			if(playerHash != null && playerHash != '') parameters.playerHash = playerHash;
			if(gameFormat != null && gameFormat != '') parameters.gameFormat = gameFormat;

			showAsyncHTML5Game(elements[i], parameters);
		}
	}
	
	function showAsyncHTML5Game(insElement, parameters) {
		var url, queries;
		var element;
		
		url = 'https://www.novelgames.com/' + parameters.language + '/' + parameters.gameShortName + '/pwa/iframe.php';
			
		queries = [];
		
		if(parameters.memberID != null) queries.push('memberID=' + encodeURIComponent(parameters.memberID));
		if(parameters.settingID != null) queries.push('settingID=' + encodeURIComponent(parameters.settingID));
		if(parameters.hideMoreGamesButton != null) queries.push('hideMoreGamesButton=' + encodeURIComponent(parameters.hideMoreGamesButton));
		if(parameters.timeLimitScale != null) queries.push('timeLimitScale=' + encodeURIComponent(parameters.timeLimitScale));
		if(parameters.playerID != null) queries.push('playerID=' + encodeURIComponent(parameters.playerID));
		if(parameters.playerUsername != null) queries.push('playerUsername=' + encodeURIComponent(parameters.playerUsername));
		if(parameters.playerName != null) queries.push('playerName=' + encodeURIComponent(parameters.playerName));
		if(parameters.playerPictureURL != null) queries.push('playerPictureURL=' + encodeURIComponent(parameters.playerPictureURL));
		if(parameters.playerHash != null) queries.push('playerHash=' + encodeURIComponent(parameters.playerHash));
		
		if(queries.length > 0) url += '?' + queries.join('&');
		
		element = document.createElement('iframe');
		element.src = url;
		element.title = 'game';
		element.width = parameters.width;
		element.height = parameters.height;
		element.style.border = 'none';
		element.style.overflow = 'hidden';
		
		//element.allowfullscreen won't work
		element.setAttribute('allowfullscreen', 'true');
		
		insElement.appendChild(element);
	}

	showAsyncGame();
})();