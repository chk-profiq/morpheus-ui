//@flow

import React, { Component } from 'react'
import styled, { css } from 'styled-components/native'
import memoize from 'memoize-one'

import { turnIntoField, type FieldProps } from '@morpheus-ui/forms'
import Theme, { getTheme } from './ThemeProvider'

type Props = FieldProps & {
  title?: string,
  Icon?: any,
  HoverIcon?: any,
  submit?: boolean,
  variant?: string | Array<string>,
  theme: Object,
  disabled: boolean,
  onPress?: () => void,
}

type State = {
  isHover: boolean,
}
const Container = styled.View`
  align-items: center;
  flex-direction: row;
`
const Clicker = styled.TouchableWithoutFeedback``

const InnerContainer = styled.View`
  ${({ muitheme, isHover, disabled }) => css`
    transition: all 0.3s;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding: ${muitheme.padding}px;
    background-color: ${muitheme.backgroundColor};
    border-color: ${muitheme.borderColor};
    border-width: ${muitheme.borderWidth};
    border-radius: ${muitheme.borderRadius};
    ${(muitheme.iconPosition === 'top' || muitheme.iconPosition === 'bottom') &&
      `flex-direction: column;`} 
   ${muitheme.shadow &&
     ` shadow-color: #000;
       shadow-offset: {width: 0, height: 0};
       shadow-opacity: 0.1;
       shadow-radius: 8;
    `}

  ${isHover &&
    ` background-color: ${muitheme.backgroundHoverColor};
      border-color: ${muitheme.borderHoverColor};
      ${muitheme.hoverShadow &&
        ` shadow-color: #000;
          shadow-offset: {width: 0, height: 0};
          shadow-opacity: 0.1;
          shadow-radius: 8;
        `}
     `}

    ${disabled &&
      ` background-color: ${muitheme.backgroundDisabledColor};
      border-color: ${muitheme.borderDisabledColor};
      cursor: not-allowed;
     `}
  `}
`

const IconContainer = styled.View`
  ${({ muitheme, title, isHover, disabled }) =>
    css`
      transition: all 0.3s;
      align-items: center;
      justify-content: center;
      color: ${muitheme.iconColor};
      ${!!title &&
        muitheme.iconPosition === 'top' &&
        `margin-bottom: ${muitheme.iconMargin}px;`}
      ${!!title &&
        muitheme.iconPosition === 'right' &&
        `margin-left: ${muitheme.iconMargin}px;`}
      ${!!title &&
        muitheme.iconPosition === 'bottom' &&
        `margin-top: ${muitheme.iconMargin}px;`}
      ${!!title &&
        muitheme.iconPosition === 'left' &&
        `margin-right: ${muitheme.iconMargin}px;`}

       ${isHover && `color: ${muitheme.iconHoverColor};`}
       ${disabled && `color: ${muitheme.iconDisabledColor};`}
  `}
`

const Title = styled.Text`
  ${({ muitheme, isHover, disabled }) =>
    css`
      transition: all 0.3s;
      font-family: ${muitheme.fontFamily};
      font-size: ${muitheme.fontSize};
      font-weight: ${muitheme.fontWeight};
      color: ${muitheme.titleColor};
      ${isHover && `color: ${muitheme.titleHoverColor};`}

      ${disabled &&
        `color: ${muitheme.titleDisabledColor}; cursor: not-allowed;`}
    `}
`

export class Button extends Component<Props, State> {
  static contextType = Theme

  state = {
    isHover: false,
  }

  onMouseOver = () => {
    this.setState({
      isHover: true,
    })
  }

  onMouseLeave = () => {
    this.setState({
      isHover: false,
    })
  }

  onSubmit = () => {
    if (!this.props.disabled) {
      if (this.props.inForm && this.props.submit) {
        this.props.submitForm()
      }
      this.props.onPress && this.props.onPress()
    }
  }

  renderIcon(muitheme: Object) {
    const { Icon, HoverIcon, disabled } = this.props
    if (!Icon) return null

    const TheIcon = this.state.isHover && !disabled ? HoverIcon || Icon : Icon
    return (
      <IconContainer
        muitheme={muitheme}
        title={this.props.title}
        isHover={this.state.isHover}
        disabled={disabled}>
        <TheIcon width={muitheme.iconWidth} height={muitheme.iconHeight} />
      </IconContainer>
    )
  }

  getButtonTheme = memoize((props: Props, context: Object) =>
    getTheme('Button', props, context),
  )

  render() {
    const { title, disabled } = this.props
    const muitheme: Object = this.getButtonTheme(this.props, this.context)

    return (
      <Container>
        <Clicker disabled={disabled} onPress={this.onSubmit}>
          <InnerContainer
            {...this.props}
            onMouseOver={this.onMouseOver}
            onMouseLeave={this.onMouseLeave}
            muitheme={muitheme}
            disabled={disabled}
            isHover={this.state.isHover}>
            {(muitheme.iconPosition === 'left' ||
              muitheme.iconPosition === 'top') &&
              this.renderIcon(muitheme)}
            <Title
              isHover={this.state.isHover}
              muitheme={muitheme}
              disabled={disabled}>
              {title}
            </Title>
            {(muitheme.iconPosition === 'right' ||
              muitheme.iconPosition === 'bottom') &&
              this.renderIcon(muitheme)}
          </InnerContainer>
        </Clicker>
      </Container>
    )
  }
}

export default turnIntoField(Button)
