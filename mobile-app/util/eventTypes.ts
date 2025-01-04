export const getEventTypeDetails = (eventType: string) => {
    // Unified color palette
    const colors = {
        primary: "#346835", // Green for positive events
        secondary: "#177dcc", // Blue for calm and professional events
        accent: "#b38950", // Orange for vibrant and energetic events
        danger: "#9f3630", // Red for bold and food-related events
        neutral: "#979797", // Gray for general or undefined events
    };

    switch (eventType.toLowerCase()) {
        case "party":
            return { icon: "music", tags: ["Music", "Dance", "Fun"], color: colors.accent };
        case "culture":
            return { icon: "university", tags: ["Art", "History", "Exhibition"], color: colors.secondary };
        case "meeting":
            return { icon: "handshake-o", tags: ["Business", "Networking", "Discussion"], color: colors.primary };
        case "work":
            return { icon: "briefcase", tags: ["Productivity", "Teamwork", "Focus"], color: colors.secondary };
        case "dinner":
            return { icon: "cutlery", tags: ["Food", "Friends", "Relax"], color: colors.danger };
        case "exercise":
            return { icon: "bicycle", tags: ["Fitness", "Health", "Energy"], color: colors.primary };
        default:
            return { icon: "circle", tags: ["General"], color: colors.neutral };
    }
};
