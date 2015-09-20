console.log('is twitter!');

//var TwitterTheme = $(".tweet-btn").css('background-color');

window.TwitterTriggers = {
    getTriggers: function(cb){
        cb = cb || function(){};
        chrome.storage.sync.get("triggers", function(results) {
            cb(results.triggers || []);
        });
    },
    setTriggers: function(triggers,cb){
        cb = cb || function(){};
        chrome.storage.sync.set({triggers:triggers},cb);
    },
    isTrigger: function(tweet,triggers){
        var isTrigger = false;
        tweet = tweet.toLowerCase();

        for(var i in triggers){
            var trigger = triggers[i];
            if(tweet.indexOf(trigger)>-1){
                isTrigger = true;
            }
        }
        return isTrigger;
    },
    checkTweets: function(){
        TwitterTriggers.getTriggers(function(triggers){
            $('.js-stream-item[data-item-type="tweet"]').each(function(){
                var $this = $(this);
                var id = this.getAttribute("data-item-id");
                var text = $(".tweet-text",$this).text();

                var isTrigger = TwitterTriggers.isTrigger(text,triggers);

                if(isTrigger){
                    var $cover = $('<div class="tt_cover"><div class="tt_warning">Trigger Warning!</div></div>');
                    $this.append($cover);

                    $this.css({position:"relative"});
                    console.log("tweet hidden");
                }
            })
        });
    }
}

window.TwitterTriggers.setTriggers(["the"]);
window.TwitterTriggers.checkTweets();