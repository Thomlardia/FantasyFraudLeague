import { Link } from 'react-router-dom';
import '../styles/ui.css';
import '../styles/shopAndWiki.css';
import MoneyBar from './MoneyBar';
import PageHeader from './PageHeader';

function FraudDetailPage({ title, infoContent, secondaryCardContent }) {
    return (
        <div className="fraud-container">
            <PageHeader
                leftContent={
                    <>
                        <Link to="/fraudwiki" className="icon-button back-button" title="Back">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <h1 className="page-header-title-inline">{title}</h1>
                    </>
                }
                centerContent={<MoneyBar />}
            >
            </PageHeader>
            <div className="detail-grid">
                <div className="description-card info-card">
                    <h1 className="detail-title">{title}</h1>
                    <div className="info-content">{infoContent}</div>
                </div>
                <div className="description-card management-card">
                    {secondaryCardContent ?? (
                        <div className="placeholder-card">
                            <h2 className="management-title">Defense Coverage</h2>
                            <p>
                                Soon you&apos;ll see which defenses you own that counter this fraud pattern.
                            </p>
                            <p className="management-placeholder">
                                Keep building your defenses to unlock tailored insights here.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FraudDetailPage;
