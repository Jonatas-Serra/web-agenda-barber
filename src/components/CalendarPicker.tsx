import React from 'react';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import ptBR from 'date-fns/locale/pt-BR';

export default function CalendarPicker() {
  const [selected, setSelected] = React.useState<Date>();

  let footer = <p>Selecione a data.</p>;
  if (selected) {
    footer = <p>Data selecionada {format(selected, 'PP')}.</p>;
  }
  return (
    <DayPicker
      style={{ backgroundColor: '#f8fafb', color: '#181A20', borderRadius: '0.5rem', padding: '2rem', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', maxHeight: '360px', maxWidth: '320px' }}
      locale={ptBR}
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={footer}
    />
  );
}