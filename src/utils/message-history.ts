export const convertTimeToMessageHistory = (time) => {
    const messageTime = new Date(time);
    const currentTime = new Date();

    const timeDiff = currentTime.getTime() - messageTime.getTime();

    // Convert to different time units
    const secondsDiff = timeDiff / 1000;
    const minutesDiff = secondsDiff / 60;
    const hoursDiff = minutesDiff / 60;
    const daysDiff = hoursDiff / 24;

    if (minutesDiff < 1) {
        return `${secondsDiff.toFixed(0)} seconds ago`
    }
    if (hoursDiff < 1) {
        return `${minutesDiff.toFixed(0)} minutes ago`
    }

    if (daysDiff < 1) {
        return `${hoursDiff.toFixed(0)} hours ago`
    }

    if (daysDiff < 7) {
        return `${daysDiff.toFixed(0)} days ago`
    }

    return messageTime.toDateString()
}