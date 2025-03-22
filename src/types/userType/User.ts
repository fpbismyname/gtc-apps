// User Information

import { Account } from '../accountType/Account'

export interface User {
    user_uid: string | null
    user_information?: Partial<Account>
}
