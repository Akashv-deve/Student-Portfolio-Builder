import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

  // 👇 NEW: Check the URL for a GitHub code when the page loads
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    if (code) {
      handleGithubCallback(code);
    }
  }, [location]);

  const handleGithubCallback = async (code) => {
    setGithubLoading(true);
    setError('');

    // Clean up the URL instantly so the code disappears from the browser bar
    window.history.replaceState({}, document.title, '/auth');

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/github`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.user.email);
        navigate('/dashboard');
      } else {
        setError(data.message || 'GitHub Authentication failed.');
      }
    } catch (err) {
      setError('Network error during GitHub authentication.');
    } finally {
      setGithubLoading(false);
    }
  };

  const handleGithubLogin = () => {
    if (!GITHUB_CLIENT_ID) {
      setError('GitHub Client ID is missing from environment variables.');
      return;
    }
    // Redirect to GitHub's authorization page
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.user.email);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Authentication failed.');
      }
    } catch (err) {
      setError('Network error. Is your backend running?');
    } finally {
      setLoading(false);
    }
  };

  // ---------- shared design tokens (matches LandingPage / Dashboard) ----------
  const colors = {
    bg: '#0a0a0f',
    card: '#12121a',
    cardBorder: '#232330',
    inputBg: 'rgba(0, 0, 0, 0.3)',
    inputBorder: '#3f3f46',
    focusPurple: '#a855f7',
    textWhite: '#ffffff',
    textLabel: '#a1a1aa',
    textHelper: '#9ca3af',
    danger: '#ef4444',
  };

  const sans = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const gradient = 'linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)';

  const inputBaseStyle = {
    width: '100%',
    padding: '0.8rem 1rem',
    borderRadius: '10px',
    border: `1px solid ${colors.inputBorder}`,
    backgroundColor: colors.inputBg,
    color: colors.textWhite,
    fontFamily: sans,
    fontSize: '0.95rem',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
  };

  const applyFocusStyle = (e) => {
    e.target.style.borderColor = colors.focusPurple;
    e.target.style.boxShadow = '0 0 0 4px rgba(168, 85, 247, 0.18)';
    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.45)';
  };

  const removeFocusStyle = (e) => {
    e.target.style.borderColor = colors.inputBorder;
    e.target.style.boxShadow = 'none';
    e.target.style.backgroundColor = colors.inputBg;
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bg,
        fontFamily: sans,
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        padding: '5vw',
      }}
    >
      {/* glowing background orb */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(900px, 120vw)',
          height: 'min(900px, 120vw)',
          background:
            'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.1) 35%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 55% 55% at 50% 45%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 55% 55% at 50% 45%, black, transparent)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* auth card */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 'min(420px, 100%)',
          padding: 'clamp(1.75rem, 5vw, 2.75rem)',
          backgroundColor: colors.card,
          borderRadius: '20px',
          border: `1px solid ${colors.cardBorder}`,
          boxShadow: '0 30px 60px -20px rgba(0, 0, 0, 0.65)',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 2rem)',
              color: colors.textWhite,
              margin: '0 0 0.5rem 0',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p style={{ color: colors.textHelper, margin: 0, fontSize: '0.92rem', lineHeight: 1.5 }}>
            {isLogin
              ? 'Enter your credentials to access your portfolios.'
              : 'Sign up to start building your premium portfolio.'}
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              color: '#fca5a5',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              marginBottom: '1.5rem',
              fontSize: '0.88rem',
              textAlign: 'center',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              lineHeight: 1.5,
            }}
          >
            {error}
          </div>
        )}

        {/* GitHub Button */}
        <button
          onClick={handleGithubLogin}
          disabled={githubLoading || loading}
          style={{
            width: '100%',
            padding: '0.85rem',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            color: colors.textWhite,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: '999px',
            fontSize: '0.95rem',
            fontWeight: 700,
            fontFamily: sans,
            cursor: githubLoading || loading ? 'not-allowed' : 'pointer',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            opacity: githubLoading || loading ? 0.6 : 1,
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            if (!(githubLoading || loading)) {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.09)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            }
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
            e.currentTarget.style.borderColor = colors.cardBorder;
          }}
        >
          {githubLoading ? (
            'Connecting to GitHub...'
          ) : (
            <>
              <svg height="19" width="19" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              Continue with GitHub
            </>
          )}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <span style={{ flex: 1, height: '1px', backgroundColor: colors.cardBorder }} />
          <span style={{ color: colors.textHelper, fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>
            OR
          </span>
          <span style={{ flex: 1, height: '1px', backgroundColor: colors.cardBorder }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                color: colors.textLabel,
                fontSize: '0.82rem',
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={applyFocusStyle}
              onBlur={removeFocusStyle}
              style={inputBaseStyle}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                color: colors.textLabel,
                fontSize: '0.82rem',
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}
            >
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={applyFocusStyle}
              onBlur={removeFocusStyle}
              style={inputBaseStyle}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading || githubLoading}
            style={{
              marginTop: '0.5rem',
              width: '100%',
              padding: '0.9rem',
              background: gradient,
              color: '#ffffff',
              border: 'none',
              borderRadius: '999px',
              fontSize: '1rem',
              fontWeight: 700,
              fontFamily: sans,
              cursor: loading || githubLoading ? 'not-allowed' : 'pointer',
              opacity: loading || githubLoading ? 0.65 : 1,
              boxShadow: '0 12px 26px -10px rgba(168, 85, 247, 0.55)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
            }}
            onMouseOver={(e) => {
              if (!(loading || githubLoading)) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 18px 34px -10px rgba(168, 85, 247, 0.7)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 12px 26px -10px rgba(168, 85, 247, 0.55)';
            }}
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: colors.textHelper,
              fontSize: '0.88rem',
              cursor: 'pointer',
              fontFamily: sans,
              transition: 'color 0.2s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#c4b5fd')}
            onMouseOut={(e) => (e.currentTarget.style.color = colors.textHelper)}
          >
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <span style={{ color: '#c4b5fd', fontWeight: 700 }}>
              {isLogin ? 'Sign up' : 'Log in'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
