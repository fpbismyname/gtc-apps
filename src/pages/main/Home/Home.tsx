import { FC } from 'react'
import Section from '../../../components/Elements/Section'
import GtcIcon from '~/src/assets/images/gtc_icon.png'
import Text from '../../../components/Elements/Text'
import TextInput from '~/src/components/Elements/TextInput'
import { Layouts } from '~/src/types/otherTypes/Layout'
import Button from '~/src/components/Elements/Button'
import Image from '~/src/components/Elements/Image'
import { ScrollView } from 'react-native'

const HomeLayouts: FC<Layouts> = ({ children, padding, color = 'light', direction, gap, customStyle, expand = false }) => {
    return (
        <Section padding={padding} direction={direction} color={color} expand={expand} gap={gap} customStyle={customStyle}>
            <>{children}</>
        </Section>
    )
}
const SearchBar: FC = () => {
    return (
        <Section direction="row" customStyle="justify-between items-center" gap="sm">
            <Image imageSource={GtcIcon} size="sm" />
            <Section direction="column" customStyle="justify-center" expand>
                <TextInput placeholder="Cari modul untuk dipelajari..." size="sm" />
            </Section>
            <Button icon="book-search" color="primary" iconSize="xl" />
        </Section>
    )
}

const ListMostClickedModules: FC = () => {
    // Data dummy
    const randomNumber = () => Math.floor(Math.random() * (99 - 10) + 10)
    const items = [
        { module_name: 'Tata bahasa', module_thumbnail: `https://cdn-icons-png.flaticon.com/512/8716/87164${randomNumber()}.png` },
        { module_name: 'Membaca', module_thumbnail: `https://cdn-icons-png.flaticon.com/512/8716/87164${randomNumber()}.png` },
        { module_name: 'Pengucapan', module_thumbnail: `https://cdn-icons-png.flaticon.com/512/8716/87164${randomNumber()}.png` },
        { module_name: 'Pendengaran', module_thumbnail: `https://cdn-icons-png.flaticon.com/512/8716/87164${randomNumber()}.png` },
        { module_name: 'Tata Krama', module_thumbnail: `https://cdn-icons-png.flaticon.com/512/8716/87164${randomNumber()}.png` }
    ]
    return (
        <Section direction="column" gap="sm">
            <Section direction="row">
                <Text size="xl">Modul Terpopuler</Text>
            </Section>
            <ScrollView horizontal overScrollMode="never" showsHorizontalScrollIndicator={false} className="gap-2 scroll-m-0">
                <Section direction="row" gap="sm">
                    {items.map((data, index) => (
                        <Section key={index} direction="column" color="primary" padding="sm" customStyle="rounded-xl items-center">
                            <Image imageUri={data.module_thumbnail} size="sm" />
                            <Section direction="column">
                                <Text size="md" weight="bolder">
                                    {data.module_name}
                                </Text>
                            </Section>
                        </Section>
                    ))}
                </Section>
            </ScrollView>
        </Section>
    )
}

const CategoryOfModules: FC = () => {
    //Data Dummy
    const randomNumber = () => Math.floor(Math.random() * (99 - 10) + 10)
    const items = [
        { category_name: 'Tata bahasa', category_icon: `https://cdn-icons-png.flaticon.com/512/8716/87164${randomNumber()}.png` },
        { category_name: 'Membaca', category_icon: `https://cdn-icons-png.flaticon.com/512/8716/87164${randomNumber()}.png` },
        { category_name: 'Pengucapan', category_icon: `https://cdn-icons-png.flaticon.com/512/8716/87164${randomNumber()}.png` },
        { category_name: 'Pendengaran', category_icon: `https://cdn-icons-png.flaticon.com/512/8716/87164${randomNumber()}.png` },
        { category_name: 'Tata Krama', category_icon: `https://cdn-icons-png.flaticon.com/512/8716/87164${randomNumber()}.png` }
    ]
    return (
        <Section direction="column" gap="sm">
            <Section direction="row">
                <Text size="xl">Kategori Modul</Text>
            </Section>
            <ScrollView horizontal overScrollMode="never" showsHorizontalScrollIndicator={false} className="gap-2 scroll-m-0">
                <Section direction="row" gap="sm">
                    {items.map((data, index) => (
                        <Section key={index} direction="column" color="primary" padding="sm" customStyle="rounded-xl items-center">
                            <Image imageUri={data.category_icon} size="sm" />
                            <Section direction="column">
                                <Text size="md" weight="bolder">
                                    {data.category_name}
                                </Text>
                            </Section>
                        </Section>
                    ))}
                </Section>
            </ScrollView>
        </Section>
    )
}

const Home = () => {
    return (
        <HomeLayouts customStyle="px-4 pt-2" direction="column" gap="sm" expand>
            <SearchBar />
            <CategoryOfModules />
            <ListMostClickedModules />
        </HomeLayouts>
    )
}

export default Home
