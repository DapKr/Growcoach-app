import React, { useState } from 'react';

export default function AuthModal({ open, onClose, mode = 'signup' }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  if (!open) return null;

  const isSignup = mode === 'signup';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      // TODO: handle sign up logic
      console.log('Sign up submitted:', form);
    } else {
      // TODO: handle login logic
      console.log('Login submitted:', form);
    }
    onClose && onClose();
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-box">
        <h2 className="auth-modal-title">
          {isSignup ? 'הצטרפות ל־GrowCoach' : 'התחברות ל־GrowCoach'}
        </h2>
        <div className="auth-modal-subtitle">
          {isSignup ? (
            <>
              הרשמה, והצטרפות למאגר מדריכי ההורים.
              <br />
              הרשמו, ותחשפו להורים שמחפשים את המדריך המדויק עבורם. הורים מגיעים
              אלינו עם צורך ברור – מחפשים את החיבור.
            </>
          ) : (
            <>התחברו עם שם משתמש וסיסמה כדי להמשיך.</>
          )}
        </div>
        <form className="auth-modal-form" onSubmit={handleSubmit}>
          <input
            className="auth-modal-input"
            name="username"
            type="text"
            placeholder="שם משתמש"
            value={form.username}
            onChange={handleChange}
            required
          />
          {isSignup && (
            <input
              className="auth-modal-input"
              name="email"
              type="email"
              placeholder="אימייל"
              value={form.email}
              onChange={handleChange}
              required
            />
          )}
          <input
            className="auth-modal-input"
            name="password"
            type="password"
            placeholder="סיסמה"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button className="auth-modal-cta" type="submit">
            {isSignup ? 'הרשמה' : 'התחברות'}
          </button>
          <button className="auth-modal-cancel" type="button" onClick={onClose}>
            ביטול
          </button>
        </form>
      </div>
      <style>{`
        .auth-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.25);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .auth-modal-box {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 24px rgba(0,0,0,0.18);
          padding: 32px 32px 24px 32px;
          max-width: 400px;
          width: 100%;
          text-align: center;
        }
        .auth-modal-title {
          font-size: 1.4rem;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .auth-modal-subtitle {
          font-size: 1rem;
          color: #444;
          margin-bottom: 24px;
          line-height: 1.5;
        }
        .auth-modal-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .auth-modal-input {
          height: 44px;
          border: 1px solid #d6d6e7;
          border-radius: 8px;
          padding: 0 12px;
          font-size: 1rem;
          background: #fff;
          outline: none;
          transition: border-color 0.2s;
        }
        .auth-modal-input:focus {
          border-color: #3361f6;
        }
        .auth-modal-cta {
          background: #3361f6;
          color: #fff;
          border: none;
          border-radius: 8px;
          height: 44px;
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.2s;
        }
        .auth-modal-cta:hover {
          background: #2546b2;
        }
        .auth-modal-cancel {
          background: none;
          border: none;
          color: #3361f6;
          font-size: 1rem;
          margin-top: 8px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
