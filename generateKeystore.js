/**
 * generateKeystore.js
 * 
 * Node.js script to generate Android signing keystore for EAS builds
 * Runs keytool non-interactively with all parameters pre-set
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Keystore Configuration
const KEYSTORE_CONFIG = {
  keystoreFile: 'thefictionverse-keystore.jks',
  alias: 'fictionverse-key',
  keystorePassword: 'ChangeMe123!',
  keyPassword: 'ChangeMe123!',
  validity: 10000, // days
  keyAlg: 'RSA',
  keySize: 2048,
  dname: 'CN=Eric Webb, OU=Dev, O=Fictionverse, L=City, ST=State, C=US'
};

// Output directory
const CREDENTIALS_DIR = path.join(__dirname, 'android', 'credentials');
const KEYSTORE_PATH = path.join(CREDENTIALS_DIR, KEYSTORE_CONFIG.keystoreFile);

function generateKeystore() {
  console.log('🔐 Android Keystore Generator for The Fictionverse');
  console.log('================================================\n');

  // Create credentials directory if it doesn't exist
  if (!fs.existsSync(CREDENTIALS_DIR)) {
    console.log(`📁 Creating credentials directory: ${CREDENTIALS_DIR}`);
    fs.mkdirSync(CREDENTIALS_DIR, { recursive: true });
  }

  // Check if keystore already exists
  if (fs.existsSync(KEYSTORE_PATH)) {
    console.log(`⚠️  Keystore already exists at: ${KEYSTORE_PATH}`);
    console.log('   Delete it manually if you want to regenerate.\n');
    return;
  }

  // Build keytool command
  const keytoolCommand = [
    'keytool',
    '-genkeypair',
    '-v',
    `-keystore "${KEYSTORE_PATH}"`,
    `-alias ${KEYSTORE_CONFIG.alias}`,
    `-keyalg ${KEYSTORE_CONFIG.keyAlg}`,
    `-keysize ${KEYSTORE_CONFIG.keySize}`,
    `-validity ${KEYSTORE_CONFIG.validity}`,
    `-storepass "${KEYSTORE_CONFIG.keystorePassword}"`,
    `-keypass "${KEYSTORE_CONFIG.keyPassword}"`,
    `-dname "${KEYSTORE_CONFIG.dname}"`
  ].join(' ');

  console.log('🔧 Generating keystore with the following parameters:');
  console.log(`   Keystore File: ${KEYSTORE_CONFIG.keystoreFile}`);
  console.log(`   Alias: ${KEYSTORE_CONFIG.alias}`);
  console.log(`   Algorithm: ${KEYSTORE_CONFIG.keyAlg}`);
  console.log(`   Key Size: ${KEYSTORE_CONFIG.keySize}`);
  console.log(`   Validity: ${KEYSTORE_CONFIG.validity} days`);
  console.log(`   DN: ${KEYSTORE_CONFIG.dname}\n`);

  try {
    console.log('⏳ Running keytool...\n');
    execSync(keytoolCommand, { stdio: 'inherit' });

    // Verify keystore was created
    if (fs.existsSync(KEYSTORE_PATH)) {
      console.log('\n✅ Keystore generated successfully!');
      console.log(`   Location: ${KEYSTORE_PATH}\n`);

      // Output credentials for EAS
      console.log('📋 Credentials for EAS Import:');
      console.log('================================');
      console.log(`   Keystore Path: ${KEYSTORE_PATH}`);
      console.log(`   Keystore Alias: ${KEYSTORE_CONFIG.alias}`);
      console.log(`   Keystore Password: ${KEYSTORE_CONFIG.keystorePassword}`);
      console.log(`   Key Password: ${KEYSTORE_CONFIG.keyPassword}`);
      console.log('');
      console.log('🚀 Next Step: Import to EAS with:');
      console.log('   eas credentials --platform android');
      console.log('');
    } else {
      console.error('❌ Keystore file was not created. Check keytool output above.');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error generating keystore:', error.message);
    process.exit(1);
  }
}

// Run the generator
generateKeystore();