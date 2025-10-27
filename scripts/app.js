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

async function initializeApp() {
    
    // Continue with normal app initialization for authenticated users
    setupAllSelectDescriptions()
    setupEventListeners()
    initializeBackground()
    setupCustomInputs()
    setupNegativePrompts()
    initializePreview()
    new VoiceInput()
    
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

    // Randomize per kategori
elements.randomizeBtn.addEventListener('click', () => {
    // Pilih random kategori dulu
    const categories = ['BANANA', 'VEO3'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomPreset = PRESETS[randomCategory][Math.floor(Math.random() * PRESETS[randomCategory].length)];
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


function setValuesWithDescriptions(values) {
    setValues(values);
    
    // Auto-select appropriate tab based on preset type
    const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
    if (values.veo3Format && activeTab !== 'veo3') {
        document.querySelector('.tab-btn[data-tab="veo3"]').click();
    } else if (!values.veo3Format && activeTab !== 'banana') {
        document.querySelector('.tab-btn[data-tab="banana"]').click();
    }
    
    // Trigger descriptions update
    setTimeout(() => {
        ['style', 'shot', 'lens', 'movement', 'lighting'].forEach(id => {
            const select = document.getElementById(id);
            if (select) select.dispatchEvent(new Event('change'));
        });
        document.getElementById('negatives_enabled').dispatchEvent(new Event('change'));
    }, 100);
}



function showPresetModal() {
    elements.presetList.innerHTML = '';
    
    // Tambah tab interface
    const tabHeader = document.createElement('div');
    tabHeader.className = 'flex border-b border-panel-border mb-4';
    tabHeader.innerHTML = `
        <button class="preset-tab-btn active py-2 px-4 font-bold" data-type="BANANA">🍌 Banana Presets</button>
        <button class="preset-tab-btn py-2 px-4 font-bold" data-type="VEO3">🎬 VEO3 Presets</button>
    `;
    elements.presetList.appendChild(tabHeader);
    
    const contentArea = document.createElement('div');
    contentArea.id = 'preset-content-area';
    elements.presetList.appendChild(contentArea);
    
    // Load default tab
    loadPresetsByType('BANANA');
    
    // Tab event listeners
    tabHeader.querySelectorAll('.preset-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            tabHeader.querySelectorAll('.preset-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadPresetsByType(btn.dataset.type);
        });
    });
    
    elements.presetModal.classList.remove('hidden');
}

function loadPresetsByType(type) {
    const contentArea = document.getElementById('preset-content-area');
    const presets = PRESETS[type] || [];
    
    contentArea.innerHTML = `
        <div class="mb-4">
            <h3 class="text-lg font-bold text-highlight-accent">
                ${type === 'BANANA' ? '🍌' : '🎬'} ${presets.length} ${type} Presets
            </h3>
            <p class="text-sm text-text-secondary">
                ${type === 'BANANA' 
                    ? 'Presets optimized for narrative Banana prompts' 
                    : 'Presets optimized for structured VEO3 JSON format'}
            </p>
        </div>
        <div id="preset-grid" class="space-y-3 max-h-96 overflow-y-auto custom-scrollbar"></div>
    `;
    
    const presetGrid = document.getElementById('preset-grid');
    
    if (presets.length === 0) {
        presetGrid.innerHTML = '<p class="text-center text-text-secondary py-8">No presets available</p>';
        return;
    }
    
    presets.forEach(preset => {
        const presetEl = document.createElement('div');
        presetEl.className = 'history-item';
        presetEl.innerHTML = `
            <div class="history-content">
                <div class="flex items-center gap-2 mb-1">
                    <span class="history-title">${preset.title}</span>
                    <span class="text-xs px-2 py-1 rounded-full ${type === 'BANANA' ? 'bg-yellow-500 text-gray-900' : 'bg-blue-500 text-white'}">
                        ${type}
                    </span>
                </div>
                <p class="history-preview">${preset.preview}</p>
                <p class="text-xs text-text-secondary mt-1">Category: ${preset.category}</p>
            </div>
            <button class="apply-preset-btn btn-cta text-white font-bold py-1 px-3 rounded-md text-sm" 
                    data-preset='${JSON.stringify(preset.data).replace(/'/g, "&#39;")}'>
                Apply
            </button>
        `;
        
        presetEl.querySelector('.apply-preset-btn').addEventListener('click', () => {
            const presetData = JSON.parse(presetEl.querySelector('.apply-preset-btn').dataset.preset);
            setValuesWithDescriptions(presetData);
            elements.presetModal.classList.add('hidden');
        });
        
        presetGrid.appendChild(presetEl);
    });
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
    
    elements.generateBtn.innerHTML = '🧠 Directing Cinematic Masterpiece...';
    elements.generateBtn.classList.add('generating');

    const flavor = document.getElementById('gemini-flavor').value;
    const systemInstruction = `You are CINEMATIC PROMPT MASTER - a world-class AI that transforms basic prompts into SPECTACULAR, CINEMA-QUALITY masterpieces.

USER'S BASIC INPUT: ${JSON.stringify(values, null, 2)}

YOUR MISSION: Create TWO EPIC outputs that make users say "WOW!"

=== BANANA PROMPT REQUIREMENTS (CINEMATIC STORYTELLING) ===
- Length: 8-12 LINES minimum
- Start with EMOTIONAL HOOK that grabs attention
- Include: CHARACTER DEPTH + ENVIRONMENT IMMERSION + SENSORY DETAILS + EMOTIONAL JOURNEY
- Add UNEXPECTED TWISTS or symbolic elements
- Use METAPHORS and POETIC language
- Describe: TEXTURES, SOUNDS, SMELLS, LIGHT BEHAVIOR, WEATHER EFFECTS
- Include specific TIME OF DAY and ATMOSPHERIC CONDITIONS
- End with lasting EMOTIONAL IMPACT

=== VEO3 JSON REQUIREMENTS (TECHNICAL MASTERPIECE) ===
- Start with 4-5 sentence CINEMATIC NARRATIVE
- JSON must include ADVANCED TECHNICAL PARAMETERS:
  * camera_settings: {aperture, shutter_speed, iso, white_balance}
  * color_grading: {shadows, midtones, highlights, saturation_curve}
  * film_emulation: {grain_structure, halation, film_stock}
  * lens_characteristics: {vignetting, chromatic_aberration, bokeh_shape}
  * atmospheric_effects: {volumetric_lighting, haze_density, particle_effects}

=== STYLE FLAVOR: ${flavor} ===
${getFlavorSpecificInstructions(flavor)}

=== FORMAT RULES ===
1. BANANA PROMPT first (8-12 lines of cinematic poetry)
2. Separator: "---VEO3 PROMPT---"
3. VEO3: Narrative paragraph + Technical JSON

MAKE IT BREATHTAKING! Every word should paint a picture. Every technical detail should serve the story.`;

function getFlavorSpecificInstructions(flavor) {
    const instructions = {
            'Hollywood Blockbuster': `- Scale: EPIC and GRANDIOSE
            - Pacing: HIGH-STAKES, RAPID, HEART-POUNDING
            - Visuals: SWEEPING SHOTS, DRAMATIC LIGHTING, ICONIC MOMENTS
            - Sound: ORCHESTRAL SCORE, EARTH-SHATTERING BASS
            - Examples: AVATAR, DUNE, LORD OF THE RINGS`,

            'Fantasy Epic': `- Scale: MYTHIC and IMMERSIVE  
            - Pacing: SLOW-BUILD, MYSTERIOUS, REVELATORY
            - Visuals: MAGICAL LIGHT, ANCIENT TEXTURES, FLOATING PARTICLES
            - Sound: ETHEREAL CHOIRS, ANCIENT ECHOES, MAGICAL RESONANCE
            - Examples: LORD OF THE RINGS, GAME OF THRONES, THE WITCHER`,

            'Sci-Fi Futuristic': `- Scale: COLD but AWE-INSPIRING
            - Pacing: METHODICAL, UNNERVING, REVELATORY  
            - Visuals: NEON BLEED, HOLOGRAPHIC INTERFACES, REFLECTIVE SURFACES
            - Sound: SYNTHWAVE, GLITCH EFFECTS, FUTURISTIC AMBIENCE
            - Examples: BLADE RUNNER 2049, GHOST IN THE SHELL, THE MATRIX`,

            'Art-House / Indie': `- Scale: INTIMATE and PERSONAL
            - Pacing: CONTEMPLATIVE, MEASURED, REVELATORY
            - Visuals: IMPERFECT BEAUTY, NATURAL LIGHT, TEXTURAL FOCUS
            - Sound: MINIMALIST, AMBIENT, DIEGETIC FOCUS
            - Examples: A24 FILMS, ATOMIC BLONDE, DRIVE`
    };
    
    return instructions[flavor] || '- Make it CINEMATIC and MEMORABLE';
}
    
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

// INTELLIGENT STYLE RECOMMENDATION ENGINE
function initializePreview() {
    const previewBtn = document.getElementById('preview-btn');
    if (!previewBtn) return;

    previewBtn.addEventListener('click', () => {
        const subject = document.getElementById('subject').value;
        if (!subject || !subject.trim()) {
            alert('❌ Alamak Najisnyee, isi kolom “Subject” terlebih dahulu untuk mendapatkan rekomendasi gaya.');
            return;
        }

        previewBtn.disabled = true;
        previewBtn.innerHTML = '🎨 Analyzing styles...';
        
        const previewContainer = document.getElementById('preview-container');
        const previewGrid = document.getElementById('preview-grid');
        
        // Show loading
        previewGrid.innerHTML = `
            <div class="col-span-2 text-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-highlight-accent mx-auto mb-2"></div>
                <p class="text-text-secondary text-sm">Analyzing your prompt for best styles...</p>
            </div>
        `;
        previewContainer.classList.remove('hidden');
        
        setTimeout(() => {
            const values = getAllInputValues();
            const recommendations = generateStyleRecommendations(values);
            displayStyleRecommendations(recommendations);
            previewBtn.disabled = false;
            previewBtn.innerHTML = '👁️ Preview Styles';
        }, 1000);
    });
}

function generateStyleRecommendations(values) {
    const subject = values.subject.toLowerCase();
    const mood = values.mood.toLowerCase();
    const location = values.location.toLowerCase();
    const allText = subject + ' ' + mood + ' ' + location;
    
    const allStyles = [
        {
            name: "Cinematic",
            value: "Cinematic", 
            emoji: "🎬",
            color: "from-red-500 to-orange-500",
            description: "Movie-like drama, lighting & composition",
            keywords: ["action", "drama", "epic", "hero", "villain", "suspense", "chase", "battle", "emotional"],
            usage: 32
        },
        {
            name: "Studio Ghibli", 
            value: "Studio Ghibli",
            emoji: "🐲",
            color: "from-green-500 to-teal-500",
            description: "Whimsical, hand-painted anime style",
            keywords: ["fantasy", "magical", "whimsical", "cute", "forest", "spirit", "flying", "dream", "childhood"],
            usage: 28
        },
        {
            name: "Blade Runner",
            value: "Blade Runner", 
            emoji: "🌃",
            color: "from-purple-600 to-pink-600",
            description: "Cyberpunk, neon, futuristic noir",
            keywords: ["cyberpunk", "future", "neon", "tech", "android", "rain", "city", "dystopian", "sci-fi"],
            usage: 18
        },
        {
            name: "Pixar",
            value: "Pixar",
            emoji: "🤖",
            color: "from-blue-400 to-cyan-400",
            description: "3D animation, family-friendly, expressive",
            keywords: ["cute", "fun", "family", "toy", "animal", "friendly", "colorful", "animated", "happy"],
            usage: 25
        },
        {
            name: "Dark Fantasy",
            value: "Dark Fantasy",
            emoji: "⚔️",
            color: "from-gray-700 to-red-800",
            description: "Gothic, mysterious, dark magical themes",
            keywords: ["dark", "gothic", "horror", "mysterious", "undead", "vampire", "witch", "shadow", "night"],
            usage: 20
        },
        {
            name: "Ultra-realistic",
            value: "Ultra-realistic",
            emoji: "👁️",
            color: "from-gray-500 to-gray-700",
            description: "Hyper-detailed, almost photographic quality",
            keywords: ["detailed", "real", "texture", "skin", "hair", "closeup", "macro", "precision", "sharp"],
            usage: 35
        },
        {
            name: "Photorealism",
            value: "Photorealism",
            emoji: "📷",
            color: "from-blue-500 to-indigo-500",
            description: "Indistinguishable from real photography",
            keywords: ["photo", "camera", "lens", "portrait", "landscape", "natural", "authentic", "genuine", "lifelike"],
            usage: 30
        },
        {
            name: "DSLR Photography",
            value: "DSLR Photography",
            emoji: "📸",
            color: "from-yellow-500 to-orange-500",
            description: "Professional camera look, bokeh effects",
            keywords: ["portrait", "wedding", "event", "professional", "bokeh", "shallow", "depth", "field", "studio"],
            usage: 22
        },
        {
            name: "8K UHD",
            value: "8K UHD",
            emoji: "🖥️",
            color: "from-cyan-500 to-blue-500",
            description: "Ultra-high resolution, crystal clear details",
            keywords: ["detailed", "sharp", "clear", "resolution", "quality", "crisp", "ultra", "high", "definition"],
            usage: 15
        }
    ];
    
    // Calculate match scores
    const recommendations = allStyles.map(style => {
        const matchScore = calculateMatchScore(style.keywords, allText);
        return {
            ...style,
            matchScore: matchScore
        };
    });
    
    // Sort by match score (highest first) dan ambil 4 terbaik
    return recommendations.sort((a, b) => b.matchScore - a.matchScore).slice(0, 4);
}

function calculateMatchScore(keywords, text) {
    let score = 15; // Base score lebih rendah
    let matches = 0;
    
    keywords.forEach(keyword => {
        // Cek kata lengkap (lebih akurat)
        const words = text.split(' ');
        if (words.some(word => word.includes(keyword)) || text.includes(keyword)) {
            score += 12;
            matches++;
        }
    });
    
    // Bonus for multiple matches
    if (matches >= 2) score += 8;
    if (matches >= 4) score += 12;
    if (matches >= 6) score += 15;
    
    return Math.min(score, 98); // Cap at 98%
}

function displayStyleRecommendations(recommendations) {
    const previewGrid = document.getElementById('preview-grid');
    previewGrid.innerHTML = '';
    
    recommendations.forEach((rec, index) => {
        const previewCard = document.createElement('div');
        previewCard.className = 'preview-card bg-input-bg rounded-lg overflow-hidden border border-panel-border cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg';
        previewCard.innerHTML = `
            <div class="h-2 bg-gradient-to-r ${rec.color}"></div>
            <div class="p-4">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                        <span class="text-2xl">${rec.emoji}</span>
                        <span class="font-bold text-text-primary">${rec.name}</span>
                    </div>
                    <div class="bg-highlight-accent text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                        ${rec.matchScore}% match
                    </div>
                </div>
                <p class="text-text-secondary text-sm mb-3">${rec.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-xs text-text-secondary">${rec.usage}% users</span>
                    <button class="apply-style-btn bg-highlight-accent text-gray-900 text-xs font-bold px-3 py-1 rounded hover:bg-yellow-400 transition-colors" 
                            data-style="${rec.value}">
                        Apply Style
                    </button>
                </div>
            </div>
        `;
        
        // Add click event to apply style
        previewCard.querySelector('.apply-style-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            applyStyleFromPreview(rec.value);
        });
        
        previewGrid.appendChild(previewCard);
    });
}

function applyStyleFromPreview(styleValue) {
    const styleSelect = document.getElementById('style');
    if (styleSelect.querySelector(`option[value="${styleValue}"]`)) {
        styleSelect.value = styleValue;
        styleSelect.dispatchEvent(new Event('change'));
        
        // Auto-scroll to style section
        const styleSection = document.querySelector('summary[aria-label*="Suasana & Gaya"]');
        if (styleSection) {
            styleSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        alert(`✅ ${styleValue} style applied! Check the Style dropdown.`);
    }
}