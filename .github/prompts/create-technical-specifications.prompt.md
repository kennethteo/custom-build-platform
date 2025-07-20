---
mode: 'agent'
description: 'Create a Technical Specifications for AI-optimized decision documentation.'
tools: ['changes', 'codebase', 'editFiles', 'extensions', 'fetch', 'githubRepo', 'openSimpleBrowser', 'problems', 'runTasks', 'search', 'searchResults', 'terminalLastCommand', 'terminalSelection', 'testFailure', 'usages', 'vscodeAPI']
---
# Create Technical Specifications

Create a Technical Specifications document for `${input:ProjectName}` using structured formatting optimized for AI consumption and human readability.

## Inputs
- **Project Name**: `${input:ProjectName}`
- **Version**: `${input:Version}`
- **Author**: `${input:Author}`
- **Date**: `${input:Date}`
- **LastUpdatedDate**: `${input:LastUpdatedDate}`
- **Reviewers**: `${input:Reviewers}`

## Input Validation
If any of the required inputs are not provided or cannot be determined from the conversation history, ask the user to provide the missing information before proceeding with ADR generation.
