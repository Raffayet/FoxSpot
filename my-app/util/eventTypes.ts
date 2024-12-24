export const getEventTypeDetails = (eventType: string) => {
    switch (eventType.toLowerCase()) {
        case "party":
            return { icon: "music", tags: ["Music", "Dance", "Fun"], color: "#FF5733" };
        case "culture":
            return { icon: "university", tags: ["Art", "History", "Exhibition"], color: "#33A2FF" };
        case "meeting":
            return { icon: "handshake-o", tag: ["Business", "Networking", "Discussion"], color: "#33FF57" };
        case "work":
            return { icon: "briefcase", tags: ["Productivity", "Teamwork", "Focus"], color: "#FFC300" };
        case "dinner":
            return { icon: "cutlery", tags: ["Food", "Friends", "Relax"], color: "#C70039" };
        case "exercise":
            return { icon: "bicycle", tags: ["Fitness", "Health", "Energy"], color: "#8C33FF" };
        default:
            return { icon: "circle", tags: ["General"], color: "#555555" };
    }
};
