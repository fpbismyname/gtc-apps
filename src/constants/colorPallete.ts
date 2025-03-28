export const colorPallet = {
    // Basic color
    light: '#ffffff',
    dark: '#000000',
    gray: '#6a6a6a',
    transparent: '#RRGGBBAA',
    primary: '#ffd642',
    secondary: '#bfa251',
    //condition Color
    get info() {
        return this.secondary
    },
    get success() {
        return this.primary
    },
    get error() {
        return this.danger
    },
    danger: '#ff763b',
    warning: '#ffc184',
    active: '#ffd642',
    inactive: '#8a7322',
    link: '#6c5509',
    hoverPrimary: '#e5c75b',
    //loading color
    'primary-loading': 'hsl(47, 80%, 63%)',
    'secondary-loading': 'hsl(44, 26%, 53%)',
    'info-loading': 'hsl(199, 80%, 65%)',
    'danger-loading': 'hsl(0, 80%, 62%)',
    'warning-loading': 'hsl(30, 80%, 76%)',
    'success-loading': 'hsl(116, 80%, 71%)',
    'active-loading': 'hsl(47, 80%, 63%)',
    'inactive-loading': 'hsl(47, 20%, 34%)',
    'link-loading': 'hsl(46, 65%, 23%)',
    'hoverPrimary-loading': 'hsl(47, 53%, 63%)'
}

export const TabsColor = {
    background: colorPallet.light,
    activeButton: colorPallet.active,
    inactiveButton: colorPallet.inactive
}
