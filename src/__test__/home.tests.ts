import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Home', () => {
	it('renders a heading', () => {
		render(<Home />);

		const heading = screen.getByRole('heading', {
			name: /welcome to next\.js!/i,
		});

		expect(heading).toBeInTheDocument();
	});
});
