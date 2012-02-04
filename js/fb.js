window.fbAsyncInit = function() {
	FB.init({ appId: '297402036983700', 
	status: true, 
	cookie: true,
	xfbml: true,
	auth: true});

	FB.Event.subscribe('auth.authResponseChange', handleResponseChange);  
};

function loginUser() {    
	FB.login(function(response) { }, {scope:'email'});     
}

function handleResponseChange(response) {
	document.body.className = response.authResponse ? 'connected' : 'not_connected';

	if (response.authResponse) {
		console.log(response);
	}

	updateUserInfo(response);
}

function updateUserInfo(response) {
	FB.api('/me', function(response) {
	document.getElementById('user-info').innerHTML = '<img src="https://graph.facebook.com/' + response.id + '/picture">' + response.name;
	});
}

function getUserFriends() {
	FB.api('/me/friends&fields=name,picture', function(response) {
		console.log('Got friends: ', response);

		if (!response.error) {
			var markup = '';

			var friends = response.data;

			for (var i=0; i < friends.length && i < 25; i++) {
				var friend = friends[i];

				markup += '<img src="' + friend.picture + '"> ' + friend.name + '<br>';
			}

			document.getElementById('user-friends').innerHTML = markup;
		}	
	});
}