const errors = {
  'user not found': 'Usuário não encontrado',
  'incorrect password': 'Senha incorreta',
  'please, send all values': 'Alguns dados faltando, tente novamente',
  'user without class yet': 'Usuário ainda não criou uma aula',
  'token malformatted': 'Token mal-formatado',
  'expected to receive token': 'Token esperado não foi enviado',
  'email is already in use': 'Este e-mail já está em uso',
  'Missing filters to search classes': 'Preencha todos os filtros',
  'Error on creating token, try again': 'Erro ao gerar token, tente novamente',
  'expired token': 'Token expirado',
  'invalid token': 'Token inválido',

  'unexpected error, try again': 'Erro inesperado, tente novamente',
};

export function getErrorMessage(m: string): string {
  type Mapped = keyof typeof errors;

  return errors[m as Mapped] || m;
}
