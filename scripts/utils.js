// UTILITY FUNCTIONS

// Function untuk setup SEMUA descriptions
function setupAllSelectDescriptions() {
    const selectConfigs = [
        { id: 'style', descId: 'style-description' },
        { id: 'shot', descId: 'shot-description' },
        { id: 'lens', descId: 'lens-description' },
        { id: 'movement', descId: 'movement-description' },
        { id: 'lighting', descId: 'lighting-description' }
    ];

    selectConfigs.forEach(config => {
        setupSelectDescription(config.id, config.descId);
    });
}

function setupSelectDescription(selectId, descriptionId) {
    const selectEl = document.getElementById(selectId);
    const descEl = document.getElementById(descriptionId);

    if (!selectEl || !descEl) return;

    function updateDescription() {
        const selectedOption = selectEl.options[selectEl.selectedIndex];
        const description = selectedOption.getAttribute('data-description');

        if (description && description.trim() !== '') {
            descEl.innerHTML = `
                <div class="description-box">
                    <span class="icon">💡</span>
                    <span>${description}</span>
                </div>
            `;
            descEl.style.display = 'block';
        } else {
            descEl.innerHTML = '';
            descEl.style.display = 'none';
        }
    }

    selectEl.addEventListener('change', updateDescription);
    updateDescription(); // Initial call
}

// Function untuk trigger descriptions saat preset dipilih
function setValuesWithDescriptions(values) {
    setValues(values);
    
    // Trigger update semua descriptions
    setTimeout(() => {
        ['style', 'shot', 'lens', 'movement', 'lighting'].forEach(id => {
            const select = document.getElementById(id);
            if (select) select.dispatchEvent(new Event('change'));
        });
    }, 100);
}

// TypeWriter Effect
function typeWriter(element, text) {
    clearInterval(window.typeWriterInterval);
    let i = 0;
    element.innerHTML = '';
    const cursor = '<span id="typing-cursor"></span>';
    element.innerHTML = cursor;
    
    window.typeWriterInterval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1).replace(/\n/g, '<br>') + cursor;
            i++;
        } else {
            clearInterval(window.typeWriterInterval);
            element.innerHTML = text.replace(/\n/g, '<br>');
        }
    }, 10);
}

// Get value dari select atau custom input
function getSelectOrCustomValue(selectId, inputId) {
    const selectEl = document.getElementById(selectId);
    const inputEl = document.getElementById(inputId);
    if (selectEl.value === 'custom' && inputEl) {
        return inputEl.value;
    }
    return selectEl.value;
}

// Get semua input values
function getAllInputValues() {
    const vfx = {};
    document.querySelectorAll('input[id^="vfx_"]').forEach(el => {
        vfx[el.id.replace('vfx_', '')] = el.checked;
    });

    const post = {};
    document.querySelectorAll('input[id^="post_"]').forEach(el => {
        post[el.id.replace('post_', '')] = el.checked;
    });

    const styleSelect = document.getElementById('style');
    let styleValue = styleSelect.value;
    if (styleValue === 'custom') {
        styleValue = document.getElementById('custom-style').value || 'user-defined style';
    }

    return {
        subject: document.getElementById('subject').value,
        location: document.getElementById('location').value,
        action: document.getElementById('action').value,
        mood: document.getElementById('mood').value || 'Dramatic',
        style: styleValue,
        shot: getSelectOrCustomValue('shot', 'custom-shot') || 'Wide shot',
        lens: getSelectOrCustomValue('lens', 'custom-lens') || '35mm',
        movement: getSelectOrCustomValue('movement', 'custom-movement') || 'Static',
        lighting: getSelectOrCustomValue('lighting', 'custom-lighting') || 'Natural',
        details: {
            costume: document.getElementById('costume-details').value,
            props: document.getElementById('props-details').value,
            environment: document.getElementById('environment-details').value,
            textures: document.getElementById('textures-details').value,
        },
        negatives: {
            enabled: document.getElementById('negatives_enabled').checked,
            text: document.getElementById('negatives_text').value,
        },
        vfx: vfx, 
        post: post
    };
}

// Generate Banana Prompt
function generateBananaPrompt(values) {
    const vfxList = Object.keys(values.vfx).filter(k => values.vfx[k]).join(', ');
    const postList = Object.keys(values.post).filter(k => values.post[k]).join(', ');
    const practicalDetails = Object.values(values.details).filter(Boolean).join(', ');
    
    // SPECIAL CASE FOR IDENTITY PRESERVATION
    if (values.style.includes("preservasi identitas")) {
        return `Gunakan wajah asli dari foto referensi tanpa perubahan. 
Wajah, identitas, dan ekspresi harus identik 1:1 dengan foto referensi. 
Jangan ganti dengan wajah lain, jangan ubah proporsi wajah, jangan ubah etnis. 
${values.subject}. 
Meskipun ada efek sinematik atau distorsi kamera, wajah tetap sama dengan foto referensi.

Bingkai sinematik vertikal, rasio 9:16, resolusi ultra-tinggi. 
${values.action}. 
${values.location}.

Cinematography: ${values.shot}, ${values.lens}, ${values.technical}. 
Lighting: ${values.lighting}. 
Suasana: ${values.mood}.

Detail tambahan: ${values.details.costume}. 
Lingkungan: ${values.details.environment}. 
Post-processing: ${postList}, visual effects: ${vfxList}.

Prompt Negatif: ${values.negatives.text}.`;
    }
    
    // Original function for other presets...
    const realisticStyles = ['Ultra-realistic', 'Photorealism', 'DSLR Photography', '8K UHD'];
    let cameraDescription = `captured with ${values.lens} at f/1.8, ISO 100, shutter speed 1/125s`;
    if (realisticStyles.includes(values.style)) cameraDescription = `shot on a professional DSLR like a Canon 5D, 50mm f/1.8 lens`;
    
    const parts = [ "Vertical cinematic frame, 9:16 ratio, ultra-high resolution.", `Core Scene: A ${values.subject} ${values.action} at ${values.location}.`, `Camera & Cinematography: Composition: ${values.shot}, ${cameraDescription}. Camera movement: ${values.movement}.`, `Lighting & Atmosphere: Lighting: ${values.lighting}. Mood & grading: ${values.mood}, styled in ${values.style}.`, `Details: ${practicalDetails}. Textures: photorealistic skin pores, fabric texture, natural reflections.`, `Post-Processing & VFX: Post-processing: ${postList}. Visual effects: ${vfxList}.` ];
    if (values.negatives.enabled) parts.push(`Negative Prompts: Exclude: ${values.negatives.text}.`);
    return parts.join('\n\n');
}

// Generate VEO3 JSON
function generateVEO3Json(values) {
    const veo3Object = {
        subject: values.subject,
        location: values.location,
        action: values.action,
        mood: [values.mood],
        style: values.style,
        camera: {
            shot: values.shot,
            lens: values.lens,
            movement: values.movement
        },
        lighting: values.lighting,
        details: {
            costume: values.details.costume,
            props: values.details.props,
            environment: values.details.environment,
            textures: values.details.textures,
            effects: Object.keys(values.vfx).filter(k => values.vfx[k]),
            post: Object.keys(values.post).filter(k => values.post[k])
        },
        negative_prompts: values.negatives.enabled ? 
            values.negatives.text.split(',').map(s => s.trim()).filter(s => s) : []
    };
    
    return JSON.stringify(veo3Object, null, 2);
}

// Set values dari preset
function setValues(values) {
    if (!values) return;
    
    document.getElementById('subject').value = values.subject || '';
    document.getElementById('action').value = values.action || '';
    document.getElementById('location').value = values.location || '';
    document.getElementById('mood').value = values.mood || '';
    
    if (values.details) {
        document.getElementById('costume-details').value = values.details.costume || '';
        document.getElementById('props-details').value = values.details.props || '';
        document.getElementById('environment-details').value = values.details.environment || '';
        document.getElementById('textures-details').value = values.details.textures || '';
    }
    
    setSelectOrCustomValue('style', 'custom-style', values.style || 'Cinematic');
    ['shot', 'lens', 'movement', 'lighting'].forEach(key => {
        setSelectOrCustomValue(key, `custom-${key}`, values[key]);
    });
    
    ['vfx', 'post'].forEach(key => {
        if (values[key]) {
            Object.keys(values[key]).forEach(subKey => {
                const el = document.getElementById(`${key}_${subKey}`);
                if (el) el.checked = Boolean(values[key][subKey]);
            });
        }
    });
    
    const negativesCheckbox = document.getElementById('negatives_enabled');
    negativesCheckbox.checked = values.negatives?.enabled || false;
    document.getElementById('negatives_text').value = values.negatives?.text || '';
    negativesCheckbox.dispatchEvent(new Event('change'));
}

function setSelectOrCustomValue(selectId, inputId, value) {
    const selectEl = document.getElementById(selectId);
    const inputEl = document.getElementById(inputId);
    const optionExists = Array.from(selectEl.options).some(opt => opt.value === value);
    
    selectEl.value = optionExists ? value : 'custom';
    if (!optionExists && inputEl) {
        inputEl.value = value;
    }
    selectEl.dispatchEvent(new Event('change'));
}

// Background Slideshow
function initializeBackground() {
    const backgroundImages = [
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1170&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?q=80&w=1170&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1488229297570-58520851e868?q=80&w=1169&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1592659762303-90081d34b277?q=80&w=1073&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1332&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1172&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1557413287-60f2f07fe204?q=80&w=1170&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1718241905696-cb34c2c07bed?q=80&w=1228&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1753837738768-ecae1cd09074?q=80&w=1170&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1700050182437-76454899e249?q=80&w=1170&auto=format'
    ];

    let currentBgIndex = 0;
    const backgroundSlideshow = document.getElementById('background-slideshow');

    function changeBackground() {
        currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
        const nextBgIndex = (currentBgIndex + 1) % backgroundImages.length;
        
        new Image().src = backgroundImages[nextBgIndex];
        
        backgroundSlideshow.style.opacity = '0';
        setTimeout(() => {
            backgroundSlideshow.style.backgroundImage = `url('${backgroundImages[currentBgIndex]}')`;
            backgroundSlideshow.style.opacity = '1';
        }, 1000);
    }

    backgroundSlideshow.style.backgroundImage = `url('${backgroundImages[0]}')`;
    setInterval(changeBackground, 10000);
}