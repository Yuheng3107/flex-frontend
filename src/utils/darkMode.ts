export const checkAndToggleDarkTheme = function () {

    console.log('checkandtoggledarktheme running')
    // Use matchMedia to check the user's device darkmode preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // check if there's darkmode preference in localStorage
    if (localStorage.getItem('darkmode') === null) {
        localStorage.setItem("darkmode", JSON.stringify(prefersDark));
    }
    const localStoragePref = JSON.parse(localStorage.getItem("darkmode") || "{}");
    toggleDarkTheme(localStoragePref);
    // if (localStoragePref === false) {
    //     toggleDarkTheme(false);
    // } else {
    //     toggleDarkTheme(true);
    // }
    // Add or remove the "dark" class based on if the media query matches


}

export const toggleDarkTheme = function (shouldAdd: boolean) {
    document.body.classList.toggle('dark', shouldAdd);
}