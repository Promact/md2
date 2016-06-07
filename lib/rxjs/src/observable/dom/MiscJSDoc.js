"use strict";
/**
 * @see {@link ajax}
 *
 * @interface
 * @name AjaxRequest
 * @noimport true
 */
var AjaxRequestDoc = (function () {
    function AjaxRequestDoc() {
        /**
         * @type {string}
         */
        this.url = '';
        /**
         * @type {number}
         */
        this.body = 0;
        /**
         * @type {string}
         */
        this.user = '';
        /**
         * @type {boolean}
         */
        this.async = false;
        /**
         * @type {string}
         */
        this.method = '';
        /**
         * @type {Object}
         */
        this.headers = null;
        /**
         * @type {number}
         */
        this.timeout = 0;
        /**
         * @type {string}
         */
        this.password = '';
        /**
         * @type {boolean}
         */
        this.hasContent = false;
        /**
         * @type {boolean}
         */
        this.crossDomain = false;
        /**
         * @type {Subscriber}
         */
        this.progressSubscriber = null;
        /**
         * @type {string}
         */
        this.responseType = '';
    }
    /**
     * @return {XMLHttpRequest}
     */
    AjaxRequestDoc.prototype.createXHR = function () {
        return null;
    };
    /**
     * @param {AjaxResponse} response
     * @return {T}
     */
    AjaxRequestDoc.prototype.resultSelector = function (response) {
        return null;
    };
    return AjaxRequestDoc;
}());
exports.AjaxRequestDoc = AjaxRequestDoc;
