// Utility to check environment variables and provide debugging info
export const checkEnvironmentVariables = () => {
  const envVars = {
    VITE_SUPABASE_KEY: import.meta.env.VITE_SUPABASE_KEY,
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    NODE_ENV: import.meta.env.NODE_ENV,
    MODE: import.meta.env.MODE,
  };

  console.log('Environment Variables Check:');
  console.log('============================');
  
  Object.entries(envVars).forEach(([key, value]) => {
    if (value) {
      console.log(`✅ ${key}: ${key.includes('KEY') ? '***' + value.slice(-4) : value}`);
    } else {
      console.log(`❌ ${key}: Not defined`);
    }
  });

  // Check for common issues
  const issues = [];
  
  if (!envVars.VITE_SUPABASE_KEY) {
    issues.push('VITE_SUPABASE_KEY is missing');
  }
  
  if (!envVars.VITE_SUPABASE_URL) {
    issues.push('VITE_SUPABASE_URL is missing (though we have hardcoded URL)');
  }

  if (issues.length > 0) {
    console.warn('Environment Issues Found:');
    issues.forEach(issue => console.warn(`⚠️  ${issue}`));
    
    console.log('\nTo fix these issues:');
    console.log('1. Create a .env file in your project root');
    console.log('2. Add your Supabase credentials:');
    console.log('   VITE_SUPABASE_KEY=your_supabase_anon_key');
    console.log('   VITE_SUPABASE_URL=your_supabase_url');
    console.log('3. Restart your development server');
  } else {
    console.log('✅ All required environment variables are set');
  }

  return {
    hasIssues: issues.length > 0,
    issues,
    envVars
  };
};

// Check network connectivity to Supabase
export const checkSupabaseConnectivity = async () => {
  try {
    const response = await fetch('https://vpwzqxrkyawljqrrvolj.supabase.co/rest/v1/', {
      method: 'HEAD',
      headers: {
        'apikey': import.meta.env.VITE_SUPABASE_KEY || '',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_KEY || ''}`
      }
    });
    
    if (response.ok) {
      console.log('✅ Supabase REST API is accessible');
      return true;
    } else {
      console.warn('⚠️  Supabase REST API returned status:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Cannot connect to Supabase:', error.message);
    return false;
  }
};

// Check WebSocket connectivity
export const checkWebSocketConnectivity = () => {
  return new Promise((resolve) => {
    const ws = new WebSocket('wss://vpwzqxrkyawljqrrvolj.supabase.co/realtime/v1/websocket');
    
    const timeout = setTimeout(() => {
      console.warn('⚠️  WebSocket connection timeout');
      ws.close();
      resolve(false);
    }, 5000);

    ws.onopen = () => {
      console.log('✅ WebSocket connection successful');
      clearTimeout(timeout);
      ws.close();
      resolve(true);
    };

    ws.onerror = (error) => {
      console.error('❌ WebSocket connection failed:', error);
      clearTimeout(timeout);
      resolve(false);
    };

    ws.onclose = () => {
      clearTimeout(timeout);
    };
  });
}; 