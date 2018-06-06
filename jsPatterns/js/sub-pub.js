(function(){
    // function EventTarget () {
    //     this.handlers = {};
    // }
    // EventTarget.prototype = {
    //     constructor: EventTarget,
    var Event = {
        on: function (type, handler) {
            if (!this.handlers) {
                // this.handlers = {};    
                Object.defineProperty(this, "handlers", {
                    value: {},
                    enumerable: false,
                    configurable: true,
                    writable: true
                })
            }   
            if (typeof this.handlers[type] === 'undefined') {
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
        },
        emit: function (eventName) {
            if (this.handlers[arguments[0]] instanceof Array) {
                var handlers = this.handlers[arguments[0]];
                for (var i=0; i<handlers.length; i++) {
                    handlers[i](arguments[1].message);
                }
            }
        },
        unsubscribe: function (type, handler) {
            if (this.handlers[type] instanceof Array) {
                var handlers = this.handlers[type];
                for (var i=0; i<handlers.length; i++) {
                    if (handlers[i] === handler) {
                        break;
                    }
                }
                handlers.splice(i, 1);
            }
        }
    };
    //var Event = new EventTarget();
    Event.on('test', function (message) {
        console.log(message);
    });
    Event.on('test', function () {
        console.log('test');
    });

    Event.emit('test', {message: 'hello world'});

    var person1 = {
        sayHello: function (message) {
            console.log(message);
        }
    };
    var person2 = {
        sayHello: function (message) {
            console.log(message);
        }
    };
    Object.assign(person1, Event);
    Object.assign(person2, Event);
    person1.on('call1', person1.sayHello);
    person2.on('call2', person2.sayHello);
    person1.emit('call1', {message:'person1 is calling call1.'}); // 'person1 is calling call1.' 
    person1.emit('call2', {message:'p111'}); //  no output
    person2.emit('call1', {message:'p222'}); //  no output
    person2.emit('call2', {message:'person2 is calling call2.'}); // 'person2 is calling call2'
    person1.unsubscribe('call1', person1.sayHello);
    person1.emit('call1', {message:'person1 is calling call1 again.'}); // no output
    person1.on('call1', person1.sayHello);
    person1.emit('call1', {message:'person1 is calling call1 again.'}); // person1 is calling call1 again.
})()
