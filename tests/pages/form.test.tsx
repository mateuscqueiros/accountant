import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import userEvent from '@testing-library/user-event';
import AddBill from '@/components/Layout/Components/AddBill';

const setup = () => {
    const utils = render(
        <Provider store={store}>
            <AddBill />
        </Provider>
    )
    return {
        ...utils,
    }
}

describe('Testes do formulário', () => {

    beforeEach(() => { });

    afterEach(() => {
        const user = userEvent.setup();
        if (screen.getByTestId("open-modal-form")) {
            user.click(screen.getByTestId("open-modal-form"));
        }

    });

    it('Abre o modal', async () => {
        setup()

        const user = userEvent.setup();
        await user.click(screen.getByTestId("open-modal-form"));

        await expect(screen.queryByText("Criar item")).toBeVisible();

    });

    it('Preenche nome e valor e salva', async () => {
        setup()

        const user = userEvent.setup();
        await user.click(screen.getByTestId("open-modal-form"));

        expect(screen.queryByText("Criar item")).toBeVisible();

        await fireEvent.change(screen.getByTestId("input-name"), { target: { value: "Mateus Queirós" } });

        await fireEvent.change(screen.getByTestId("input-value"), { target: { value: 123 } });

        await user.click(screen.getByTestId("button-submit"));

        expect(screen.queryByText("Criar item")).not.toBeVisible();

    });

});