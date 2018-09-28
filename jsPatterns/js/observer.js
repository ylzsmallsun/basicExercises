
/**
 * from http://www.jspatterns.com/book/7/observer.html
 */

(function () {
    var publisher = {
        subscribers: {
            any: [] // event type: subscribers
        },
        subscribe: function (fn, type) {
            type = type || 'any';
            if (typeof this.subscribers[type] === "undefined") {
                this.subscribers[type] = [];
            }
            this.subscribers[type].push(fn);
        },
        unsubscribe: function (fn, type) {
            this.visitSubscribers('unsubscribe', fn, type);
        },
        publish: function (publication, type) {
            this.visitSubscribers('publish', publication, type);
        },
        visitSubscribers: function (action, arg, type) {
            var pubtype = type || 'any',
                subscribers = this.subscribers[pubtype],
                i,
                max = subscribers.length;
                
            for (i = 0; i < max; i += 1) {
                if (action === 'publish') {
                    subscribers[i](arg);
                } else {
                    if (subscribers[i] === arg) {
                        subscribers.splice(i, 1);
                    }
                }
            }
        }
    };
    
    function makePublisher(o) {
        var i;
        for (i in publisher) {
            if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
                o[i] = publisher[i];
            }
        }
        o.subscribers = {any: []};
    }
    
    var paper = {
        daily: function (news) {
            this.publish(news);
        },
        monthly: function (news) {
            this.publish(news, "monthly");
        }
    };
    
    makePublisher(paper);
    
    var joe = {
        drinkCoffee: function (paper) {
            let msg = 'Joe Just read daily news: ' + paper;
            showMessageOnUI(msg);
        },
        sundayPreNap: function (monthly) {
            let msg = 'Joe about to fall asleep reading monthly news: ' + monthly;
            showMessageOnUI(msg);
        }
    };

    let smallsun = {
        haveABreak: function (news) {
            let msg = 'Smallsun just read daily news: ' + news;
            showMessageOnUI(msg);
        },
        sundayPreNap: function (monthly) {
            let msg = 'Smallsun about to fall asleep reading monthly news: ' + monthly;
            showMessageOnUI(msg);
        }
    };
    
    paper.subscribe(joe.drinkCoffee);
    paper.subscribe(joe.sundayPreNap, 'monthly');
    paper.subscribe(smallsun.haveABreak);
    paper.subscribe(smallsun.sundayPreNap, 'monthly');

    
    paper.daily('The world is getting better!');
    paper.daily('Shanghai is getting better!');
    paper.monthly('SAP is getting better!');
    
    
    makePublisher(smallsun);
    
    smallsun.publishTweet = function (msg) {
        this.publish(msg);
    };
    
    paper.readTweet = function (tweet) {
        let msg = 'Paper just reads smallsun\'s new tweet:  ' + tweet;
        showMessageOnUI(msg);
    };
    
    smallsun.subscribe(paper.readTweet);
    
    smallsun.publishTweet("hated the paper today");

    // util method
    function showMessageOnUI (msg) {
        let h3node = document.createElement('h4');
        h3node.innerText = msg;
        document.getElementById('msgContainer').appendChild(h3node);
        console.log(msg);
    } 
})()
