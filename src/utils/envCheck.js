// Utility to check environment variables and provide debugging info
export const checkEnvironmentVariables = () => {
  const envVars = {
    VITE_SUPABASE_KEY: import.meta.env.VITE_SUPABASE_KEY,
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    NODE_ENV: import.meta.env.NODE_ENV,
    MODE: import.meta.env.MODE,
  };

  // Check for common issues
  const issues = [];
  
  if (!envVars.VITE_SUPABASE_KEY) {
    issues.push('VITE_SUPABASE_KEY is missing');
  }
  
  if (!envVars.VITE_SUPABASE_URL) {
    issues.push('VITE_SUPABASE_URL is missing (though we have hardcoded URL)');
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
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// Check WebSocket connectivity
export const checkWebSocketConnectivity = () => {
  return new Promise((resolve) => {
    const ws = new WebSocket('wss://vpwzqxrkyawljqrrvolj.supabase.co/realtime/v1/websocket');
    
    const timeout = setTimeout(() => {
      ws.close();
      resolve(false);
    }, 5000);

    ws.onopen = () => {
      clearTimeout(timeout);
      ws.close();
      resolve(true);
    };

    ws.onerror = (error) => {
      clearTimeout(timeout);
      resolve(false);
    };

    ws.onclose = () => {
      clearTimeout(timeout);
    };
  });
}; 