#!/usr/bin/env node

import 'reflect-metadata';
import CliApp from './app/cli.js';
import Help from './core/cli-command/help.command.js';
import Version from './core/cli-command/version.command.js';
import Import from './core/cli-command/import.command.js';
import Generator from './core/cli-command/generate-command.js';

const cliManager = new CliApp();

cliManager.registerCommand([new Help(), new Version(), new Import(), new Generator()]);

cliManager.processCommand(process.argv);
