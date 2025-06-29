// Troubleshooting utility for WebSocket connection issues
// Run this in browser console: window.troubleshootSupabase()

export const troubleshootSupabase = async () => {
  console.log('🔧 Supabase WebSocket Troubleshooting');
  console.log('=====================================');
  
  // Check environment variables
  console.log('\n1. Environment Variables:');
  const envVars = {
    VITE_SUPABASE_KEY: import.meta.env.VITE_SUPABASE_KEY,
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    NODE_ENV: import.meta.env.NODE_ENV,
  };
  
  Object.entries(envVars).forEach(([key, value]) => {
    if (value) {
      console.log(`✅ ${key}: ${key.includes('KEY') ? '***' + value.slice(-4) : value}`);
    } else {
      console.log(`❌ ${key}: Not defined`);
    }
  });

  // Check network connectivity
  console.log('\n2. Network Connectivity:');
  
  try {
    const response = await fetch('https://vpwzqxrkyawljqrrvolj.supabase.co/rest/v1/', {
      method: 'HEAD',
      headers: {
        'apikey': import.meta.env.VITE_SUPABASE_KEY || '',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_KEY || ''}`
      }
    });
    
    if (response.ok) {
      console.log('✅ REST API: Accessible');
    } else {
      console.log(`❌ REST API: Status ${response.status}`);
    }
  } catch (error) {
    console.log('❌ REST API: Connection failed -', error.message);
  }

  // Test WebSocket connection
  console.log('\n3. WebSocket Connection:');
  
  return new Promise((resolve) => {
    const ws = new WebSocket('wss://vpwzqxrkyawljqrrvolj.supabase.co/realtime/v1/websocket');
    
    const timeout = setTimeout(() => {
      console.log('❌ WebSocket: Connection timeout (5s)');
      ws.close();
      resolve();
    }, 5000);

    ws.onopen = () => {
      console.log('✅ WebSocket: Connection successful');
      clearTimeout(timeout);
      ws.close();
      resolve();
    };

    ws.onerror = (error) => {
      console.log('❌ WebSocket: Connection failed');
      console.log('   Error details:', error);
      clearTimeout(timeout);
      resolve();
    };

    ws.onclose = (event) => {
      console.log(`ℹ️  WebSocket: Connection closed (code: ${event.code})`);
      clearTimeout(timeout);
      resolve();
    };
  }).then(() => {
    // Provide solutions
    console.log('\n4. Common Solutions:');
    console.log('   • Check your internet connection');
    console.log('   • Verify VITE_SUPABASE_KEY is set correctly');
    console.log('   • Try refreshing the page');
    console.log('   • Check if Supabase service is down');
    console.log('   • Disable browser extensions that might block WebSocket');
    console.log('   • Try incognito/private browsing mode');
    console.log('   • Check firewall/proxy settings');
    
    console.log('\n5. Next Steps:');
    console.log('   • If environment variables are missing, create a .env file');
    console.log('   • If WebSocket fails but REST works, realtime features will be disabled');
    console.log('   • The app will still work without realtime updates');
  });
};

// Make it available globally for easy access
if (typeof window !== 'undefined') {
  window.troubleshootSupabase = troubleshootSupabase;
}

// Auto-run troubleshooting in development
if (import.meta.env.DEV) {
  setTimeout(() => {
    console.log('\n💡 Tip: Run window.troubleshootSupabase() in console for detailed diagnostics');
  }, 2000);
} 