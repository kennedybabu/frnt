
export default {


    oidc: {
        clientId: '0oapnucx3lue2zj305d7',
        issuer:'https://dev-74952938.okta.com',
        redirectUri: 'http://localhost:4200/login/callback',
        scopes: ['openid', 'profile', 'email'],
        // responseType: 'code',
        pkce: true,

    //     useInteractionCodeFlow: false,  // or remove this line entirely
    
    // // For local development only
    //     testing: {
    //     disableHttpsCheck: true
    //     }
    }
}
