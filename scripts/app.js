// MAIN APPLICATION LOGIC

// DOM Elements
const elements = {
    welcomeScreen: document.getElementById('welcome-screen'),
    generatorInterface: document.getElementById('generator-interface'),
    newPromptBtn: document.getElementById('new-prompt-btn'),
    geminiModeBtn: document.getElementById('gemini-mode-btn'),
    historyBtn: document.getElementById('history-btn'),
    presetBtn: document.getElementById('preset-btn'),
    generateBtn: document.getElementById('generate-btn'),
    copyBtn: document.getElementById('copy-btn'),
    randomizeBtn: document.getElementById('randomize-btn'),
    voiceInputBtn: document.getElementById('voice-input-btn'),
    tabButtons: document.querySelectorAll('.tab-btn'),
    resetBtn: document.getElementById('reset-btn'),
    deletePromptBtn: document.getElementById('delete-prompt-btn'),
    expandBtn: document.getElementById('expand-btn'),
    apiKeyModal: document.getElementById('api-key-modal'),
    closeApiKeyBtn: document.getElementById('close-api-key-btn'),
    continueWithApiBtn: document.getElementById('continue-with-api-btn'),
    historyModal: document.getElementById('history-modal'),
    closeHistoryBtn: document.getElementById('close-history-btn'),
    historyList: document.getElementById('history-list'),
    clearHistoryBtn: document.getElementById('clear-history-btn'),
    presetModal: document.getElementById('preset-modal'),
    closePresetBtn: document.getElementById('close-preset-btn'),
    presetList: document.getElementById('preset-list')
};

// State
let isGeminiMode = false;
let geminiApiKey = '';

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Setup semua descriptions
    setupAllSelectDescriptions();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup background slideshow
    initializeBackground();
    
    // Setup custom inputs
    setupCustomInputs();
    
    // Setup negative prompts toggle
    setupNegativePrompts();

     // Initialize Voice Input
     new VoiceInput();
}

function setupEventListeners() {
    // Navigation
    elements.newPromptBtn.addEventListener('click', () => {
        isGeminiMode = false;
        elements.welcomeScreen.classList.add('hidden');
        elements.generatorInterface.classList.remove('hidden');
    });

    elements.geminiModeBtn.addEventListener('click', () => {
        elements.apiKeyModal.classList.remove('hidden');
    });

    elements.closeApiKeyBtn.addEventListener('click', () => {
        elements.apiKeyModal.classList.add('hidden');
    });

    elements.continueWithApiBtn.addEventListener('click', () => {
        const key = document.getElementById('api-key-input').value;
        if (!key) {
            alert('Harap masukkan API Key.');
            return;
        }
        geminiApiKey = key;
        isGeminiMode = true;
        elements.apiKeyModal.classList.add('hidden');
        elements.welcomeScreen.classList.add('hidden');
        elements.generatorInterface.classList.remove('hidden');
    });

    // Generation
    elements.generateBtn.addEventListener('click', generatePrompt);

    // Tabs
    elements.tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            elements.tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const targetTab = button.dataset.tab;
            document.querySelectorAll('.output-panel, .split-view').forEach(panel => {
                panel.classList.remove('active');
            });
            
            if (targetTab === 'both') {
                document.getElementById('both-output').classList.add('active');
            } else {
                document.getElementById(`${targetTab}-output`).classList.add('active');
            }
        });
    });

    // Copy functionality
    elements.copyBtn.addEventListener('click', () => {
        const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
        let contentToCopy = '';
        
        if (activeTab === 'banana') {
            contentToCopy = document.getElementById('banana-output').textContent;
        } else if (activeTab === 'veo3') {
            contentToCopy = document.getElementById('veo3-output').textContent;
        } else {
            contentToCopy = `// BANANA PROMPT\n${document.getElementById('banana-output').textContent}\n\n// VEO3 JSON\n${document.getElementById('veo3-output').textContent}`;
        }
        
        navigator.clipboard.writeText(contentToCopy).then(() => {
            const originalText = elements.copyBtn.innerHTML;
            elements.copyBtn.innerHTML = '✅ Tersalin!';
            setTimeout(() => {
                elements.copyBtn.innerHTML = originalText;
            }, 2000);
        }).catch(() => {
            // Fallback untuk older browsers
            const textArea = document.createElement("textarea");
            textArea.value = contentToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const originalText = elements.copyBtn.innerHTML;
            elements.copyBtn.innerHTML = '✅ Tersalin!';
            setTimeout(() => {
                elements.copyBtn.innerHTML = originalText;
            }, 2000);
        });
    });

    // Presets
    elements.presetBtn.addEventListener('click', showPresetModal);
    elements.closePresetBtn.addEventListener('click', () => {
        elements.presetModal.classList.add('hidden');
    });

    // Reset form
    elements.resetBtn.addEventListener('click', () => {
        document.getElementById('input-form').reset();
        // Trigger change events to update UI
        document.querySelectorAll('select').forEach(select => {
            select.dispatchEvent(new Event('change'));
        });
        document.getElementById('negatives_enabled').dispatchEvent(new Event('change'));
    });

    // Delete prompt
    elements.deletePromptBtn.addEventListener('click', () => {
        document.getElementById('banana-output').innerHTML = '';
        document.getElementById('veo3-output').innerHTML = '';
        
        const bothOutput = document.getElementById('both-output');
        bothOutput.querySelector('.banana-side').innerHTML = '';
        bothOutput.querySelector('.veo3-side').innerHTML = '';
    });

    // Expand output
    elements.expandBtn.addEventListener('click', (e) => {
        const container = document.getElementById('output-container');
        container.classList.toggle('expanded');
        e.target.textContent = container.classList.contains('expanded') ? 'Ciutkan' : 'Perluas';
    });

    // History
    elements.historyBtn.addEventListener('click', () => {
        loadHistory();
        elements.historyModal.classList.remove('hidden');
    });

    elements.closeHistoryBtn.addEventListener('click', () => {
        elements.historyModal.classList.add('hidden');
    });

    elements.clearHistoryBtn.addEventListener('click', clearAllHistory);

    // Randomize
    elements.randomizeBtn.addEventListener('click', () => {
        const randomPreset = PRESETS[Math.floor(Math.random() * PRESETS.length)];
        setValuesWithDescriptions(randomPreset.data);
    });


    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.add('hidden');
        }
    });
}

function setupCustomInputs() {
    const customConfigs = [
        { selectId: 'style', inputId: 'custom-style' },
        { selectId: 'shot', inputId: 'custom-shot' },
        { selectId: 'lens', inputId: 'custom-lens' },
        { selectId: 'movement', inputId: 'custom-movement' },
        { selectId: 'lighting', inputId: 'custom-lighting' }
    ];

    customConfigs.forEach(config => {
        const selectEl = document.getElementById(config.selectId);
        const inputEl = document.getElementById(config.inputId);

        if (selectEl && inputEl) {
            selectEl.addEventListener('change', function() {
                inputEl.classList.toggle('hidden', this.value !== 'custom');
            });
        }
    });
}

function setupNegativePrompts() {
    const negativesCheckbox = document.getElementById('negatives_enabled');
    const negativesText = document.getElementById('negatives_text');
    const defaultNegatives = "watermark, text, cartoon style, extra limbs, oversaturated colors, distorted";
    
    negativesCheckbox.addEventListener('change', () => {
        negativesText.classList.toggle('hidden', !negativesCheckbox.checked);
        if (negativesCheckbox.checked && !negativesText.value) {
            negativesText.value = defaultNegatives;
        }
    });
}

function showPresetModal() {
    elements.presetList.innerHTML = '';
    
    const defaultHeader = document.createElement('h3');
    defaultHeader.className = 'text-lg font-bold text-highlight-accent mb-4';
    defaultHeader.textContent = `🎬 50+ Professional Presets (${PRESETS.length} total)`;
    elements.presetList.appendChild(defaultHeader);

    PRESETS.forEach(preset => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <div class="history-content">
                <p class="history-title">${preset.title}</p>
                <p class="history-preview">${preset.preview}</p>
            </div>
            <button class="btn-cta text-white font-bold py-1 px-3 rounded-md text-sm">Terapkan</button>
        `;
        
        div.querySelector('button').addEventListener('click', () => {
            setValuesWithDescriptions(preset.data);
            elements.presetModal.classList.add('hidden');
        });
        
        elements.presetList.appendChild(div);
    });
    
    elements.presetModal.classList.remove('hidden');
}

function generatePrompt() {
    if (isGeminiMode) {
        generateWithGemini();
    } else {
        const values = getAllInputValues();
        if (!values.subject) { 
            alert('Harap isi "Subject" terlebih dahulu.'); 
            return; 
        }
        
        elements.generateBtn.disabled = true;
        elements.generateBtn.innerHTML = '🧠 Generating...';
        elements.generateBtn.classList.add('generating');
        
        const bananaPrompt = generateBananaPrompt(values);
        const veo3Json = generateVEO3Json(values);
        
        typeWriter(document.getElementById('banana-output'), bananaPrompt);
        document.getElementById('veo3-output').textContent = veo3Json;
        
        const bothOutput = document.getElementById('both-output');
        bothOutput.querySelector('.banana-side').innerHTML = bananaPrompt.replace(/\n/g, '<br>');
        bothOutput.querySelector('.veo3-side').textContent = veo3Json;
        
        saveToHistory({ mode: 'Local', inputs: values, outputs: { banana: bananaPrompt, veo3: veo3Json } });
        
        setTimeout(() => { 
            elements.generateBtn.disabled = false; 
            elements.generateBtn.innerHTML = '⚡ Generate Prompt'; 
            elements.generateBtn.classList.remove('generating'); 
        }, 1500);
    }
}

async function generateWithGemini() {
    const values = getAllInputValues();
    if (!values.subject) {
        alert('Harap isi "Subject" terlebih dahulu.');
        return;
    }

    elements.generateBtn.disabled = true;
    elements.generateBtn.innerHTML = '🧠 Contacting AI...';
    elements.generateBtn.classList.add('generating');

    const flavor = document.getElementById('gemini-flavor').value;
    const systemInstruction = `You are a Prompt Enrichment Engine for a dual-generator app. Your enrichment style should be: ${flavor}.
    Input: User provides a raw structured prompt with categories (subject, action, location, mood, style, camera, lighting, details, effects).
    Task:
    1. Expand the input into a cinematic storytelling prompt (Banana style) with 5-6 lines. Always include narrative context, environment details, and emotional cues.
    2. Generate a Veo3 JSON format prompt, but prepend it with a short scene narrative paragraph (2-3 sentences) to strengthen the immersion.
    Rules:
    - Always write in English.
    - Maintain cinematic richness: describe textures, atmosphere, sounds, lights, and emotional tone.
    - Never shorten; always expand details.
    - Output must have two sections clearly separated by '---VEO3 PROMPT---'. The first part is the Banana Prompt, the second is the Veo3 prompt (narrative + JSON).`;
    
    const userQuery = `Enrich the following prompt data:\n${JSON.stringify(values, null, 2)}`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${geminiApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userQuery }] }],
                systemInstruction: { parts: [{ text: systemInstruction }] }
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        const text = result.candidates[0].content.parts[0].text;
        
        const parts = text.split('---VEO3 PROMPT---');
        const enrichedBanana = parts[0].trim();
        const enrichedVeo3 = parts[1].trim();

        typeWriter(document.getElementById('banana-output'), enrichedBanana);
        document.getElementById('veo3-output').textContent = enrichedVeo3;
        
        const bothOutput = document.getElementById('both-output');
        bothOutput.querySelector('.banana-side').innerHTML = enrichedBanana.replace(/\n/g, '<br>');
        bothOutput.querySelector('.veo3-side').textContent = enrichedVeo3;

        saveToHistory({ mode: 'Gemini', inputs: values, outputs: { banana: enrichedBanana, veo3: enrichedVeo3 } });

    } catch (error) {
        console.error('Gemini API Error:', error);
        alert('Gagal menghubungi Gemini AI. Periksa API Key Anda dan koneksi internet.');
    } finally {
        elements.generateBtn.disabled = false;
        elements.generateBtn.innerHTML = '⚡ Generate Prompt';
        elements.generateBtn.classList.remove('generating');
    }
}

// History Management
function saveToHistory(entry) {
    if (!entry.inputs.subject) return;
    
    let history = JSON.parse(localStorage.getItem('promptHistory')) || [];
    const newEntry = { id: Date.now(), ...entry };
    history.unshift(newEntry);
    
    if (history.length > 50) history.pop();
    
    localStorage.setItem('promptHistory', JSON.stringify(history));
}

function loadHistory() {
    let history = JSON.parse(localStorage.getItem('promptHistory')) || [];
    elements.historyList.innerHTML = '';
    
    if (history.length === 0) {
        elements.historyList.innerHTML = '<p class="text-gray-400 text-center py-4">Belum ada riwayat.</p>';
        return;
    }
    
    history.forEach((entry) => {
        const div = document.createElement('div');
        div.className = 'history-item';
        
        const modeBadge = entry.mode === 'Gemini' ? 
            '<span class="gemini-badge">Gemini</span>' : 
            '<span class="local-badge">Local</span>';
        
        div.innerHTML = `
            <div class="history-content">
                <p class="history-title">🍌 ${entry.inputs.subject || 'Tanpa Judul'} ${modeBadge}</p>
                <p class="history-time">${new Date(entry.id).toLocaleString('id-ID')}</p>
                <p class="history-preview">${entry.outputs.banana.split('\n\n')[1] || 'No preview available'}</p>
            </div>
            <button class="delete-history-btn btn-danger text-white font-bold py-1 px-2 rounded-md text-xs" data-id="${entry.id}">Hapus</button>
        `;

        div.querySelector('.history-content').addEventListener('click', () => {
            setValuesWithDescriptions(entry.inputs);
            elements.historyModal.classList.add('hidden');
        });

        div.querySelector('.delete-history-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteHistoryEntry(parseInt(e.target.dataset.id));
        });

        elements.historyList.appendChild(div);
    });
}

function deleteHistoryEntry(id) {
    let history = JSON.parse(localStorage.getItem('promptHistory')) || [];
    history = history.filter(entry => entry.id !== id);
    localStorage.setItem('promptHistory', JSON.stringify(history));
    loadHistory();
}

function clearAllHistory() {
    if (confirm('Apakah Anda yakin ingin menghapus semua riwayat?')) {
        localStorage.removeItem('promptHistory');
        loadHistory();
    }
}

// === VOICE INPUT CLASS ===
class VoiceInput {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.init();
    }
    
    init() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn('Speech Recognition not supported');
            return;
        }
        
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'id-ID'; // Bahasa Indonesia
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        
        this.setupEvents();
    }
    
    setupEvents() {
        const voiceBtn = document.getElementById('voice-input-btn');
        if (!voiceBtn) return;
        
        voiceBtn.addEventListener('click', () => this.toggleListening());
        
        this.recognition.onstart = () => this.onListeningStart();
        this.recognition.onresult = (event) => this.onSpeechResult(event);
        this.recognition.onend = () => this.onListeningEnd();
        this.recognition.onerror = (event) => this.onError(event);
    }
    
    toggleListening() {
        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    }
    
    startListening() {
        try {
            this.recognition.start();
            this.isListening = true;
        } catch (error) {
            console.error('Start listening error:', error);
        }
    }
    
    stopListening() {
        this.recognition.stop();
        this.isListening = false;
    }
    
    onListeningStart() {
        const voiceBtn = document.getElementById('voice-input-btn');
        voiceBtn.innerHTML = '🎙️🔴';
        voiceBtn.style.color = '#EF4444';
    }
    
    onSpeechResult(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('subject').value = transcript;
        this.showFeedback(`✓ Terdeteksi: "${transcript}"`);
    }
    
    onListeningEnd() {
        const voiceBtn = document.getElementById('voice-input-btn');
        voiceBtn.innerHTML = '🎙️';
        voiceBtn.style.color = '';
        this.isListening = false;
    }
    
    onError(event) {
        console.error('Speech recognition error:', event.error);
        this.onListeningEnd();
        
        if (event.error === 'not-allowed') {
            alert('Akses microphone ditolak. Mohon izinkan akses microphone.');
        }
    }
    
    showFeedback(message) {
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10B981;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            z-index: 10000;
            font-size: 14px;
            animation: slideInRight 0.3s ease-out;
        `;
        feedback.textContent = message;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => feedback.remove(), 300);
        }, 2000);
    }
}

// ✅ ✅ ✅ AKHIR DARI VOICE INPUT CLASS ✅ ✅ ✅