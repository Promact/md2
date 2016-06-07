"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = require('../Subscription');
/**
 * A unit of work to be executed in a {@link Scheduler}. An action is typically
 * created from within a Scheduler and an RxJS user does not need to concern
 * themselves about creating and manipulating an Action.
 *
 * ```ts
 * interface Action extends Subscription {
 *   work: (state?: any) => void|Subscription;
 *   state?: any;
 *   delay?: number;
 *   schedule(state?: any, delay?: number): void;
 *   execute(): void;
 *   scheduler: Scheduler;
 *   error: any;
 * }
 * ```
 *
 * @interface
 * @name Action
 * @noimport true
 */
var ActionDoc = (function (_super) {
    __extends(ActionDoc, _super);
    function ActionDoc() {
        _super.apply(this, arguments);
        /**
         * The current state. This is the object that will be given to the `work`
         * method.
         * @type {any}
         */
        this.state = void 0;
        /**
         * Represents the time (relative to the Scheduler's own clock) when this
         * action should be executed.
         * @type {number}
         */
        this.delay = 0;
        /**
         * The Scheduler which owns this action.
         * @type {Scheduler}
         */
        this.scheduler = null;
    }
    /**
     * The function that represents the raw work to be executed on a Scheduler.
     * @param {any} [state] Some contextual data that the `work` function uses
     * when called by the Scheduler.
     * @return {?Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    ActionDoc.prototype.work = function (state) {
        return void 0;
    };
    /**
     * Schedules this action on its parent Scheduler for execution. May be passed
     * some context object, `state`. May happen at some point in the future,
     * according to the `delay` parameter, if specified.
     * @param {any} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler.
     * @return {void}
     */
    ActionDoc.prototype.schedule = function (state, delay) {
        return void 0;
    };
    /**
     * Immediately executes this action and the `work` it contains.
     * @return {any}
     */
    ActionDoc.prototype.execute = function () {
        return void 0;
    };
    return ActionDoc;
}(Subscription_1.Subscription));
exports.ActionDoc = ActionDoc;
