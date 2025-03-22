// User Information

import { account } from '../Account/account'

export interface UserInformation {
    user_uid: string | null
    user_token: string | null
    user_data: {
        membership: 'new_user' | 'member_regular' | 'member_pro_1' | 'member_pro_2' | null
        expired_at?: string | ''
        completed_modules?:
            | [
                  {
                      module_id: number
                      completed_at: string
                  }
              ]
            | object[]
    }
    user_information: account
}
