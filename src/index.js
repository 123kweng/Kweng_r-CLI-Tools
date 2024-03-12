#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const download = require('download-git-repo');

program
  .version('1.0.0')
  .description('CLI-инструменты для создания шаблонов проекта');

program
  .command('init <template> <project>')
  .description('Инициализация нового проекта с использованием шаблона')
  .action((template, project) => {
    console.log(`Инициализация проекта '${project}' с использованием шаблона '${template}'...`);
    
    // Определение URL-адреса репозитория GitHub для шаблонов (вы можете заменить его на свои собственные шаблоны)
    const templateRepo = `https://github.com/your-username/${template}-template`;

    // Создание директории проекта
    fs.mkdirSync(project);

    // Загрузка шаблона из репозитория GitHub
    download(templateRepo, project, { clone: true }, (err) => {
      if (err) {
        console.error('Ошибка загрузки шаблона:', err.message);
        process.exit(1);
      }

      console.log('Проект успешно инициализирован!');
    });
  });

program.parse(process.argv);
