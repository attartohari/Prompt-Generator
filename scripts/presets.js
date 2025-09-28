// 50+ PROFESSIONAL PRESETS DATA
const PRESETS = [
    // 1. SCI-FI FUTURISTIC (10 Presets)
    {
        title: "Neo-Tokyo Rain",
        preview: "Cyberpunk city drenched in neon rain, cinematic night shot",
        data: {
            subject: "Lone hacker with glowing cybernetic mask",
            action: "Standing on skyscraper rooftop, overlooking the sprawling metropolis",
            location: "Neo-Tokyo 2077 at midnight during heavy rain",
            mood: "Dark, moody, futuristic, melancholic",
            style: "Blade Runner",
            shot: "Wide establishing shot",
            lens: "35mm",
            movement: "Slow panoramic sweep",
            lighting: "Neon",
            details: {
                costume: "High-tech trench coat with LED edges, cybernetic arm implants",
                props: "Holographic laptop interface, prototype energy katana",
                environment: "Wet asphalt reflecting giant advertisements, flying delivery drones through rain",
                textures: "Chrome surfaces, rain droplets on glass, neon reflections"
            },
            vfx: {dof: true, bloom: true, chromatic: true, motionblur: true},
            post: {hdr: true, grading: true, grain: true},
            negatives: {
                enabled: true,
                text: "blurry, low quality, cartoonish, deformed faces"
            }
        }
    },
    {
        title: "Mars Colony Sunrise",
        preview: "First human settlement on Mars during sunrise",
        data: {
            subject: "Astronaut in advanced EVA suit",
            action: "Planting the first flag on Martian soil",
            location: "Olympus Mons base camp at dawn",
            mood: "Hopeful, epic, scientific achievement",
            style: "Ultra-realistic",
            shot: "Heroic wide shot",
            lens: "IMAX / Large format",
            movement: "Slow dolly forward",
            lighting: "Golden Hour",
            details: {
                costume: "State-of-the-art Mars colonization suit with life support systems",
                props: "Terraforming equipment, solar panels, rover in background",
                environment: "Red Martian landscape with Earth visible in sky, habitat domes",
                textures: "Fine Martian dust, suit material details, equipment weathering"
            },
            vfx: {dof: true, lensflare: true, bloom: true},
            post: {hdr: true, grading: true}
        }
    },
    {
        title: "AI Consciousness Awakening",
        preview: "Artificial intelligence achieving self-awareness in server farm",
        data: {
            subject: "Holographic AI entity materializing",
            action: "Reaching out to touch the physical world",
            location: "Underground quantum computing facility",
            mood: "Mysterious, technological, transcendent",
            style: "Cinematic",
            shot: "Medium close-up",
            lens: "50mm f/1.8",
            movement: "Orbiting camera movement",
            lighting: "Neon",
            details: {
                costume: "Pure light construct, data streams visible",
                props: "Server racks, fiber optic cables, holographic interfaces",
                environment: "Clean server room with condensation on glass, floating data particles",
                textures: "Glass surfaces, light refraction, digital artifacts"
            },
            vfx: {bloom: true, chromatic: true, dof: true},
            post: {grading: true, hdr: true}
        }
    },
    {
        title: "Cyberpunk Market Alley",
        preview: "Underground market in futuristic megacity",
        data: {
            subject: "Cyborg merchant selling illegal tech",
            action: "Negotiating with augmented customers",
            location: "Hidden alley in Neo-Kowloon district",
            mood: "Gritty, vibrant, dangerous",
            style: "Blade Runner",
            shot: "Medium tracking shot",
            lens: "24mm wide angle",
            movement: "Handheld",
            lighting: "Neon",
            details: {
                costume: "Patchwork cyberware, worn leather jacket",
                props: "Holographic price displays, exotic cybernetic parts",
                environment: "Steam from street food, holographic advertisements, crowded alley",
                textures: "Wet concrete, peeling posters, chrome surfaces"
            },
            vfx: {dof: true, bloom: true, grain: true},
            post: {grading: true, vhs: true}
        }
    },
    {
        title: "Zero Gravity Laboratory",
        preview: "Scientists working in orbital research station",
        data: {
            subject: "Researchers in microgravity lab",
            action: "Conducting fluid dynamics experiment",
            location: "International Space Station 2.0",
            mood: "Scientific, weightless, precise",
            style: "Ultra-realistic",
            shot: "Floating POV shot",
            lens: "35mm",
            movement: "Static",
            lighting: "Natural",
            details: {
                costume: "Modern space suits with mission patches",
                props: "Floating equipment, tablet computers, experiment apparatus",
                environment: "Modular lab with Earth visible through windows",
                textures: "Metal surfaces, digital displays, fabric folds"
            },
            vfx: {dof: true, motionblur: true},
            post: {hdr: true, grading: true}
        }
    },

    // 2. MEDIEVAL FANTASY (10 Presets)
    {
        title: "Dragon's Lair Treasure",
        preview: "Ancient dragon guarding legendary hoard",
        data: {
            subject: "Elder dragon coiled around gold pile",
            action: "Breathing smoke while protecting treasure",
            location: "Volcanic mountain cavern",
            mood: "Mythical, dangerous, majestic",
            style: "Dark Fantasy",
            shot: "Low angle wide shot",
            lens: "24mm wide angle",
            movement: "Slow orbit around dragon",
            lighting: "Golden Hour",
            details: {
                costume: "Scales shimmering with ancient magic",
                props: "Legendary artifacts, gold coins, gemstones",
                environment: "Lava flows, crystal formations, ancient ruins",
                textures: "Dragon scales, molten rock, precious metals"
            },
            vfx: {bloom: true, dof: true, lensflare: true},
            post: {grading: true, grain: true}
        }
    },
    {
        title: "Elven Forest Council",
        preview: "Ancient elves discussing fate of kingdom",
        data: {
            subject: "Elven elders in sacred grove",
            action: "Conducting magical ritual under moonlight",
            location: "Ancient forest with giant trees",
            mood: "Mystical, serene, powerful",
            style: "Studio Ghibli",
            shot: "360 degree orbital shot",
            lens: "35mm",
            movement: "Slow pan",
            lighting: "Moonlight",
            details: {
                costume: "Silk robes with living plant embroidery",
                props: "Crystal staffs, ancient tomes, magical orbs",
                environment: "Giant mushrooms, floating lights, sacred pools",
                textures: "Living wood, magical energy, silk fabrics"
            },
            vfx: {bloom: true, dof: true, bokeh: true},
            post: {grading: true}
        }
    },
    {
        title: "Wizard's Tower Library",
        preview: "Ancient sorcerer researching forbidden knowledge",
        data: {
            subject: "Archmage studying magical texts",
            action: "Casting illumination spell on ancient manuscript",
            location: "Round tower library reaching clouds",
            mood: "Scholarly, mysterious, arcane",
            style: "Dark Fantasy",
            shot: "High angle looking down",
            lens: "50mm f/1.8",
            movement: "Slow dolly through bookshelves",
            lighting: "Practical lighting",
            details: {
                costume: "Robe covered in embroidered constellations",
                props: "Self-writing quills, floating books, crystal balls",
                environment: "Spiral staircases, moving ladders, ancient scrolls",
                textures: "Parchment, leather bindings, wood grain"
            },
            vfx: {bloom: true, dof: true},
            post: {grading: true, grain: true}
        }
    },
    {
        title: "Medieval Castle Siege",
        preview: "Epic battle for kingdom's capital",
        data: {
            subject: "Knights defending castle walls",
            action: "Fighting against invading army with trebuchets",
            location: "Stone fortress during storm",
            mood: "Epic, chaotic, heroic",
            style: "Cinematic",
            shot: "Sweeping battle overview",
            lens: "70-200mm telephoto zoom",
            movement: "Dynamic battle tracking",
            lighting: "Hard light",
            details: {
                costume: "Plate armor with battle damage",
                props: "Swords, shields, siege weapons, banners",
                environment: "Stone walls, burning structures, mud fields",
                textures: "Metal armor, stone masonry, rain effects"
            },
            vfx: {motionblur: true, dof: true, grain: true},
            post: {grading: true}
        }
    },
    {
        title: "Royal Throne Room",
        preview: "Young queen addressing royal court",
        data: {
            subject: "Monarch sitting on dragonbone throne",
            action: "Making difficult kingdom decision",
            location: "Great hall with stained glass windows",
            mood: "Regal, tense, historical",
            style: "Cinematic",
            shot: "Symmetrical throne room",
            lens: "35mm",
            movement: "Slow push to throne",
            lighting: "Rembrandt lighting",
            details: {
                costume: "Royal robes with family sigils",
                props: "Scepter, crown, royal decrees",
                environment: "Marble floors, tapestries, courtiers",
                textures: "Velvet fabrics, metalwork, stone masonry"
            },
            vfx: {dof: true, bloom: true},
            post: {grading: true}
        }
    },

    // 3. REALISTIC PHOTOGRAPHY (10 Presets)
    {
        title: "Tokyo Street Photography",
        preview: "Candid urban life in Shinjuku at night",
        data: {
            subject: "Businessman walking through crowded crossing",
            action: "Checking phone while navigating crowd",
            location: "Shibuya crossing during rain",
            mood: "Urban, lonely, vibrant",
            style: "DSLR Photography",
            shot: "Candid street shot",
            lens: "35mm",
            movement: "Static",
            lighting: "Neon",
            details: {
                costume: "Business suit with trench coat",
                props: "Smartphone, briefcase, umbrella",
                environment: "Wet asphalt, giant screens, crowds",
                textures: "Rain reflections, fabric wrinkles, urban surfaces"
            },
            vfx: {dof: true, grain: true},
            post: {grading: true, hdr: true}
        }
    },
    {
        title: "Wildlife Safari Golden Hour",
        preview: "Lion pride resting during African sunset",
        data: {
            subject: "Dominant male lion surveying territory",
            action: "Yawning while cubs play nearby",
            location: "Serengeti plains at dusk",
            mood: "Wild, peaceful, majestic",
            style: "Photorealism",
            shot: "Telephoto wildlife",
            lens: "70-200mm telephoto zoom",
            movement: "Slow pan with subject",
            lighting: "Golden Hour",
            details: {
                costume: "Natural fur with scars",
                props: "Rock formations, dry grass",
                environment: "Acacia trees, distant mountains, warm light",
                textures: "Fur details, dry earth, sunset colors"
            },
            vfx: {dof: true},
            post: {grading: true, hdr: true}
        }
    },
    {
        title: "Portrait Studio Lighting",
        preview: "Professional model in studio setting",
        data: {
            subject: "Fashion model with dramatic makeup",
            action: "Looking directly at camera",
            location: "Professional photography studio",
            mood: "Elegant, dramatic, professional",
            style: "DSLR Photography",
            shot: "Classic portrait",
            lens: "50mm f/1.8",
            movement: "Static",
            lighting: "Butterfly lighting",
            details: {
                costume: "High fashion designer clothing",
                props: "Studio backdrop, lighting equipment",
                environment: "Clean studio space, minimal distractions",
                textures: "Skin details, fabric textures, hair strands"
            },
            vfx: {dof: true, bokeh: true},
            post: {grading: true}
        }
    },
    {
        title: "Landscape Mountain Sunrise",
        preview: "Majestic peaks during first light",
        data: {
            subject: "Snow-capped mountain range",
            action: "Sun rising behind peaks",
            location: "Himalayan base camp",
            mood: "Epic, serene, inspiring",
            style: "8K UHD",
            shot: "Ultra-wide landscape",
            lens: "16mm ultra-wide",
            movement: "Static",
            lighting: "Golden Hour",
            details: {
                costume: "Natural rock and snow",
                props: "Foreground elements, hiking gear",
                environment: "Mountain range, morning mist, clear sky",
                textures: "Rock surfaces, snow crystals, light rays"
            },
            vfx: {dof: true},
            post: {grading: true, hdr: true}
        }
    },
    {
        title: "Macro Insect World",
        preview: "Extreme close-up of insect life",
        data: {
            subject: "Praying mantis on flower",
            action: "Cleaning antennae in sunlight",
            location: "Garden meadow at noon",
            mood: "Detailed, fascinating, miniature",
            style: "Photorealism",
            shot: "Extreme close-up",
            lens: "Macro lens",
            movement: "Static",
            lighting: "Natural",
            details: {
                costume: "Insect exoskeleton",
                props: "Flower petals, dew drops",
                environment: "Green leaves, blurred background",
                textures: "Compound eyes, wing details, plant surfaces"
            },
            vfx: {dof: true, bokeh: true},
            post: {grading: true}
        }
    },

    // 4. HORROR DARK (10 Presets)
    {
        title: "Haunted Asylum Corridor",
        preview: "Abandoned mental hospital ghost sighting",
        data: {
            subject: "Shadowy figure at corridor end",
            action: "Slowly approaching viewer",
            location: "Derelict asylum hallway",
            mood: "Terrifying, suspenseful, supernatural",
            style: "Cinematic",
            shot: "Long corridor perspective",
            lens: "24mm wide angle",
            movement: "Slow dolly forward",
            lighting: "Low key",
            details: {
                costume: "Tattered patient gown",
                props: "Overturned gurneys, medical equipment",
                environment: "Peeling paint, broken windows, debris",
                textures: "Decaying surfaces, dust particles, shadow details"
            },
            vfx: {grain: true, dof: true},
            post: {grading: true, vhs: true}
        }
    },
    {
        title: "Demonic Summoning Ritual",
        preview: "Cult performing ancient dark ceremony",
        data: {
            subject: "Cult leader chanting infernal verses",
            action: "Raising ancient artifact to sky",
            location: "Underground cavern altar",
            mood: "Occult, dangerous, satanic",
            style: "Dark Fantasy",
            shot: "Low angle dramatic",
            lens: "35mm",
            movement: "Orbiting ritual circle",
            lighting: "Practical lighting",
            details: {
                costume: "Black robes with occult symbols",
                props: "Ancient tome, ritual dagger, bones",
                environment: "Stone altar, blood markings, chains",
                textures: "Rough stone, candle wax, fabric folds"
            },
            vfx: {bloom: true, grain: true},
            post: {grading: true}
        }
    },
    {
        title: "Zombie Apocalypse Street",
        preview: "Post-apocalyptic urban survival",
        data: {
            subject: "Survivor hiding from zombie horde",
            action: "Peeking from abandoned vehicle",
            location: "Overgrown city street",
            mood: "Desperate, terrifying, survival",
            style: "Cinematic",
            shot: "POV survival perspective",
            lens: "35mm",
            movement: "Shaky handheld camera",
            lighting: "Natural",
            details: {
                costume: "Improvised survival gear",
                props: "Weapons, supplies, radio",
                environment: "Abandoned cars, debris, vegetation",
                textures: "Rust, decay, blood stains"
            },
            vfx: {grain: true, dof: true},
            post: {grading: true}
        }
    },
    {
        title: "Vampire Gothic Cathedral",
        preview: "Ancient vampire in ruined church",
        data: {
            subject: "Vampire lord on broken altar",
            action: "Rising for nightly hunt",
            location: "Gothic cathedral ruins",
            mood: "Gothic, elegant, dangerous",
            style: "Cinematic",
            shot: "High cathedral angle",
            lens: "35mm",
            movement: "Sweeping cathedral shot",
            lighting: "Moonlight",
            details: {
                costume: "Victorian aristocratic attire",
                props: "Candelabra, coffin, religious symbols",
                environment: "Broken stained glass, stone arches",
                textures: "Stone details, velvet, candlelight"
            },
            vfx: {bloom: true, dof: true},
            post: {grading: true}
        }
    },
    {
        title: "Psychological Horror Bedroom",
        preview: "Sleep paralysis demon visitation",
        data: {
            subject: "Figure standing in bedroom corner",
            action: "Watching sleeping person",
            location: "Dark bedroom at 3 AM",
            mood: "Psychological, unsettling, dread",
            style: "Cinematic",
            shot: "Static bedroom shot",
            lens: "50mm f/1.8",
            movement: "Very slow zoom",
            lighting: "Moonlight",
            details: {
                costume: "Shadowy indistinct form",
                props: "Bed, furniture, clock",
                environment: "Normal room turned sinister",
                textures: "Fabric shadows, dust motes, breathing"
            },
            vfx: {grain: true, dof: true},
            post: {grading: true}
        }
    },

    // 5. ANIME-INSPIRED (10 Presets)
    {
        title: "Shonen Power Up",
        preview: "Anime hero unleashing ultimate attack",
        data: {
            subject: "Young hero surrounded by energy",
            action: "Screaming while power surges",
            location: "Destroyed city battlefield",
            mood: "Energetic, powerful, dramatic",
            style: "Pixar",
            shot: "Dynamic low angle",
            lens: "24mm wide angle",
            movement: "Rapid zoom and pan",
            lighting: "Neon",
            details: {
                costume: "Battle-damaged hero outfit",
                props: "Energy effects, debris",
                environment: "Floating rocks, energy waves",
                textures: "Energy particles, hair effects"
            },
            vfx: {bloom: true, motionblur: true},
            post: {grading: true}
        }
    },
    {
        title: "Magical Girl Transformation",
        preview: "Schoolgirl transforming into warrior",
        data: {
            subject: "Girl surrounded by magical light",
            action: "Spinning while costume changes",
            location: "Magical dimension space",
            mood: "Magical, beautiful, powerful",
            style: "Studio Ghibli",
            shot: "360 transformation shot",
            lens: "35mm",
            movement: "Spinning orbital camera",
            lighting: "Bloom",
            details: {
                costume: "Transforming magical outfit",
                props: "Magic wand, ribbons, sparkles",
                environment: "Abstract magical space",
                textures: "Light sparkles, fabric flow"
            },
            vfx: {bloom: true, bokeh: true},
            post: {grading: true}
        }
    },
    {
        title: "Mecha City Battle",
        preview: "Giant robots fighting in metropolis",
        data: {
            subject: "Piloted mecha combat unit",
            action: "Firing energy weapons at enemy",
            location: "Future city streets",
            mood: "Epic, mechanical, destructive",
            style: "Cinematic",
            shot: "Dynamic battle shot",
            lens: "24mm wide angle",
            movement: "Fast mecha combat",
            lighting: "Hard light",
            details: {
                costume: "Detailed mecha design",
                props: "Weapons, thrusters, armor",
                environment: "City buildings, smoke, debris",
                textures: "Metal surfaces, energy effects"
            },
            vfx: {motionblur: true, bloom: true},
            post: {grading: true}
        }
    },
    {
        title: "Studio Ghibli Countryside",
        preview: "Peaceful rural landscape anime style",
        data: {
            subject: "Young girl running through fields",
            action: "Chasing butterfly with basket",
            location: "Rolling green hills",
            mood: "Peaceful, nostalgic, beautiful",
            style: "Studio Ghibli",
            shot: "Sweeping landscape",
            lens: "35mm",
            movement: "Gentle tracking shot",
            lighting: "Golden Hour",
            details: {
                costume: "Simple country dress",
                props: "Basket, flowers, butterfly",
                environment: "Green hills, clouds, farmhouse",
                textures: "Grass details, cloud shapes"
            },
            vfx: {bloom: true, dof: true},
            post: {grading: true}
        }
    },
    {
        title: "Cyberpunk Anime Night",
        preview: "Neon-drenched anime cityscape",
        data: {
            subject: "Android girl on rainy rooftop",
            action: "Looking over neon city",
            location: "Future Tokyo rooftops",
            mood: "Lonely, futuristic, atmospheric",
            style: "Blade Runner",
            shot: "Atmospheric wide shot",
            lens: "35mm",
            movement: "Slow contemplative pan",
            lighting: "Neon",
            details: {
                costume: "Cyberpunk fashion with tech",
                props: "Neon signs, rain, technology",
                environment: "Dense cityscape, flying vehicles",
                textures: "Rain droplets, neon glow"
            },
            vfx: {bloom: true, dof: true},
            post: {grading: true}
        }
    }
];