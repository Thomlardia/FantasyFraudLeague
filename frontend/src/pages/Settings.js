import '../styles/ui.css';
import PageHeader from '../components/PageHeader';

function Settings() {
    return (
        <div className="page">
            <PageHeader title="Settings" backPath="/home" />
            <main className="home-main">
                <p>Settings page (to be implemented)</p>
            </main>
        </div>
    );
}

export default Settings;