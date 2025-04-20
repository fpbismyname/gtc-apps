import { FlexStyle, ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

const FlexType = {
    expand: { flex: 1 },
    flexRow: { flexDirection: 'row' },
    flexColumn: { flexDirection: 'column' },
    itemsStart: { alignItems: 'flex-start' },
    itemsCenter: { alignItems: 'center' },
    itemsEnd: { alignItems: 'flex-end' },
    flexWrap: { flexWrap: 'wrap' },
    noFlexWrap: { flexWrap: 'no-wrap' },
    flexWrapReverse: { flexWrap: 'wrap-reverse' },
    justifyStart: { justifyContent: 'flex-start' },
    justifyCenter: { justifyContent: 'center' },
    justifyEnd: { justifyContent: 'flex-end' },
    justifyBetween: { justifyContent: 'space-between' },
    justifyEvenly: { justifyContent: 'space-evenly' },
    justifyAround: { justifyContent: 'space-around' },
    gap0: { gap: 0 },
    gap1: { gap: 4 },
    gap2: { gap: 8 },
    gap3: { gap: 12 },
    gap4: { gap: 16 },
    gap5: { gap: 20 },
    gap6: { gap: 24 },
    gap8: { gap: 32 },
    gap10: { gap: 40 },
    gap12: { gap: 48 },

    rowGap0: { rowGap: 0 },
    rowGap1: { rowGap: 4 },
    rowGap2: { rowGap: 8 },
    rowGap3: { rowGap: 12 },
    rowGap4: { rowGap: 16 },
    rowGap5: { rowGap: 20 },
    rowGap6: { rowGap: 24 },
    rowGap8: { rowGap: 32 },
    rowGap10: { rowGap: 40 },
    rowGap12: { rowGap: 48 },

    columnGap0: { columnGap: 0 },
    columnGap1: { columnGap: 4 },
    columnGap2: { columnGap: 8 },
    columnGap3: { columnGap: 12 },
    columnGap4: { columnGap: 16 },
    columnGap5: { columnGap: 20 },
    columnGap6: { columnGap: 24 },
    columnGap8: { columnGap: 32 },
    columnGap10: { columnGap: 40 },
    columnGap12: { columnGap: 48 }
}
const PositionType = {
    absolute: { position: 'absolute' },
    relative: { position: 'relative' },

    top0: { top: 0 },
    top1: { top: 4 },
    top2: { top: 8 },
    top3: { top: 12 },
    top4: { top: 16 },
    top5: { top: 20 },

    bottom0: { bottom: 0 },
    bottom1: { bottom: 4 },
    bottom2: { bottom: 8 },
    bottom3: { bottom: 12 },
    bottom4: { bottom: 16 },
    bottom5: { bottom: 20 },

    left0: { left: 0 },
    left1: { left: 4 },
    left2: { left: 8 },
    left3: { left: 12 },
    left4: { left: 16 },
    left5: { left: 20 },

    right0: { right: 0 },
    right1: { right: 4 },
    right2: { right: 8 },
    right3: { right: 12 },
    right4: { right: 16 },
    right5: { right: 20 },

    inset0: { top: 0, right: 0, bottom: 0, left: 0 },
    insetHalf: { top: '50%', right: '50%', bottom: '50%', left: '50%' },

    topHalf: { top: '50%' },
    rightHalf: { right: '50%' },
    bottomHalf: { bottom: '50%' },
    leftHalf: { left: '50%' },

    topQuarter: { top: '25%' },
    leftQuarter: { left: '25%' },
    topThreeQuarter: { top: '75%' },
    leftThreeQuarter: { left: '75%' }
}
const PaddingType = {
    p0: { padding: 0 },
    p1: { padding: 4 },
    p2: { padding: 8 },
    p3: { padding: 12 },
    p4: { padding: 16 },
    p5: { padding: 20 },
    p6: { padding: 24 },
    p8: { padding: 32 },
    p10: { padding: 40 },
    p12: { padding: 48 },

    px1: { paddingHorizontal: 4 },
    px2: { paddingHorizontal: 8 },
    px3: { paddingHorizontal: 12 },
    px4: { paddingHorizontal: 16 },
    px5: { paddingHorizontal: 20 },
    py1: { paddingVertical: 4 },
    py2: { paddingVertical: 8 },
    py3: { paddingVertical: 12 },
    py4: { paddingVertical: 16 },
    py5: { paddingVertical: 20 }
}
const MarginType = {
    m0: { margin: 0 },
    m1: { margin: 4 },
    m2: { margin: 8 },
    m3: { margin: 12 },
    m4: { margin: 16 },
    m5: { margin: 20 },
    m6: { margin: 24 },
    m8: { margin: 32 },
    m10: { margin: 40 },

    mx1: { marginHorizontal: 4 },
    mx2: { marginHorizontal: 8 },
    mx3: { marginHorizontal: 12 },
    mx4: { marginHorizontal: 16 },
    my1: { marginVertical: 4 },
    my2: { marginVertical: 8 },
    my3: { marginVertical: 12 },
    my4: { marginVertical: 16 }
}
const RoundedType = {
    roundedNone: { borderRadius: 0 },
    roundedXs: { borderRadius: 2 },
    roundedSm: { borderRadius: 4 },
    rounded: { borderRadius: 8 },
    roundedMd: { borderRadius: 12 },
    roundedLg: { borderRadius: 16 },
    roundedXl: { borderRadius: 24 },
    roundedFull: { borderRadius: 9999 },
    border1: { borderWidth: 1 },
    border2: { borderWidth: 2 },
    border3: { borderWidth: 4 },
    border4: { borderWidth: 8 },
    border5: { borderWidth: 12 }
}
const HeightType = {
    hFull: { height: '100%' },
    hAuto: { height: 'auto' },
    hHalf: { height: '50%' },
    h25: { height: '25%' },
    h75: { height: '75%' },
    h0: { height: 0 },
    h10: { height: 40 },
    h12: { height: 48 },
    h16: { height: 64 },
    h20: { height: 80 },
    h24: { height: 96 },
    h32: { height: 128 },
    h48: { height: 192 },
    h64: { height: 256 },
    h80: { height: 320 },
    h96: { height: 384 }
}
const WidthType = {
    wAuto: { width: 'auto' },
    wFull: { width: '100%' },
    wHalf: { width: '50%' },
    w25: { width: '25%' },
    w75: { width: '75%' },

    w0: { width: 0 },
    w10: { width: 40 },
    w12: { width: 48 },
    w16: { width: 64 },
    w20: { width: 80 },
    w24: { width: 96 },
    w32: { width: 128 },
    w48: { width: 192 },
    w64: { width: 256 },
    w80: { width: 320 },
    w96: { width: 384 }
}
const TextType = {
    textLeft: { textAlign: 'left' },
    textCenter: { textAlign: 'center' },
    textRight: { textAlign: 'right' },

    textXs: { fontSize: 10 },
    textSm: { fontSize: 12 },
    textBase: { fontSize: 16 },
    textLg: { fontSize: 20 },
    textXl: { fontSize: 24 },
    text2xl: { fontSize: 30 },
    text3xl: { fontSize: 36 },
    text4xl: { fontSize: 48 },
    text5xl: { fontSize: 60 },
    text6xl: { fontSize: 72 }
}
const TextDecorationType = {
    underline: { textDecorationLine: 'underline' },
    lineThrough: { textDecorationLine: 'line-through' },
    noUnderline: { textDecorationLine: 'none' },

    italic: { fontStyle: 'italic' },
    notItalic: { fontStyle: 'normal' },

    capitalize: { textTransform: 'capitalize' },
    uppercase: { textTransform: 'uppercase' },
    lowercase: { textTransform: 'lowercase' },
    normalCase: { textTransform: 'none' }
}
const FontWeightType = {
    fontThin: { fontWeight: '100' },
    fontExtralight: { fontWeight: '200' },
    fontLight: { fontWeight: '300' },
    fontNormal: { fontWeight: '400' },
    fontMedium: { fontWeight: '500' },
    fontSemibold: { fontWeight: '600' },
    fontBold: { fontWeight: '700' },
    fontExtrabold: { fontWeight: '800' },
    fontBlack: { fontWeight: '900' }
}
const AspectRatioType = {
    // Aspek Rasio
    aspectSquare: { aspectRatio: 1 },
    aspectVideo: { aspectRatio: 16 / 9 },
    aspectPortrait: { aspectRatio: 3 / 4 }
}
const ZIndexType = {
    // Z index
    z1: { zIndex: 1 },
    z2: { zIndex: 2 },
    z3: { zIndex: 3 },
    z4: { zIndex: 4 },
    z5: { zIndex: 5 },
    '-z1': { zIndex: -1 },
    '-z2': { zIndex: -2 },
    '-z3': { zIndex: -3 },
    '-z4': { zIndex: -4 },
    '-z5': { zIndex: -5 }
}
const OpacityType = {
    opacity0: { opacity: 0 },
    opacity10: { opacity: 0.1 },
    opacity20: { opacity: 0.2 },
    opacity30: { opacity: 0.3 },
    opacity40: { opacity: 0.4 },
    opacity50: { opacity: 0.5 },
    opacity60: { opacity: 0.6 },
    opacity70: { opacity: 0.7 },
    opacity80: { opacity: 0.8 },
    opacity90: { opacity: 0.9 },
    opacity100: { opacity: 1 }
}

const mergeStyleSheet = (...styles: object[]) => {
    return Object.assign({}, ...styles)
}

const StyleSheets = mergeStyleSheet(
    FlexType,
    PositionType,
    PaddingType,
    MarginType,
    RoundedType,
    HeightType,
    WidthType,
    TextType,
    TextDecorationType,
    FontWeightType,
    AspectRatioType,
    ZIndexType,
    OpacityType
)

export type StylingType =
    | keyof typeof FlexType
    | keyof typeof FlexType
    | keyof typeof PositionType
    | keyof typeof PaddingType
    | keyof typeof MarginType
    | keyof typeof RoundedType
    | keyof typeof HeightType
    | keyof typeof WidthType
    | keyof typeof TextType
    | keyof typeof TextDecorationType
    | keyof typeof FontWeightType
    | keyof typeof AspectRatioType
    | keyof typeof ZIndexType
    | keyof typeof OpacityType
    | ViewStyle
    | TextStyle
    | ImageStyle
    | FlexStyle
    | LinkStyle
    | object

export type FlexType = keyof typeof FlexType
export type PositionType = keyof typeof PositionType
export type PaddingType = keyof typeof PaddingType
export type MarginType = keyof typeof MarginType
export type RoundedType = keyof typeof RoundedType
export type HeightType = keyof typeof HeightType
export type WidthType = keyof typeof WidthType
export type TextType = keyof typeof TextType
export type TextDecorationType = keyof typeof TextDecorationType
export type FontWeightType = keyof typeof FontWeightType
export type AspectRatioType = keyof typeof AspectRatioType
export type ZIndexType = keyof typeof ZIndexType
export type OpacityType = keyof typeof OpacityType

const styles = StyleSheet.create(StyleSheets)

const styling = (...styleNames: Partial<StylingType[]>) => {
    if (!styleNames) return null
    const stylesObject = styleNames.map((stylename) => {
        if (typeof stylename === 'undefined') return null
        if (typeof stylename === 'object') return stylename
        return styles[stylename]
    })
    return stylesObject
}

export { styling }
