
import styled from "styled-components/native"
import {
    background, layout,
    flexbox, FlexboxProps,
    LayoutProps, space, SpaceProps, backgroundColor,
    BackgroundColorProps, boxShadow, BoxShadowProps,
    position, PositionProps, border, BorderProps,
} from "styled-system"





const MView = styled.View<LayoutProps & FlexboxProps & SpaceProps & BackgroundColorProps & BoxShadowProps & PositionProps & BorderProps>`
    ${space};
    ${layout};
    ${flexbox};
    ${backgroundColor};
    ${boxShadow};
    ${position};
    ${border};
`

export {MView}