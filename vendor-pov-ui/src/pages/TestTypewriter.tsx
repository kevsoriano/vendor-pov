import { TypewriterEffect } from '../components/common/TypewriterEffect';

const TestTypewriter = () => {
    const lines = [
        "Welcome to the Vendor POV App.",
        "This is a demonstration of the typewriter effect. This is a demonstration of the typewriter effect.",
        "Each line is typed out sequentially.",
        "Enjoy the smoothness!"
    ];

    return (
        <div style={{ padding: '2rem', backgroundColor: '#222', color: '#fff', minHeight: '100vh' }}>
            <h1>Typewriter Effect Test</h1>
            <div style={{ marginTop: '2rem', fontSize: '1.2rem', maxWidth: '50ch' }}>
                <TypewriterEffect
                    lines={lines}
                    typingSpeed={80}
                    cursorColor="#0f0"
                />
            </div>

            <div style={{ marginTop: '4rem' }}>
                <h2>Faster Speed</h2>
                <TypewriterEffect
                    lines={["Quick typing...", "Done!"]}
                    typingSpeed={40}
                    cursorColor="cyan"
                />
            </div>
        </div>
    );
};

export default TestTypewriter;
