import React, { Component } from 'react'

export default class extends Component {
  static defaultProps = {
    number: 0
  }

  render() {
    const { number, selectedNumber, onSelectNumber } = this.props
    return (
      <div
        onClick={() => {
          onSelectNumber(number)
        }}
        className={`${selectedNumber.includes(number) ? 'loto_inner-number active' : 'loto_inner-number'}`}
      >
        {number}
      </div>
    )
  }
}
