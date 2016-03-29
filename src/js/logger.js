function Logger(strategy, environment) {
    'use strict';
    
    // TODO: refactor
    var self = this;
    
    if(strategy === 'silent') {
        self.log = function () {};
    } else if(environment === 'development' && strategy === 'console') {
        self.log = function () {
            console.log.apply(console, arguments);
        };
    } else {
        throw new Error('Logging strategy ' + strategy + ' or environment ' + environment + ' not supported.');
    }
    
    return self;
}