import React from 'react';
import App from '../App';
import userEvent from "@testing-library/user-event";
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from "../helpers/renderWith";

describe('Testando o componente APP', () => {
  it('Verifica a página de login na tela', () => {
    renderWithRouterAndRedux(<App />);

    const loginInput = screen.getByPlaceholderText(/digite seu email/i);
    userEvent.type(loginInput, 'teste@teste.com.br');

    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    userEvent.type(passwordInput, '1234567');


    const button = screen.getByRole('button', {name: /Entrar/i });
    userEvent.click(button);
  })
    it('Verifica redireciona para carteira', () => {
    const {history} = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(/email-input/i);
    const inputPassword = screen.getByTestId(/password-input/i);
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');

    userEvent.click(screen.getByRole('button'))

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  })
  test('Testa se ao clicar no botão settings é redirecionado para rota /settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const Button = screen.getByRole('button', { name: 'Entrar' });
    const imputPassword = screen.getByPlaceholderText('Digite sua senha');
    const imputEmail = screen.getByPlaceholderText('Digite seu email');

    userEvent.type(imputPassword, 'root123');
    userEvent.type(imputEmail, 'algum@email.com');
    fireEvent.click(Button);
     expect(history.location.pathname).toBe('/carteira');
  }); 
});
