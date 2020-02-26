import React, { Component } from 'react'
import { fakeApi } from 'mocks/mocks'
import { calculateTiket, rendomNumber } from 'helpers/loto'
import { FIRST_FIELDS, SECOND_FIELDS } from 'components/constans'
import LotoField from 'components/LotoField'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: {
        firstField: [],
        secondField: []
      },
      generate: {
        firstGeneratedField: [],
        secondGeneratedField: []
      },
      isTicketWon: undefined
    }
  }

  onSelectNumberFirst = number => {
    const { firstField, secondField } = this.state.selected
    const result = calculateTiket(number, firstField)

    this.setState({
      selected: {
        secondField: secondField,
        firstField: result
      }
    })
  }

  onSelectNumberSecond = number => {
    const { secondField, firstField } = this.state.selected
    const result = calculateTiket(number, secondField)

    this.setState({
      selected: {
        firstField: firstField,
        secondField: result
      }
    })
  }

  showResult = () => {
    const { firstField, secondField } = this.state.selected
    let tempFieldFirst = rendomNumber(19)
      .slice(0, 8)
      .filter(e => firstField.includes(e))
    let tempSecondFirst = rendomNumber(3)
      .slice(1)
      .filter(e => secondField.includes(e))
    const result = tempFieldFirst.length >= 3 && tempSecondFirst.length === 1

    this.setState({
      isTicketWon: result
    })

    fakeApi('/finch-test', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: {
        firstField,
        secondField,
        isTicketWon: result
      }
    })
      .then(res => console.log(res))
      .catch(e => {
        throw new Error('Выбранно не достаточно чисел.')
      })
  }

  rendomSelect = () => {
    this.setState({
      selected: {
        firstField: rendomNumber(19).slice(0, 8),
        secondField: rendomNumber(3).slice(1)
      }
    })
  }

  renderGame() {
    return (
      <>
        <LotoField
          title={'Билет 1'}
          subTitle={'Поле 1'}
          description={' отметьте 8 чисел.'}
          rendomSelect={this.rendomSelect}
          onSelectNumberFirst={this.onSelectNumberFirst}
          onSelectNumberSecond={this.onSelectNumberSecond}
          fields={FIRST_FIELDS}
          isSecond={false}
          {...this.state}
        />
        <LotoField
          subTitle={'Поле 2'}
          description={' отметьте 1 чисел.'}
          rendomSelect={this.rendomSelect}
          onSelectNumberFirst={this.onSelectNumberFirst}
          onSelectNumberSecond={this.onSelectNumberSecond}
          fields={SECOND_FIELDS}
          isSecond={true}
          showResult={this.showResult}
          {...this.state}
        />
      </>
    )
  }

  renderWinGame() {
    return <div className='loto_field'>Ого, Вы выиграли! Поздравляем! </div>
  }

  renderOverGame() {
    return <div className='loto_field'> К сожалению, Вы проиграли!</div>
  }

  render() {
    const { isTicketWon } = this.state
    if (isTicketWon === true) {
      return <div className='loto_field-container'> {this.renderWinGame()}</div>
    }

    if (isTicketWon === false) {
      return <div className='loto_field-container'> {this.renderOverGame()}</div>
    }

    return <div className='loto_field-container'>{this.renderGame()}</div>
  }
}
