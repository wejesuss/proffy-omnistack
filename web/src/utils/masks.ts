import { FormEvent } from 'react';

export function phone(e: FormEvent<HTMLInputElement>): string {
  e.currentTarget.maxLength = 15;
  let value = e.currentTarget.value.replace(/\D/g, '');
  value = value.replace(/^(\(?\d{2}\)?)(\d{5})(\d{4})/g, '($1) $2-$3');
  e.currentTarget.value = value;
  return value;
}

export function currency(e: FormEvent<HTMLInputElement>): string {
  let value = e.currentTarget.value.replace(/\D/g, '');
  value = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(+value / 100);

  e.currentTarget.value = value;
  return value;
}
