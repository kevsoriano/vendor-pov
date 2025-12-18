import React, { useState, useEffect, type CSSProperties } from 'react';
import './TypewriterEffect.css';

interface TypewriterEffectProps {
    lines: string[];
    typingSpeed?: number; // ms per character
    cursorColor?: string;
    className?: string;
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
    lines,
    typingSpeed = 50,
    cursorColor = 'orange',
    className = '',
}) => {
    const [displayedLines, setDisplayedLines] = useState<string[]>(lines.map(() => ""));
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Reset if lines change - simplistic reset
        setDisplayedLines(lines.map(() => ""));
        setCurrentLineIndex(0);
        setIsComplete(false);
    }, [lines]);

    useEffect(() => {
        if (currentLineIndex >= lines.length) {
            setIsComplete(true);
            return;
        }

        const currentLineText = lines[currentLineIndex];
        const currentDisplayedText = displayedLines[currentLineIndex];

        if (currentDisplayedText.length < currentLineText.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedLines(prev => {
                    const newLines = [...prev];
                    newLines[currentLineIndex] = currentLineText.slice(0, currentDisplayedText.length + 1);
                    return newLines;
                });
            }, typingSpeed);
            return () => clearTimeout(timeoutId);
        } else {
            // Line finished, move to next line immediately or with small pause? 
            // Immediate for now to keep flow smooth.
            setCurrentLineIndex(prev => prev + 1);
        }
    }, [currentLineIndex, displayedLines, lines, typingSpeed]);

    return (
        <div
            className={`typewriter-container ${className}`}
            style={{ '--cursor-color': cursorColor } as CSSProperties}
        >
            {displayedLines.map((line, index) => {
                // Only show this line if it has content or if it's the current line being typed (which might be empty initially)
                // actually we mapped them all to "" initially.

                // We render all lines that have started typing.
                // If index > currentLineIndex, it's not started yet (so empty string).

                const isCurrentLine = index === currentLineIndex;
                const isLastLine = index === lines.length - 1;

                // Cursor logic:
                // Cursor should show on the current line being typed.
                // If complete, maybe show on the last line? Or hide?
                // Usually, terminal cursors stay on the last line.
                const showCursor = !isComplete && isCurrentLine;

                // Optionally, if we want the cursor to persist at the end:
                // const showCursor = (isCurrentLine && !isComplete) || (isComplete && index === lines.length - 1);

                return (
                    <span key={index} className="typewriter-line">
                        {line}
                        {showCursor && <span className="typewriter-cursor"></span>}
                    </span>
                );
            })}
        </div>
    );
};
