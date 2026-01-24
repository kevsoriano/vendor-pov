import React, { useState, useRef, useEffect } from "react";
import "./AIChatConversation.css";

// Message type: user or ai, with content as string or ReactNode
export type ChatMessage = {
  role: "user" | "ai";
  content: string | React.ReactNode;
};

// Example mock conversation
const mockConversation: ChatMessage[] = [
  { role: "user", content: "What is the capital of France?" },
  {
    role: "ai",
    content: (
      <div>
        <h3>France Information</h3>
        <p>The <span>capital of France </span>is <span style={{ color: "#4f46e5" }}>Paris</span>.</p>
        <ul>
          <li>Population: 2.1M</li>
          <li>Famous for: Eiffel Tower</li>
        </ul>
      </div>
    ),
  },
  { role: "user", content: "List some French foods." },
  {
    role: "ai",
    content: (
      <div>
        <h4>Popular French Foods</h4>
        <ul>
          <li>Croissant</li>
          <li>Baguette</li>
          <li>Ratatouille</li>
        </ul>
      </div>
    ),
  },
];

// Typewriter effect for multiline, formatted content
function isText(node: any) {
  return typeof node === "string" || typeof node === "number";
}

function revealTree(node: React.ReactNode, charsToShow: { count: number }): React.ReactNode {
  if (isText(node)) {
    const text = String(node);
    if (charsToShow.count <= 0) return null;
    if (text.length <= charsToShow.count) {
      charsToShow.count -= text.length;
      return text;
    } else {
      const part = text.slice(0, charsToShow.count);
      charsToShow.count = 0;
      return part;
    }
  }
  if (Array.isArray(node)) {
    return node.map((child, idx) => <React.Fragment key={idx}>{revealTree(child, charsToShow)}</React.Fragment>);
  }
  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<any>;
    return React.cloneElement(
      element,
      element.props,
      revealTree(element.props.children, charsToShow)
    );
  }
  return null;
}

function getTotalTextLength(node: React.ReactNode): number {
  if (isText(node)) return String(node).length;
  if (Array.isArray(node)) return node.reduce((sum, child) => sum + getTotalTextLength(child), 0);
  if (React.isValidElement(node)) return getTotalTextLength((node as React.ReactElement<any>).props.children);
  return 0;
}

function Typewriter({ children, speed = 60 }: { children: React.ReactNode; speed?: number }) {
  const [charsShown, setCharsShown] = useState(0);
  const [done, setDone] = useState(false);
  const totalChars = getTotalTextLength(children);
  const charsPerTick = 3;
//   const slowSpeed = 40; // ms
  useEffect(() => {
    setCharsShown(0);
    setDone(false);
    if (!children) return;
    if (totalChars === 0) return;
    let i = 0;
    const interval = window.setInterval(() => {
      i += charsPerTick;
      if (i >= totalChars) {
        setCharsShown(totalChars);
        setDone(true);
        clearInterval(interval);
      } else {
        setCharsShown(i);
      }
    }, speed);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [children, totalChars]);

  return (
    <div className="ai-typewriter">
      {done
        ? children
        : revealTree(children, { count: charsShown })}
    </div>
  );
}

export default function AIChatConversation() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockConversation);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { role: "user", content: input }]);
    setInput("");
    // Simulate AI response
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          role: "ai",
          content: (
            <div>
              <h4>AI Response</h4>
              <p><span style={{ color: '#16a34a' }}>This is a mock AI reply to:</span> {input}</p>
              <ul>
                <li>Bullet 1</li>
                <li>Bullet 2</li>
              </ul>
            </div>
          ),
        },
      ]);
    }, 1200);
  };

  return (
    <div className="ai-chat-container">
      <div className="ai-chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`ai-chat-msg ai-chat-msg-${msg.role}`}> 
            {msg.role === "ai" ? (
              <Typewriter>{msg.content}</Typewriter>
            ) : (
              <div className="ai-chat-user-msg">{msg.content}</div>
            )}
          </div>
        ))}
      </div>
      <div className="ai-chat-input-row">
        <input
          className="ai-chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="ai-chat-send-btn" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
