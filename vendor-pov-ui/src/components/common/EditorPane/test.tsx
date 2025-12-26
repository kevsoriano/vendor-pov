<section style={{ maxWidth: '60rem', margin: '2rem auto', padding: '1rem', borderTop: '1px solid #333' }}>
          <h2 style={{ color: '#defaf8', textAlign: 'center' }}>Add Place (JSON Editor Demo)</h2>
          <JsonEditor
            schema={{
              type: 'object',
              required: ['title', 'lat', 'lon'],
              properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                lat: { type: 'number' },
                lon: { type: 'number' },
                tags: {
                  type: 'array',
                  items: { type: 'string' }
                }
              }
            }}
            initialValue={JSON.stringify({
              title: "My New Place",
              description: "A wonderful place to visit",
              lat: 12.34,
              lon: 56.78,
              tags: ["nature", "hiking"]
            }, null, 2)}
            onChange={(data) => console.log('Valid Data:', data)}
          />
        </section>