
# Setting up development environment

## Getting Started / Dependencies

The project uses ``Composer`` to manage dependencies.  The project itself doesn't use any third party libraries, however it does use dependencies pulled in from ``Composer`` for running the unit tests and for checking the wordpress coding standards. 

1. [Composer](https://getcomposer.org/)
2. in the ``wordpress-plugin`` folder run ``composer install``

## Unit tests
To run the tests.

First make sure you have mysql running...
Then run
```bash ./bin/install-wp-tests.sh wordpress_test root root localhost latest```

Then you should be able to run 

```./bin/run-tests.sh```

## Checking Wordpress Coding Standards

The project uses [PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) to detect violations of the wordpress coding standard 

To check plugin for wordpress coding standards violations / security issues:

```./bin/check-standards.sh```

To automatically correct violations:

```./bin/fix-standards.sh```

