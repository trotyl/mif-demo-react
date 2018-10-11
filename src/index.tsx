import { Component, StateChanges } from '@mif/core'
import React from 'react'
import { render } from 'react-dom'
import { BasketComponent, BuyComponent } from './app'

export class BlueBasket extends Component<{}> {
  onCreate(): HTMLDivElement {
    const host = document.createElement('div')
    render(<BasketComponent />, host)
    return host
  }
}

export class BlueBuy extends Component<{ sku: string }> {
  component!: React.Component

  onCreate(): HTMLDivElement {
    class Wrapper extends React.Component<{}, { sku: string }> {
      constructor(props: any) {
        super(props)

        this.state = { sku: '' }
      }

      render() {
        return (
          <BuyComponent sku={this.state.sku}/>
        )
      }
    }

    const host = document.createElement('div')
    this.component = render(<Wrapper />, host) as Wrapper
  
    return host
  }

  onUpdate({ current }: StateChanges<{ sku: string }>): void {
    this.component.setState({ sku: current.sku })
  }
}

