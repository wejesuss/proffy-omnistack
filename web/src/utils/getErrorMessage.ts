const errors = {
  'user not found': 'Usuário não encontrado',
  'incorrect password': 'Senha incorreta',
  'unexpected error, try again': 'Erro inesperado, tente novamente',
};

export function getErrorMessage(m: string): string {
  type Mapped = keyof typeof errors;

  return errors[m as Mapped] || m;
}
