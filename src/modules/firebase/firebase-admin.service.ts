// firebase.service.ts
import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  constructor() {
    const serviceAccount = {
      "type": "service_account",
      "project_id": "yumhub-merchant",
      "private_key_id": "26b1b4282cc605e2385db88e3a285e48e7a30e32",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDD5Sl3dNroTvdL\n8ciXL6ysONzgwIbbiLT42WASM/O+Q2A5XPcyuSE+/4aNA8eJZvoHMhdyMPBZAdlD\n+zNjid20kbQLspDIKSc1kTmjs6zLfe/zEv5sk+VxL2520UDjRCSHkqpGUkkvY/vo\n1A8eqzGUAM4crgXuw+QkmyhPqKKSSAFwWQ3z6sry8wDnEu069NfdV/mDiRzXUWrK\nnTt3YRS3kAboELsPyN2UsQQ7yUSn2wAakpqbiZZSqcPQtAhkS2lfMwCGeXmLHfiN\nc/T46ebDRGydMKdXYAOyOaGe3L/CjMu1EPmKl+5fSiRXUym7ZUmaDVGxZ9b1Xuih\nmly7r1FXAgMBAAECggEAG4Q2EJSL0fPoTXT3UzKcKPjidc41YzhPC2F6sDPh+gjR\ncbKlpSyssdeyGQloiYa7JNrxa4CE/PZYhBxl+du6FmIdDe5AOLgnIiF1x5E2esME\nOyWg3V7iQhrX2RLIRY7N1B6oPQZ+nIyJLF7qh3P5RoEycoQzSyLzCf1NapsVHZeG\nki7d2C0oZGq9Vcsj12YVpOyKszrRnhUHj4G4RpwFl4fk7kK5AvPVykIaaMF8Y+An\nFE1+5AOB61AwYrhRvtTMNV7sG2X1YUNRLB9yZjV3kMEj9iMTjWF5b7EHhIjXjQuO\neElL8l0/07GFopJlHC8c6/X7Ym3B27uvY9st7z5UaQKBgQDzfH/U4ddnnvT6c54U\nzruJ2WT5ediLrtUpO/YkJ9iLRIX7uAK0oUfGjNodv74HCQCfhXq1t960KeWF+cvV\nGoLthredFEY11hpSln2BtUvrlp3zuG6kWKiidx5COkK342kqEQutQLgnt0E0hwJD\n72M1SveeYb7blF2ksd9U6YzZAwKBgQDN9oPp3peOtA8uUtBktDbKniwq0trESHT6\n5fcMQIk5/jpkAVYK8hwasIW1GYnJM8FB/TjOJV53Xln2zwR6dzeWtrMh05qb1jeh\nMndGTn5/mDIZgqpTvU8VL/OslZAxehszQxXM/3OvwK63Iu+Cn5KNnmrJRzFlO+bm\nKKrhHheUHQKBgBeHV1799+/Gd4vgMk12cL7waAaHlLpiyaxzY+S4iP9kPsJFVNWZ\npDL2l3k6dyV85DeGEYaP3xBv4AMjUWQlbLOBSir+s44uQ1rpufUXzN9WLatIjkCJ\nZLpWYnEp6hqU+iubfBJg56rG1aE6zqg78M1MkkMW1PepDaeFnLw62WZ7AoGAV0Nl\n+pWj0wN5FyBhSPmN6WUAw5gYtmcYoSED/f3t5lNPfAWQ5gxUWf6GeAd8+HFkJUhb\nZAQzNRIVvdtSQ2z1cXaxCNj1vacSZMrT/EbPk9HxEBvrfJVNx2VMscegk0Xv9lUr\nDHMDGejiXZeAsPBZEIWZKvRt+j1aBBQg6kZsqQUCgYEA3vswx7FbfZNuHorAvgKO\n5d8lumJjZN2MbxhpgE3mR0Ub7YtBp6X2Zs0rfDJQMxABzfuncVhX8tTqxxD3Ecw7\nQgVWyhhf7UsES8gBJANm8W1Z/kVhHyJYwJNtw6qBNLcl9MstDJjn4/QDMWExipBK\nXtjxtBxGoeX1rWO2PJGWHKY=\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-loh9u@yumhub-merchant.iam.gserviceaccount.com",
      "client_id": "104547865776449565805",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-loh9u%40yumhub-merchant.iam.gserviceaccount.com",
      "universe_domain": "googleapis.com"
    }
    if (!serviceAccount) {
      throw new Error('Firebase service account key is not defined.');
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }

  // Function to send a message
  async sendNotification(token: string, payload: admin.messaging.MessagingPayload) {
    return admin.messaging().sendToDevice(token, payload);
  }
}
