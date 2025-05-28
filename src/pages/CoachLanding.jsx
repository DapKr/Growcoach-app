import React from 'react';
import { useNavigate } from 'react-router-dom';
import StickyHeader from '../components/StickyHeader/StickyHeader.jsx';
import { BulletList } from '../components/BulletList/BulletList.jsx';
import { CTAButton } from '../components/CTAButton/CTAButton.jsx';
import '../styles/landingpage.css';

export default function CoachLanding() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/coach-signup'); // or whatever your profile route is
  };
  return (
    <>
      <div className="landing-container">
        <StickyHeader />

        <main className="landing-main">
          <section
            className="hero-with-background"
            style={{
              background: `linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0) 26.92%), url("/assets/family1.png") lightgray 50% / cover no-repeat`,
            }}
          >
            <div className="hero-overlay">
              <h1 className="hero-title">הפלטפורמה שמביאה את ההורים אליך</h1>
              <p className="hero-subtitle">
                בלי שיווק, בלי רשתות, בלי לרדוף אחרי לקוחות
              </p>
              <p className="hero-description">
                <span className="hero-description-alt-font">
                  <span className="hero-description-alt-font-color">Grow</span>
                  Coach
                </span>{' '}
                מחברת בין מדריכי הורים מקצועיים לבין הורים שמחפשים את המדריך
                המדויק עבורם. הורים מגיעים אלינו עם צורך ברור, מחפשים ליווי יעיל
                ואיכותי.
                <strong> אנחנו פשוט יוצרים את החיבור.</strong>
              </p>
            </div>
          </section>
          <section className="landing-list-section">
            <BulletList
              title="מצטרפים בשלב ההשקה ומקבלים:"
              items={[
                'פרופיל אישי באתר הכולל תחום טיפול, סגנון, אזור, ביקורות ועוד',
                'חשיפה ללקוחות רלוונטיים',
                'התאמה מדויקת בין מדריך להורה',
                'לא תשלמו, לא תתחייבו – פיילוט פתוח לזמן מוגבל בלבד',
              ]}
            />
            <BulletList
              title="למי זה מתאים?"
              items={[
                'מדריכי הורים מוסמכים עם ניסיון מוכח',
                'מאמנים רגשיים שעובדים עם הורים ו/או ילדים',
                'יועצות שינה, גמילה, גבולות, תקשורת ודומיהם',
                'כל מי שמלווה הורים ורוצה להגדיל חשיפה בלי לבזבז אנרגיה על שיווק',
              ]}
            />
            <BulletList
              title="איך מצטרפים?"
              items={[
                'ממלאים טופס קצר עם פרטים מקצועיים',
                'עוברים סינון אנושי קצר – כדי לשמור על איכות הפלטפורמה',
                'עולים לאוויר עם פרופיל אישי',
                'מקבלים פניות מהורים שמחפשים בדיוק את הליווי שלך',
              ]}
            />
          </section>
        </main>
        <div className="cta-desktop">
          <div className="fab-container">
            <CTAButton onClick={handleClick}>להצטרפות</CTAButton>
            <div className="cta-caption">
              משתמש קיים? <a href="/login">כניסה למערכת</a>
            </div>
          </div>
        </div>
      </div>
      <div className="cta-mobile">
        <CTAButton onClick={handleClick}>להצטרפות</CTAButton>
        <div className="cta-caption">
          משתמש קיים? <a href="/login">כניסה למערכת</a>
        </div>
      </div>
    </>
  );
}
