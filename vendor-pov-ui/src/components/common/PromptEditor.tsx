import React, { useMemo, useRef } from 'react'
import './../AdminDashboard.css'

type Props = {
  template: string
  onChange: (next: string) => void
  instructions?: string
}

const VARIABLE_REGEX = /{{\s*([a-zA-Z0-9_]+)\s*}}/g

export default function PromptEditor({ template, onChange, instructions }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  // Extract unique variables
  const variables = useMemo(() => {
    import React, { useMemo, useRef, useEffect } from 'react'
    import './../AdminDashboard.css'

    type Props = {
      template: string
      onChange: (next: string) => void
      instructions?: string
    }

    const VARIABLE_REGEX = /{{\s*([a-zA-Z0-9_]+)\s*}}/g

    export default function PromptEditor({ template, onChange, instructions }: Props) {
      const textareaRef = useRef<HTMLTextAreaElement | null>(null)
      const overlayRef = useRef<HTMLDivElement | null>(null)

      // Extract unique variables from both template and instructions
      const variables = useMemo(() => {
        const set = new Set<string>()
        const combined = `${template || ''}\n${instructions || ''}`
        let m
        VARIABLE_REGEX.lastIndex = 0
        while ((m = VARIABLE_REGEX.exec(combined)) !== null) set.add(m[1])
        return Array.from(set)
      }, [template, instructions])

      function handleInsertVariable(name: string) {
        const el = textareaRef.current
        if (!el) return
        const start = el.selectionStart
        const end = el.selectionEnd
        const next = template.slice(0, start) + `{{${name}}}` + template.slice(end)
        onChange(next)
        // restore focus and place caret after inserted variable
        requestAnimationFrame(() => {
          el.focus()
          const pos = start + name.length + 4
          el.selectionStart = el.selectionEnd = pos
        })
      }

      // Sync overlay scroll with textarea
      useEffect(() => {
        const ta = textareaRef.current
        const ov = overlayRef.current
        if (!ta || !ov) return
        const sync = () => {
          ov.scrollTop = ta.scrollTop
          ov.scrollLeft = ta.scrollLeft
        }
        ta.addEventListener('scroll', sync)
        return () => ta.removeEventListener('scroll', sync)
      }, [])

      // Render text with highlighted variable spans
      function renderHighlighted(text: string) {
        const parts: Array<{ text: string; isVar?: boolean; name?: string }> = []
        let lastIndex = 0
        VARIABLE_REGEX.lastIndex = 0
        let m
        while ((m = VARIABLE_REGEX.exec(text)) !== null) {
          const idx = m.index
          if (idx > lastIndex) parts.push({ text: text.slice(lastIndex, idx) })
          parts.push({ text: m[0], isVar: true, name: m[1] })
          lastIndex = VARIABLE_REGEX.lastIndex
        }
        if (lastIndex < text.length) parts.push({ text: text.slice(lastIndex) })

        return parts.map((p, i) =>
          p.isVar ? (
            <span key={i} className="variable">{`{{${p.name}}}`}</span>
          ) : (
            <span key={i}>{p.text}</span>
          )
        )
      }

      return (
        <div className="prompt-editor">
          <div className="editor-left">
            <label className="label">Prompt Template</label>

            <div className="highlight-wrapper">
              <div ref={overlayRef} className="highlight-overlay" aria-hidden>
                {renderHighlighted(template)}
              </div>

              <textarea
                ref={textareaRef}
                className="template-input"
                value={template}
                onChange={e => onChange(e.target.value)}
                placeholder={"Write full AI prompt here. Use variables like {{sku_analysis_fields}}"}
              />
            </div>

            <div className="instructions">
              <strong>Instructions</strong>
              <div className="instruction-text">
                {instructions ? renderHighlighted(instructions) : <div className="instruction-empty">No instructions</div>}
              </div>
            </div>

            <div className="variable-list">
              <strong>Detected variables</strong>
              <div className="vars">
                {variables.length === 0 && <div className="var-empty">No variables found</div>}
                {variables.map(v => (
                  <button key={v} type="button" className="var-chip" onClick={() => handleInsertVariable(v)}>
                    {`{{${v}}}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="help" style={{ marginTop: 12 }}>
              <strong>Tip</strong>
              <div>Click a variable to insert it into the prompt at the caret position. Use <code>{`{{var_name}}`}</code> syntax for dynamic fields.</div>
            </div>
          </div>
        </div>
      )
    }

    const set = new Set<string>()
    let m
    while ((m = VARIABLE_REGEX.exec(template)) !== null) set.add(m[1])
    return Array.from(set)
  }, [template])

  function handleInsertVariable(name: string) {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const next = template.slice(0, start) + `{{${name}}}` + template.slice(end)
    onChange(next)
    // restore focus and place caret after inserted variable
    requestAnimationFrame(() => {
      el.focus()
      const pos = start + name.length + 4
      el.selectionStart = el.selectionEnd = pos
    })
  }

  // Render preview with highlighted variables
  function renderHighlighted(text: string) {
    const parts: Array<{ text: string; isVar?: boolean; name?: string }> = []
    let lastIndex = 0
    VARIABLE_REGEX.lastIndex = 0
    let m
    while ((m = VARIABLE_REGEX.exec(text)) !== null) {
      const idx = m.index
      if (idx > lastIndex) parts.push({ text: text.slice(lastIndex, idx) })
      parts.push({ text: m[0], isVar: true, name: m[1] })
      lastIndex = VARIABLE_REGEX.lastIndex
    }
    if (lastIndex < text.length) parts.push({ text: text.slice(lastIndex) })

    return parts.map((p, i) =>
      p.isVar ? (
        <span key={i} className="variable">{`{{${p.name}}}`}</span>
      ) : (
        <span key={i}>{p.text}</span>
      )
    )
  }

  return (
    <div className="prompt-editor">
      <div className="editor-left">
        <label className="label">Prompt Template</label>
        <textarea
          ref={textareaRef}
          className="template-input"
          value={template}
          onChange={e => onChange(e.target.value)}
          placeholder={"Write full AI prompt here. Use variables like {{sku_analysis_fields}}"}
        />

        <div className="instructions">
          <strong>Instructions</strong>
          <div className="instruction-text" title={instructions}>{instructions}</div>
        </div>

        <div className="variable-list">
          <strong>Detected variables</strong>
          <div className="vars">
            {variables.length === 0 && <div className="var-empty">No variables found</div>}
            {variables.map(v => (
              <button key={v} type="button" className="var-chip" onClick={() => handleInsertVariable(v)}>
                {`{{${v}}}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="editor-right">
        <label className="label">Live Preview</label>
        <div className="preview-box">{renderHighlighted(template)}</div>

        <div className="help">
          <strong>Tip</strong>
          <div>Click a variable to insert it into the prompt at the caret position. Use <code>{`{{var_name}}`}</code> syntax for dynamic fields.</div>
        </div>
      </div>
    </div>
  )
}
