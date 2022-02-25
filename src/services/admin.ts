import * as firebaseAdmin from 'firebase-admin';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.PVK_private_key,
      clientEmail: process.env.PVK_client_email,
      projectId: process.env.PVK_project_id,
    }),
    databaseURL: 'https://note-me-e70ba.firebaseio.com',
  });
}

export { firebaseAdmin };
