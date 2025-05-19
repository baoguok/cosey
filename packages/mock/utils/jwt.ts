import CryptoJS from 'crypto-js';

/**
 * jwt 签名与验证
 */
export const jwt = {
  sign(
    payload: object,
    secret: string,
    options?: {
      expiresIn: number;
    },
  ) {
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const encodedHeader = CryptoJS.enc.Base64url.stringify(
      CryptoJS.enc.Utf8.parse(JSON.stringify(header)),
    );

    const encodedPayload = CryptoJS.enc.Base64url.stringify(
      CryptoJS.enc.Utf8.parse(
        JSON.stringify({
          ...payload,
          exp: Date.now() + (options?.expiresIn || 60 * 60 * 24) * 1000,
        }),
      ),
    );

    const beforeSign = encodedHeader + '.' + encodedPayload;

    const signature = CryptoJS.enc.Base64url.stringify(CryptoJS.HmacSHA256(beforeSign, secret));

    return beforeSign + '.' + signature;
  },

  verify(token: string, secret: string) {
    const [encodedHeader, encodedPayload, signature] = token.split('.');

    const beforeSign = encodedHeader + '.' + encodedPayload;

    const matchingSignature = CryptoJS.enc.Base64url.stringify(
      CryptoJS.HmacSHA256(beforeSign, secret),
    );

    if (signature !== matchingSignature) {
      return new Error('Invalid token');
    }

    const decodedPayload = CryptoJS.enc.Base64url.parse(encodedPayload);
    const payload = JSON.parse(decodedPayload.toString(CryptoJS.enc.Utf8));
    if (payload.exp <= Date.now()) {
      return new Error('Token expired');
    }

    return payload;
  },

  secret: '123456',
};
