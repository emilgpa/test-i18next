import styled from 'styled-components'

export const Circle = styled.div<{color?: string, width?: number, height?: number}>`
    border-radius: 50px;
    background-color: ${props => props.color ? `${props.color}` : `#00ffbb`};
    width: ${props => props.width ? `${props.width}px` : `50px`};
    height: ${props => props.height ? `${props.height}px` : `50px`};

    display: flex;
    align-items: center;
    justify-content: center;
    &:not(:last-child) {
        margin-right: 8px;
    }
`

export const Content = styled.div<{column?: boolean}>`
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    flex-direction: ${props => props.column ? `column` : "row"}
`