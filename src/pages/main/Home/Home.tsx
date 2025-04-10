import { FC, PropsWithChildren, ReactNode } from 'react'
import Section from '../../../components/Elements/Section'
import GtcIcon from '~/src/assets/images/gtc_icon.png'
import Text from '../../../components/Elements/Text'
import TextInput from '~/src/components/Elements/TextInput'
import { Layouts } from '~/src/types/otherTypes/Layout'
import Button from '~/src/components/Elements/Button'
import Image from '~/src/components/Elements/Image'
import Carousel from '~/src/components/Elements/Carousel'
import { ScrollView } from 'react-native'

const HomeLayouts: FC<Layouts> = ({ children, ...props }) => {
    return (
        <Section {...props}>
            <>{children}</>
        </Section>
    )
}

const SearchBar: FC = () => {
    return (
        <Section direction="row" customStyle="justify-between items-center py-1s" gap="sm">
            <Image imageSource={GtcIcon} size="sm" />
            <Section direction="column" customStyle="justify-center" expand>
                <TextInput placeholder="Cari modul untuk dipelajari..." size="sm" />
            </Section>
            <Button icon="magnify" color="primary" iconSize="xl" size="sm" />
        </Section>
    )
}

const InformationHeading: FC = () => {
    const imagesData = [
        { image: 'https://i.pinimg.com/736x/b3/55/1b/b3551b826084d6657298307341cc6234.jpg' },
        { image: 'https://i.pinimg.com/736x/99/65/25/9965255b5606bd6623f716272244e0be.jpg' }
    ]
    return (
        <>
            <Carousel images={imagesData} imagesSize="panorama" duration={5000} />
        </>
    )
}

const HorizontalScrollView: FC<PropsWithChildren<{ title: string; children: ReactNode }>> = ({ title, children }) => {
    return (
        <Section direction="column" gap="sm">
            <Section direction="row">
                <Text size="xl">{title}</Text>
            </Section>
            <ScrollView horizontal overScrollMode="never" showsHorizontalScrollIndicator={false} className="gap-2 scroll-m-0 rounded-xl">
                {children}
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
        <HorizontalScrollView title="Kategori Modul">
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
        </HorizontalScrollView>
    )
}

const PopularModule: FC = () => {
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
        <HorizontalScrollView title="Modul paling populer">
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
        </HorizontalScrollView>
    )
}

const StudentInformation: FC = () => {
    const imageStudent = [
        { image: 'https://i.pinimg.com/736x/a0/ba/66/a0ba669ef11d5309c112ef92c8a473b5.jpg', date: '09/12/2024' },
        { image: 'https://i.pinimg.com/736x/ce/dd/24/cedd24ecaaedfb3c9d9d25b85180aec1.jpg', date: '12/03/2025' },
        { image: 'https://i.pinimg.com/736x/12/0f/4a/120f4a332b252991874ff8dd2874aac8.jpg', date: '09/12/2023' },
        { image: 'https://i.pinimg.com/736x/17/1b/13/171b13293333402409b78f9621a3a84c.jpg', date: '25/02/2025' }
    ]
    return (
        <>
            <Carousel title="Informasi Pemberangkatan" images={imageStudent} imagesSize="panorama" duration={5000} />
        </>
    )
}

const Home = () => {
    return (
        <HomeLayouts customStyle="px-4 pt-2" direction="column" gap="sm" expand>
            <SearchBar />
            <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <HomeLayouts direction="column" gap="sm" expand>
                    <InformationHeading />
                    <CategoryOfModules />
                    <PopularModule />
                    <StudentInformation />
                </HomeLayouts>
            </ScrollView>
        </HomeLayouts>
    )
}

export default Home
