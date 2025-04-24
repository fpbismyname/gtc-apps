import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { Drawer } from 'react-native-paper'
import Image from '~/src/components/elements/Image'
import LoadingScreen from '~/src/components/elements/LoadingScreen'
import Section from '~/src/components/elements/Section'
import Text from '~/src/components/elements/Text'
import View from '~/src/components/elements/View'
import { styling } from '~/src/constants/styleSheets'
import { IconNameType, useTheme } from '~/src/constants/useTheme'
import useDelay from '~/src/hooks/utils/useDelay'
import { InsitutionInformation } from '~/src/types/Firebase/MasterData/InsitutionInformation'
import Dashboard from './(page)/_dashboard_page'
import useCollectionRealTime from '~/src/hooks/Firebase/useCollectionRealTime'
import WelcomeAdmin from './(page)/_welcome_admin'
import { Platform, Pressable, ScrollView, TouchableWithoutFeedback } from 'react-native'

type menuItem = { name: string; icon: string }
type subMenuitem = { [label: string]: { name: string; icon: string } }
type ListMenu = { [key: string]: menuItem | subMenuitem[] }

// List Sidebar Menu
const listMenuSidebar: ListMenu = {
    Dashboard: {
        name: 'dashboard',
        icon: 'view-dashboard' as IconNameType
    },
    MasterData: [
        {
            'Data akun': {
                icon: 'account-edit' as IconNameType,
                name: 'account'
            }
        },
        {
            'Data lembaga': {
                icon: 'bank' as IconNameType,
                name: 'institution'
            }
        }
    ]
}

const onPlatform = Platform.OS

const SidebarHeader = ({ InstitutionData }: { InstitutionData: InsitutionInformation }) => {
    const { themeWithTransparent } = useTheme()
    return (
        <View Style={['flexRow', 'p4']}>
            <Pressable
                onPress={() => {
                    router.navigate('/manage')
                }}
            >
                <View Style={['flexRow', 'gap2', 'itemsCenter', 'justifyCenter', 'roundedXl', 'p4', { backgroundColor: themeWithTransparent.primaryContainer }]}>
                    <Image source={{ uri: InstitutionData.logo }} />
                    <View Style={['flexColumn']}>
                        <Text variant="bodyMedium" Weight="fontBold" numberOfLines={1}>
                            {InstitutionData.name}
                        </Text>
                        <Text variant="labelSmall" numberOfLines={1}>
                            Admin
                        </Text>
                    </View>
                </View>
            </Pressable>
        </View>
    )
}

const SidebarMenu = () => {
    const ListMenus = Object.entries(listMenuSidebar)
    // show Activated Menu
    const { menu: menuParams } = useLocalSearchParams()
    return (
        <ScrollView showsVerticalScrollIndicator={onPlatform === 'android'}>
            {ListMenus.map(([key, value]) => {
                if (Array.isArray(value)) {
                    return (
                        <Drawer.Section title="Master Data" showDivider={false} key={key}>
                            {value.map((submenu) => {
                                const [label, menu] = Object.entries(submenu)[0]
                                return (
                                    <Drawer.Item
                                        key={label}
                                        active={menu.name === menuParams}
                                        style={styling('roundedXl')}
                                        label={label}
                                        onPress={() =>
                                            router.setParams({
                                                menu: menu.name
                                            })
                                        }
                                        icon={menu.icon}
                                    />
                                )
                            })}
                        </Drawer.Section>
                    )
                }

                return (
                    <Drawer.Section title="Halaman Utama" showDivider={false} key={key}>
                        <Drawer.Item
                            key={key}
                            style={styling('roundedXl')}
                            label={key}
                            active={value.name === menuParams}
                            onPress={() =>
                                router.setParams({
                                    menu: value.name
                                })
                            }
                            icon={value.icon}
                        />
                    </Drawer.Section>
                )
            })}
        </ScrollView>
    )
}

const Sidebar = ({ InstitutionData }: { InstitutionData: InsitutionInformation }) => {
    return (
        <View Style={['flexColumn']}>
            <SidebarHeader InstitutionData={InstitutionData} />
            <SidebarMenu />
        </View>
    )
}
const Content = ({ InstitutionData }: { InstitutionData: InsitutionInformation }) => {
    const { menu } = useLocalSearchParams()
    return (
        <View Style={['flexColumn', 'expand']}>
            {menu ? <Dashboard currentMenu={menu as string} /> : null}
            {!menu && <WelcomeAdmin InstitutionName={InstitutionData.name} />}
        </View>
    )
}

const index = () => {
    // fetch profile data
    const { datas, isLoading } = useCollectionRealTime({
        collectionPath: 'MasterData/Institution/Profile'
    })
    // Setup Loading
    const loadingView = useDelay(isLoading)
    return (
        <Section Style={['flexColumn', 'expand']}>
            {loadingView ? (
                <LoadingScreen children />
            ) : (
                <View Style={['flexRow', 'expand']}>
                    <Sidebar InstitutionData={datas as InsitutionInformation} />
                    <Content InstitutionData={datas as InsitutionInformation} />
                </View>
            )}
        </Section>
    )
}

export default index
