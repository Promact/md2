/**
 * Collection of useful custom jasmine matchers for tests.
 */
/**
 * Collection of useful custom jasmine matchers for tests.
 */ export var customMatchers = {
    toBeRole: function () {
        return {
            compare: function (element, expectedRole) {
                var result = { pass: false };
                var actualRole = element.getAttribute('role');
                result.pass = actualRole === expectedRole;
                result.message = "Expected role for " + element.tagName + " to be " + expectedRole;
                if (!result.pass) {
                    result.message += " but was " + actualRole;
                }
                return result;
            }
        };
    }
};
//# sourceMappingURL=jasmine-matchers.js.map