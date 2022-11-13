import InputMask from 'react-input-mask'

const TimeInput = (props) => {
  const mask = '12:34'
  const formatChars = {
    '1': '[0-2]',
    '2': '[0-9]',
    '3': '[0-5]',
    '4': '[0-9]',
  }

  const beforeMaskedValueChange = (newState) => {
    const { value } = newState

    // Conditional mask for the 2nd digit base on the first digit
    if (value.startsWith('2'))
      formatChars['2'] = '[0-3]' // To block 24, 25, etc.
    else formatChars['2'] = '[0-9]' // To allow 05, 12, etc.
    return { value, selection: newState.selection }
  }
  return (
    <InputMask
      mask={mask}
      formatChars={formatChars}
      beforeMaskedValueChange={beforeMaskedValueChange}
      {...props}
    />
  )
}

export default TimeInput
