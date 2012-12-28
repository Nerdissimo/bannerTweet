/*
bannerTweet (Trasforma un tweet in un banner anni '90)
  Copyright (C) 2012 Sergio Terrasi, http://www.nerdissimo.it/
   
   This program is free software; you can redistribute it and/or
   modify it under the terms of the GNU General Public License
   as published by the Free Software Foundation; either version 2
   of the License, or (at your option) any later version.
   
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.
   
   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

Author: Nerdissimo
Website: http://www.nerdissimo.it
email: dev@nerdissimo.it
GitHub: https://github.com/Nerdissimo/
Twitter: @Nerdissimo
*/
var bannerTweet={
	globals:{_b:true,semaphore:0},
	init:function(){
		this.globals.wrapper=document.getElementById("banners");
		this.globals.lock=document.getElementById("lock");
		this.globals.lock.onclick=function(e) {
			e.preventDefault();
			e.stopPropagation();
		};
		this.globals.tweetsId=location.hash.substring(1,location.hash.length).split(",");
		for(var i=0;i<this.globals.tweetsId.length;i++) this.get(this.globals.tweetsId[i]);
		if(!this.globals.semaphore) this.globals.lock.parentNode.removeChild(this.globals.lock);
	},
	get:function(p_id) {
		if(!p_id) return;
		this.globals.semaphore+=1;
		var script=document.createElement("script");
		script.type="text/javascript";
		script.src="https://api.twitter.com/1/statuses/oembed.json?id="+p_id+"&callback=bannerTweet.show";
		document.getElementsByTagName("head")[0].appendChild(script);
	},
	show:function(p_tweet) {
		var el=document.createElement("div");
		el.innerHTML=p_tweet.html;
		el.removeChild(el.getElementsByTagName("script")[0]);
		if(this.globals._b) this.globals.wrapper.innerHTML=this.globals._b="";
		window.setTimeout(function(){
			bannerTweet.globals.wrapper.appendChild(el.getElementsByTagName("blockquote")[0]);
			bannerTweet.globals.semaphore-=1;
			if(!bannerTweet.globals.semaphore) bannerTweet.globals.lock.parentNode.removeChild(bannerTweet.globals.lock);
		},200*Math.random()); // con più banner incrementa la casualità dei movimenti
	}
};
window.onload=function(){
	bannerTweet.init();
};