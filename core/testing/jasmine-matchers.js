/**
 * Collection of useful custom jasmine matchers for tests.
 */
/**
 * Collection of useful custom jasmine matchers for tests.
 */ export var customMatchers = {
    toBeRole: function (util, customEqualityTesters) {
        return {
            compare: function (element, expectedRole) {
                var result = { pass: false };
                result.pass = element.getAttribute('role') === expectedRole;
                result.message = "Expected role for " + element.tagName + " to be " + expectedRole;
                if (!result.pass) {
                    result.message += " but was " + expectedRole;
                }
                return result;
            }
        };
    }
};
//# sourceMappingURL=jasmine-matchers.js.map