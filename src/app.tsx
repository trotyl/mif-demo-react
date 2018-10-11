import moment from 'moment'
import React from 'react'
import { prices } from './data'

export class BasketComponent extends React.Component<{}, { count: number }> {

  constructor(props: any) {
    super(props)

    this.refresh = this.refresh.bind(this)

    this.state = { count: 0 }

    document.addEventListener('blue:basket:changed', this.refresh)

    console.log(`Moment date from blue: ${moment().format()}`)
  }

  refresh(): void {
    this.setState({ count: this.state.count + 1})
  }

  render() {
    const classname = this.state.count === 0 ? 'empty' : 'filled'
    return (
      <div className={classname}>basket: {this.state.count} item(s)</div>
    )
  }
}

export class BuyComponent extends React.Component<{ sku: string }> {
  constructor(props: any) {
    super(props)

    this.addToCart = this.addToCart.bind(this)
  }

  addToCart(): void {
    document.dispatchEvent(new CustomEvent('blue:basket:changed', { bubbles: true }))
  }

  render() {
    const price = prices[this.props.sku]
    return (
      <button type="button" onClick={this.addToCart}>buy for ${price}</button>
    )
  }
}
