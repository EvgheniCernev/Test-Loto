import React from 'react'
import LotoInner from 'components/LotoInner'

const LotoField = ({ title, subTitle, description, ...props }) => {
  const { firstField, secondField } = props.selected

  const conditionSelected = number => {
    if (props.isSecond) {
      return secondField.length <= 0 ? props.onSelectNumberSecond(number) : () => {}
    } else {
      return firstField.length <= 7 ? props.onSelectNumberFirst(number) : () => {}
    }
  }
  return (
    <div className='loto_field'>
      <div className='loto_text-wrap'>
        <span className='loto_text'>
          <b>{title}</b>
          <br />
          <b>{subTitle}</b>
          {description}
        </span>
        {!props.isSecond && <img className='loto_magic-wand' alt='' onClick={props.rendomSelect} src='magic-wand.svg' />}
      </div>
      <div>
        {props.fields.map(number => (
          <LotoInner key={`${number}`} number={number} selectedNumber={props.isSecond ? secondField : firstField} onSelectNumber={conditionSelected} />
        ))}
        {props.isSecond && firstField.length >= 8 && secondField.length >= 1 ? (
          <button onClick={() => props.showResult()} className='loto_btn'>
            Показать результат
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default LotoField
