import Button  from '~/src/components/Button'
import Section  from '~/src/components/Section'
import Text  from '~/src/components/Text'
import { useAuth } from '~/src/hooks/useAuth'

export default () => {
  const { signOutAccount } = useAuth()
  return (
    <Section  customStyle="flex-1">
      <Text >Nama : Kumalala</Text >
      <Button  title="Logout" onPress={signOutAccount} />
    </Section >
  )
}
