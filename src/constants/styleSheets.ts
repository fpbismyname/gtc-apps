import { FlexStyle, ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

const FlexType = {
    expand: { flex: 1 },
    'expand-2': { flex: 2 },
    'expand-3': { flex: 3 },
    expand3: { flex: 1 },
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
    columnGap12: { columnGap: 48 },
    selfAuto: { alignSelf: 'auto' },
    selfStart: { alignSelf: 'flex-start' },
    selfCenter: { alignSelf: 'center' },
    selfEnd: { alignSelf: 'flex-end' },
    selfStretch: { alignSelf: 'stretch' },
    selfBaseline: { alignSelf: 'baseline' }
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
    'p0': { 'padding': 0 },
    'p1': { 'padding': 4 },
    'p2': { 'padding': 8 },
    'p3': { 'padding': 12 },
    'p4': { 'padding': 16 },
    'p5': { 'padding': 20 },
    'p6': { 'padding': 24 },
    'p7': { 'padding': 28 },
    'p8': { 'padding': 32 },
    'p9': { 'padding': 36 },
    'p10': { 'padding': 40 },
    'p11': { 'padding': 44 },
    'p12': { 'padding': 48 },

    'px1': { 'paddingHorizontal': 4 },
    'px2': { 'paddingHorizontal': 8 },
    'px3': { 'paddingHorizontal': 12 },
    'px4': { 'paddingHorizontal': 16 },
    'px5': { 'paddingHorizontal': 20 },
    'px6': { 'paddingHorizontal': 24 },
    'px7': { 'paddingHorizontal': 28 },
    'px8': { 'paddingHorizontal': 32 },
    'px9': { 'paddingHorizontal': 36 },
    'px10': { 'paddingHorizontal': 40 },
    'px11': { 'paddingHorizontal': 44 },
    'px12': { 'paddingHorizontal': 48 },

    'py1': { 'paddingVertical': 4 },
    'py2': { 'paddingVertical': 8 },
    'py3': { 'paddingVertical': 12 },
    'py4': { 'paddingVertical': 16 },
    'py5': { 'paddingVertical': 20 },
    'py6': { 'paddingVertical': 24 },
    'py7': { 'paddingVertical': 28 },
    'py8': { 'paddingVertical': 32 },
    'py9': { 'paddingVertical': 36 },
    'py10': { 'paddingVertical': 40 },
    'py11': { 'paddingVertical': 44 },
    'py12': { 'paddingVertical': 48 },

    'pt1': { 'paddingTop': 4 },
    'pt2': { 'paddingTop': 8 },
    'pt3': { 'paddingTop': 12 },
    'pt4': { 'paddingTop': 16 },
    'pt5': { 'paddingTop': 20 },
    'pt6': { 'paddingTop': 24 },
    'pt7': { 'paddingTop': 28 },
    'pt8': { 'paddingTop': 32 },
    'pt9': { 'paddingTop': 36 },
    'pt10': { 'paddingTop': 40 },
    'pt11': { 'paddingTop': 44 },
    'pt12': { 'paddingTop': 48 },

    'pb1': { 'paddingBottom': 4 },
    'pb2': { 'paddingBottom': 8 },
    'pb3': { 'paddingBottom': 12 },
    'pb4': { 'paddingBottom': 16 },
    'pb5': { 'paddingBottom': 20 },
    'pb6': { 'paddingBottom': 24 },
    'pb7': { 'paddingBottom': 28 },
    'pb8': { 'paddingBottom': 32 },
    'pb9': { 'paddingBottom': 36 },
    'pb10': { 'paddingBottom': 40 },
    'pb11': { 'paddingBottom': 44 },
    'pb12': { 'paddingBottom': 48 },

    'pl1': { 'paddingLeft': 4 },
    'pl2': { 'paddingLeft': 8 },
    'pl3': { 'paddingLeft': 12 },
    'pl4': { 'paddingLeft': 16 },
    'pl5': { 'paddingLeft': 20 },
    'pl6': { 'paddingLeft': 24 },
    'pl7': { 'paddingLeft': 28 },
    'pl8': { 'paddingLeft': 32 },
    'pl9': { 'paddingLeft': 36 },
    'pl10': { 'paddingLeft': 40 },
    'pl11': { 'paddingLeft': 44 },
    'pl12': { 'paddingLeft': 48 },

    'pr1': { 'paddingRight': 4 },
    'pr2': { 'paddingRight': 8 },
    'pr3': { 'paddingRight': 12 },
    'pr4': { 'paddingRight': 16 },
    'pr5': { 'paddingRight': 20 },
    'pr6': { 'paddingRight': 24 },
    'pr7': { 'paddingRight': 28 },
    'pr8': { 'paddingRight': 32 },
    'pr9': { 'paddingRight': 36 },
    'pr10': { 'paddingRight': 40 },
    'pr11': { 'paddingRight': 44 },
    'pr12': { 'paddingRight': 48 }
}
const MarginType = {
    'm0': { 'margin': 0 },
    'm1': { 'margin': 4 },
    'm2': { 'margin': 8 },
    'm3': { 'margin': 12 },
    'm4': { 'margin': 16 },
    'm5': { 'margin': 20 },
    'm6': { 'margin': 24 },
    'm7': { 'margin': 28 },
    'm8': { 'margin': 32 },
    'm9': { 'margin': 36 },
    'm10': { 'margin': 40 },
    'm11': { 'margin': 44 },
    'm12': { 'margin': 48 },

    'mx1': { 'marginHorizontal': 4 },
    'mx2': { 'marginHorizontal': 8 },
    'mx3': { 'marginHorizontal': 12 },
    'mx4': { 'marginHorizontal': 16 },
    'mx5': { 'marginHorizontal': 20 },
    'mx6': { 'marginHorizontal': 24 },
    'mx7': { 'marginHorizontal': 28 },
    'mx8': { 'marginHorizontal': 32 },
    'mx9': { 'marginHorizontal': 36 },
    'mx10': { 'marginHorizontal': 40 },
    'mx11': { 'marginHorizontal': 44 },
    'mx12': { 'marginHorizontal': 48 },

    'my1': { 'marginVertical': 4 },
    'my2': { 'marginVertical': 8 },
    'my3': { 'marginVertical': 12 },
    'my4': { 'marginVertical': 16 },
    'my5': { 'marginVertical': 20 },
    'my6': { 'marginVertical': 24 },
    'my7': { 'marginVertical': 28 },
    'my8': { 'marginVertical': 32 },
    'my9': { 'marginVertical': 36 },
    'my10': { 'marginVertical': 40 },
    'my11': { 'marginVertical': 44 },
    'my12': { 'marginVertical': 48 },

    'mt1': { 'marginTop': 4 },
    'mt2': { 'marginTop': 8 },
    'mt3': { 'marginTop': 12 },
    'mt4': { 'marginTop': 16 },
    'mt5': { 'marginTop': 20 },
    'mt6': { 'marginTop': 24 },
    'mt7': { 'marginTop': 28 },
    'mt8': { 'marginTop': 32 },
    'mt9': { 'marginTop': 36 },
    'mt10': { 'marginTop': 40 },
    'mt11': { 'marginTop': 44 },
    'mt12': { 'marginTop': 48 },

    'mb1': { 'marginBottom': 4 },
    'mb2': { 'marginBottom': 8 },
    'mb3': { 'marginBottom': 12 },
    'mb4': { 'marginBottom': 16 },
    'mb5': { 'marginBottom': 20 },
    'mb6': { 'marginBottom': 24 },
    'mb7': { 'marginBottom': 28 },
    'mb8': { 'marginBottom': 32 },
    'mb9': { 'marginBottom': 36 },
    'mb10': { 'marginBottom': 40 },
    'mb11': { 'marginBottom': 44 },
    'mb12': { 'marginBottom': 48 },

    'ml1': { 'marginLeft': 4 },
    'ml2': { 'marginLeft': 8 },
    'ml3': { 'marginLeft': 12 },
    'ml4': { 'marginLeft': 16 },
    'ml5': { 'marginLeft': 20 },
    'ml6': { 'marginLeft': 24 },
    'ml7': { 'marginLeft': 28 },
    'ml8': { 'marginLeft': 32 },
    'ml9': { 'marginLeft': 36 },
    'ml10': { 'marginLeft': 40 },
    'ml11': { 'marginLeft': 44 },
    'ml12': { 'marginLeft': 48 },

    'mr1': { 'marginRight': 4 },
    'mr2': { 'marginRight': 8 },
    'mr3': { 'marginRight': 12 },
    'mr4': { 'marginRight': 16 },
    'mr5': { 'marginRight': 20 },
    'mr6': { 'marginRight': 24 },
    'mr7': { 'marginRight': 28 },
    'mr8': { 'marginRight': 32 },
    'mr9': { 'marginRight': 36 },
    'mr10': { 'marginRight': 40 },
    'mr11': { 'marginRight': 44 },
    'mr12': { 'marginRight': 48 }
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
    h1: { height: 4 },
    h2: { height: 8 },
    h3: { height: 12 },
    h4: { height: 16 },
    h5: { height: 20 },
    h6: { height: 24 },
    h7: { height: 28 },
    h8: { height: 32 },
    h9: { height: 36 },
    h10: { height: 40 },
    h11: { height: 44 },
    h12: { height: 48 },
    h14: { height: 56 },
    h16: { height: 64 },
    h20: { height: 80 },
    h24: { height: 96 },
    h32: { height: 128 },
    h40: { height: 160 },
    h48: { height: 192 },
    h56: { height: 224 },
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
    w1: { width: 4 },
    w2: { width: 8 },
    w3: { width: 12 },
    w4: { width: 16 },
    w5: { width: 20 },
    w6: { width: 24 },
    w7: { width: 28 },
    w8: { width: 32 },
    w9: { width: 36 },
    w10: { width: 40 },
    w11: { width: 44 },
    w12: { width: 48 },
    w14: { width: 56 },
    w16: { width: 64 },
    w20: { width: 80 },
    w24: { width: 96 },
    w32: { width: 128 },
    w40: { width: 160 },
    w48: { width: 192 },
    w56: { width: 224 },
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
