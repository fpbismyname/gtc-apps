// useAuth

export interface Memberships {
    memberships: Membership
}

type membershipType = 'new_user' | 'pro_1' | 'pro_2' | 'pro_3'

interface Membership {
    membership_type: membershipType
    expired_at: string | null
    completed_module: module[] | []
}

interface module {
    id: string
    module_name: string
    completed_at: string
}

// useMember

export interface AddMembership {
    type: membershipType
    user_uid: string
}
