import React, { useState } from 'react'
import Text from '../../components/Text'
import Section from '../../components/Section'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import Link from '../../components/Link'
import GtcIcon from '../../assets/images/gtc_icon_outline.png'
import { Image } from 'react-native'
import { useAuth } from '~/src/hooks/useAuth'
import Alert from '~/src/components/Alert'

const Auth = () => {
  // State Auth
  const { toggleAuth, toggleAuthMethod, signInAccount, signOutAccount, signUpAccount, localMessage, typeMessage, localLoading } = useAuth()

  // State Form
  const [username, setUsername] = useState<string>('')
  const [phone, setPhone] = useState<string>()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // FormView
  const FormView: React.JSX.Element = (
    <>
      {localMessage ? <Alert title={localMessage} type={typeMessage} /> : null}
      <Section padding="md" gap="sm" color="light" expand customStyle="justify-center">
        <Section padding="none" gap="none" direction="column" customStyle="items-center">
          <Image source={GtcIcon} className="flex w-36 h-36 mb-4" />
          <Text size="3xl" weight="bolder" customStyle="mb-2">
            Gading Training Center
          </Text>
          <Text size="md" weight="normal" customStyle="mt-2 mb-8 px-2 text-center">
            Persiapkan skill anda, raih kesuksesan anda di jepang
          </Text>
        </Section>
        {toggleAuth ? (
          <>
            <TextInput placeholder="Email" color="light" size="md" onChange={(e) => setEmail(e)} />
            <TextInput placeholder="Password" color="light" size="md" onChange={(e) => setPassword(e)} />
            <Button title={localLoading ? '...' : 'Masuk'} size="md" color="primary" onPress={() => (localLoading ? null : signInAccount({ email: email, password: password }))} />
            <Section padding="none" direction="row" customStyle="justify-center items-center mt-4 gap-1">
              <Text>Belum punya akun ?</Text>
              <Link title="Buat Akun" onPress={toggleAuthMethod} />
            </Section>
          </>
        ) : (
          <>
            <TextInput placeholder="Username baru" color="light" size="md" onChange={(e) => setUsername(e)} disabled={localLoading} />
            <TextInput placeholder="Nomor Whatsapp / Telepon" color="light" size="md" inputMode="numeric" onChange={(e) => setPhone(e)} disabled={localLoading} />
            <TextInput placeholder="Email baru" color="light" size="md" inputMode="email" onChange={(e) => setEmail(e)} disabled={localLoading} />
            <TextInput placeholder="Password baru" color="light" size="md" onChange={(e) => setPassword(e)} disabled={localLoading} />
            <Button
              title={localLoading ? '...' : 'Daftar'}
              size="md"
              color="primary"
              onPress={() => (localLoading ? null : signUpAccount({ username: username, phone: phone, email: email, password: password }))}
            />
            <Section padding="none" direction="row" customStyle="justify-center items-center mt-4 gap-1">
              <Text>Sudah punya akun ?</Text>
              <Link title="Masuk ke Akun" onPress={toggleAuthMethod} />
            </Section>
          </>
        )}
      </Section>
    </>
  )

  return <>{FormView}</>
}

export default Auth
