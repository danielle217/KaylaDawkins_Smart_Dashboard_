import React, { useState } from 'react';

function BackgroundCustomizer({ bgUrl, setBgUrl }) {
    const [inputVal, setInputVal] = useState(bgUrl || '');
    const [error, setError] = useState('');

    // Validate URL and apply background
    const applyBackground = () => {
        const trimmed = inputVal.trim();
        if (!trimmed) {
            setBgUrl('');
            setError('');
            return;
        }
        try {
            new URL(trimmed);
            setBgUrl(trimmed);
            setError('');
        } catch {
            setError('Please enter a valid URL (must start with https://)');
        }
    };

    // Clear background and reset input
    const clearBackground = () => {
        setInputVal('');
        setBgUrl('');
        setError('');
    };

    return (
        <div className="card">
            <h2>Background</h2>
            <p style={{ fontSize: '13px', marginBottom: '6px', color: '#888' }}>
                Paste an image URL to set a custom dashboard background
            </p>
            <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && applyBackground()}
            />
            {error && <p className="error">{error}</p>}
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <button onClick={applyBackground}>Apply</button>
                {bgUrl && <button onClick={clearBackground} style={{ backgroundColor: '#888' }}>Clear</button>}
            </div>
            {bgUrl && (
                <p style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>
                    Custom background active
                </p>
            )}
        </div>
    );
}

export default BackgroundCustomizer;