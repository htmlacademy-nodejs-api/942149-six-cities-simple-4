import { CliCommandInterface } from './cli-command.interface';
import chalk from 'chalk';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public run(): void {
    console.log(chalk.green(`
      Программа для подготовки данных для REST API сервера.

      Пример: cli.js --<command> [--arguments]

      Команды:

      --version:                   # выводит номер версии
      --help:                      # печатает этот текст
      --import <path>:             # импортирует данные из TSV
      --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных`));
  }
}
