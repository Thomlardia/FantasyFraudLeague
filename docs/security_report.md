# Security Report and Sprint 1 Appeal

## Introduction

During the demo, for sprint 2, the client suggested we make rigorous security report  
to address the security concerns you mentioned.  
This report will now however serve two purposes.  
 - As a proof of sound security in sprint 2.  
 - As retroactive proof that our claims during the sprint 1 demo about the key being  
public, was true. Therefore this will also serve as the basis behind our appeal  
of our sprint 1 results.  

This report became especially necessary, when you discovered practically,  
localhost was set as an authorized domain with firebase authentication.  
Despite its misleadingly similar behaviour to an exposed API key,  
its implications are very different.  

To quote Shakespeare’s Sonnet 116:  
> If this be error and upon me proved,  
I never writ, nor no man ever created a secure Firebase app  

In this report I will go through:  
 - Implications of Exposed API key vs Semi-open Rule  
 - Recap of what happened during the demo  
 - Explanation of how firebase Architecture works  
 - Why you could created Accounts  

---

## Motivation before proof

A quick justification for construct of a Public facing API key.  

### A Slightly shorter Firebase quote

[from](https://firebase.google.com/support/guides/security-checklist#security-rules)  

> To store Firebase API keys (which are not secret), just embed them in code.  

### A Slightly longer Firebase quote

[from](https://firebase.google.com/docs/projects/api-keys)  

> General information about API keys and Firebase  
>> API keys for Firebase are different from typical API keys  
>> Unlike how API keys are typically used, API keys for Firebase services are not  
used to control access to backend resources; that can only be done with Firebase  
Security Rules (to control which end users can access resources) and Firebase App Check  
(to control which apps can access resources).  
Usually, you need to fastidiously guard API keys (for example, by using a vault  
service or setting the keys as environment variables); however, API keys for  
Firebase services are OK to include in code or checked-in config files.  

>>> Although API keys for Firebase services are safe to include in code, you  
should review and apply appropriate restrictions and limits to them.  

### The key theme (excuse the pun)

The key theme of firebase applications then become not to control the Firebase  
API key which is public facing by design but rather to control and secure the  
rules surrounding it.  

---

## Difference in implications

Why is an API key so bad and how does having a semi-open Rule compare to that?  

### Implications of an Exposed Private API Key

#### Scope of Security Issues
Affects all backend services.  
Where security flaws include full unauthorized access to each backend service affected.  

#### Structural Implications of Exposed API Key
The most foundation structure and flow of communication between frontend and  
backend was flawed.  
Security was completely neglected.  
Consequently a major restructuring of all communication between frontend and backend necessary.  

### Implications of Semi-open Rule
(Implications of including localhost as authorized domain for authentication service.)  

#### Scope of Security Issues
 - Allows "writing" to authentication database through firebase authentication  
from localhost.  
 - Allows "verification" from authentication database (securely), but again allows  
you to do this from localhost  

> (where security here just means there is no way for you to abuse this to get
anything more then an JWT token)

Scope does not include:
 - Reading passwords or usernames, etc of users that have been created.  
 - Public API has no open security rules for any other services ***(including  
firestore - explained later)***  

***Overall the main security risk is thus:***  
Malicious Users could pollute the auth system or attempt denial-of-service.  
That’s not catastrophic but is a real risk.  

#### Structural Implications of Exposed API Key
None

---

## Firebase and Public Facing API

### What happened during the demo?

During the demo William found the following, which he called an exposed API key.  

![teams_screenshot](assets/teams_screenshot.jpeg)

This is matches the API key that can be found in ./frontend/src/firebase.js  

```js
const firebaseConfig = {
  apiKey: "AIzaSyBOtM0OkuE-PPueNeidkfBHh0a-pYR255k",
  authDomain: "wario-fantasy-fraud-league.firebaseapp.com",
  projectId: "wario-fantasy-fraud-league",
  storageBucket: "wario-fantasy-fraud-league.firebasestorage.app",
  messagingSenderId: "916165333209",
  appId: "1:916165333209:web:2a04a590c3bed91cc32ec8"
};
```

It is the exact one I mentioned [here]() during the demo.  
It is a public facing API key, that firebase uses to identify your project.  
I will address [this](#-why-then-could-i-create-accounts-from-localhost?) in a second.  

You can shorty see that firebase classifies this as a public API key by looking  
at the following sources:  

Here follows firebase docs to [setup guide](https://firebase.google.com/docs/web/setup)  

---

>Open Quote  

***Step 2: Install the SDK and initialize Firebase***  
This page describes setup instructions for the Firebase JS SDK's modular API,  
which uses a JavaScript Module format.  
This workflow uses npm and requires module bundlers or JavaScript framework  
tooling because the modular API is optimized to work with module bundlers to  
eliminate unused code (tree-shaking) and decrease SDK size.  
> Note: Using the modular API is strongly recommended, especially for production apps.  
If you need support for calling the API in other ways, like window.firebase,  
see Upgrade from the namespaced API to the modular API or Alternative ways to add Firebase.  

Install Firebase using npm:  
```bash
npm install firebase
```

Initialize Firebase in your app and create a Firebase App object:
```js
import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase configuration
const firebaseConfig = {
  //...
};

const app = initializeApp(firebaseConfig);
```

A Firebase App is a container-like object that stores common configuration and  
shares authentication across Firebase services.  
After you initialize a Firebase App object in your code, you can add and start using Firebase services.  

If your app includes dynamic features based on server-side rendering (SSR),  
you'll need to take some additional steps to ensure that your configuration  
persists across server rendering and client rendering passes.  
In your server logic, implement the FirebaseServerApp interface to optimize your  
app's session management with service workers.  

> Close quote  

---

As a develop you are supposed to copy that from your project settings and put it  
in your firebase.js client side.

![project-settings](assets/project-settings.png)

---

## Why then could I create accounts from localhost?

Public facing API keys of a BaaS (like Firebase) have different rules associated with each backend  
service it provides.  
In our case we locked everything except google authentication, which we locked, for everything except for localhost.  
The reasoning behind this is simple, but will be explained later.  

To understand the above answer, you will have to shortly understand the Firebase and Google Cloud architecture.  

### Explanation of Firebase and Google Cloud Architecture

Firebase is owned by google. Naturally then Firebase uses Google Cloud as the infrastructure behind Firebase.  
In effect you end up having a Google Cloud backend - except firebase then steps in, as a intermediary between you and your  
google cloud backend - in effect they say, "don't worry about managing your own backend architecture, we'll do that for you".  
This is why they are often categorized as a BaaS (Backend as a Service).  

To manage your backend, internally Google then passes all needed SDK keys you would need when creating a backend, to themselfs at Firebase.  
They will use these keys to run your entire backend for you without you ever needing to handle API key security.  

Firebase then turns to it's users and says, "here you go, have this dummy API key".  
It is a firebase API key, representative of your specific project, it doesn't actually carry any access to your backend only serves to  
let Firebase know what projects backend this is from.  


If you don't like my explanation, feel free to read Firebase's explanation:  

 - [Here you can read about how firebase projects work](https://firebase.google.com/docs/projects/learn-more)
 - [Here you can read about how their API key structure works](https://firebase.google.com/docs/projects/api-keys)

### How does Firebase use your Admin SDK Keys

It serves as your backend by saying the only thing you have to do is use the  
Firebase SDK libraries, which is not equivalent to the Google SDK libraries for  
the same services.  
This allows them to then step in as a intermediary between you and all the  
**resources and services** you want to employ.  

And instead of employing those **resources and services** with normal backend  
libraries, you do so with firebase libaries. Designed to be simpler and allows  
them to handle all the normal complexity of backends like sdk keys security for  
you, but still according to rules you set up.  

![apikey-restrictions](assets/apikey-restrictions.png)

### Firebase rules

All the firebase resources and services you are going to use have different rules systems  
to manage security with regards to the Public facing API.  

Because your client side application sends a request to the Firebase, not  
directly to any of your Google SDK services.  
They give you a single Project API key that links to a specific firebase project.  

Before going into the specifics - it is critical that one understand the basic architecture of firebase.  
Firebase has a public facing API key (Proven later) and rules that govern how security is handled for that API Key.  
These are rules specific to each service used to name a few:  

 - Firebase Authentication - rules regarding authorized domains  
 - Firestore (database) - rules regarding database access  
 - Storage - rules regarding firebase storage (distinct from database, think pictures)  
 - Firebase Functions - HTTPS requests needs to be guarded by custom middleware  

The state of our security at the time of demo:  
 - Authentication - open to localhost and 127.0.0.1 for use of emulator - open to website domains.  
 - Firestore - closed on serverside  
 - Storage - closed on serverside  

### Why did we set 127.0.0.1 as an Authorized Domain

I specifically put 127.0.0.1 in as an authorized domain to enable us to use  
firebase authentication in the local emulators.  
My reasoning behind this at the time was quite Simply because making authentication  
work was one of the main things - therefore bypassing the JWT tokens locally  
while negating the need to leave a vulnerability in production, makes testing locally  
somewhat pointless, well that is pointless if one of the main things you implement we  
were developing in that sprint was frontend security.  
Which is why I decided to leave it open.  

## Understanding JWT tokens

The following sketch attempts to explain the difference between SessionID's and JWT's.

![JWT-and-SID](assets/JWT-and-SID.jpeg)

## AppCheck and Attestation services

In the previous demo, one of the things we referenced as a goal for the final sprint was AppCheck.  
I have put a rush on that.

Shortly it helps you make sure that your Firebase project isn’t accessed by scripts, bots, or tampered clients.

Note that App Check uses reCAPTCHA Enterprise score-based site keys, which make
it invisible to users. The reCAPTCHA Enterprise provider will not require users
to solve a challenge at any time.  

AppCheck rather issues a JWT token to ensure that the user is making request from  
your application.  
The purpose of Firebase Auth ID tokens prove a user’s identity (who is logged in)  
While the purpose of App Check tokens prove the calling app instance is legitimate.  

Together they answer “who is this user?” and “is this request coming from my approved app?”  

To further expand on this Auth tokens carry uid, email, custom claims, etc.
(data used for authorization decisions).
While App Check tokens have app-instance claims (app ID, exp)

Both are short lived (~1 hour), but Auth tokens can be refreshed with refresh tokens.
App Check tokens auto-refresh as long as the SDK keeps attesting the app.

## Logout Functionality and Persistance

During Demo one emphasis was also placed on our logout functionality not being  
implemented. Given it's emphasis I think it was thought to at the time by testers,  
a security issue especially relating to persistence and session management.  

We could never confirm this is what the testers meant, so I won't dwell on it.  

## Why not manage secrets

> To quote firebase security checklist:  
To store Firebase API keys (which are not secret), just embed them in code.  

### The extract

#### Cloud Functions safety

Never put sensitive information in environment variables  

Often in a self-hosted Node.js app, you use environment variables to contain  
sensitive information like private keys.  
Do not do this in Cloud Functions.  
Because Cloud Functions reuses environments between function invocations,  
sensitive information shouldn't be stored in the environment.  
	- To store Firebase API keys (which are not secret), just embed them in code.  
	- If you're using the Firebase Admin SDK in a Cloud Functions, you don't  
	need to explicitly provide service account credentials, because the Admin  
	SDK can automatically acquire them during initialization.  
	- If you're calling Google and Google Cloud APIs that require service account  
	credentials, the Google Auth library for Node.js can get these credentials  
	from the application default credentials, which are automatically populated  
	in Cloud Functions.  
	- To make private keys and credentials for non-Google services available to  
	your Cloud Functions, use Secret Manager.  

