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

##### Login

Renders a username and password login form.

```
<Login proceedTo='/home' />
```

##### Register

Renders a registration form.

```
<Register proceedTo='/register/thank-you' />
```

##### ResetPassword

Renders a password reset form.

```
<ResetPassword />
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

- [ ] Fix mount issue with Authenticated/NotAuthenticated components.
- [ ] Fix issue with too many session requests.
- [ ] Fix issue with dispatching Flux session action.
- [ ] Change hard-coded values in Stormpath components so that they are configurable.
- [ ] Add reset password component and data store.
- [ ] Add verify email component and data store.
- [ ] Add ability to tag a route as a LoginRoute, so that it is automatically picked up when you're not authenticated and trying to access a AuthenticatedRoute.
- [ ] Refactor UserStore so that session and user API methods are separate.
