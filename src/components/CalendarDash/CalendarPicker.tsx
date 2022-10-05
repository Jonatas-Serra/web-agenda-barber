import React from 'react'

import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import './day-picker.css'

import ptBR from 'date-fns/locale/pt-BR'

export default function CalendarPicker() {
  const [selected, setSelected] = React.useState<Date>()
  return (
    <DayPicker
      style={{
        backgroundColor: '#f8fafb',
        color: '#181A20',
        borderRadius: '0.5rem',
        padding: '2rem',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '360px',
        maxWidth: '320px',
      }}
      locale={ptBR}
      mode="single"
      selected={selected}
      onSelect={setSelected}
    />
  )
}
