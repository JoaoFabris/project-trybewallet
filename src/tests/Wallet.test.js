import React from 'react';
import WalletForm from "../components/Header";
import Header from '../components/Header';
import Wallet from '../pages/Wallet';
import Table from '../components/Table';
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderWithRouterAndRedux } from "../helpers/renderWith";

describe('Testando o componente Wallet', () => {
  it('Verifica o header de todos os elementos', () => {
    renderWithRouterAndRedux(<Wallet />);

    const userEmail = screen.getByTestId('email-field');
    expect(userEmail).toBeInTheDocument();

    const totalField = screen.getByTestId('total-field');
    expect(totalField).toBeInTheDocument();

    const currencyField = screen.getByTestId('header-currency-field');
    expect(currencyField).toBeInTheDocument();
  });
  it('Teste se o componente Table é renderiado',() => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId('value-input');
    expect(inputValue).toBeInTheDocument();

    const descriptionInput = screen.getByTestId('description-input');
     expect(descriptionInput).toBeInTheDocument();

    const currencyInput = screen.getByTestId('currency-input');
    expect(currencyInput).toBeInTheDocument();

    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeInTheDocument();

    const tagInput = screen.getByTestId('tag-input');
    expect(tagInput).toBeInTheDocument();
  });
})