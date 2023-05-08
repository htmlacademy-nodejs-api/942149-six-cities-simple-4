#!/usr/bin/env node

import CliApp from './app/cli.js';
import Help from './core/cli-command/help.command.js';
import Version from './core/cli-command/version.command.js';
import Import from './core/cli-command/import.command.js';

const cliManager = new CliApp();

cliManager.registerCommand([new Help(), new Version(), new Import()]);

cliManager.processCommand(process.argv);
