var supportedInputTypes;
/** @returns The input types supported by this browser. */
export function getSupportedInputTypes() {
    if (!supportedInputTypes) {
        var featureTestInput_1 = document.createElement('input');
        supportedInputTypes = new Set([
            'button',
            'checkbox',
            'color',
            'date',
            'datetime-local',
            'email',
            'file',
            'hidden',
            'image',
            'month',
            'number',
            'password',
            'radio',
            'range',
            'reset',
            'search',
            'submit',
            'tel',
            'text',
            'time',
            'url',
            'week',
        ].filter(function (value) {
            featureTestInput_1.setAttribute('type', value);
            return featureTestInput_1.type === value;
        }));
    }
    return supportedInputTypes;
}

//# sourceMappingURL=features.js.map
