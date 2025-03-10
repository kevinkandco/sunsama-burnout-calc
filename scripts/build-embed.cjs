
const { execSync } = require('child_process');
const os = require('os');

try {
  // Use cross-platform approach to set the environment variable
  const command = os.platform() === 'win32' 
    ? 'set EMBED=true && vite build' 
    : 'EMBED=true vite build';
  
  console.log('Building embeddable version...');
  execSync(command, {
    stdio: 'inherit',
    env: { ...process.env, EMBED: 'true' },
    shell: true
  });
  
  console.log('Embeddable version built successfully! Files are in the dist directory.');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
