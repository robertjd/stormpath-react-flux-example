Stormpath React+Flux Example
----------------------------

**PLEASE NOTE: WORK IN PROGRESS!**

This example application demonstrates how to integrate Stormpath into your React/Flux application.

## Getting started

Start the example application by executing the commands below.

```
$ npm install
$ npm start
```

## What this includes

### Routes

##### AuthenticatedRoute

Route that when used, requires that a session is established before continuing. Else redirects the user to the login route.

```
<AuthenticatedRoute path='/home/protected' component={RegisterPage} />
```

##### LogoutRoute

Route that when accessed, ends the user session.

```
<LogoutRoute path='/logout' />
```

##### LoginRoute

Route that marks a specific route as the place to go in order to login.

```
<LoginRoute path='/login' component={LoginPage} />
```

### Components

##### Authenticated

Renders any child components if a session has been established.

```
<Authenticated>
  You are authenticated!
</Authenticated>
```

##### NotAuthenticated

Renders any child components if no session has been established.

```
<Authenticated>
  You are not authenticated!
</Authenticated>
```

##### LoginForm

Renders a username and password login form.

```
<LoginForm proceedTo='/home' />
```

##### RegistrationForm

Renders a registration form.

```
<RegistrationForm proceedTo='/register/thank-you' />
```

##### ResetPasswordForm

Renders a password reset form.

```
<ResetPasswordForm />
```

##### LoginLink

Renders a link that points to the LoginRoute or `/login` if no LoginRoute is specified.

```
<LoginLink />
<LoginLink><img src="wrap-something-in-a-login-link.png" /></LoginLink>
```

##### LogoutLink

Renders a link that points to the LogoutRoute or `/logout` if no LogoutRoute is specified.

```
<LogoutLink />
<LogoutLink><img src="wrap-something-in-a-logout-link.png" /></LogoutLink>
```

##### User

Helper that renders the user profile data.

```
<User />
```

### Stores

##### UserStore

Responsible for maintaining the Stormpath session and access to the Stormpath API.

## TODO

- [x] Fix mount issue with Authenticated/NotAuthenticated components.
- [x] Fix issue with too many session requests.
- [/] Fix issue with dispatching Flux session action.
- [x] Change hard-coded values in Stormpath components so that they are configurable.
- [/] Add reset password component and data store.
- [/] Add verify email component and data store.
- [x] Add ability to tag a route as a LoginRoute, so that it is automatically picked up when you're not authenticated and trying to access a AuthenticatedRoute.
- [x] Refactor UserStore so that session and user API methods are separate.
- [x] Home page should have a link to login, and a link to register.
- [/] Add styling to pages.
- [ ] Add /profile page.
- [ ] Cleanup directory structure.
