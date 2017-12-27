var prefix = "";
var listeners = {};
export default {
	localStorage: {
		level:0,
		removeItem:function(key){
			localStorage.removeItem(prefix + key);
			sessionStorage.removeItem(prefix + key);
			window[prefix + key]=null;
		},
		getItem: function(key) {
			try {
				return localStorage.getItem(prefix + key) || sessionStorage.getItem(prefix + key) || window[prefix + key] || null
			} catch (err) {
				return null;
			} finally {
				// statements
			}
		},
		setItem: function(key, value) {
			// var type = 0;
			try {
				localStorage.setItem(prefix + key, value);
				this.level = 1;
			} catch (err) {
				try {
					sessionStorage.setItem(prefix + key, value);
					this.level = 2;
				} catch (err) {
					window[prefix + key] = value;
					this.level = 3
				}
			} finally {
				//console.log(this.level)
			}
			if (listeners[key]) {
				listeners[key].forEach(function(listener) {
					listener(key,value);
				});
			}
		}
	},
	_on: function(key, listener) {
		if (!listeners[key]) {
			listeners[key] = [];
		}
		listeners[key].push(listener);
	},
	on: function(keys, listener) {
		if (typeof keys === "string") {
			keys = [keys];
		}
		keys.forEach(function(key) {
			this._on(key, listener);
		}.bind(this));
	},
	sessionStorage: {
		level:0,
		removeItem:function(key){
			sessionStorage.removeItem(prefix + key);
			window[prefix + key]=null;
		},
		getItem: function(key) {
			try {
				return sessionStorage.getItem(prefix + key) || window[prefix + key] || null
			} catch (err) {
				return null;
			}
		},
		setItem: function(key, value) {
			//var type = 0;
			try {
				sessionStorage.setItem(prefix + key, value);
				this.level = 1;
			} catch (err) {
				window[prefix + key] = value;
				this.level = 2;
			} finally {
				//console.log(this.level)
			}
			if (listeners[key]) {
				listeners[key].forEach(function(listener) {
					listener(key,value);
				});
			}
		}
	}
};