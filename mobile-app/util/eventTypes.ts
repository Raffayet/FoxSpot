export const getEventTypeDetails = (eventType: string) => {
    // Unified color palette
    const colors = {
        primary: "#346835", // Green for positive and active events
        secondary: "#177dcc", // Blue for cultural and professional events
        accent: "#b38950", // Orange for vibrant and energetic events
        danger: "#9f3630", // Red for bold and food-related events
        neutral: "#979797", // Gray for general or undefined events
    };

    switch (eventType.toLowerCase()) {
        case "party":
            return {
                icon: "music", // General music icon for party
                tags: ["Music", "Dance", "Fun"],
                color: colors.accent,
            };
        case "culture":
            return {
                icon: "university", // Book icon for cultural events
                tags: ["Art", "History", "Exhibition"],
                color: colors.secondary,
            };
        case "meeting":
            return {
                icon: "handshake-o", // Handshake icon for meetings
                tags: ["Business", "Networking", "Discussion"],
                color: colors.primary,
            };
        case "work":
            return {
                icon: "briefcase", // Briefcase icon for work tasks
                tags: ["Productivity", "Teamwork", "Focus"],
                color: colors.secondary,
            };
        case "dinner":
            return {
                icon: "cutlery", // Fork and knife for dinner
                tags: ["Food", "Friends", "Relax"],
                color: colors.danger,
            };
        case "exercise":
            return {
                icon: "futbol-o", // Bicycle icon for exercise
                tags: ["Fitness", "Health", "Energy"],
                color: colors.primary,
            };
        default:
            return {
                icon: "circle", // Generic circle icon
                tags: ["General"],
                color: colors.neutral,
            };
    }
};
