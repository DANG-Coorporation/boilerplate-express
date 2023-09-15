# Express TypeScript Sequelize Starter Project

This project is a demonstration of scripts and Sequelize CLI commands.

## Available Scripts

### Package.json Scripts

#### `npm run prebuild`

Removes the 'dist' directory before the build.

#### `npm run build`

Builds the TypeScript files using `tsc`.

#### `npm test`

Not specified.

#### `npm run prestart:dev`

Runs the build process before starting the development server.

#### `npm run start:dev`

Starts the development server using `concurrently`, watching TypeScript files with `tsc -w` and restarting the server with `nodemon`.

#### `npm start`

Starts the server using the compiled files in the 'dist' directory.

#### `npm run dev`

Same as `npm start`, starts the server using the compiled files in the 'dist' directory.

#### `npm run build-ts`

Builds the TypeScript files using `tsc`.

### Sequelize CLI Commands

The following are Sequelize CLI commands that can be used for database migrations, seeds, and project initialization.

```bash
sequelize-cli db:migrate                        # Run pending migrations
sequelize-cli db:migrate:schema:timestamps:add  # Update migration table to have timestamps
sequelize-cli db:migrate:status                 # List the status of all migrations
sequelize-cli db:migrate:undo                   # Reverts a migration
sequelize-cli db:migrate:undo:all               # Revert all migrations ran
sequelize-cli db:seed                           # Run specified seeder
sequelize-cli db:seed:undo                      # Deletes data from the database
sequelize-cli db:seed:all                       # Run every seeder
sequelize-cli db:seed:undo:all                  # Deletes data from the database
sequelize-cli db:create                         # Create database specified by configuration
sequelize-cli db:drop                           # Drop database specified by configuration
sequelize-cli init                              # Initializes project
sequelize-cli init:config                       # Initializes configuration
sequelize-cli init:migrations                   # Initializes migrations
sequelize-cli init:models                       # Initializes models
sequelize-cli init:seeders                      # Initializes seeders
sequelize-cli migration:generate                # Generates a new migration file
sequelize-cli migration:create                  # Generates a new migration file
sequelize-cli model:generate                    # Generates a model and its migration
sequelize-cli model:create                      # Generates a model and its migration
sequelize-cli seed:generate                     # Generates a new seed file
sequelize-cli seed:create                       # Generates a new seed file
