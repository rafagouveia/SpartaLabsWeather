import styled from "styled-components/native"
import { TextStyleProps, textStyle, FontSizeProps, FontWeightProps, FontStyleProps, FontFamilyProps, fontSize, fontFamily, fontWeight } from "styled-system"




export const Text = styled.Text<TextStyleProps & Text & FontSizeProps & FontWeightProps & FontStyleProps & FontFamilyProps>`
    ${textStyle};
    ${fontSize};
    ${fontFamily};
    ${fontWeight};
`