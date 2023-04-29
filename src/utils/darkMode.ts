export const checkAndToggleDarkTheme = function () {
    // Use matchMedia to check the user's device darkmode preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // check if there's darkmode preference in localStorage
    const localStoragePref = JSON.parse(localStorage.getItem("darkmode") || "null");

    if (localStoragePref !== null) {
        toggleDarkTheme(localStoragePref);
    } else {
        toggleDarkTheme(prefersDark);
    }
    // Add or remove the "dark" class based on if the media query matches


}

export const toggleDarkTheme = function (shouldAdd: boolean) {
    document.body.classList.toggle('dark', shouldAdd);
}