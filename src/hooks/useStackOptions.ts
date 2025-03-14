import { StackNavigationOptions } from '@react-navigation/stack'
import { colorPallet } from '../constants/colorPallete'

export const useStackOptions = () => {
   let stackCustomOptions: StackNavigationOptions = {}
   const StackOptions = (type: 'MainLayout' | 'AuthLayout' | 'TabLayout' | 'materiView', title: string = '') => {
      switch (type) {
         case 'MainLayout':
            stackCustomOptions = {
               headerShown: false,
            }
            break
         case 'AuthLayout':
            stackCustomOptions = {
               headerShown: false,
            }
            break
         case 'TabLayout':
            stackCustomOptions = {
               headerShown: false,
            }
            break
         case 'materiView':
            stackCustomOptions = {
               title: title,
               headerShown: true,
               headerStyle: {
                  backgroundColor: colorPallet.light,
                  elevation: 0,
               },
               headerBackButtonDisplayMode: 'minimal',
            }
            break
         default:
            break
      }
      return stackCustomOptions
   }
   return { StackOptions }
}
