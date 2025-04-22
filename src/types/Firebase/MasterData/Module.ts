type typeModul = 'tier-1' | 'tier-2' | 'student' | 'premium'

export interface Module {
    module_name: string
    module_thumbanail: string
    category_module: string
    module_video: string
    created_at: string
    type: typeModul
}

export interface CategoryOfModule {
    category_name: string
    category_slug: string
    category_thumbnail: string
    created_at: string
}
