/**
 * Script to automate Keycloak test realm and user creation using the Admin REST API.
 * Usage: node scripts/create_keycloak_user.js
 */

const axios = require('axios');
require('dotenv').config();

const KEYCLOAK_BASE_URL = process.env.KEYCLOAK_BASE_URL || 'http://localhost:8080';
const KEYCLOAK_ADMIN_USER = process.env.KEYCLOAK_ADMIN_USER || 'admin';
const KEYCLOAK_ADMIN_PASSWORD = process.env.KEYCLOAK_ADMIN_PASSWORD || 'admin';
const KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID || 'admin-cli';
const TEST_REALM = process.env.KEYCLOAK_TEST_REALM || 'test-realm';
const KEYCLOAK_TEST_USER_PASSWORD = process.env.KEYCLOAK_TEST_USER_PASSWORD || 'test-password';
const TEST_CLIENT_ID = process.env.TEST_CLIENT_ID || 'test-client';

/**
 * Get admin access token from Keycloak.
 * @returns {Promise<string>}
 */
const getAdminToken = async () => {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', KEYCLOAK_CLIENT_ID);
    params.append('username', KEYCLOAK_ADMIN_USER);
    params.append('password', KEYCLOAK_ADMIN_PASSWORD);

    const response = await axios.post(
        `${KEYCLOAK_BASE_URL}/realms/master/protocol/openid-connect/token`,
        params
    );
    return response.data.access_token;
};

/**
 * Create a new realm if it does not exist.
 * @param {string} token
 * @param {string} realmName
 */
const createRealmIfNotExists = async (token, realmName) => {
    try {
        await axios.get(
            `${KEYCLOAK_BASE_URL}/admin/realms/${realmName}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        console.log(`Realm '${realmName}' already exists.`);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            await axios.post(
                `${KEYCLOAK_BASE_URL}/admin/realms`,
                {
                    realm: realmName,
                    enabled: true
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(`Realm '${realmName}' created.`);
        } else {
            throw error;
        }
    }
};

/**
 * Create a new user in the specified realm.
 * @param {string} token
 * @param {string} realmName
 * @param {object} user
 */
const createUser = async (token, realmName, user) => {
    const response = await axios.post(
        `${KEYCLOAK_BASE_URL}/admin/realms/${realmName}/users`,
        user,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return response.status;
};

/**
 * Create a new client in the specified realm.
 * @param {string} token
 * @param {string} realmName
 * @param {object} client
 */
const createClient = async (token, realmName, client) => {
    const response = await axios.post(
        `${KEYCLOAK_BASE_URL}/admin/realms/${realmName}/clients`,
        client,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return response.status;
};

const main = async () => {
    try {
        const token = await getAdminToken();

        // Create test realm if it doesn't exist
        await createRealmIfNotExists(token, TEST_REALM);

        // Example client object
        const client = {
            clientId: TEST_CLIENT_ID,
            enabled: true,
            publicClient: true,
            redirectUris: ['http://localhost:3000/*']
        };

        await createClient(token, TEST_REALM, client);
        console.log(`Client 'test-client' created in realm '${TEST_REALM}'.`);

        // Example user object
        const user = {
            username: 'testuser',
            email: 'testuser@example.com',
            enabled: true,
            firstName: 'Test',
            lastName: 'User',
            credentials: [
                {
                    type: 'password',
                    value: process.env.KEYCLOAK_TEST_USER_PASSWORD || 'Password123!',
                    temporary: false
                }
            ]
        };

        const status = await createUser(token, TEST_REALM, user);
        if (status === 201) {
            console.log(`User created in realm '${TEST_REALM}' with status: ${status}`);
        } else {
            console.error(`Failed to create user in realm '${TEST_REALM}'. Status: ${status}`);
            throw new Error(`Unexpected response status: ${status}`);
        }
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
};

main();
