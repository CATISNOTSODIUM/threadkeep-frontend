export const isVerified = () => {
    // cheap verification system
    if (!localStorage.getItem('userID')) return false;
    return true;
}