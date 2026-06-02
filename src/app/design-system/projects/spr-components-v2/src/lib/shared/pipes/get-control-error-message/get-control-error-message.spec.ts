import { UNKNOWN_ERROR } from '../../constants/unknown-error.constant';
import { GetControlErrorMessagePipe } from './get-control-error-message.pipe';

describe('GetControlErrorMessagePipe', () => {
  let getControlErrorMessagePipe: GetControlErrorMessagePipe;

  beforeEach(() => {
    getControlErrorMessagePipe = new GetControlErrorMessagePipe();
  });

  describe('Model', () => {
    it('should return null if not control errors', () => {
      const MOCK_CONTROL_ERRORS = undefined;

      const result = getControlErrorMessagePipe.transform(MOCK_CONTROL_ERRORS, {});

      expect(result).toBe(null);
    });

    it('should return first founded error', () => {
      const MOCK_CONTROL_ERRORS = { required: true, maxLength: true };
      const MOCK_ERROR_MESSAGES = { maxLength: 'Max length', required: 'Required' };

      const result = getControlErrorMessagePipe.transform(MOCK_CONTROL_ERRORS, MOCK_ERROR_MESSAGES);

      expect(result).toBe(MOCK_ERROR_MESSAGES.required);
    });

    it('should return Unknown error', () => {
      const MOCK_CONTROL_ERRORS = { required: true, maxLength: true };
      const MOCK_ERROR_MESSAGES = {};

      const result = getControlErrorMessagePipe.transform(MOCK_CONTROL_ERRORS, MOCK_ERROR_MESSAGES);

      expect(result).toBe(UNKNOWN_ERROR);
    });

    it('should return error builded by callback', () => {
      const MOCK_CALLBACK = (number: number): string => `${number} invalid.`;
      const MOCK_INVALID_COUNT = 5;
      const MOCK_CONTROL_ERRORS = { count: MOCK_INVALID_COUNT };
      const MOCK_ERROR_MESSAGES = { count: MOCK_CALLBACK };

      const result = getControlErrorMessagePipe.transform(MOCK_CONTROL_ERRORS, MOCK_ERROR_MESSAGES);

      expect(result).toBe(MOCK_CALLBACK(MOCK_INVALID_COUNT));
    });
  });
});
