# Sample Architecturally Significant Requirements Workbook

An architecturally significant requirement, or ASR for short, is any requirement that strongly influences our choice of structures for the architecture.

There are four categories of architecturally significant requirements:

- **Constraints**: Unchangeable design decisions, usually given but sometimes chosen.

Example:

| **Constraint**                          | **Origin**       | **Type**   | **Context**                                                                 |
|------------------------------------------|------------------|------------|-----------------------------------------------------------------------------|
| Must be developed as open source software | Mayor van Damme  | Business   | The City has an Open Data policy and citizens must have access to source code. |

- **Quality Attributes**: Externally visible properties that characterize how the system operates in a specific context. We use a quality attribute scenario to provide an unambiguous description of a quality attribute.
  
  Quality attribute scenarios are described in six parts:

  - **Stimulus**: The stimulus is an event that requires the system to respond in some way. The stimulus kicks off the scenario and will vary depending on the type quality attribute. For example, for an availability scenario the stimulus might be a node becoming unreachable while the stimulus for a modifiability scenario might be a request for a change.

  - **Source**: The source is the person or system that initiations the stimulus. Examples include things like users, components of the system, and external systems.

  - **Artifact**: The artifact is the part of the system whose behavior is characterized in the scenario. The artifact can be the whole system or a specific component.

  - **Response**: The response is an externally visible action that takes place in the artifact as a result of the stimulus. Stimulus leads to response.

  - **Response**: Measure The response measure defines the success criteria for the scenario by defining what a successful response looks like. Response measures should be specific and measurable.

  - **Environment Context**: The environment context describes the operational circumstances surrounding the system during the scenario. The environment context should always be defined even if the context is normal. Abnormal contexts such as peak load or a specific failure condition, are also interesting to consider.

- **Influential Functional Requirements**: Features and functions that require special attention in the architecture.
- **Other Influencers**: Time, knowledge, experience, skills, office politics, your own geeky biases, and all the other stuff that sways your decision making.

## Outline

## Purpose and Scope

## Intended Audience

## Business Context

### Stakeholders

### Business Goals

## Architecturally Significant Requirements

### Technical Constraints

### Business Constraints

### Quality Attribute Requirements

    - Top Scenarios

### Influential Functional Requirements

    - Top Users or Personas
    - Use Cases or User Stories

## Appendix A: Glossary

## Appendix B: Quality Attributes Taxonomy
