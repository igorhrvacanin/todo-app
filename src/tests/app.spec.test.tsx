import { render } from '@testing-library/react';
import App from '../App';

describe("TodoApp", () => {
    const app = render(<App />);
    
    it("renders app", () => {
      expect(app).not.toBeUndefined();
    });
})