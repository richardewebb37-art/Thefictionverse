const forge = require('node-forge');
const fs = require('fs');
const path = require('path');

function generateKeystore(options) {
  const {
    keystorePath = './android.keystore',
    keystorePassword = 'changeit',
    keyAlias = 'mykey',
    keyPassword = 'changeit',
    validityDays = 10000,
    commonName = 'Fictionverse',
    country = 'US',
    organization = 'Fictionverse',
    organizationalUnit = 'Dev',
    locality = 'City',
    state = 'State'
  } = options;

  // Generate key pair
  const keys = forge.pki.rsa.generateKeyPair(2048);
  const cert = forge.pki.createCertificate();
  cert.publicKey = keys.publicKey;
  cert.serialNumber = (Math.floor(Math.random() * 100000)).toString();
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setDate(cert.validity.notBefore.getDate() + validityDays);

  const attrs = [
    { name: 'commonName', value: commonName },
    { name: 'countryName', value: country },
    { name: 'organizationName', value: organization },
    { name: 'organizationalUnitName', value: organizationalUnit },
    { name: 'localityName', value: locality },
    { name: 'stateOrProvinceName', value: state }
  ];

  cert.setSubject(attrs);
  cert.setIssuer(attrs);
  cert.sign(keys.privateKey, forge.md.sha256.create());

  // Create PKCS12 keystore
  const p12Asn1 = forge.pkcs12.toPkcs12Asn1(
    keys.privateKey,
    [cert],
    keystorePassword,
    { algorithm: '3des' }
  );

  const p12Der = forge.asn1.toDer(p12Asn1).getBytes();
  const buffer = Buffer.from(p12Der, 'binary');

  fs.writeFileSync(path.resolve(keystorePath), buffer);
  console.log(`✅ Keystore created at: ${keystorePath}`);
  console.log(`Alias: ${keyAlias}`);
  console.log(`Keystore Password: ${keystorePassword}`);
  console.log(`Key Password: ${keyPassword}`);
}

// Example usage:
generateKeystore({
  keystorePath: './android.keystore',
  keystorePassword: 'FictionverseKS123',
  keyAlias: 'fictionverse_key',
  keyPassword: 'FictionverseKey123'
});