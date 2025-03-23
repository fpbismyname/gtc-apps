export interface Account {
    user_id: string | null
    memberships?: {
        memberships_type: 'solo-learn' | 'full-access' | 'guided-to-job' | ''
        expired_at: string | ''
    }
    completed_modules?:
        | [
              {
                  module_id: string | ''
                  completed_at: string | ''
              }
          ]
        | []
}
