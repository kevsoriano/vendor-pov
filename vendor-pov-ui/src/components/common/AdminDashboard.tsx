import React, { useState } from 'react'
import PromptEditor from './PromptEditor'
import './../AdminDashboard.css'

type PromptConfig = {
  id: string
  name: string
  instructions: string
  template: string
}

export default function AdminDashboard() {
  const [prompts, setPrompts] = useState<PromptConfig[]>([
    {
      id: 'prompt-1',
      name: 'Default SKU Analysis',
      instructions: 'Use this prompt to analyze SKU text fields. Supported variables: {{sku_analysis_fields}}',
      template:
        "You are a product analysis AI. Analyze these fields: {{sku_analysis_fields}}. Provide a short summary and 3 bullet insights."
    }
  ])

  function updatePrompt(id: string, patch: Partial<PromptConfig>) {
    setPrompts(ps => ps.map(p => (p.id === id ? { ...p, ...patch } : p)))
  }

  function addPrompt() {
    setPrompts(ps => [
      ...ps,
      { id: `prompt-${Date.now()}`, name: 'New Prompt', instructions: '', template: '' }
    ])
  }

  function removePrompt(id: string) {
    setPrompts(ps => ps.filter(p => p.id !== id))
  }

  return (
    <div className="admin-dashboard">
      <header className="header">
        <h1>Prompt Admin Dashboard</h1>
        <p className="subtitle">Configure AI prompts, see instructions and manage dynamic variables.</p>
        <div className="actions">
          <button onClick={addPrompt} className="btn-primary">+ Add Prompt</button>
        </div>
      </header>

      <main>
        {prompts.map(p => (
          <section key={p.id} className="prompt-card">
            <div className="card-top">
              <input
                className="prompt-name"
                value={p.name}
                onChange={e => updatePrompt(p.id, { name: e.target.value })}
                placeholder="Prompt name"
              />
              <div className="card-actions">
                <button className="btn-danger" onClick={() => removePrompt(p.id)}>Remove</button>
              </div>
            </div>

            <div className="card-body">
              <label className="label">Instructions <span className="info" title="General instructions shown to editors and explain what fields mean">?</span></label>
              <textarea
                className="instructions-input"
                value={p.instructions}
                onChange={e => updatePrompt(p.id, { instructions: e.target.value })}
                placeholder="General instructions and notes for this prompt"
              />

              <PromptEditor
                template={p.template}
                instructions={p.instructions}
                onChange={next => updatePrompt(p.id, { template: next })}
              />

            </div>
          </section>
        ))}
      </main>

      <footer className="footer">
        <small>Tip: variables use the <code>{`{{name}}`}</code> syntax and will be highlighted in the preview.</small>
      </footer>
    </div>
  )
}
