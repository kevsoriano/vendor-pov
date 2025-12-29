<JsonEditor
            schema={{
              type: 'array',
              items: {
                type: 'object',
                required: ['id', 'name'],
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  active: { type: 'boolean' }
                }
              }
            }}
            initialValue={JSON.stringify([
              { id: 1, name: "Alice", active: true },
              { id: 2, name: "Bob", active: false }
            ], null, 2)}
            onChange={(data) => console.log('Valid Array Data:', data)}