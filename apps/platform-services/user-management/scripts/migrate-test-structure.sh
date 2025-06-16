#!/bin/bash

# migrate-test-structure.sh
# Script to align testing directory structure with src/ directory

echo "🔄 Migrating test structure to align with src/ directory..."

PROJECT_ROOT="/Users/kennethteo/dev/projects/custom-build-platform/apps/platform-services/user-management"
cd "$PROJECT_ROOT"

# Create aligned test directory structure
echo "📁 Creating aligned test directory structure..."

# Create main test directories
mkdir -p tests/{setup,fixtures,helpers}

# Create unit test directories that mirror src/ structure
mkdir -p tests/unit/{config,constants,controllers,middleware,models,repositories,routes,services,types,utils,validation}

# Create DTO test subdirectories
mkdir -p tests/unit/dto/{auth,user,role,common}

# Create integration and e2e test directories
mkdir -p tests/{integration,e2e}

# Reorganize testing/ directory for better structure
echo "🗂️  Reorganizing testing/ directory..."

# Create organized testing subdirectories
mkdir -p testing/{api,postman,scripts,data,docs}

# Move existing files to appropriate locations if they exist
if [ -f "testing/api.test.js" ]; then
    mv testing/api.test.js testing/api/
    echo "✅ Moved api.test.js to testing/api/"
fi

if [ -f "testing/postman-collection.json" ]; then
    mv testing/postman-collection.json testing/postman/
    echo "✅ Moved postman-collection.json to testing/postman/"
fi

# Move shell scripts to scripts directory
for script in testing/*.sh; do
    if [ -f "$script" ]; then
        mv "$script" testing/scripts/
        echo "✅ Moved $(basename "$script") to testing/scripts/"
    fi
done

# Move documentation files
if [ -f "testing/MANUAL_TESTING_GUIDE.md" ]; then
    mv testing/MANUAL_TESTING_GUIDE.md testing/docs/
    echo "✅ Moved MANUAL_TESTING_GUIDE.md to testing/docs/"
fi

if [ -f "testing/README.md" ]; then
    mv testing/README.md testing/docs/
    echo "✅ Moved README.md to testing/docs/"
fi

# Move setup files
for setup_file in testing/*.js; do
    if [ -f "$setup_file" ] && [[ "$setup_file" == *"setup"* || "$setup_file" == *"env"* ]]; then
        mv "$setup_file" tests/setup/
        echo "✅ Moved $(basename "$setup_file") to tests/setup/"
    fi
done

echo ""
echo "📋 New directory structure created:"
echo ""
echo "tests/"
echo "├── setup/              # Test configuration"
echo "├── fixtures/           # Test data"
echo "├── helpers/            # Test utilities"
echo "├── unit/              # Unit tests (mirrors src/)"
echo "│   ├── config/"
echo "│   ├── constants/"
echo "│   ├── controllers/"
echo "│   ├── dto/"
echo "│   │   ├── auth/"
echo "│   │   ├── user/"
echo "│   │   ├── role/"
echo "│   │   └── common/"
echo "│   ├── middleware/"
echo "│   ├── models/"
echo "│   ├── repositories/"
echo "│   ├── routes/"
echo "│   ├── services/"
echo "│   ├── types/"
echo "│   ├── utils/"
echo "│   └── validation/"
echo "├── integration/       # Integration tests"
echo "└── e2e/              # End-to-end tests"
echo ""
echo "testing/"
echo "├── api/              # API integration tests"
echo "├── postman/          # Postman collections"
echo "├── scripts/          # Testing scripts"
echo "├── data/             # Test data files"
echo "└── docs/             # Testing documentation"
echo ""
echo "✅ Test structure migration complete!"
echo ""
echo "📝 Next steps:"
echo "1. Create Jest configuration file"
echo "2. Generate test files for each source module"
echo "3. Update package.json test scripts"
echo "4. Write test setup files"
echo ""
echo "Run './scripts/generate-test-files.sh' to create test file templates"
