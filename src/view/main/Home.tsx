import React from 'react'
import Section from '~/src/components/Section'
import TextInput from '~/src/components/TextInput'
import Button from '~/src/components/Button'
import { Image, ScrollView } from 'react-native'
import GtcIcon from '../../assets/images/gtc_icon_with_shadow.png'
import CardRectagle, {} from "../../components/Card-Rectagle"
const Home = () => {
  return (
    <Section expand>
      <ScrollView>
        <Section direction="column" expand padding="sm">
          <Section direction="row" gap="sm">
            <Image source={GtcIcon} className="w-12 h-12" />
            <TextInput placeholder="Cari materi ..." size="sm" expand inputMode="search" />
            <Button size="md" icon="search" color="primary" onPress={()=>console.log("Hallo")}/>
          </Section>
        </Section>
        <Section gap="md" padding="sm">
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
          <CardRectagle title='Kumal' description={`Lorem ipsum is a commonly used placeholder text in design and typesetting, serving as a filler to demonstrate the visual form of content without relying on meaningful content. It originates from a scrambled section of Cicero's work, "De finibus bonorum et malorum," written in 45 BC.`}/>
        </Section>
      </ScrollView>
    </Section>
  )
}

export default Home
