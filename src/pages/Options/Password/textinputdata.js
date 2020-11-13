export const ifHasPassword = [
  { key: 'current', label: 'Senha atual', error: 'Senha incorreta' },
  { key: 'new', label: 'Nova senha', help: 'A senha deve conter números e letras, no mínimo 8 caracteres e no máximo 20.' },
  { key: 'repeat', label: 'Repita a nova senha', error: 'As senhas não conferem' },
];

export const ifHasntPassword = [
  { key: 'new', label: 'Nova senha', help: 'A senha deve conter números e letras, no mínimo 8 caracteres e no máximo 20.' },
  { key: 'repeat', label: 'Repita a senha', error: 'As senhas não conferem' },
];
