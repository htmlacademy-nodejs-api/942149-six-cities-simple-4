import { CliCommandInterface } from '../core/cli-command/cli-command.interface';

type ParsedCommand = {
  [command: string]: string[]
}

export default class CliApp {
  private commands: {[commandName: string]: CliCommandInterface} = {};
  private defaultCommand = '--help';

  private parseCommand(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let command = '';

    return cliArguments.reduce((acc, item) => {
      if (item.startsWith('--')) {
        acc[item] = [];
        command = item;
      } else if (command && item) {
        acc[command].push(item);
      }

      return acc;
    }, parsedCommand);
  }

  public getCommand(commandName: string): CliCommandInterface {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.run(...commandArguments);
  }

  public registerCommand(commandsList: CliCommandInterface[]): void {
    commandsList.forEach((el) => {
      this.commands[el.name] = el;
    });
  }
}
