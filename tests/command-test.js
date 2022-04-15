/**
 * Defines default behavior + tests to be executed for each command.
 *
 * @argument commandName string - The name of the command to test.
 * @argument runTestCallback function - The actual test for the command.
 */
export const commandTest = (commandName, runTestCallback) => {
  const command = require(`../commands/${commandName}`);

  describe(`${command.name} setup tests`, () => {
    test("should return a function", () => {
      expect(typeof command.execute).toBe("function");
    });

    test("Commands general properties should be defined", () => {
      expect(command.args).toBeDefined();
      expect(command.description).toBeDefined();
      expect(command.name).toBeDefined();
      expect(command.usage).toBeDefined();
      expect(command.execute).toBeDefined();
      expect(command.guildOnly).toBeDefined();
    });

    test("Run Test Callback", () => {
      runTestCallback(command);
    });
  });
};
