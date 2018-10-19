// @flow

import React, { Component } from 'react'

import UIExplorer, {
  Description,
  DocItem,
  Section,
  storiesOf,
} from '../../../ui-explorer'

import NormalProgressBar from './examples/NormalProgressBar'
import LongerProgressBar from './examples/LongerProgressBar'

class ProgressBarScreen extends Component<{}> {
  render() {
    return (
      <UIExplorer title="ProgressBar" url="/components/ProgressBar.js">
        <Description>Displays a customizable progress bar</Description>
        <Section title="Props">
          <DocItem
            description="The default progress bar style."
            example={{
              render: () => <NormalProgressBar />,
            }}
          />
          <DocItem
            description="A longer progress bar."
            example={{
              render: () => <LongerProgressBar />,
            }}
          />
        </Section>
      </UIExplorer>
    )
  }
}

storiesOf('Components', module).add('ProgressBar', () => <ProgressBarScreen />)
