export class InvalidCommandValidatorException extends Error {
  constructor() {
    super(
      `Invalid command validation exception. Define command validation using @CommandValidator() decorator`,
    );
  }
}
