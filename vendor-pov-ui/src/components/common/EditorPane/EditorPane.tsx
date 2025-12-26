
import { useState, useEffect } from 'react';
import { validateSchema } from '../../../utils/validation';
import './JsonEditor.css';

export default function JsonEditor({ initialValue = '', schema, onChange }) {
    const [jsonString, setJsonString] = useState(initialValue);
    const [isValid, setIsValid] = useState(true);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        // Validate on mount or when schema/value changes
        validate(jsonString);
    }, [jsonString, schema]);

    const validate = (value) => {
        setErrors([]);
        setIsValid(true);

        if (!value.trim()) {
            return; // Empty is considered valid or ignore? Let's say valid empty.
        }

        try {
            const parsed = JSON.parse(value);

            // Syntax is valid, now check schema
            if (schema) {
                const schemaErrors = validateSchema(parsed, schema);
                if (schemaErrors.length > 0) {
                    setIsValid(false);
                    setErrors(schemaErrors);
                }
            }

            if (onChange) {
                onChange(parsed);
            }

        } catch (e) {
            setIsValid(false);
            setErrors([e.message]); // Syntax error
        }
    };

    const handleChange = (e) => {
        const newVal = e.target.value;
        setJsonString(newVal);
    };

    const handleFormat = () => {
        try {
            const parsed = JSON.parse(jsonString);
            setJsonString(JSON.stringify(parsed, null, 2));
        } catch (e) {
            // Ignore format error if invalid json
        }
    }

    const renderSchemaDocs = (currentSchema) => {
        if (!currentSchema || !currentSchema.properties) return <p>No schema properties defined.</p>;

        const generateExample = (schemaNode) => {
            if (!schemaNode) return null;

            if (schemaNode.type === 'object' && schemaNode.properties) {
                const example = {};
                Object.entries(schemaNode.properties).forEach(([key, value]) => {
                    const isRequired = schemaNode.required && schemaNode.required.includes(key);
                    // Recursively generate example for nested objects/arrays
                    example[key] = generateExample(value) || `${value.type}${isRequired ? ' (required)' : ''}`;
                });
                return example;
            } else if (schemaNode.type === 'array' && schemaNode.items) {
                return [generateExample(schemaNode.items) || `${schemaNode.items.type}`];
            } else {
                return null; // For primitives, the parent handles the string representation or we can return a string here
            }
        };

        const exampleObj = generateExample(currentSchema);

        return (
            <div className="schema-docs-pane">
                <span className="schema-docs-title">Expected Format</span>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                    {JSON.stringify(exampleObj, null, 2)}
                </pre>
            </div>
        );
    };

    return (
        <div className="json-editor-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ color: '#fff' }}>JSON Editor</label>
                <button onClick={handleFormat} className="button" style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}>Format</button>
            </div>

            <div className="json-editor-wrapper">
                <div className="editor-pane">
                    <textarea
                        className="json-editor-textarea"
                        value={jsonString}
                        onChange={handleChange}
                        spellCheck="false"
                        placeholder="Enter JSON here..."
                    />
                </div>
                {schema && renderSchemaDocs(schema)}
            </div>

            <div className={`validation-status ${isValid ? 'status-valid' : 'status-invalid'}`}>
                {isValid ? (
                    <span>✓ Valid JSON</span>
                ) : (
                    <div>
                        <strong>Validation Errors:</strong>
                        <ul className="error-list">
                            {errors.map((err, idx) => (
                                <li key={idx} className="error-item">• {err}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
