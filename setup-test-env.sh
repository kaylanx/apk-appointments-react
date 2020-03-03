# Run with `source ./setup-test-env.sh`
export PHP_VERSION=$(ls /Applications/MAMP/bin/php/ | sort -n | tail -1)
export PATH=/Applications/MAMP/bin/php/${PHP_VERSION}/bin:/Applications/MAMP/Library/bin:$PATH
