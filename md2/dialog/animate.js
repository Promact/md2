/**
 * Provide an API for animating elements with CSS transitions
 */
export var Animate = (function () {
    function Animate() {
    }
    Animate.enter = function (el, cssClass) {
        el.classList.remove(cssClass);
        return new Promise(function (resolve) {
            el.classList.add(cssClass + '-add');
            setTimeout(function () {
                var duration = Animate.getTransitionDuration(el, true);
                var removeListener = function () { return done(false); };
                var callTimeout = setTimeout(function () { return done(true); }, duration);
                var done = function (timeout) {
                    if (!removeListener) {
                        return;
                    }
                    el.classList.remove(cssClass + '-add-active');
                    el.classList.remove(cssClass + '-add');
                    if (!timeout) {
                        clearTimeout(callTimeout);
                    }
                    el.removeEventListener(Animate.TRANSITION_EVENT, removeListener);
                    removeListener = null;
                    resolve();
                };
                el.addEventListener(Animate.TRANSITION_EVENT, removeListener);
                el.classList.add(cssClass + '-add-active');
                el.classList.add(cssClass);
            }, 1);
        });
    };
    Animate.leave = function (el, cssClass) {
        return new Promise(function (resolve) {
            el.classList.add(cssClass + '-remove');
            setTimeout(function () {
                var duration = Animate.getTransitionDuration(el, true);
                var callTimeout = setTimeout(function () { return done(true); }, duration);
                var removeListener = function () { return done(false); };
                var done = function (timeout) {
                    if (!removeListener) {
                        return;
                    }
                    el.classList.remove(cssClass + '-remove-active');
                    el.classList.remove(cssClass + '-remove');
                    if (!timeout) {
                        clearTimeout(callTimeout);
                    }
                    el.removeEventListener(Animate.TRANSITION_EVENT, removeListener);
                    removeListener = null;
                    resolve();
                };
                el.addEventListener(Animate.TRANSITION_EVENT, removeListener);
                el.classList.add(cssClass + '-remove-active');
                el.classList.remove(cssClass);
            }, 1);
        });
    };
    /**
     * Get the duration of any transitions being applied to the given element.
     *
     * Based on: https://gist.github.com/snorpey/5323028
     * @param element The element to query
     * @param includeDelay Include any specified transition-delay value.
     * @returns {number}
     */
    Animate.getTransitionDuration = function (element, includeDelay) {
        if (includeDelay === void 0) { includeDelay = false; }
        var prefixes = ['', 'moz', 'webkit', 'ms', 'o', 'khtml'];
        var style = window.getComputedStyle(element);
        for (var i = 0; i < prefixes.length; i++) {
            var durationProperty = (i === 0 ? '' : "-" + prefixes[i] + "-") + "transition-duration";
            var duration = style[durationProperty];
            if (!duration) {
                continue;
            }
            duration = (duration.indexOf('ms') > -1) ? parseFloat(duration) : parseFloat(duration) * 1000;
            if (duration === 0) {
                continue;
            }
            if (includeDelay) {
                var delayProperty = (i === 0 ? '' : "-" + prefixes[i] + "-") + "transition-delay";
                var delay = style[delayProperty];
                if (typeof delay !== 'undefined') {
                    duration += (delay.indexOf('ms') > -1) ? parseFloat(delay) : parseFloat(delay) * 1000;
                }
            }
            return duration;
        }
        return -1;
    };
    Animate.setTransitionDuration = function (element, delayMs) {
    };
    /* From Modernizr */
    Animate.whichTransitionEvent = function () {
        if (typeof document === 'undefined') {
            return 'transitionend';
        }
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        };
        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    };
    /**
     * Set CSS styles immediately by turning off transition duration and restoring it afterward
     */
    Animate.setStyles = function (element, styles) {
        var saveDuration = Animate.getTransitionDuration(element);
        Animate.setTransitionDuration(element, 0);
        return new Promise(function (resolve, reject) {
            Object.keys(styles).forEach(function (key) {
            });
            if (saveDuration !== -1) {
                Animate.setTransitionDuration(element, saveDuration);
            }
            resolve();
        });
    };
    /**
     * Wait a period of time, then resolve a promise.
     * @param milliseconds The period to wait before resolving.
     * @returns {Promise<void>|Promise} A promise that resolves after a period of time.
     */
    Animate.wait = function (milliseconds) {
        if (milliseconds === void 0) { milliseconds = 10; }
        return new Promise(function (resolve) {
            setTimeout(function () { return resolve(); }, milliseconds);
        });
    };
    /**
     * Look up the transition event name for the browser type and cache it.
     */
    Animate.TRANSITION_EVENT = Animate.whichTransitionEvent();
    return Animate;
}());

//# sourceMappingURL=animate.js.map
