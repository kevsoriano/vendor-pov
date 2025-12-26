
/**
 * Simple JSON Schema validator implementation.
 * Supports: string, number, boolean, object (properties, required), array (items).
 */
export function validateSchema(data, schema, path = 'root') {
    if (!schema) return [];
    const errors = [];

    // Type validation
    const type = schema.type;
    if (type) {
        if (type === 'array') {
            if (!Array.isArray(data)) {
                errors.push(`${path}: Expected array but got ${typeof data}`);
                return errors; // Stop further validation for this node
            }
        } else if (type === 'object') {
            if (typeof data !== 'object' || data === null || Array.isArray(data)) {
                errors.push(`${path}: Expected object but got ${data === null ? 'null' : (Array.isArray(data) ? 'array' : typeof data)}`);
                return errors;
            }
        } else {
            if (typeof data !== type) {
                errors.push(`${path}: Expected ${type} but got ${typeof data}`);
                return errors;
            }
        }
    }

    // Object validation
    if (type === 'object' && schema.properties) {
        // Check required fields
        if (schema.required) {
            for (const requiredField of schema.required) {
                if (!(requiredField in data)) {
                    errors.push(`${path}: Missing required property '${requiredField}'`);
                }
            }
        }

        // Validate properties
        for (const key in data) {
            if (schema.properties[key]) {
                errors.push(...validateSchema(data[key], schema.properties[key], `${path}.${key}`));
            }
        }
    }

    // Array validation
    if (type === 'array' && schema.items) {
        data.forEach((item, index) => {
            errors.push(...validateSchema(item, schema.items, `${path}[${index}]`));
        });
    }

    return errors;
}
