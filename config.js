// Default UI configuration generated from JSON
window.defaultConfig = {
  Description: {
    enabled: true,
  },
  Illumination: {
    label: "Illumination",
    icon: "💡",
    enabled: false,
    parameters: {
      direction: {
        label: "Direction",
        options: ["front", "back", "left", "right", "top", "bottom"],
        value: "front",
      },
      force: {
        label: "Force",
        options: ["soft", "moderate", "harsh"],
        value: "soft",
      },
      altitude: {
        label: "Altitude",
        options: ["high", "mid", "low"],
        value: "high",
      },
      color: {
        label: "Color",
        options: ["white", "warm", "cool", "gel‑red", "gel‑blue"],
        value: "white",
      },
    },
  },
  Clothes: {
    label: "Clothes",
    icon: "👕",
    enabled: false,
    parameters: {
      footwear: {
        label: "Footwear",
        options: ["sneakers", "boots", "heels", "sandals"],
        value: "sneakers",
      },
      legs: {
        label: "Legs",
        options: ["jeans", "shorts", "skirt", "trousers"],
        value: "jeans",
      },
      torso: {
        label: "Torso",
        options: ["t‑shirt", "jacket", "hoodie", "blazer"],
        value: "t‑shirt",
      },
      accessories: {
        label: "Accessories",
        options: ["watch", "hat", "glasses", "none"],
        value: "none",
      },
    },
  },
  Traits: {
    label: "Traits",
    icon: "🧑",
    enabled: false,
    parameters: {
      gender: {
        label: "Gender",
        options: ["male", "female", "non‑binary"],
        value: "male",
      },
      ethnicity: {
        label: "Ethnicity",
        options: ["latino", "caucasian", "african", "asian"],
        value: "latino",
      },
      age: {
        label: "Age group",
        options: ["child", "teen", "young adult", "adult", "elder"],
        value: "adult",
      },
      skinColor: {
        label: "Skin color",
        options: ["light", "medium", "olive", "dark"],
        value: "olive",
      },
      hairType: {
        label: "Hair type",
        options: ["straight", "wavy", "curly", "coily"],
        value: "curly",
      },
      hairLength: {
        label: "Hair length",
        options: ["short", "medium", "long", "extra‑long"],
        value: "medium",
      },
      hairColor: {
        label: "Hair color",
        options: ["black", "brown", "blonde", "red", "blue"],
        value: "black",
      },
    },
  },
  Camera: {
    label: "Camera",
    icon: "📷",
    enabled: false,
    parameters: {
      focalLength: {
        label: "Focal length",
        options: ["35\u00a0mm", "50\u00a0mm", "85\u00a0mm", "120\u00a0mm"],
        value: "50\u00a0mm",
      },
      aperture: {
        label: "Aperture",
        options: ["f/1.4", "f/2.8", "f/4", "f/11"],
        value: "f/2.8",
      },
      sensor: {
        label: "Sensor",
        options: ["full‑frame", "APS‑C", "micro‑4/3"],
        value: "full‑frame",
      },
      filmStock: {
        label: "Film stock",
        options: ["Kodak Portra\u00a0400", "Kodak Ektachrome", "Fujifilm Velvia"],
        value: "Kodak Portra\u00a0400",
      },
    },
  },
  Style: {
    label: "Style",
    icon: "🎨",
    enabled: false,
    parameters: {
      palette: {
        label: "Color palette",
        options: ["dark", "warm", "cool", "pastel", "neon"],
        value: "dark",
      },
      rendering: {
        label: "Rendering",
        options: ["realistic", "anime", "plasticine", "paint", "stop‑motion"],
        value: "realistic",
      },
    },
  },
};
