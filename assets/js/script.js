Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

$('#newtrigger').on('submit',function(event){
    event.preventDefault();
    var trigger = $("#newtrigger-text").val().toLowerCase();
    addTrigger(trigger);
    $("#newtrigger-text").val("");
    return false;
});

$('#triggers').on('click','.word',function(){
    var trigger = decodeURIComponent($(this).data('trigger'));
    getTriggers(function (triggers) {
        for(var i in triggers){
            if(triggers[i]==trigger){
                triggers.remove(i);
                break;
            }
        }
        setTriggers(triggers,renderTriggers)
    });
});

var getTriggers = function(cb){
    cb = cb || function(){};
    chrome.storage.sync.get("triggers", function(results) {
        cb(results.triggers || []);
    });
};

var setTriggers = function(triggers,cb){
    cb = cb || function(){};
    chrome.storage.sync.set({triggers:triggers},cb);
};

var renderTriggers = function() {
    $("#triggers").html("");
    getTriggers(function (triggers) {
        if(triggers.length==0){
            $("#triggers").append($("<li class='msg'></li>").html("You have not added any trigger words yet"));
        } else {
            for (var i in triggers) $("#triggers").append($("<li class='word' data-trigger='" + encodeURIComponent(triggers[i]) + "'></li>").html($("<span></span>").html(triggers[i])));
        }
    });
}

var addTrigger = function(trigger){
    if(trigger.length==0) return false;
    getTriggers(function (triggers) {
        triggers[triggers.length] = trigger;
        setTriggers(triggers,renderTriggers)
    });
}

renderTriggers();