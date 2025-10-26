// SettingsPage.tsx

import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { api } from '../../services/api';
import { IUser } from '../../interfaces';
import { Container, Form, Input, Button } from '../../styles/pages/Settings';

interface ISettingsFormData {
  name: string;
  email: string;
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}

const settingsFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  current_password: yup.string().required('Senha atual obrigatória'),
  new_password: yup
    .string()
    .min(6, 'A nova senha deve ter no mínimo 6 dígitos')
    .when('confirm_new_password', {
      is: (val: string) => val,
      then: yup.string().oneOf([yup.ref('new_password'), null], 'As senhas devem ser iguais'),
    })
    .when('current_password', {
      is: (val: string) => val,
      then: yup.string().notOneOf([yup.ref('current_password'), null], 'A nova senha não pode ser igual a senha atual'),
    }),
  confirm_new_password: yup
    .string()
    .min(6, 'A nova senha deve ter no mínimo 6 dígitos')
    .when('new_password', {
      is: (val: string) => val,
      then: yup.string().oneOf([yup.ref('new_password'), null], 'As senhas devem ser iguais'),
    })
    .when('current_password', {
      is: (val: string) => val,
      then: yup.string().notOneOf([yup.ref('current_password'), null], 'A nova senha não pode ser igual a senha atual'),
    }),
});

const SettingsPage: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, setValue, errors } = useForm<ISettingsFormData>({
    resolver: yupResolver(settingsFormSchema),
  });

  const onSubmit = async (data: ISettingsFormData) => {
    try {
      const user: IUser = await api.put('/users', data);
      setValue('name', user.name);
      setValue('email', user.email);
      alert('Perfil atualizado com sucesso!');
    } catch (err) {
      alert('Erro ao atualizar perfil, tente novamente.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input name="name" placeholder="Nome" ref={register} error={errors.name} />
        <Input name="email" placeholder="E-mail" ref={register} error={errors.email} />
        <Input name="current_password" placeholder="Senha atual" type="password" ref={register} error={errors.current_password} />
        <Input
          name="new_password"
          placeholder="Nova senha"
          type="password"
          ref={register}
          error={errors.new_password}
        />
        <Input
          name="confirm_new_password"
          placeholder="Confirmar nova senha"
          type="password"
          ref={register}
          error={errors.confirm_new_password}
        />
        <Button type="submit">Atualizar perfil</Button>
      </Form>
    </Container>
  );
};

export default SettingsPage;